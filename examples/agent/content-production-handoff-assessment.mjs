const requiredRoleIds = [
  'research',
  'outline',
  'writing',
  'review',
  'fact_check',
  'human_author_editor',
];

const roleContractFields = [
  'objective',
  'inputVersion',
  'allowedInputs',
  'ownedOutputs',
  'forbiddenActions',
  'acceptanceChecks',
  'stopConditions',
  'handoffTarget',
];

function result(input, status, code, next, responsibleRole) {
  return {
    status,
    code,
    packageId: input?.evidencePackage?.packageId,
    next,
    responsibleRole,
    integrationOwner: input?.queueItem?.integrationOwner,
    executionPerformed: false,
  };
}

function nonEmptyValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return typeof value === 'string' ? value.length > 0 : value != null;
}

function roleContractsAreComplete(roleContracts) {
  return requiredRoleIds.every((requiredRoleId) => {
    const contract = roleContracts?.find(({ roleId }) => roleId === requiredRoleId);
    return Boolean(
      contract &&
        roleContractFields.every((field) => nonEmptyValue(contract[field])),
    );
  });
}

function queueItemIsComplete(queueItem) {
  return Boolean(
    queueItem?.queueItemId &&
      queueItem.roleId &&
      queueItem.taskContractVersion &&
      queueItem.inputPackageId &&
      queueItem.inputArtifactVersion &&
      Array.isArray(queueItem.ownedOutputPaths) &&
      queueItem.ownedOutputPaths.length > 0 &&
      Array.isArray(queueItem.dependsOn) &&
      queueItem.invalidationCondition &&
      typeof queueItem.invalidationCondition.triggered === 'boolean' &&
      typeof queueItem.invalidationCondition.impactKnown === 'boolean' &&
      Number.isInteger(queueItem.attempt) &&
      queueItem.attempt > 0 &&
      queueItem.status &&
      queueItem.integrationOwner,
  );
}

function evidencePackageIsComplete(queueItem, evidencePackage) {
  return Boolean(
    evidencePackage?.packageId &&
      evidencePackage.packageId === queueItem.inputPackageId &&
      evidencePackage.taskContractVersion === queueItem.taskContractVersion &&
      Array.isArray(evidencePackage.inputArtifacts) &&
      evidencePackage.inputArtifacts.length > 0 &&
      Array.isArray(evidencePackage.outputArtifacts) &&
      evidencePackage.outputArtifacts.length > 0 &&
      Array.isArray(evidencePackage.claimLedger) &&
      evidencePackage.claimLedger.length > 0 &&
      Array.isArray(evidencePackage.reviewFindings) &&
      Array.isArray(evidencePackage.factVerdicts) &&
      Array.isArray(evidencePackage.conflictsAndUnknowns) &&
      Array.isArray(evidencePackage.executionEvidence?.records) &&
      Array.isArray(evidencePackage.executionEvidence?.notRun) &&
      evidencePackage.humanDecision,
  );
}

function claimEvidenceIsComplete(claimLedger) {
  return claimLedger.every(
    ({ claimId, sourceKey, sourceRange }) =>
      claimId && sourceKey && sourceRange,
  );
}

function inputIsStale(queueItem, artifactVersions) {
  const versionsDiffer =
    artifactVersions?.queueInput !== artifactVersions?.current;
  const { triggered, impactKnown } = queueItem.invalidationCondition;

  if (triggered) {
    return 'input_invalidation_triggered';
  }

  if (versionsDiffer && !impactKnown) {
    return 'input_impact_unknown';
  }

  return undefined;
}

function reviewGateIsBlocked(reviewFindings) {
  return reviewFindings.some(
    ({ severity, status }) =>
      ['must_fix', 'should_fix'].includes(severity) && status !== 'closed',
  );
}

function factCheckGateIsBlocked(factVerdicts) {
  return factVerdicts.some(({ verdict }) =>
    ['reject', 'unknown'].includes(verdict),
  );
}

function sourceConflict(conflictsAndUnknowns) {
  return conflictsAndUnknowns.find(
    ({ type, status }) => type === 'source_conflict' && status !== 'closed',
  );
}

function cycleIsExhausted(cycleState) {
  return Boolean(
    Number.isInteger(cycleState?.currentCycle) &&
      Number.isInteger(cycleState?.maxCycles) &&
      cycleState.currentCycle >= cycleState.maxCycles,
  );
}

