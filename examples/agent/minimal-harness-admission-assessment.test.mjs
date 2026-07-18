import assert from 'node:assert/strict';
import test from 'node:test';

import { assessMinimalHarnessAdmission } from './minimal-harness-admission-assessment.mjs';

function validCandidate(overrides = {}) {
  return {
    task: {
      id: 'classify-incident-01',
      objective: '将输入标签归入已知分类。',
      state: 'ready',
      allowedCapabilities: ['classify-label'],
    },
    toolRequest: {
      id: 'in-memory-classifier',
      capability: 'classify-label',
      effect: 'none',
      target: 'in-memory',
      input: { label: 'network-timeout' },
    },
    evidencePlan: {
      correlationId: 'classify-incident-01',
      observation: '记录分类值与拒绝原因。',
      acceptance: '分类值属于预先声明的集合。',
    },
    stopConditions: {
      onMissingContract: 'stop',
      onDisallowedTool: 'stop',
      onMissingEvidencePlan: 'stop',
    },
    ...overrides,
  };
}

test('should admit a complete in-memory task without executing a tool', () => {
  const result = assessMinimalHarnessAdmission(validCandidate());

  assert.equal(result.status, 'ready');
  assert.equal(result.code, 'minimal_harness_ready');
  assert.equal(result.next, 'run_in_memory_evaluator');
  assert.equal(result.executionPerformed, false);
  assert.deepEqual(result.requiredEvidence, ['correlationId', 'observation', 'acceptance']);
});

test('should stop when the task contract is incomplete', () => {
  const candidate = validCandidate({ task: { id: 'classify-incident-01' } });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_task_contract');
  assert.equal(result.next, 'stop');
});

test('should stop when a task has not reached the ready state', () => {
  const candidate = validCandidate({
    task: { ...validCandidate().task, state: 'draft' },
  });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'task_not_ready');
  assert.equal(result.next, 'stop');
});

test('should stop when the requested capability is outside task scope', () => {
  const candidate = validCandidate({
    toolRequest: { ...validCandidate().toolRequest, capability: 'delete-label' },
  });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'tool_out_of_scope');
  assert.equal(result.next, 'stop');
});

test('should stop before a side-effecting request can be admitted', () => {
  const candidate = validCandidate({
    toolRequest: { ...validCandidate().toolRequest, effect: 'write' },
  });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'effect_not_allowed');
  assert.equal(result.executionPerformed, false);
});

test('should stop when the evidence plan cannot be linked to the task', () => {
  const candidate = validCandidate({
    evidencePlan: { ...validCandidate().evidencePlan, correlationId: 'other-task' },
  });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'evidence_plan_not_linked');
  assert.equal(result.next, 'stop');
});

test('should stop when a required stop condition is absent', () => {
  const candidate = validCandidate({
    stopConditions: {
      onMissingContract: 'stop',
      onDisallowedTool: 'stop',
    },
  });
  const result = assessMinimalHarnessAdmission(candidate);

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_stop_condition');
  assert.equal(result.next, 'stop');
});
