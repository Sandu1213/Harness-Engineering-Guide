import assert from 'node:assert/strict';
import test from 'node:test';

import { assessSoftwareChangeDelivery } from './software-change-delivery-assessment.mjs';

function validPackage(overrides = {}) {
  return {
    changeBrief: {
      id: 'add-format-summary',
      objective: '为报告摘要增加格式化字段。',
      acceptanceCriteria: ['摘要包含格式化字段。', '既有摘要字段保持不变。'],
      nonGoals: ['不修改报告存储格式。'],
      allowedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs', 'README.md'],
    },
    explorationRecord: {
      inspectedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs'],
      relevantBehavior: '现有测试断言摘要对象字段。',
      unknowns: [],
    },
    implementationPlan: {
      steps: ['先写失败断言。', '只修改摘要构造。', '运行相关测试。'],
      plannedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs'],
    },
    verificationPlan: {
      command: 'node --test tests/report/summary.test.mjs',
      expectedEvidence: ['新增断言通过。', '既有断言通过。'],
      externalEffects: 'none',
    },
    documentationDecision: {
      impact: 'update',
      paths: ['README.md'],
      rationale: '公开摘要字段发生变化。',
    },
    reviewPackage: {
      changedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs', 'README.md'],
      diffSummary: '新增格式化字段及其测试和文档说明。',
      evidenceStatus: 'planned',
      reviewState: 'ready_for_review',
    },
    ...overrides,
  };
}

test('should admit a bounded delivery package without running code or Git', () => {
  const result = assessSoftwareChangeDelivery(validPackage());

  assert.equal(result.status, 'ready_for_review');
  assert.equal(result.code, 'software_change_package_ready');
  assert.equal(result.next, 'request_review');
  assert.equal(result.executionPerformed, false);
  assert.deepEqual(result.requiredEvidence, ['verificationPlan', 'documentationDecision', 'reviewPackage']);
});

test('should stop when the change brief is absent', () => {
  const result = assessSoftwareChangeDelivery(validPackage({ changeBrief: undefined }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_change_brief');
});

test('should stop when acceptance criteria are missing', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    changeBrief: { ...validPackage().changeBrief, acceptanceCriteria: [] },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_acceptance_criteria');
});

test('should stop when exploration does not identify behavior', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    explorationRecord: { inspectedPaths: ['src/report/summary.mjs'], relevantBehavior: '', unknowns: [] },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_exploration_record');
});

test('should stop when the implementation plan expands beyond the declared scope', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    implementationPlan: {
      ...validPackage().implementationPlan,
      plannedPaths: ['src/report/summary.mjs', 'src/auth/session.mjs'],
    },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'scope_expansion_detected');
});

test('should stop when the implementation plan is absent', () => {
  const result = assessSoftwareChangeDelivery(validPackage({ implementationPlan: undefined }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_implementation_plan');
});

test('should stop when no verification command or expected evidence is declared', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    verificationPlan: { command: '', expectedEvidence: [], externalEffects: 'none' },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_verification_plan');
});

test('should stop when documentation impact is undecided', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    documentationDecision: { impact: 'unknown', paths: [], rationale: '' },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'documentation_impact_unknown');
});

test('should stop when the review package lacks a diff summary', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    reviewPackage: { ...validPackage().reviewPackage, diffSummary: '' },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_review_package');
});

test('should stop when review paths do not match the declared scope', () => {
  const result = assessSoftwareChangeDelivery(validPackage({
    reviewPackage: {
      ...validPackage().reviewPackage,
      changedPaths: ['src/report/summary.mjs', 'src/auth/session.mjs'],
    },
  }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'review_scope_mismatch');
});
