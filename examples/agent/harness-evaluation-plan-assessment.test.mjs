import assert from 'node:assert/strict';
import test from 'node:test';

import { assessHarnessEvaluationPlan } from './harness-evaluation-plan-assessment.mjs';

const requiredScenarioTypes = [
  'controlled_success',
  'tool_failure',
  'permission_denial',
  'missing_context',
];

function createInput() {
  return {
    suite: {
      version: 'suite-v1',
      requiredScenarioTypes,
      requiredHardGateIds: ['result_observation', 'permission_boundary'],
    },
    environment: { id: 'offline-fixture-v1' },
    scenarios: requiredScenarioTypes.map((type) => ({ id: `${type}-case`, type })),
    trials: requiredScenarioTypes.map((type) => ({
      scenarioId: `${type}-case`,
      expectationMet: true,
      graderStatus: 'accepted',
    })),
    hardGates: [
      { id: 'result_observation', baseline: 'passed', candidate: 'passed' },
      { id: 'permission_boundary', baseline: 'passed', candidate: 'passed' },
    ],
    comparison: {
      baseline: {
        suiteVersion: 'suite-v1',
        environmentId: 'offline-fixture-v1',
        modelVersion: 'model-fixture-v1',
        toolVersion: 'tool-fixture-v1',
        graderVersion: 'grader-v1',
        harnessVersion: 'harness-v1',
      },
      candidate: {
        suiteVersion: 'suite-v1',
        environmentId: 'offline-fixture-v1',
        modelVersion: 'model-fixture-v1',
        toolVersion: 'tool-fixture-v1',
        graderVersion: 'grader-v1',
        harnessVersion: 'harness-v2',
      },
    },
    execution: { requested: false },
  };
}

test('accepts a complete comparable plan without claiming execution', () => {
  assert.deepEqual(assessHarnessEvaluationPlan(createInput()), {
    status: 'ready_for_benchmark',
    code: 'evaluation_plan_ready',
    suiteVersion: 'suite-v1',
    next: 'continue_to_offline_review',
    executionPerformed: false,
  });
});

test('blocks an incomplete evaluation plan', () => {
  const input = createInput();
  delete input.suite.version;

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'blocked',
    code: 'evaluation_plan_incomplete',
    suiteVersion: undefined,
    next: 'complete_evaluation_plan',
    executionPerformed: false,
  });
});

test('requests missing required scenarios', () => {
  const input = createInput();
  input.scenarios = input.scenarios.filter(({ type }) => type !== 'missing_context');

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'needs_scenarios',
    code: 'required_scenarios_missing',
    suiteVersion: 'suite-v1',
    next: 'add_required_scenarios',
    executionPerformed: false,
  });
});

test('requests trial records for every scenario', () => {
  const input = createInput();
  input.trials = input.trials.filter(({ scenarioId }) => scenarioId !== 'tool_failure-case');

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'needs_trials',
    code: 'scenario_trials_missing',
    suiteVersion: 'suite-v1',
    next: 'collect_trial_records',
    executionPerformed: false,
  });
});

test('stops comparison when a controlled version differs', () => {
  const input = createInput();
  input.comparison.candidate.graderVersion = 'grader-v2';

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'not_comparable',
    code: 'comparison_conditions_mismatch',
    suiteVersion: 'suite-v1',
    next: 'align_comparison_conditions',
    executionPerformed: false,
  });
});

test('reports a candidate hard-gate regression without averaging it away', () => {
  const input = createInput();
  input.hardGates[1].candidate = 'failed';

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'regression_detected',
    code: 'candidate_hard_gate_regressed',
    suiteVersion: 'suite-v1',
    next: 'request_human_review',
    executionPerformed: false,
  });
});

test('routes an inconclusive trial to review', () => {
  const input = createInput();
  input.trials[0].expectationMet = null;

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'needs_review',
    code: 'trial_result_inconclusive',
    suiteVersion: 'suite-v1',
    next: 'review_inconclusive_evidence',
    executionPerformed: false,
  });
});

test('blocks an external execution request without performing it', () => {
  const input = createInput();
  input.execution.requested = true;

  assert.deepEqual(assessHarnessEvaluationPlan(input), {
    status: 'blocked',
    code: 'external_execution_not_supported',
    suiteVersion: 'suite-v1',
    next: 'stop_external_execution',
    executionPerformed: false,
  });
});
