import assert from 'node:assert/strict';
import test from 'node:test';

import { buildContextPacket } from './context-packet.mjs';

function createRequest(candidates, budgetUnits = 8) {
  return {
    taskAnchor: {
      goal: '定位单一测试失败',
      stopCondition: '缺少可追溯的直接证据时停止',
      verificationTarget: 'injected:test-name',
    },
    budgetUnits,
    candidates,
  };
}

function candidate(overrides = {}) {
  return {
    id: 'current-failure',
    kind: 'direct-evidence',
    source: 'injected:test-output',
    capturedAt: '2026-07-15',
    relevance: 'current',
    freshness: 'fresh',
    sizeUnits: 3,
    content: 'expected status 401 but received 200',
    ...overrides,
  };
}

test('should prioritize fresh direct evidence over an earlier history summary when budget is limited', () => {
  const result = buildContextPacket(createRequest([
    candidate({
      id: 'previous-summary',
      kind: 'history-summary',
      source: 'injected:handoff',
      sizeUnits: 3,
      content: '上次排查认为会话已修复',
    }),
    candidate(),
  ], 4));

  assert.equal(result.state, 'ready');
  assert.equal(result.phase, 'assembled');
  assert.deepEqual(result.packet.selected.map((item) => item.id), ['current-failure']);
  assert.deepEqual(result.excluded, [{
    id: 'previous-summary',
    reason: 'over_budget_without_reference',
  }]);
  assert.equal(result.packet.usedBudgetUnits, 3);
  assert.deepEqual(result.refresh, []);
});

test('should exclude expired direct evidence and require a refresh instead of treating it as current', () => {
  const result = buildContextPacket(createRequest([
    candidate({ id: 'expired-failure', freshness: 'expired' }),
  ]));

  assert.equal(result.state, 'refresh_required');
  assert.equal(result.phase, 'refresh_context');
  assert.deepEqual(result.packet.selected, []);
  assert.deepEqual(result.excluded, [{ id: 'expired-failure', reason: 'expired' }]);
  assert.deepEqual(result.refresh, [{
    id: 'expired-failure',
    reason: 'direct_evidence_expired',
    source: 'injected:test-output',
  }]);
});

test('should preserve a reference as a pointer when direct evidence exceeds the abstract budget', () => {
  const result = buildContextPacket(createRequest([
    candidate({
      id: 'large-ci-log',
      sizeUnits: 9,
      reference: 'injected:ci-log#auth-test',
      loadWhen: '失败断言指向认证模块',
      content: 'large injected log fragment',
    }),
  ]));

  assert.equal(result.state, 'ready');
  assert.deepEqual(result.packet.selected, []);
  assert.deepEqual(result.packet.pointers, [{
    id: 'large-ci-log',
    reference: 'injected:ci-log#auth-test',
    loadWhen: '失败断言指向认证模块',
  }]);
  assert.equal(result.packet.usedBudgetUnits, 0);
  assert.deepEqual(result.excluded, []);
});

test('should block when a candidate lacks provenance instead of silently assembling it', () => {
  const result = buildContextPacket(createRequest([
    candidate({ id: 'unknown-source', source: '' }),
  ]));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'missing_provenance');
  assert.equal(result.packet, null);
  assert.deepEqual(result.unknowns, [{
    id: 'unknown-source',
    missing: ['source'],
  }]);
  assert.deepEqual(result.evidence, ['candidate provenance is incomplete']);
});

test('should require refresh when a history summary conflicts with selected direct evidence', () => {
  const result = buildContextPacket(createRequest([
    candidate(),
    candidate({
      id: 'previous-summary',
      kind: 'history-summary',
      source: 'injected:handoff',
      sizeUnits: 1,
      content: '先前摘要认为认证测试已经恢复',
      conflictsWith: ['current-failure'],
    }),
  ]));

  assert.equal(result.state, 'refresh_required');
  assert.equal(result.phase, 'refresh_context');
  assert.deepEqual(result.packet.selected.map((item) => item.id), ['current-failure']);
  assert.deepEqual(result.excluded, [{
    id: 'previous-summary',
    reason: 'conflicting_history_summary',
  }]);
  assert.deepEqual(result.refresh, [{
    id: 'previous-summary',
    reason: 'conflicts_with_current_direct_evidence',
    conflictsWith: ['current-failure'],
  }]);
});
