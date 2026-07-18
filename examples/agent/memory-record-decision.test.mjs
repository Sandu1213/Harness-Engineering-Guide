import assert from 'node:assert/strict';
import test from 'node:test';

import { decideMemoryRecord } from './memory-record-decision.mjs';

function candidate(overrides = {}) {
  return {
    id: 'current-failure',
    kind: 'observation',
    scope: 'task',
    subject: 'project:demo',
    source: 'injected:test-output',
    observedAt: '2026-07-15',
    writeReason: '记录当前验证对象',
    readTrigger: '当前任务仍在处理此失败',
    validity: 'current',
    revisionOrRevocation: 'replace-on-new-observation',
    ...overrides,
  };
}

function request(overrides = {}) {
  return {
    taskAnchor: '定位当前测试失败',
    subject: 'project:demo',
    candidate: candidate(),
    ...overrides,
  };
}

test('should keep a valid task observation in working memory for the current task', () => {
  const result = decideMemoryRecord(request());

  assert.equal(result.state, 'working');
  assert.equal(result.phase, 'current_task');
  assert.equal(result.nextAction, 'keep_in_working_memory');
  assert.deepEqual(result.unknowns, []);
  assert.equal(result.record.id, 'current-failure');
});

test('should mark a valid cross-task experience as a review candidate instead of persisted memory', () => {
  const result = decideMemoryRecord(request({
    candidate: candidate({
      id: 'retry-lesson',
      kind: 'experience',
      scope: 'cross-task',
      revisionOrRevocation: 'supersede-after-new-evidence',
    }),
  }));

  assert.equal(result.state, 'long_term_candidate');
  assert.equal(result.phase, 'candidate_review');
  assert.equal(result.nextAction, 'review_for_long_term');
  assert.match(result.reasons[0], /候选/);
  assert.notEqual(result.state, 'persisted');
});

test('should block a record with missing source or observedAt and name each missing field', () => {
  const result = decideMemoryRecord(request({
    candidate: candidate({ source: '', observedAt: undefined }),
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'missing_metadata');
  assert.equal(result.nextAction, 'add_evidence');
  assert.deepEqual(result.unknowns, [{
    id: 'current-failure',
    missing: ['source', 'observedAt'],
  }]);
});

test('should require refresh for an expired record without treating it as current fact', () => {
  const result = decideMemoryRecord(request({
    candidate: candidate({ validity: 'expired' }),
  }));

  assert.equal(result.state, 'refresh_required');
  assert.equal(result.phase, 'refresh_before_read');
  assert.equal(result.nextAction, 'refresh_current_evidence');
  assert.match(result.reasons[0], /过期/);
  assert.equal(result.record.id, 'current-failure');
});

test('should block a candidate whose subject differs from the current task subject', () => {
  const result = decideMemoryRecord(request({
    candidate: candidate({ subject: 'project:other' }),
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'subject_mismatch');
  assert.equal(result.nextAction, 'add_evidence');
  assert.deepEqual(result.unknowns, [{
    id: 'current-failure',
    missing: ['subject_match'],
  }]);
});

test('should block a cross-task candidate without a revision or revocation path', () => {
  const result = decideMemoryRecord(request({
    candidate: candidate({
      scope: 'cross-task',
      revisionOrRevocation: '',
    }),
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'missing_metadata');
  assert.equal(result.nextAction, 'add_evidence');
  assert.deepEqual(result.unknowns, [{
    id: 'current-failure',
    missing: ['revisionOrRevocation'],
  }]);
});
