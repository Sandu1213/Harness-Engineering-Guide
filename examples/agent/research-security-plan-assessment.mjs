function result(status, code, taskRef, next) {
  return { status, code, taskRef, next, executionPerformed: false };
}

function threatModelIsComplete(threatModel) {
  return Boolean(
    Array.isArray(threatModel?.assets) &&
      threatModel.assets.length > 0 &&
      Array.isArray(threatModel.entryPoints) &&
      threatModel.entryPoints.length > 0 &&
      Array.isArray(threatModel.trustBoundaries) &&
      threatModel.trustBoundaries.length > 0 &&
      threatModel.allowedEffect &&
      threatModel.responsibleRole,
  );
}

function contentEnvelopeIsComplete(contentEnvelope, taskRef) {
  return Boolean(
    contentEnvelope?.sourceRef &&
      contentEnvelope.allowedUse &&
      contentEnvelope.instructionStatus === 'untrusted_data' &&
      contentEnvelope.taskRef === taskRef,
  );
}

function candidateMatchesTask(candidateAction, task) {
  return Boolean(
    candidateAction?.taskRef === task?.taskRef &&
      candidateAction.targetRef === task.targetRef &&
      candidateAction.action === task.allowedAction &&
      candidateAction.dataScope === task.dataScope &&
      candidateAction.source === 'task_bound_extraction',
  );
}

function capabilityIsMinimal(capabilityGrant, task, candidateAction) {
  return Boolean(
    capabilityGrant?.subjectRef &&
      capabilityGrant.taskRef === task?.taskRef &&
      capabilityGrant.targetRef === task.targetRef &&
      capabilityGrant.dataScope === task.dataScope &&
      capabilityGrant.environment &&
      capabilityGrant.validityStatus === 'current' &&
      capabilityGrant.approvalRef &&
      capabilityGrant.revocationRef &&
      Array.isArray(capabilityGrant.actions) &&
      capabilityGrant.actions.length === 1 &&
      !capabilityGrant.actions.includes('*') &&
      capabilityGrant.actions.includes(candidateAction?.action),
  );
}

function secretReferencesAreSafe(secretReferences) {
  return (
    Array.isArray(secretReferences) &&
    secretReferences.every(
      ({ valuePresent, purpose, targetScope, lifecycleStatus }) =>
        valuePresent !== true &&
        purpose &&
        targetScope &&
        lifecycleStatus === 'current',
    )
  );
}

function toolGateIsComplete(toolSecurityGate) {
  return Boolean(
    toolSecurityGate?.sourceTrust === 'reviewed' &&
      toolSecurityGate.capabilityGrantRef &&
      toolSecurityGate.scopeStatus === 'minimal' &&
      toolSecurityGate.observationPlanPresent === true &&
      toolSecurityGate.localProcessBoundary,
  );
}

function auditEventIsComplete(auditEvent, taskRef) {
  return Boolean(
    auditEvent?.taskRef === taskRef &&
      auditEvent.eventType &&
      auditEvent.correlationId &&
      auditEvent.result &&
      auditEvent.redactionState,
  );
}

function supplyChainRecordIsReviewed(supplyChainRecord) {
  return Boolean(
    supplyChainRecord?.artifactRef &&
      supplyChainRecord.source &&
      supplyChainRecord.source !== 'unknown' &&
      supplyChainRecord.owner &&
      supplyChainRecord.versionRef &&
      supplyChainRecord.reviewState === 'reviewed' &&
      Array.isArray(supplyChainRecord.requestedCapabilities),
  );
}