function reworkEnvelopeCoversConflict(reworkEnvelope, conflict) {
  return Boolean(
    reworkEnvelope?.conflictId === conflict.conflictId &&
      reworkEnvelope.failedGate &&
      Array.isArray(reworkEnvelope.affectedClaims) &&
      reworkEnvelope.affectedClaims.length > 0 &&
      Array.isArray(reworkEnvelope.allowedOutputPaths) &&
      reworkEnvelope.allowedOutputPaths.length > 0 &&
      reworkEnvelope.fixedInputVersion &&
      Array.isArray(reworkEnvelope.expectedClosureEvidence) &&
      reworkEnvelope.expectedClosureEvidence.length > 0 &&
      Number.isInteger(reworkEnvelope.remainingCycleBudget) &&
      reworkEnvelope.remainingCycleBudget > 0 &&
      reworkEnvelope.escalationTarget &&
      reworkEnvelope.targetRoles?.[0] === 'research' &&
      reworkEnvelope.targetRoles?.[1] === 'fact_check',
  );
}

function humanDecisionIsCurrent(humanDecision, evidencePackage, artifactVersions) {
  return Boolean(
    humanDecision.decidedBy &&
      humanDecision.applicablePackageId === evidencePackage.packageId &&
      humanDecision.draftVersion === artifactVersions.current &&
      humanDecision.reason &&
      humanDecision.refreshCondition,
  );
}

