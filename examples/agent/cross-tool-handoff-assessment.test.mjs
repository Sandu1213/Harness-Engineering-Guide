import assert from 'node:assert/strict';
import test from 'node:test';

import { assessCrossToolHandoff } from './cross-tool-handoff-assessment.mjs';

const baseInput = {
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
};

function createInput(mutate = () => {}) {
  const input = structuredClone(baseInput);
  mutate(input);
  return input;
}

function expected(status, code, next) {
  return {
    status,
    code,
    taskRef: 'chapter-45-technical-review',
    next,
    executionPerformed: false,
  };
}

test('requires a complete Shared Project Contract', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.sharedProjectContract.contractVersion = '';
      }),
    ),
    expected(
      'needs_context',
      'shared_project_contract_incomplete',
      'complete_shared_project_contract',
    ),
  );
});

test('requires the Context Read Protocol to complete', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.resumeRequest.contextReadProtocol.completed = false;
      }),
    ),
    expected(
      'needs_context',
      'context_read_protocol_incomplete',
      'complete_context_read_protocol',
    ),
  );
});

test('requires both Tool Adapter Profiles', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.targetToolProfile = undefined;
      }),
    ),
    expected(
      'needs_context',
      'tool_adapter_profile_missing',
      'provide_tool_adapter_profiles',
    ),
  );
});

test('routes a stale target Tool Adapter Profile to capability review', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.targetToolProfile.current = false;
      }),
    ),
    expected(
      'capability_review_required',
      'target_tool_profile_stale',
      'refresh_target_tool_profile',
    ),
  );
});

test('does not copy an unknown required capability from the source tool', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.capabilityDifferences[0].targetToolStatus = 'unknown';
      }),
    ),
    expected(
      'capability_review_required',
      'required_capability_not_verified',
      'review_target_tool_capability',
    ),
  );
});

test('reports overlapping exclusive paths as a State Conflict', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.taskContract.exclusivePathsAvailable = false;
      }),
    ),
    expected(
      'state_conflict',
      'exclusive_path_conflict',
      'resolve_task_ownership',
    ),
  );
});

test('reports a blocking unresolved State Conflict', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.stateConflicts.push({
          conflictKey: 'chapter-45-stage',
          impact: 'blocking',
          resolution: 'blocked',
        });
      }),
    ),
    expected(
      'state_conflict',
      'blocking_state_conflict',
      'resolve_state_conflict',
    ),
  );
});

test('routes a value trade-off to the named human decision owner', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.stateConflicts.push({
          conflictKey: 'scope-trade-off',
          impact: 'blocking',
          resolution: 'human_decision_required',
        });
      }),
    ),
    expected(
      'human_decision_required',
      'state_conflict_requires_human_decision',
      'request_decision_owner_resolution',
    ),
  );
});

test('does not integrate a draft Handoff Package', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.handoffPackage.status = 'draft';
      }),
    ),
    expected(
      'integration_required',
      'handoff_package_not_delivered',
      'deliver_handoff_package',
    ),
  );
});

test('requires the Integration Gate before the Resume Gate can pass', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.handoffPackage.integrationStatus = 'repository_validation_required';
      }),
    ),
    expected(
      'integration_required',
      'integrated_snapshot_not_ready',
      'complete_integration_gate',
    ),
  );
});

test('requires validation when the task input version has drifted', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.inputSnapshot.inputVersion = 'chapter-45-v3';
      }),
    ),
    expected(
      'validation_required',
      'input_snapshot_drift',
      'refresh_handoff_input',
    ),
  );
});

test('requires current passing Validation Evidence for the integrated snapshot', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.validationEvidence.current = false;
      }),
    ),
    expected(
      'validation_required',
      'validation_evidence_stale',
      'refresh_validation_evidence',
    ),
  );
});

test('requires a fully specified next task', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.resumeRequest.nextTask.acceptanceDefined = false;
      }),
    ),
    expected(
      'needs_context',
      'next_task_incomplete',
      'complete_next_task_contract',
    ),
  );
});

test('allows a complete integrated handoff to enter the Resume Gate', () => {
  assert.deepEqual(
    assessCrossToolHandoff(createInput()),
    expected(
      'ready_to_resume',
      'cross_tool_handoff_ready',
      'claim_next_task',
    ),
  );
});

test('routes an external execution request to human integration without executing it', () => {
  assert.deepEqual(
    assessCrossToolHandoff(
      createInput((input) => {
        input.resumeRequest.requestedAction = 'execute_external_action';
      }),
    ),
    expected(
      'human_decision_required',
      'external_execution_requires_human_decision',
      'request_human_integration',
    ),
  );
});
