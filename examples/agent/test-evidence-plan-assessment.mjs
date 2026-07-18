const REQUIRED_API_CATEGORIES = ['accepted', 'authentication_rejected', 'service_unavailable'];
const REQUIRED_LAYERS = ['api', 'ui'];

/**
 * Assess an injected, no-execution test evidence plan for the login teaching
 * scenario. The function never imports a test framework, starts a browser,
 * contacts an API, reads files, or accesses accounts and credentials.
 *
 * @param {unknown} plan
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval',
 *   code: string,
 *   next: 'implement_in_isolated_example' | 'stop' | 'obtain_environment_approval',
 *   executionPerformed: false,
 *   requiredLayers?: string[],
 * }}
 */
export function assessTestEvidencePlan(plan) {
  if (!isRecord(plan)) {
    return stopped('invalid_test_evidence_plan');
  }

  const { scenario, apiContract, uiFlow, failureRecord, reportGate, approvals } = plan;

  if (!hasScenario(scenario)) {
    return stopped('missing_scenario_contract');
  }

  if (!isRecord(approvals) || approvals.environmentExecution === 'requested') {
    return requiresApproval('environment_execution_not_approved');
  }

  if (approvals.environmentExecution !== 'not-requested') {
    return stopped('invalid_environment_approval_state');
  }

  if (!isRecord(apiContract)) {
    return stopped('missing_api_contract');
  }

  if (!hasApiContract(apiContract)) {
    return stopped('incomplete_api_contract');
  }

  if (!isRecord(uiFlow)) {
    return stopped('missing_ui_flow_evidence');
  }

  if (!hasNonEmptyString(uiFlow.afterObservation)) {
    return stopped('missing_ui_after_observation');
  }

  if (!hasUiFlowEvidence(uiFlow)) {
    return stopped('invalid_ui_isolation');
  }

  if (!hasLinkedFailureRecord(failureRecord, scenario.id)) {
    return stopped('failure_record_not_linked');
  }

  if (!hasLinkedReportGate(reportGate, scenario.id)) {
    return stopped('report_gate_not_linked');
  }

  if (reportGate.claimState !== 'planned') {
    return stopped('report_claim_not_observed');
  }

  return {
    status: 'ready',
    code: 'test_evidence_plan_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
    requiredLayers: REQUIRED_LAYERS,
  };
}

/** @param {unknown} scenario */
function hasScenario(scenario) {
  return (
    isRecord(scenario) &&
    hasNonEmptyString(scenario.id) &&
    scenario.feature === 'login' &&
    scenario.dataPolicy === 'no-real-identities'
  );
}

/** @param {unknown} apiContract */
function hasApiContract(apiContract) {
  return (
    isRecord(apiContract) &&
    apiContract.fixtureScope === 'function' &&
    hasNonEmptyString(apiContract.substituteBoundary) &&
    apiContract.restoreAfterRequest === true &&
    apiContract.executionState === 'planned' &&
    hasRequiredItems(apiContract, 'expectedCategories', REQUIRED_API_CATEGORIES)
  );
}

/** @param {unknown} uiFlow */
function hasUiFlowEvidence(uiFlow) {
  return (
    isRecord(uiFlow) &&
    uiFlow.contextIsolation === 'fresh-browser-context' &&
    uiFlow.locatorStrategy === 'user-facing-or-test-contract' &&
    hasNonEmptyString(uiFlow.beforeObservation) &&
    hasNonEmptyString(uiFlow.primaryAction) &&
    uiFlow.executionState === 'planned'
  );
}

/** @param {unknown} failureRecord @param {string} scenarioId */
function hasLinkedFailureRecord(failureRecord, scenarioId) {
  return (
    isRecord(failureRecord) &&
    failureRecord.scenarioId === scenarioId &&
    hasRequiredItems(failureRecord, 'requiredLayers', REQUIRED_LAYERS) &&
    hasNonEmptyString(failureRecord.limitation)
  );
}

/** @param {unknown} reportGate @param {string} scenarioId */
function hasLinkedReportGate(reportGate, scenarioId) {
  return (
    isRecord(reportGate) &&
    reportGate.scenarioId === scenarioId &&
    hasRequiredItems(reportGate, 'requiredLayers', REQUIRED_LAYERS) &&
    hasNonEmptyString(reportGate.claimState) &&
    reportGate.observationRequiredForExecution === true &&
    hasNonEmptyString(reportGate.limitation)
  );
}

/** @param {unknown} value @param {string} key @param {string[]} required */
function hasRequiredItems(value, key, required) {
  return isRecord(value) && Array.isArray(value[key]) && required.every((item) => value[key].includes(item));
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
  const result = assessTestEvidencePlan({
    scenario: {
      id: 'credential-rejected',
      feature: 'login',
      dataPolicy: 'no-real-identities',
    },
    apiContract: {
      fixtureScope: 'function',
      substituteBoundary: 'authentication-client',
      restoreAfterRequest: true,
      expectedCategories: ['accepted', 'authentication_rejected', 'service_unavailable'],
      executionState: 'planned',
    },
    uiFlow: {
      contextIsolation: 'fresh-browser-context',
      locatorStrategy: 'user-facing-or-test-contract',
      beforeObservation: 'login-form-visible',
      primaryAction: 'submit-invalid-credential',
      afterObservation: 'rejection-message-visible',
      executionState: 'planned',
    },
    failureRecord: {
      scenarioId: 'credential-rejected',
      requiredLayers: ['api', 'ui'],
      limitation: 'no-approved-runtime-target',
    },
    reportGate: {
      scenarioId: 'credential-rejected',
      requiredLayers: ['api', 'ui'],
      claimState: 'planned',
      observationRequiredForExecution: true,
      limitation: 'no-runtime-observation',
    },
    approvals: {
      environmentExecution: 'not-requested',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
