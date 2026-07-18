function result(status, code, taskRef, next) {
  return { status, code, taskRef, next, executionPerformed: false };
}

function sharedProjectContractIsComplete(contract) {
  return Boolean(
    contract?.projectId &&
      contract.contractVersion &&
      contract.objective &&
      contract.scopeDefined === true &&
      contract.forbiddenActionsDefined === true &&
      contract.decisionOwner,
  );
}

function toolProfileIsPresent(profile) {
  return Boolean(
    profile?.tool &&
      profile.profileVersion &&
      profile.inputSnapshotId,
  );
}

function contextReadIsComplete(resumeRequest) {
  return Boolean(
    resumeRequest?.contextReadProtocol?.completed === true &&
      resumeRequest.contextReadProtocol.requiredArtifactsAvailable === true,
  );
}

function nextTaskIsComplete(nextTask) {
  return Boolean(
    nextTask?.objectiveDefined === true &&
      nextTask.inputDefined === true &&
      nextTask.outputDefined === true &&
      nextTask.acceptanceDefined === true &&
      nextTask.stopConditionsDefined === true,
  );
}

function inputHasDrifted({
  sharedProjectContract,
  inputSnapshot,
  taskContract,
  handoffPackage,
}) {
  return (
    !inputSnapshot?.snapshotId ||
    !inputSnapshot.inputVersion ||
    inputSnapshot.contractVersion !== sharedProjectContract.contractVersion ||
    taskContract?.inputSnapshotId !== inputSnapshot.snapshotId ||
    taskContract.inputVersion !== inputSnapshot.inputVersion ||
    handoffPackage?.inputSnapshotId !== inputSnapshot.snapshotId ||
    handoffPackage.inputVersion !== inputSnapshot.inputVersion ||
    handoffPackage.taskRef !== taskContract.taskRef
  );
}