/** Assess injected content evidence without reading or changing external state. */
export function assessContentProductionHandoff(input = {}) {
  if (input.taskApplicable === false) {
    return result(input, 'not_applicable', 'task_not_applicable', 'stop');
  }

  if (!roleContractsAreComplete(input.roleContracts)) {
    return result(
      input,
      'needs_role_contract',
      'role_contract_incomplete',
      'complete_role_contracts',
      'coordinator',
    );
  }

  if (!queueItemIsComplete(input.queueItem)) {
    return result(
      input,
      'needs_evidence',
      'queue_item_incomplete',
      'complete_queue_item',
      'coordinator',
    );
  }

  if (!evidencePackageIsComplete(input.queueItem, input.evidencePackage)) {
    return result(
      input,
      'needs_evidence',
      'content_evidence_package_incomplete',
      'complete_content_evidence_package',
      input.queueItem.roleId,
    );
  }

  if (!claimEvidenceIsComplete(input.evidencePackage.claimLedger)) {
    return result(
      input,
      'needs_evidence',
      'claim_evidence_missing',
      'complete_claim_evidence',
      'research',
    );
  }

  const staleCode = inputIsStale(input.queueItem, input.artifactVersions);
  if (staleCode) {
    return result(
      input,
      'stale_input',
      staleCode,
      'assess_affected_chain',
      'integration_owner',
    );
  }

  if (reviewGateIsBlocked(input.evidencePackage.reviewFindings)) {
    return result(
      input,
      'needs_revision',
      'review_gate_blocked',
      'revise_draft',
      'writing',
    );
  }

  const conflict = sourceConflict(input.evidencePackage.conflictsAndUnknowns);
  if (conflict) {
    if (cycleIsExhausted(input.cycleState)) {
      return result(
        input,
        'needs_human_decision',
        'cycle_exhausted',
        'request_human_decision',
        'human_author_editor',
      );
    }

    if (!reworkEnvelopeCoversConflict(input.reworkEnvelope, conflict)) {
      return result(
        input,
        'needs_evidence',
        'rework_envelope_missing',
        'create_rework_envelope',
        'coordinator',
      );
    }

    return result(
      input,
      'needs_fact_resolution',
      'source_conflict_requires_research',
      'research_then_fact_check',
      'research',
    );
  }

  if (factCheckGateIsBlocked(input.evidencePackage.factVerdicts)) {
    return result(
      input,
      'needs_fact_resolution',
      'fact_check_gate_blocked',
      'resolve_fact_evidence',
      'fact_check',
    );
  }

  if (input.evidencePackage.conflictsAndUnknowns.some(({ status }) => status !== 'closed')) {
    return result(
      input,
      'needs_human_decision',
      'unresolved_conflict',
      'request_human_decision',
      'human_author_editor',
    );
  }

  const humanDecision = input.evidencePackage.humanDecision;
  if (humanDecision.status === 'returned_for_rework') {
    return result(
      input,
      'needs_revision',
      'human_returned_for_rework',
      'revise_draft',
      'writing',
    );
  }

  if (['deferred', 'rejected'].includes(humanDecision.status)) {
    return result(
      input,
      'needs_human_decision',
      `human_decision_${humanDecision.status}`,
      'record_human_next_action',
      'human_author_editor',
    );
  }

  if (humanDecision.status === 'accepted_for_integration') {
    if (!humanDecisionIsCurrent(humanDecision, input.evidencePackage, input.artifactVersions)) {
      return result(
        input,
        'needs_human_decision',
        'human_decision_not_current',
        'refresh_human_decision',
        'human_author_editor',
      );
    }

    return result(
      input,
      'ready_for_chapter_integration',
      'human_decision_accepts_current_package',
      'submit_to_integration_gate',
      input.queueItem.integrationOwner,
    );
  }

  return result(
    input,
    'ready_for_human_review',
    'content_evidence_ready',
    'request_human_review',
    'human_author_editor',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const roles = requiredRoleIds.map((roleId) => ({
    roleId,
    objective: `complete ${roleId} responsibility`,
    inputVersion: 'chapter-44-contract-v1',
    allowedInputs: [`${roleId}-input`],
    ownedOutputs: [`${roleId}-output`],
    forbiddenActions: ['perform external action'],
    acceptanceChecks: ['public output is classifiable'],
    stopConditions: ['input becomes stale'],
    handoffTarget: roleId === 'human_author_editor' ? 'integration_gate' : 'next_role',
  }));
  const teachingInput = {
    taskApplicable: true,
    roleContracts: roles,
    queueItem: {
      queueItemId: 'queue-44-demo',
      roleId: 'review',
      taskContractVersion: 'task-contract-v1',
      inputPackageId: 'package-44-demo',
      inputArtifactVersion: 'draft-v2',
      ownedOutputPaths: ['review-findings-v1'],
      dependsOn: ['draft-v2'],
      invalidationCondition: {
        triggered: false,
        impactKnown: true,
        reason: 'semantics_unchanged',
      },
      attempt: 1,
      status: 'delivered',
      integrationOwner: 'chapter-44-integrator',
    },
    artifactVersions: { queueInput: 'draft-v2', current: 'draft-v2' },
    evidencePackage: {
      packageId: 'package-44-demo',
      taskContractVersion: 'task-contract-v1',
      inputArtifacts: [{ artifactId: 'draft', version: 'draft-v2' }],
      outputArtifacts: [{ artifactId: 'review', version: 'review-v1' }],
      claimLedger: [
        { claimId: 'claim-44-demo', sourceKey: 'REF-029', sourceRange: 'workflow' },
      ],
      executionEvidence: {
        records: [{ check: 'injected teaching evidence' }],
        notRun: ['agent', 'model', 'queue', 'integration', 'publication'],
      },
      reviewFindings: [],
      factVerdicts: [{ claimId: 'claim-44-demo', verdict: 'supported' }],
      conflictsAndUnknowns: [],
      humanDecision: { status: 'not_yet_recorded' },
    },
    cycleState: { currentCycle: 0, maxCycles: 2 },
  };

  const cases = [
    { caseId: 'CASE-44-A', input: teachingInput },
    {
      caseId: 'CASE-44-B',
      input: {
        ...structuredClone(teachingInput),
        evidencePackage: {
          ...structuredClone(teachingInput.evidencePackage),
          factVerdicts: [{ claimId: 'claim-44-demo', verdict: 'reject' }],
        },
      },
    },
    {
      caseId: 'CASE-44-C',
      input: {
        ...structuredClone(teachingInput),
        artifactVersions: { queueInput: 'draft-v2', current: 'draft-v3' },
        queueItem: {
          ...structuredClone(teachingInput.queueItem),
          invalidationCondition: {
            triggered: true,
            impactKnown: true,
            reason: 'semantic_claim_changed',
          },
        },
      },
    },
  ];

  console.log(
    JSON.stringify(
      cases.map(({ caseId, input: caseInput }) => ({
        caseId,
        result: assessContentProductionHandoff(caseInput),
      })),
      null,
      2,
    ),
  );
}
