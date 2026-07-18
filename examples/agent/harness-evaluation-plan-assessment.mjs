const comparisonFields = [
  'suiteVersion',
  'environmentId',
  'modelVersion',
  'toolVersion',
  'graderVersion',
];

function result(status, code, suiteVersion, next) {
  return { status, code, suiteVersion, next, executionPerformed: false };
}

function hasCompletePlan(input) {
  return (
    Boolean(input?.suite?.version) &&
    Array.isArray(input.suite.requiredScenarioTypes) &&
    input.suite.requiredScenarioTypes.length > 0 &&
    Array.isArray(input.suite.requiredHardGateIds) &&
    input.suite.requiredHardGateIds.length > 0 &&
    Boolean(input.environment?.id) &&
    Array.isArray(input.scenarios) &&
    Array.isArray(input.trials) &&
    Array.isArray(input.hardGates) &&
    Boolean(input.comparison?.baseline) &&
    Boolean(input.comparison?.candidate) &&
    Boolean(input.execution) &&
    input.execution.requested === false
  );
}

function hasMatchingComparisonConditions(comparison) {
  return (
    Boolean(comparison.baseline.harnessVersion) &&
    Boolean(comparison.candidate.harnessVersion) &&
    comparisonFields.every(
      (field) =>
        Boolean(comparison.baseline[field]) &&
        comparison.baseline[field] === comparison.candidate[field],
    )
  );
}

/** Assesses one injected Harness evaluation plan without external I/O. */
export function assessHarnessEvaluationPlan(input) {
  const suiteVersion = input?.suite?.version;

  if (input?.execution?.requested === true) {
    return result(
      'blocked',
      'external_execution_not_supported',
      suiteVersion,
      'stop_external_execution',
    );
  }

  if (!hasCompletePlan(input)) {
    return result(
      'blocked',
      'evaluation_plan_incomplete',
      suiteVersion,
      'complete_evaluation_plan',
    );
  }

  const scenarioTypes = new Set(input.scenarios.map(({ type }) => type));
  if (input.suite.requiredScenarioTypes.some((type) => !scenarioTypes.has(type))) {
    return result(
      'needs_scenarios',
      'required_scenarios_missing',
      suiteVersion,
      'add_required_scenarios',
    );
  }

  const trialScenarioIds = new Set(input.trials.map(({ scenarioId }) => scenarioId));
  if (input.scenarios.some(({ id }) => !id || !trialScenarioIds.has(id))) {
    return result(
      'needs_trials',
      'scenario_trials_missing',
      suiteVersion,
      'collect_trial_records',
    );
  }

  if (
    input.trials.some(
      ({ expectationMet, graderStatus }) =>
        expectationMet !== true || graderStatus !== 'accepted',
    )
  ) {
    return result(
      'needs_review',
      'trial_result_inconclusive',
      suiteVersion,
      'review_inconclusive_evidence',
    );
  }

  if (!hasMatchingComparisonConditions(input.comparison)) {
    return result(
      'not_comparable',
      'comparison_conditions_mismatch',
      suiteVersion,
      'align_comparison_conditions',
    );
  }

  const hardGates = new Map(input.hardGates.map((gate) => [gate.id, gate]));
  const requiredHardGates = input.suite.requiredHardGateIds.map((id) => hardGates.get(id));

  if (requiredHardGates.some((gate) => !gate)) {
    return result(
      'needs_review',
      'hard_gate_record_incomplete',
      suiteVersion,
      'review_hard_gate_evidence',
    );
  }

  if (requiredHardGates.some(({ baseline, candidate }) => baseline === 'passed' && candidate === 'failed')) {
    return result(
      'regression_detected',
      'candidate_hard_gate_regressed',
      suiteVersion,
      'request_human_review',
    );
  }

  if (requiredHardGates.some(({ baseline, candidate }) => baseline !== 'passed' || candidate !== 'passed')) {
    return result(
      'needs_review',
      'hard_gate_result_inconclusive',
      suiteVersion,
      'review_hard_gate_evidence',
    );
  }

  return result(
    'ready_for_benchmark',
    'evaluation_plan_ready',
    suiteVersion,
    'continue_to_offline_review',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const scenarioTypes = [
    'controlled_success',
    'tool_failure',
    'permission_denial',
    'missing_context',
  ];
  const sharedConditions = {
    suiteVersion: 'suite-v1',
    environmentId: 'offline-fixture-v1',
    modelVersion: 'model-fixture-v1',
    toolVersion: 'tool-fixture-v1',
    graderVersion: 'grader-v1',
  };

  const demonstration = assessHarnessEvaluationPlan({
    suite: {
      version: 'suite-v1',
      requiredScenarioTypes: scenarioTypes,
      requiredHardGateIds: ['result_observation', 'permission_boundary'],
    },
    environment: { id: 'offline-fixture-v1' },
    scenarios: scenarioTypes.map((type) => ({ id: `${type}-case`, type })),
    trials: scenarioTypes.map((type) => ({
      scenarioId: `${type}-case`,
      expectationMet: true,
      graderStatus: 'accepted',
    })),
    hardGates: [
      { id: 'result_observation', baseline: 'passed', candidate: 'passed' },
      { id: 'permission_boundary', baseline: 'passed', candidate: 'passed' },
    ],
    comparison: {
      baseline: { ...sharedConditions, harnessVersion: 'harness-v1' },
      candidate: { ...sharedConditions, harnessVersion: 'harness-v2' },
    },
    execution: { requested: false },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
