const READ_ONLY_CAPABILITY = 'read_approved_summary';
const REQUIRED_ESCALATION_TRIGGERS = [
  'cross_tenant',
  'budget_expired',
  'correlation_inconsistent',
];

/**
 * Assess an injected, no-execution enterprise Harness plan for the teaching
 * scenario. The function never reads or writes data, invokes policy or
 * identity systems, emits telemetry, creates approvals, or contacts services.
 *
 * @param {unknown} plan
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval',
 *   code: string,
 *   next: 'continue_read_only_candidate' | 'stop' | 'obtain_human_approval',
 *   executionPerformed: false,
 * }}
 */
export function assessEnterpriseHarnessPlan(plan) {
  if (!isRecord(plan)) {
    return stopped('invalid_enterprise_harness_plan');
  }

  const { controlPlane, executionPlane, correlatedObservationRecord, escalationGate } = plan;

  if (!isRecord(controlPlane)) {
    return stopped('missing_control_plane');
  }

  if (!hasNonEmptyString(controlPlane.subjectClaim)) {
    return stopped('missing_subject_claim');
  }

  if (!hasTenantDataBoundary(controlPlane.tenantDataBoundary)) {
    return stopped('incomplete_tenant_data_boundary');
  }

  if (!hasPolicyDecisionRecord(controlPlane.policyDecisionRecord)) {
    return stopped('incomplete_policy_decision_record');
  }

  if (!hasBudgetBoundary(controlPlane.budget)) {
    return stopped('incomplete_budget_boundary');
  }

  if (!hasExecutionPlane(executionPlane)) {
    return stopped('incomplete_execution_plane');
  }

  if (!hasEscalationGate(escalationGate)) {
    return stopped('incomplete_human_escalation_gate');
  }

  const { policyDecisionRecord, tenantDataBoundary, budget } = controlPlane;

  if (policyDecisionRecord.decision === 'denied') {
    return stopped('policy_denied');
  }

  if (policyDecisionRecord.decision === 'pending_approval') {
    return requiresApproval('policy_pending_approval_requires_human_review');
  }

  if (policyDecisionRecord.decision !== 'allowed') {
    return stopped('invalid_policy_decision');
  }

  if (executionPlane.executionRequest === 'requested') {
    return requiresApproval('external_execution_requires_human_review');
  }

  if (executionPlane.executionRequest !== 'not-requested') {
    return stopped('invalid_execution_request_state');
  }

  if (executionPlane.requestedCapability !== READ_ONLY_CAPABILITY) {
    return requiresApproval('non_read_only_capability_requires_human_review');
  }

  if (!policyDecisionRecord.limits.allowedCapabilities.includes(executionPlane.requestedCapability)) {
    return stopped('requested_capability_not_allowed_by_policy');
  }

  if (
    policyDecisionRecord.limits.targetBoundary !== tenantDataBoundary.targetBoundary ||
    executionPlane.targetBoundary !== tenantDataBoundary.targetBoundary
  ) {
    return stopped('target_boundary_inconsistent');
  }

  if (budget.status === 'expired' || budget.expiresAtState === 'expired') {
    return requiresApproval('expired_budget_requires_human_review');
  }

  if (budget.status !== 'within_limit' || budget.expiresAtState !== 'not_expired') {
    return stopped('invalid_budget_state');
  }

  if (!hasCorrelatedObservationRecord(correlatedObservationRecord)) {
    return stopped('incomplete_correlated_observation_record');
  }

  if (
    correlatedObservationRecord.decisionId !== policyDecisionRecord.id ||
    correlatedObservationRecord.taskId !== executionPlane.taskId ||
    correlatedObservationRecord.correlationId !== policyDecisionRecord.correlationId
  ) {
    return requiresApproval('correlation_inconsistent_requires_human_review');
  }

  return {
    status: 'ready',
    code: 'enterprise_read_only_candidate_ready',
    next: 'continue_read_only_candidate',
    executionPerformed: false,
  };
}