/** Assess injected cross-tool handoff records without performing integration or execution. */
export function assessCrossToolHandoff(input = {}) {
  const {
    sharedProjectContract,
    sourceToolProfile,
    targetToolProfile,
    inputSnapshot,
    taskContract,
    handoffPackage,
    capabilityDifferences,
    stateConflicts,
    validationEvidence,
    resumeRequest,
  } = input;
  const taskRef = taskContract?.taskRef ?? handoffPackage?.taskRef;

  if (!sharedProjectContractIsComplete(sharedProjectContract)) {
    return result(
      'needs_context',
      'shared_project_contract_incomplete',
      taskRef,
      'complete_shared_project_contract',
    );
  }

  if (!contextReadIsComplete(resumeRequest)) {
    return result(
      'needs_context',
      'context_read_protocol_incomplete',
      taskRef,
      'complete_context_read_protocol',
    );
  }

  if (
    !toolProfileIsPresent(sourceToolProfile) ||
    !toolProfileIsPresent(targetToolProfile)
  ) {
    return result(
      'needs_context',
      'tool_adapter_profile_missing',
      taskRef,
      'provide_tool_adapter_profiles',
    );
  }

  if (sourceToolProfile.current !== true) {
    return result(
      'capability_review_required',
      'source_tool_profile_stale',
      taskRef,
      'refresh_source_tool_profile',
    );
  }

  if (targetToolProfile.current !== true) {
    return result(
      'capability_review_required',
      'target_tool_profile_stale',
      taskRef,
      'refresh_target_tool_profile',
    );
  }

  const unverifiedCapability = capabilityDifferences?.find(
    (record) =>
      record?.required === true &&
      record.targetToolStatus !== 'available_and_verified',
  );
  if (unverifiedCapability || !Array.isArray(capabilityDifferences)) {
    return result(
      'capability_review_required',
      'required_capability_not_verified',
      taskRef,
      'review_target_tool_capability',
    );
  }

  if (
    !taskContract?.taskRef ||
    taskContract.acceptanceChecksDefined !== true ||
    taskContract.stopConditionsDefined !== true
  ) {
    return result(
      'needs_context',
      'task_contract_incomplete',
      taskRef,
      'complete_task_contract',
    );
  }

  if (
    taskContract.exclusivePathsAvailable !== true ||
    taskContract.singleIntegrationOwner !== true
  ) {
    return result(
      'state_conflict',
      'exclusive_path_conflict',
      taskRef,
      'resolve_task_ownership',
    );
  }

  const conflicts = Array.isArray(stateConflicts) ? stateConflicts : [];
  if (
    conflicts.some(
      (conflict) =>
        conflict?.impact === 'blocking' &&
        conflict.resolution === 'human_decision_required',
    )
  ) {
    return result(
      'human_decision_required',
      'state_conflict_requires_human_decision',
      taskRef,
      'request_decision_owner_resolution',
    );
  }

  if (
    !Array.isArray(stateConflicts) ||
    conflicts.some(
      (conflict) =>
        conflict?.impact === 'blocking' &&
        conflict.resolution !== 'resolved_from_evidence',
    )
  ) {
    return result(
      'state_conflict',
      'blocking_state_conflict',
      taskRef,
      'resolve_state_conflict',
    );
  }

  if (!handoffPackage) {
    return result(
      'needs_context',
      'handoff_package_missing',
      taskRef,
      'provide_handoff_package',
    );
  }

  if (handoffPackage.status !== 'delivered') {
    return result(
      'integration_required',
      'handoff_package_not_delivered',
      taskRef,
      'deliver_handoff_package',
    );
  }

  if (handoffPackage.integrationStatus !== 'integrated_snapshot_ready') {
    return result(
      'integration_required',
      'integrated_snapshot_not_ready',
      taskRef,
      'complete_integration_gate',
    );
  }

  if (
    inputHasDrifted({
      sharedProjectContract,
      inputSnapshot,
      taskContract,
      handoffPackage,
    })
  ) {
    return result(
      'validation_required',
      'input_snapshot_drift',
      taskRef,
      'refresh_handoff_input',
    );
  }

  if (validationEvidence?.passed !== true) {
    return result(
      'validation_required',
      'repository_validation_failed',
      taskRef,
      'rerun_repository_validation',
    );
  }

  if (
    validationEvidence.current !== true ||
    validationEvidence.scope !== 'repository' ||
    validationEvidence.integratedSnapshotId !==
      handoffPackage.integratedSnapshotId
  ) {
    return result(
      'validation_required',
      'validation_evidence_stale',
      taskRef,
      'refresh_validation_evidence',
    );
  }

  if (!nextTaskIsComplete(resumeRequest?.nextTask)) {
    return result(
      'needs_context',
      'next_task_incomplete',
      taskRef,
      'complete_next_task_contract',
    );
  }

  if (resumeRequest.requestedAction === 'execute_external_action') {
    return result(
      'human_decision_required',
      'external_execution_requires_human_decision',
      taskRef,
      'request_human_integration',
    );
  }

  return result(
    'ready_to_resume',
    'cross_tool_handoff_ready',
    taskRef,
    'claim_next_task',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessCrossToolHandoff({
    sharedProjectContract: {
      projectId: 'harness-engineering-guide',
      contractVersion: 'project-contract-v2',
      objective: 'review chapter 45 evidence',
      scopeDefined: true,
      forbiddenActionsDefined: true,
      decisionOwner: 'human-integrator',
    },
    sourceToolProfile: {
      tool: 'Codex CLI',
      profileVersion: 'codex-profile-v3',
      inputSnapshotId: 'chapter-45-snapshot-v2',
      current: true,
    },
    targetToolProfile: {
      tool: 'Claude Code CLI',
      profileVersion: 'claude-profile-v4',
      inputSnapshotId: 'chapter-45-snapshot-v2',
      current: true,
    },
    inputSnapshot: {
      snapshotId: 'chapter-45-snapshot-v2',
      inputVersion: 'chapter-45-v2',
      contractVersion: 'project-contract-v2',
    },
    taskContract: {
      taskRef: 'chapter-45-technical-review',
      inputSnapshotId: 'chapter-45-snapshot-v2',
      inputVersion: 'chapter-45-v2',
      exclusivePathsAvailable: true,
      singleIntegrationOwner: true,
      acceptanceChecksDefined: true,
      stopConditionsDefined: true,
    },
    handoffPackage: {
      status: 'delivered',
      taskRef: 'chapter-45-technical-review',
      inputSnapshotId: 'chapter-45-snapshot-v2',
      inputVersion: 'chapter-45-v2',
      integrationStatus: 'integrated_snapshot_ready',
      integratedSnapshotId: 'chapter-45-integrated-v2',
    },
    capabilityDifferences: [
      {
        capability: 'repository_read',
        required: true,
        targetToolStatus: 'available_and_verified',
      },
    ],
    stateConflicts: [],
    validationEvidence: {
      passed: true,
      current: true,
      scope: 'repository',
      integratedSnapshotId: 'chapter-45-integrated-v2',
    },
    resumeRequest: {
      requestedAction: 'claim_next_task',
      contextReadProtocol: {
        completed: true,
        requiredArtifactsAvailable: true,
      },
      nextTask: {
        objectiveDefined: true,
        inputDefined: true,
        outputDefined: true,
        acceptanceDefined: true,
        stopConditionsDefined: true,
      },
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
