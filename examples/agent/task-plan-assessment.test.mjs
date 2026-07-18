import assert from 'node:assert/strict';
import test from 'node:test';

import { assessTaskPlan } from './task-plan-assessment.mjs';

function createRequest(overrides = {}) {
  return {
    planBrief: {
      goal: '为虚构服务形成认证测试方案',
      completionEvidence: ['认证契约已定位', '断言已审查'],
      stopConditions: ['认证契约不可定位'],
    },
    tasks: [
      {
        id: 'research-auth-contract',
        question: '认证契约能否被定位？',
        inputs: ['injected:requirement'],
        output: 'contract-evidence',
        acceptanceEvidence: ['traceable-source'],
        dependencies: [],
        effect: 'read_only',
        resources: ['auth-contract'],
      },
      {
        id: 'draft-documentation',
        question: '能否整理不宣称测试通过的文档草稿？',
        inputs: ['injected:requirement'],
        output: 'documentation-draft',
        acceptanceEvidence: ['unknowns-preserved'],
        dependencies: [],
        effect: 'read_only',
        resources: ['documentation'],
      },
      {
        id: 'design-assertions',
        question: '能否根据认证契约设计断言？',
        inputs: ['contract-evidence'],
        output: 'assertion-draft',
        acceptanceEvidence: ['contract-linked'],
        dependencies: ['research-auth-contract'],
        effect: 'read_only',
        resources: ['assertions'],
      },
      {
        id: 'write-test-draft',
        question: '能否写入测试草稿？',
        inputs: ['assertion-draft'],
        output: 'test-draft',
        acceptanceEvidence: ['review-request'],
        dependencies: ['design-assertions'],
        effect: 'write',
        resources: ['test-file'],
      },
      {
        id: 'inspect-shared-environment',
        question: '能否检查共享测试环境？',
        inputs: ['injected:environment-snapshot'],
        output: 'environment-observation',
        acceptanceEvidence: ['injected:observation'],
        dependencies: [],
        effect: 'read_only',
        resources: ['shared-test-environment'],
      },
      {
        id: 'prepare-shared-environment-test',
        question: '能否准备共享环境测试？',
        inputs: ['injected:environment-snapshot'],
        output: 'test-preparation',
        acceptanceEvidence: ['injected:preparation-review'],
        dependencies: [],
        effect: 'read_only',
        resources: ['shared-test-environment'],
      },
    ],
    request: {
      taskId: 'research-auth-contract',
      parallelWith: ['draft-documentation'],
      completedTaskIds: [],
      approvedEffects: {},
    },
    ...overrides,
  };
}

test('should prepare an independent read-only task with a parallel candidate', () => {
  const result = assessTaskPlan(createRequest());

  assert.deepEqual(result, {
    status: 'ready',
    phase: 'ready_for_planned_task',
    taskId: 'research-auth-contract',
    reasons: ['plan brief, task contract, dependencies, effect boundary, and parallel resources are ready'],
    missing: [],
    waitingFor: [],
    parallelCandidates: ['draft-documentation'],
    effects: [],
  });
});

test('should block a task card without acceptance evidence', () => {
  const request = createRequest();
  request.tasks[0].acceptanceEvidence = [];

  const result = assessTaskPlan(request);

  assert.deepEqual(result, {
    status: 'blocked',
    phase: 'missing_task_contract',
    taskId: 'research-auth-contract',
    reasons: ['task contract is incomplete'],
    missing: ['acceptanceEvidence'],
    waitingFor: [],
    parallelCandidates: [],
    effects: [],
  });
});

test('should block an assertion task until contract research is complete', () => {
  const request = createRequest({
    request: {
      taskId: 'design-assertions',
      parallelWith: [],
      completedTaskIds: [],
      approvedEffects: {},
    },
  });

  const result = assessTaskPlan(request);

  assert.deepEqual(result, {
    status: 'blocked',
    phase: 'unmet_dependencies',
    taskId: 'design-assertions',
    reasons: ['task dependencies are not complete'],
    missing: [],
    waitingFor: ['research-auth-contract'],
    parallelCandidates: [],
    effects: [],
  });
});

test('should require approval for a planned write without granting the effect', () => {
  const request = createRequest({
    request: {
      taskId: 'write-test-draft',
      parallelWith: [],
      completedTaskIds: ['research-auth-contract', 'design-assertions'],
      approvedEffects: {},
    },
  });

  const result = assessTaskPlan(request);

  assert.deepEqual(result, {
    status: 'requires_approval',
    phase: 'effect_requires_approval',
    taskId: 'write-test-draft',
    reasons: ['planned effect is outside the injected approval snapshot'],
    missing: [],
    waitingFor: [],
    parallelCandidates: [],
    effects: ['write'],
  });
});

test('should reject a parallel candidate that shares a test environment resource', () => {
  const request = createRequest({
    request: {
      taskId: 'inspect-shared-environment',
      parallelWith: ['prepare-shared-environment-test'],
      completedTaskIds: [],
      approvedEffects: {},
    },
  });

  const result = assessTaskPlan(request);

  assert.deepEqual(result, {
    status: 'not_ready',
    phase: 'parallel_candidate_conflict',
    taskId: 'inspect-shared-environment',
    reasons: ['parallel candidate shares declared resources'],
    missing: [],
    waitingFor: [],
    parallelCandidates: [],
    effects: [],
  });
});

test('should reject a plan brief without completion evidence', () => {
  const request = createRequest({
    planBrief: {
      goal: '为虚构服务形成认证测试方案',
      completionEvidence: [],
      stopConditions: ['认证契约不可定位'],
    },
  });

  const result = assessTaskPlan(request);

  assert.deepEqual(result, {
    status: 'not_ready',
    phase: 'missing_plan_brief',
    taskId: 'research-auth-contract',
    reasons: ['plan brief is incomplete'],
    missing: ['completionEvidence'],
    waitingFor: [],
    parallelCandidates: [],
    effects: [],
  });
});