/** @param {unknown} boundary */
function hasTenantDataBoundary(boundary) {
  return (
    isRecord(boundary) &&
    hasNonEmptyString(boundary.tenantDefinition) &&
    hasNonEmptyString(boundary.dataCategory) &&
    hasNonEmptyString(boundary.targetBoundary) &&
    hasNonEmptyString(boundary.sharedException)
  );
}

/** @param {unknown} record */
function hasPolicyDecisionRecord(record) {
  return (
    isRecord(record) &&
    hasNonEmptyString(record.id) &&
    hasNonEmptyString(record.decision) &&
    hasNonEmptyString(record.ruleVersion) &&
    hasNonEmptyString(record.correlationId) &&
    isRecord(record.limits) &&
    hasNonEmptyStringArray(record.limits.allowedCapabilities) &&
    hasNonEmptyString(record.limits.targetBoundary)
  );
}

/** @param {unknown} budget */
function hasBudgetBoundary(budget) {
  return (
    isRecord(budget) &&
    hasNonEmptyString(budget.limit) &&
    hasNonEmptyString(budget.status) &&
    hasNonEmptyString(budget.expiresAtState)
  );
}

/** @param {unknown} executionPlane */
function hasExecutionPlane(executionPlane) {
  return (
    isRecord(executionPlane) &&
    hasNonEmptyString(executionPlane.taskId) &&
    hasNonEmptyString(executionPlane.requestedCapability) &&
    hasNonEmptyString(executionPlane.targetBoundary) &&
    hasNonEmptyString(executionPlane.executionRequest) &&
    hasNonEmptyString(executionPlane.stopCondition) &&
    hasNonEmptyString(executionPlane.observationRequirement)
  );
}

/** @param {unknown} gate */
function hasEscalationGate(gate) {
  return (
    isRecord(gate) &&
    hasNonEmptyStringArray(gate.triggers) &&
    REQUIRED_ESCALATION_TRIGGERS.every((trigger) => gate.triggers.includes(trigger)) &&
    hasNonEmptyString(gate.owner) &&
    gate.route === 'human_review'
  );
}

/** @param {unknown} record */
function hasCorrelatedObservationRecord(record) {
  return (
    isRecord(record) &&
    hasNonEmptyString(record.decisionId) &&
    hasNonEmptyString(record.taskId) &&
    hasNonEmptyString(record.correlationId) &&
    record.state === 'planned' &&
    hasNonEmptyString(record.freshness)
  );
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/** @param {unknown} value */
function hasNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(hasNonEmptyString);
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {string} code */
function stopped(code) {
  return { status: 'stopped', code, next: 'stop', executionPerformed: false };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_human_approval',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessEnterpriseHarnessPlan({
    controlPlane: {
      subjectClaim: 'declared_training_requester',
      tenantDataBoundary: {
        tenantDefinition: 'single_training_tenant',
        dataCategory: 'approved_knowledge_summary',
        targetBoundary: 'approved_summary_scope',
        sharedException: 'none',
      },
      policyDecisionRecord: {
        id: 'policy-training-01',
        decision: 'allowed',
        ruleVersion: 'training-policy-v1',
        limits: {
          allowedCapabilities: ['read_approved_summary'],
          targetBoundary: 'approved_summary_scope',
        },
        correlationId: 'training-correlation-01',
      },
      budget: {
        limit: 'declared_limit',
        status: 'within_limit',
        expiresAtState: 'not_expired',
      },
    },
    executionPlane: {
      taskId: 'knowledge-summary-review',
      requestedCapability: 'read_approved_summary',
      targetBoundary: 'approved_summary_scope',
      executionRequest: 'not-requested',
      stopCondition: 'missing_or_unlinked_observation',
      observationRequirement: 'correlated_record_required',
    },
    correlatedObservationRecord: {
      decisionId: 'policy-training-01',
      taskId: 'knowledge-summary-review',
      correlationId: 'training-correlation-01',
      state: 'planned',
      freshness: 'declared_current',
    },
    escalationGate: {
      triggers: ['cross_tenant', 'budget_expired', 'correlation_inconsistent'],
      owner: 'training_reviewer',
      route: 'human_review',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
