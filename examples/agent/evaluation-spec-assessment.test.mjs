import assert from 'node:assert/strict';
import test from 'node:test';

import { assessEvaluationSpec } from './evaluation-spec-assessment.mjs';

const baseTask = {
  id: 'docs-update-evaluation',
  scope: 'chapter-17-docs',
  successCriteria: [
    { id: 'markdown', required: true },
    { id: 'links', required: true },
  ],
};

const basePolicy = {
  acceptedEvidenceKinds: ['deterministic_check', 'state_observation', 'model_judge'],
  requiresModelJudgeCalibration: true,
  requiredFreshness: 'fresh',
};

function evidenceRecord(criterionId, kind, status, extra = {}) {
  return {
    criterionId,
    kind,
    scope: baseTask.scope,
    freshness: 'fresh',
    ...(status === undefined ? {} : { status }),
    ...extra,
  };
}

function passedEvidence() {
  return [
    evidenceRecord('markdown', 'deterministic_check', 'passed'),
    evidenceRecord('links', 'state_observation', 'passed'),
  ];
}

test('accepts a complete spec whose required criteria have allowed passing evidence', () => {
  assert.deepEqual(
    assessEvaluationSpec({ task: baseTask, evidence: passedEvidence(), policy: basePolicy }),
    { status: 'accepted', code: 'evaluation_accepted', taskId: 'docs-update-evaluation' },
  );
});

test('requires a specification when success criteria are absent', () => {
  assert.deepEqual(
    assessEvaluationSpec({ task: { id: 'docs-update-evaluation' }, evidence: [], policy: basePolicy }),
    { status: 'needs_spec', code: 'evaluation_spec_incomplete', taskId: 'docs-update-evaluation' },
  );
});

test('requires evidence when a required criterion has no record', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [evidenceRecord('markdown', 'deterministic_check', 'passed')],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'criterion_evidence_missing',
      taskId: 'docs-update-evaluation',
      criterionId: 'links',
    },
  );
});

test('does not accept a self report as required criterion evidence', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'self_report', 'passed'),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'self_report_not_accepted',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('rejects when an allowed required check explicitly reports failure', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'deterministic_check', 'failed'),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'rejected',
      code: 'criterion_not_passed',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('requires evidence when a required record is explicitly unknown', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'deterministic_check', 'unknown'),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'criterion_evidence_status_not_confirmed',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('requires evidence when a required record omits its status', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'deterministic_check'),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'criterion_evidence_status_not_confirmed',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('requires evidence when a passing state observation has no matching scope', () => {
  const { scope, ...unscopedLinks } = evidenceRecord('links', 'state_observation', 'passed');

  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [evidenceRecord('markdown', 'deterministic_check', 'passed'), unscopedLinks],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'evidence_scope_mismatch',
      taskId: 'docs-update-evaluation',
      criterionId: 'links',
    },
  );
});

test('requires evidence when a passing state observation is not fresh', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'deterministic_check', 'passed'),
        evidenceRecord('links', 'state_observation', 'passed', { freshness: 'stale' }),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'evidence_not_fresh',
      taskId: 'docs-update-evaluation',
      criterionId: 'links',
    },
  );
});

test('requires further evidence for an uncalibrated model judge', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'model_judge', 'passed', { calibrated: false }),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'model_judge_not_calibrated',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('accepts a calibrated model judge when the policy explicitly permits it', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'model_judge', 'passed', { calibrated: true }),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    { status: 'accepted', code: 'evaluation_accepted', taskId: 'docs-update-evaluation' },
  );
});

test('requires evidence review when records for one required criterion conflict', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: baseTask,
      evidence: [
        evidenceRecord('markdown', 'deterministic_check', 'passed'),
        evidenceRecord('markdown', 'deterministic_check', 'failed'),
        evidenceRecord('links', 'state_observation', 'passed'),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'criterion_evidence_conflict',
      taskId: 'docs-update-evaluation',
      criterionId: 'markdown',
    },
  );
});

test('requires review when an optional criterion has no record', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: {
        ...baseTask,
        successCriteria: [...baseTask.successCriteria, { id: 'reader-path', required: false }],
      },
      evidence: passedEvidence(),
      policy: basePolicy,
    }),
    {
      status: 'needs_review',
      code: 'optional_criterion_evidence_missing',
      taskId: 'docs-update-evaluation',
      criterionId: 'reader-path',
    },
  );
});

test('routes an unmet optional criterion to review without treating it as a required failure', () => {
  assert.deepEqual(
    assessEvaluationSpec({
      task: {
        ...baseTask,
        successCriteria: [...baseTask.successCriteria, { id: 'reader-path', required: false }],
      },
      evidence: [
        ...passedEvidence(),
        evidenceRecord('reader-path', 'model_judge', 'failed', { calibrated: true }),
      ],
      policy: basePolicy,
    }),
    {
      status: 'needs_review',
      code: 'optional_criterion_needs_review',
      taskId: 'docs-update-evaluation',
      criterionId: 'reader-path',
    },
  );
});
