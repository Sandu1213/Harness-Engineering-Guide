const REQUIRED_STATES = [
  'idle',
  'validating',
  'submitting',
  'authenticated',
  'validation_error',
  'network_error',
];

const REQUIRED_SCENARIOS = ['success', 'validation_error', 'network_error'];
const REQUIRED_LAYERS = ['unit', 'widget', 'integration'];
const REQUIRED_REPORT_FIELDS = ['scenario', 'layer', 'observation', 'verdict', 'limitation'];

/**
 * Assess an injected, no-execution delivery plan for a Flutter login teaching
 * scenario. The function never builds an app, contacts a backend, starts a
 * device, stores credentials, or writes a report.
 *
 * @param {unknown} deliveryPackage
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval',
 *   code: string,
 *   next: 'implement_in_isolated_example' | 'stop' | 'obtain_environment_approval',
 *   executionPerformed: false,
 *   requiredScenarios?: string[],
 * }}
 */
export function assessFlutterLoginDelivery(deliveryPackage) {
  if (!isRecord(deliveryPackage)) {
    return stopped('invalid_delivery_package');
  }

  const { task, stateModel, testMatrix, reportContract, approvals } = deliveryPackage;

  if (!hasTaskContract(task)) {
    return stopped('missing_task_contract');
  }

  if (task.dataPolicy !== 'no-real-credentials') {
    return stopped('credential_policy_violation');
  }

  if (!hasRequiredItems(stateModel, 'states', REQUIRED_STATES)) {
    return stopped('missing_required_state');
  }

  if (!hasRequiredItems(testMatrix, 'scenarios', REQUIRED_SCENARIOS)) {
    return stopped('missing_test_scenario');
  }

  if (!hasRequiredItems(testMatrix, 'layers', REQUIRED_LAYERS) || testMatrix.executionTarget !== 'planned') {
    return stopped('invalid_test_matrix');
  }

  if (!hasReportContract(reportContract, task.id)) {
    return stopped(
      isRecord(reportContract) && hasNonEmptyString(reportContract.correlationId)
        ? 'report_not_linked_to_task'
        : 'missing_report_contract',
    );
  }

  if (reportContract.claimState !== 'planned') {
    return stopped('report_claim_not_observed');
  }

  if (!isRecord(approvals) || approvals.environmentExecution === 'requested') {
    return requiresApproval('environment_execution_not_approved');
  }

  if (approvals.environmentExecution !== 'not-requested') {
    return stopped('invalid_environment_approval_state');
  }

  return {
    status: 'ready',
    code: 'flutter_login_delivery_plan_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
    requiredScenarios: REQUIRED_SCENARIOS,
  };
}

/** @param {unknown} task */
function hasTaskContract(task) {
  return (
    isRecord(task) &&
    hasNonEmptyString(task.id) &&
    task.feature === 'login' &&
    hasNonEmptyString(task.objective) &&
    task.state === 'ready' &&
    hasNonEmptyString(task.dataPolicy)
  );
}

/** @param {unknown} value @param {string} key @param {string[]} required */
function hasRequiredItems(value, key, required) {
  return (
    isRecord(value) &&
    Array.isArray(value[key]) &&
    required.every((item) => value[key].includes(item))
  );
}

/** @param {unknown} reportContract @param {string} taskId */
function hasReportContract(reportContract, taskId) {
  return (
    isRecord(reportContract) &&
    reportContract.correlationId === taskId &&
    hasRequiredItems(reportContract, 'requiredFields', REQUIRED_REPORT_FIELDS) &&
    hasNonEmptyString(reportContract.claimState)
  );
}

/** @param {string} code */
function stopped(code) {
  return {
    status: 'stopped',
    code,
    next: 'stop',
    executionPerformed: false,
  };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_environment_approval',
    executionPerformed: false,
  };
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessFlutterLoginDelivery({
    task: {
      id: 'mobile-login-01',
      feature: 'login',
      objective: '为受控登录界面准备可审查的交付计划。',
      state: 'ready',
      dataPolicy: 'no-real-credentials',
    },
    stateModel: {
      states: ['idle', 'validating', 'submitting', 'authenticated', 'validation_error', 'network_error'],
      terminalStates: ['authenticated', 'validation_error', 'network_error'],
    },
    testMatrix: {
      scenarios: ['success', 'validation_error', 'network_error'],
      layers: ['unit', 'widget', 'integration'],
      executionTarget: 'planned',
    },
    reportContract: {
      correlationId: 'mobile-login-01',
      requiredFields: ['scenario', 'layer', 'observation', 'verdict', 'limitation'],
      claimState: 'planned',
    },
    approvals: {
      environmentExecution: 'not-requested',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
