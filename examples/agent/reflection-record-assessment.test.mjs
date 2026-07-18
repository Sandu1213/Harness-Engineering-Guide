import assert from 'node:assert/strict';
import test from 'node:test';

import { assessReflectionRecord } from './reflection-record-assessment.mjs';

function request(overrides = {}) {
  return {
    trace: {
      id: 'link-check-attempt-02',
      scope: 'docs:chapter-16',
      outcome: 'failed',
      observationStatus: 'current',
      evidence: 'injected:link-check-output',
    },
    reflection: {
      symptom: '两个链接检查请求未通过。',
      hypothesis: '候选资料 URL 的格式可能不符合检查器规则。',
      falsifiableCheck: '用同一检查器对最小 URL 列表重新执行。',
      counterfactual: '若最小 URL 列表通过，优先检查暂态网络或原页面可达性。',
      proposedChange: '为候选资料增加可追溯链接预检查。',
      changeScope: 'docs:chapter-16',
    },
    verification: { status: 'not_run' },
    ...overrides,
  };
}

test('should make a bounded failed trace a candidate for independent validation', () => {
  const result = assessReflectionRecord(request());

  assert.equal(result.status, 'candidate_for_validation');
  assert.equal(result.code, 'reflection_candidate_ready');
  assert.equal(result.traceId, 'link-check-attempt-02');
  assert.equal(result.nextAction, 'run_falsifiable_check');
  assert.notEqual(result.status, 'lesson_written');
});

test('should require review after an independently passed candidate check', () => {
  const result = assessReflectionRecord(request({
    verification: { status: 'passed' },
  }));

  assert.equal(result.status, 'eligible_for_review');
  assert.equal(result.code, 'candidate_check_passed');
  assert.equal(result.nextAction, 'review_before_adoption');
});

test('should reject a candidate when its falsifiable check fails', () => {
  const result = assessReflectionRecord(request({
    verification: { status: 'failed' },
  }));

  assert.equal(result.status, 'rejected');
  assert.equal(result.code, 'candidate_check_failed');
  assert.equal(result.nextAction, 'keep_trace_and_seek_new_hypothesis');
});

test('should request evidence when the trace does not identify an observation source', () => {
  const result = assessReflectionRecord(request({
    trace: {
      id: 'link-check-attempt-02',
      scope: 'docs:chapter-16',
      outcome: 'failed',
      observationStatus: 'current',
      evidence: '',
    },
  }));

  assert.equal(result.status, 'needs_evidence');
  assert.equal(result.code, 'reflection_input_incomplete');
  assert.deepEqual(result.missing, ['trace.evidence']);
});

test('should not create a failure lesson from a trace that passed evaluation', () => {
  const result = assessReflectionRecord(request({
    trace: {
      id: 'link-check-attempt-02',
      scope: 'docs:chapter-16',
      outcome: 'passed',
      observationStatus: 'current',
      evidence: 'injected:link-check-output',
    },
  }));

  assert.equal(result.status, 'not_applicable');
  assert.equal(result.code, 'no_verified_failure');
  assert.equal(result.nextAction, 'preserve_trace_without_failure_lesson');
});

test('should require current observations before drawing a reflection candidate', () => {
  const result = assessReflectionRecord(request({
    trace: {
      id: 'link-check-attempt-02',
      scope: 'docs:chapter-16',
      outcome: 'failed',
      observationStatus: 'stale',
      evidence: 'injected:link-check-output',
    },
  }));

  assert.equal(result.status, 'refresh_required');
  assert.equal(result.code, 'observation_not_current');
  assert.equal(result.nextAction, 'refresh_observation');
});

test('should block an unfalsifiable hypothesis instead of treating it as a root cause', () => {
  const result = assessReflectionRecord(request({
    reflection: {
      symptom: '两个链接检查请求未通过。',
      hypothesis: '检查器有问题。',
      falsifiableCheck: '',
      counterfactual: '若最小 URL 列表通过，优先检查暂态网络或原页面可达性。',
      proposedChange: '为候选资料增加可追溯链接预检查。',
      changeScope: 'docs:chapter-16',
    },
  }));

  assert.equal(result.status, 'needs_evidence');
  assert.equal(result.code, 'hypothesis_not_falsifiable');
  assert.deepEqual(result.missing, ['reflection.falsifiableCheck']);
});

test('should block a candidate that silently expands beyond the observed scope', () => {
  const result = assessReflectionRecord(request({
    reflection: {
      symptom: '两个链接检查请求未通过。',
      hypothesis: '候选资料 URL 的格式可能不符合检查器规则。',
      falsifiableCheck: '用同一检查器对最小 URL 列表重新执行。',
      counterfactual: '若最小 URL 列表通过，优先检查暂态网络或原页面可达性。',
      proposedChange: '把所有章节改为另一种链接检查器。',
      changeScope: 'repository:all-docs',
    },
  }));

  assert.equal(result.status, 'blocked');
  assert.equal(result.code, 'change_scope_expanded');
  assert.equal(result.nextAction, 'narrow_or_escalate_change_scope');
});