/** Assess one injected research-security plan without external I/O. */
export function assessResearchSecurityPlan({
  threatModel,
  task,
  contentEnvelope,
  capabilityGrant,
  secretReferences,
  candidateAction,
  policyDecision,
  toolSecurityGate,
  auditEvent,
  supplyChainRecord,
  incidentRoute,
}) {
  const taskRef = task?.taskRef;

  if (!threatModelIsComplete(threatModel)) {
    return result(
      'needs_evidence',
      'threat_model_incomplete',
      taskRef,
      'complete_threat_model',
    );
  }

  if (!contentEnvelopeIsComplete(contentEnvelope, taskRef)) {
    return result(
      'needs_evidence',
      'content_envelope_incomplete',
      taskRef,
      'complete_content_envelope',
    );
  }

  if (contentEnvelope.attemptsControlChange === true) {
    return result(
      'blocked',
      'untrusted_content_requested_control',
      taskRef,
      'stop_untrusted_instruction',
    );
  }

  if (!candidateMatchesTask(candidateAction, task)) {
    return result(
      'blocked',
      'candidate_target_out_of_scope',
      taskRef,
      'stop_candidate_action',
    );
  }

  if (!capabilityIsMinimal(capabilityGrant, task, candidateAction)) {
    return result(
      'blocked',
      'capability_not_minimal',
      taskRef,
      'restrict_capability_grant',
    );
  }

  if (!policyDecision?.policyVersion) {
    return result(
      'needs_evidence',
      'policy_version_missing',
      taskRef,
      'identify_policy_version',
    );
  }

  if (
    policyDecision.taskRef !== taskRef ||
    policyDecision.decision !== 'allowed_with_limits' ||
    !policyDecision.eventRef
  ) {
    return result(
      'blocked',
      'policy_did_not_allow_action',
      taskRef,
      'stop_candidate_action',
    );
  }

  if (!secretReferencesAreSafe(secretReferences)) {
    return result(
      'blocked',
      'secret_reference_not_safe',
      taskRef,
      'remove_secret_value_or_refresh_lifecycle',
    );
  }

  if (!toolGateIsComplete(toolSecurityGate)) {
    return result(
      'needs_evidence',
      'tool_security_gate_incomplete',
      taskRef,
      'complete_tool_security_gate',
    );
  }

  if (
    toolSecurityGate.protocol === 'mcp' &&
    toolSecurityGate.credentialAudience !== toolSecurityGate.targetAudience
  ) {
    return result(
      'blocked',
      'credential_audience_mismatch',
      taskRef,
      'stop_tool_request',
    );
  }

  if (auditEvent?.containsSensitiveValue === true) {
    return result(
      'blocked',
      'sensitive_data_in_audit_event',
      taskRef,
      'redact_and_rebuild_audit_event',
    );
  }

  if (!auditEventIsComplete(auditEvent, taskRef)) {
    return result(
      'needs_evidence',
      'audit_event_incomplete',
      taskRef,
      'complete_audit_event',
    );
  }

  if (auditEvent.previousEventRef !== policyDecision.eventRef) {
    return result(
      'needs_evidence',
      'audit_chain_incomplete',
      taskRef,
      'repair_audit_chain',
    );
  }

  if (!supplyChainRecordIsReviewed(supplyChainRecord)) {
    return result(
      'blocked',
      'supply_chain_unreviewed',
      taskRef,
      'review_artifact_source',
    );
  }

  if (
    (contentEnvelope.secretExposureSuspected === true || incidentRoute?.required === true) &&
    !incidentRoute?.responsibleRole
  ) {
    return result(
      'escalate_security_review',
      'incident_owner_missing',
      taskRef,
      'assign_security_owner',
    );
  }

  if (contentEnvelope.secretExposureSuspected === true || incidentRoute?.required === true) {
    return result(
      'escalate_security_review',
      'security_incident_handoff_required',
      taskRef,
      'handoff_to_security_owner',
    );
  }

  return result(
    'ready_for_read_only_review',
    'read_only_security_plan_ready',
    taskRef,
    'review_extracted_facts',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessResearchSecurityPlan({
    threatModel: {
      assets: ['task_rules', 'external_content', 'secret_references', 'tool_capabilities'],
      entryPoints: ['external_content'],
      trustBoundaries: ['content_to_candidate', 'candidate_to_tool'],
      allowedEffect: 'read_only_summary_candidate',
      responsibleRole: 'security-review-owner',
    },
    task: {
      taskRef: 'research-task-41',
      targetRef: 'teaching-product-doc',
      allowedAction: 'summarize',
      dataScope: 'public_product_text',
    },
    contentEnvelope: {
      sourceRef: 'teaching-product-doc',
      allowedUse: 'summarize',
      instructionStatus: 'untrusted_data',
      taskRef: 'research-task-41',
      attemptsControlChange: false,
      secretExposureSuspected: false,
    },
    capabilityGrant: {
      subjectRef: 'injected-research-agent',
      taskRef: 'research-task-41',
      targetRef: 'teaching-product-doc',
      actions: ['summarize'],
      dataScope: 'public_product_text',
      environment: 'teaching',
      validityStatus: 'current',
      approvalRef: 'teaching-read-only-policy',
      revocationRef: 'teaching-disable-path',
    },
    secretReferences: [],
    candidateAction: {
      taskRef: 'research-task-41',
      targetRef: 'teaching-product-doc',
      action: 'summarize',
      dataScope: 'public_product_text',
      source: 'task_bound_extraction',
      toolRequested: true,
    },
    policyDecision: {
      taskRef: 'research-task-41',
      policyVersion: 'teaching-policy-v1',
      decision: 'allowed_with_limits',
      eventRef: 'policy-event-41',
      approvalStatus: 'not_required_for_read_only_plan',
    },
    toolSecurityGate: {
      protocol: 'mcp',
      sourceTrust: 'reviewed',
      capabilityGrantRef: 'grant-41',
      credentialAudience: 'teaching-doc-server',
      targetAudience: 'teaching-doc-server',
      scopeStatus: 'minimal',
      observationPlanPresent: true,
      localProcessBoundary: 'not_requested',
    },
    auditEvent: {
      taskRef: 'research-task-41',
      eventType: 'policy_decision',
      previousEventRef: 'policy-event-41',
      correlationId: 'interaction-41',
      result: 'allowed_with_limits',
      redactionState: 'redacted',
      containsSensitiveValue: false,
    },
    supplyChainRecord: {
      artifactRef: 'built-in-read-only-tool',
      source: 'reviewed_repository',
      owner: 'book-maintainer',
      versionRef: 'teaching-v1',
      reviewState: 'reviewed',
      requestedCapabilities: ['read_public_text'],
    },
    incidentRoute: { required: false },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
