import assert from 'node:assert/strict';
import test from 'node:test';

import { assessCompactionRecord } from './context-compaction-assessment.mjs';

const baseRun = {
  id: 'book-review-run-19',
  scope: 'chapter-19-review',
  contractVersion: '2026-07-16',
};

const basePolicy = {
  requiredAnchorIds: ['goal', 'decision-source', 'unknown-citation'],
  allowedDiscardKinds: ['redundant_tool_output', 'superseded_draft'],
  requiredPointerKinds: ['evidence'],
};

function pointer(id, kind = 'evidence', extra = {}) {
  return {
    id,
    kind,
    target: `records/${id}.md`,
    purpose: '恢复时回到可审查材料',
    ...extra,
  };
}

function anchor(id, extra = {}) {
  return {
    id,
    statement: `教学锚点：${id}`,
    pointerId: 'source-evidence',
    ...extra,
  };
}

function completeRecord(extra = {}) {
  return {
    runId: baseRun.id,
    scope: baseRun.scope,
    contractVersion: baseRun.contractVersion,
    summary: '只保留任务、决策、未知项与恢复条件；不把原始轨迹当作结论。',
    anchors: [anchor('goal'), anchor('decision-source'), anchor('unknown-citation')],
    pointers: [pointer('source-evidence')],
    retained: [
      { kind: 'task_goal', reason: '恢复时必须确认目标' },
      { kind: 'unresolved_item', reason: '不能被摘要掩盖' },
    ],
    discarded: [
      { kind: 'redundant_tool_output', reason: '可从受控原始记录重新定位' },
    ],
    resumption: {
      nextAction: '重新读取引用位置并核对版本',
      mustVerify: ['unknown-citation'],
    },
    lossChecks: ['required_anchors_present', 'pointers_resolve_before_use'],
    ...extra,
  };
}

test('accepts a compact record with required anchors, recoverable pointers and loss checks', () => {
  assert.deepEqual(
    assessCompactionRecord({ run: baseRun, record: completeRecord(), policy: basePolicy }),
    { status: 'ready_to_resume', code: 'compaction_record_ready', runId: 'book-review-run-19' },
  );
});

test('requires a record specification when the summary or rehydration plan is absent', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ summary: '', resumption: null }),
      policy: basePolicy,
    }),
    { status: 'needs_spec', code: 'compaction_record_incomplete', runId: 'book-review-run-19' },
  );
});

test('blocks resumption when a record belongs to another run or scope', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ scope: 'another-chapter' }),
      policy: basePolicy,
    }),
    { status: 'blocked', code: 'record_identity_mismatch', runId: 'book-review-run-19' },
  );
});

test('requires rehydration when the compacted contract version does not match the run', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ contractVersion: 'old-contract' }),
      policy: basePolicy,
    }),
    { status: 'needs_rehydration', code: 'contract_version_mismatch', runId: 'book-review-run-19' },
  );
});

test('requires evidence when a stable required anchor was dropped', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ anchors: [anchor('goal'), anchor('decision-source')] }),
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'required_anchor_missing',
      runId: 'book-review-run-19',
      anchorId: 'unknown-citation',
    },
  );
});

test('requires rehydration when an anchor does not point to an available record pointer', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ anchors: [anchor('goal', { pointerId: 'missing' }), anchor('decision-source'), anchor('unknown-citation')] }),
      policy: basePolicy,
    }),
    {
      status: 'needs_rehydration',
      code: 'anchor_pointer_missing',
      runId: 'book-review-run-19',
      anchorId: 'goal',
    },
  );
});

test('requires review when a discarded item has no allowed class or recovery reason', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ discarded: [{ kind: 'raw_evidence', reason: '' }] }),
      policy: basePolicy,
    }),
    { status: 'needs_review', code: 'discard_decision_not_justified', runId: 'book-review-run-19' },
  );
});

test('requires a loss check for each stable anchor marked uncertain', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({
        anchors: [anchor('goal'), anchor('decision-source'), anchor('unknown-citation', { status: 'uncertain' })],
        lossChecks: ['required_anchors_present'],
      }),
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'uncertain_anchor_requires_loss_check',
      runId: 'book-review-run-19',
      anchorId: 'unknown-citation',
    },
  );
});

test('does not treat a summary as a substitute for a missing evidence pointer', () => {
  assert.deepEqual(
    assessCompactionRecord({
      run: baseRun,
      record: completeRecord({ pointers: [] }),
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'required_pointer_kind_missing',
      runId: 'book-review-run-19',
      pointerKind: 'evidence',
    },
  );
});
