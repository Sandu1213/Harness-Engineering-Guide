const requiredEvaluationScenarios = [
  'normal',
  'refusal',
  'boundary',
  'failure',
];

function result(status, code, taskId, next) {
  return { status, code, taskId, next, executionPerformed: false };
}

function taskContractIsComplete(taskContract) {
  return Boolean(
    taskContract?.taskId &&
      taskContract.version &&
      taskContract.objectiveDefined === true &&
      taskContract.scopeDefined === true &&
      taskContract.stopConditionsDefined === true,
  );
}

function contextBoundaryGap(contextBoundary) {
  if (contextBoundary?.current !== true) {
    return ['context_evidence_stale', 'refresh_context_evidence'];
  }

  if (
    contextBoundary.sourcesIdentified !== true ||
    contextBoundary.visibilityDefined !== true
  ) {
    return ['context_boundary_incomplete', 'complete_context_boundary'];
  }

  return undefined;
}

function evaluationGap(evaluationEvidence) {
  if (
    evaluationEvidence?.versionsRecorded !== true ||
    evaluationEvidence.comparable !== true
  ) {
    return [
      'evaluation_versions_not_comparable',
      'establish_comparable_evaluation',
    ];
  }

  if (evaluationEvidence.hardGatesPassed !== true) {
    return ['evaluation_hard_gate_failed', 'resolve_hard_gate_failure'];
  }

  const scenarios = new Set(evaluationEvidence.scenariosCovered);
  if (!requiredEvaluationScenarios.every((scenario) => scenarios.has(scenario))) {
    return ['evaluation_scenarios_incomplete', 'complete_evaluation_scenarios'];
  }

  return undefined;
}

/** Assess injected Agent Engineering evidence without external execution. */
export function assessAgentEngineeringReadiness({
  taskContract,
  contextBoundary,
  capabilityBoundary,
  stateModel,
  observationEvidence,
  evaluationEvidence,
  handoffEvidence,
  riskOwnership,
  autonomyRequest,
}) {
  const taskId = taskContract?.taskId;

  if (!taskContractIsComplete(taskContract)) {
    return result(
      'needs_contract',
      'task_contract_incomplete',
      taskId,
      'complete_task_contract',
    );
  }

  const contextGap = contextBoundaryGap(contextBoundary);
  if (contextGap) {
    return result(
      'needs_context_evidence',
      contextGap[0],
      taskId,
      contextGap[1],
    );
  }

  if (
    capabilityBoundary?.targetDefined !== true ||
    capabilityBoundary.effectsBounded !== true ||
    capabilityBoundary.authorizationRecorded !== true
  ) {
    return result(
      'needs_capability_boundary',
      'capability_boundary_incomplete',
      taskId,
      'complete_capability_boundary',
    );
  }

  if (stateModel?.effectsKnown !== true) {
    return result(
      'state_not_ready',
      'workflow_effect_unknown',
      taskId,
      'observe_effect_before_retry',
    );
  }

  if (
    stateModel.transitionsDefined !== true ||
    stateModel.recoveryDefined !== true
  ) {
    return result(
      'state_not_ready',
      'workflow_state_incomplete',
      taskId,
      'complete_state_and_recovery_model',
    );
  }

  if (
    observationEvidence?.toolResultRecorded !== true ||
    observationEvidence.independentObservationRecorded !== true ||
    observationEvidence.acceptanceChecked !== true
  ) {
    return result(
      'needs_effect_evidence',
      'independent_effect_evidence_missing',
      taskId,
      'collect_observation_and_acceptance',
    );
  }

  const evaluationEvidenceGap = evaluationGap(evaluationEvidence);
  if (evaluationEvidenceGap) {
    return result(
      'evaluation_not_comparable',
      evaluationEvidenceGap[0],
      taskId,
      evaluationEvidenceGap[1],
    );
  }

  if (
    handoffEvidence?.inputVersionMatches !== true ||
    handoffEvidence.stateVersionMatches !== true ||
    handoffEvidence.unknownsRecorded !== true ||
    handoffEvidence.nextOwnerDefined !== true
  ) {
    return result(
      'handoff_not_ready',
      'handoff_evidence_incomplete_or_drifted',
      taskId,
      'refresh_handoff_evidence',
    );
  }

  if (
    riskOwnership?.riskOwnerNamed !== true ||
    riskOwnership.approverNamed !== true ||
    riskOwnership.stopAuthorityNamed !== true ||
    riskOwnership.incidentOwnerNamed !== true
  ) {
    return result(
      'human_accountability_required',
      'human_responsibility_incomplete',
      taskId,
      'name_accountable_roles',
    );
  }

  if (
    autonomyRequest?.requested !== true ||
    autonomyRequest.benefitMeasured !== true ||
    autonomyRequest.rollbackDefined !== true ||
    autonomyRequest.budgetDefined !== true
  ) {
    return result(
      'autonomy_not_justified',
      'autonomy_benefit_unproven',
      taskId,
      'keep_manual_workflow',
    );
  }

  return result(
    'ready_for_bounded_pilot_review',
    'bounded_pilot_evidence_ready',
    taskId,
    'request_named_human_decision',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessAgentEngineeringReadiness({
    taskContract: {
      taskId: 'bounded-pilot-teaching-input',
      version: 'task-v1',
      objectiveDefined: true,
      scopeDefined: true,
      stopConditionsDefined: true,
    },
    contextBoundary: {
      sourcesIdentified: true,
      current: true,
      visibilityDefined: true,
    },
    capabilityBoundary: {
      targetDefined: true,
      effectsBounded: true,
      authorizationRecorded: true,
    },
    stateModel: {
      transitionsDefined: true,
      recoveryDefined: true,
      effectsKnown: true,
    },
    observationEvidence: {
      toolResultRecorded: true,
      independentObservationRecorded: true,
      acceptanceChecked: true,
    },
    evaluationEvidence: {
      versionsRecorded: true,
      comparable: true,
      hardGatesPassed: true,
      scenariosCovered: requiredEvaluationScenarios,
    },
    handoffEvidence: {
      inputVersionMatches: true,
      stateVersionMatches: true,
      unknownsRecorded: true,
      nextOwnerDefined: true,
    },
    riskOwnership: {
      riskOwnerNamed: true,
      approverNamed: true,
      stopAuthorityNamed: true,
      incidentOwnerNamed: true,
    },
    autonomyRequest: {
      requested: true,
      benefitMeasured: true,
      rollbackDefined: true,
      budgetDefined: true,
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
