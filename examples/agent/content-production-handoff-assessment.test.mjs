import assert from 'node:assert/strict';
import test from 'node:test';

import { assessContentProductionHandoff } from './content-production-handoff-assessment.mjs';

const requiredRoles = [
  'research',
  'outline',
  'writing',
  'review',
  'fact_check',
  'human_author_editor',
];

function createRoleContract(roleId) {
  return {
    roleId,
    objective: `complete ${roleId} responsibility`,
    inputVersion: 'chapter-44-contract-v1',
    allowedInputs: [`${roleId}-input`],
    ownedOutputs: [`${roleId}-output`],
    forbiddenActions: ['perform external action'],
    acceptanceChecks: ['public output is classifiable'],
    stopConditions: ['input becomes stale'],
    handoffTarget: roleId === 'human_author_editor' ? 'integration_gate' : 'next_role',
  };
}

const baseInput = {
  taskApplicable: true,
  roleContracts: requiredRoles.map(createRoleContract),
  queueItem: {
    queueItemId: 'queue-44-review-1',
    roleId: 'review',
    taskContractVersion: 'task-contract-v1',
    inputPackageId: 'package-44-v1',
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
  artifactVersions: {
    queueInput: 'draft-v2',
    current: 'draft-v2',
  },
  evidencePackage: {
    packageId: 'package-44-v1',
    taskContractVersion: 'task-contract-v1',
    inputArtifacts: [{ artifactId: 'draft', version: 'draft-v2' }],
    outputArtifacts: [{ artifactId: 'review-findings', version: 'review-v1' }],
    claimLedger: [
      {
        claimId: 'claim-44-1',
        sourceKey: 'REF-029',
        sourceRange: 'workflow and agent distinction',
      },
    ],
    executionEvidence: {
      records: [{ check: 'injected teaching evidence' }],
      notRun: ['agent', 'model', 'queue', 'integration', 'publication'],
    },
    reviewFindings: [],
    factVerdicts: [{ claimId: 'claim-44-1', verdict: 'supported' }],
    conflictsAndUnknowns: [],
    humanDecision: { status: 'not_yet_recorded' },
  },
  cycleState: { currentCycle: 0, maxCycles: 2 },
};

function createInput(mutator) {
  const input = structuredClone(baseInput);
  mutator?.(input);
  return input;
}

function assertRoute(result, status, code, next) {
  assert.equal(result.status, status);
  assert.equal(result.code, code);
  assert.equal(result.next, next);
  assert.equal(result.executionPerformed, false);
}

test('returns not_applicable without performing the task', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.taskApplicable = false;
    }),
  );

  assertRoute(result, 'not_applicable', 'task_not_applicable', 'stop');
});

test('requires all six complete Role Contracts', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.roleContracts.find(({ roleId }) => roleId === 'fact_check').stopConditions = [];
    }),
  );

  assertRoute(
    result,
    'needs_role_contract',
    'role_contract_incomplete',
    'complete_role_contracts',
  );
});

test('requires an integrationOwner on the Versioned Queue Item', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      delete input.queueItem.integrationOwner;
    }),
  );

  assertRoute(
    result,
    'needs_evidence',
    'queue_item_incomplete',
    'complete_queue_item',
  );
});

test('requires claim-level source evidence', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.claimLedger[0].sourceKey = '';
    }),
  );

  assertRoute(
    result,
    'needs_evidence',
    'claim_evidence_missing',
    'complete_claim_evidence',
  );
});

test('does not invalidate a known non-semantic version change by version number alone', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.artifactVersions.current = 'draft-v2-format-only';
    }),
  );

  assertRoute(
    result,
    'ready_for_human_review',
    'content_evidence_ready',
    'request_human_review',
  );
});

test('marks input stale when invalidationCondition is triggered', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.artifactVersions.current = 'draft-v3';
      input.queueItem.invalidationCondition = {
        triggered: true,
        impactKnown: true,
        reason: 'semantic_claim_changed',
      };
    }),
  );

  assertRoute(
    result,
    'stale_input',
    'input_invalidation_triggered',
    'assess_affected_chain',
  );
});

test('marks input stale when the impact of a changed version is unknown', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.artifactVersions.current = 'draft-v3';
      input.queueItem.invalidationCondition.impactKnown = false;
    }),
  );

  assertRoute(
    result,
    'stale_input',
    'input_impact_unknown',
    'assess_affected_chain',
  );
});

test('routes an open Review hard-gate finding to revision', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.reviewFindings.push({
        findingId: 'finding-44-1',
        severity: 'must_fix',
        status: 'open',
      });
    }),
  );

  assertRoute(
    result,
    'needs_revision',
    'review_gate_blocked',
    'revise_draft',
  );
});

for (const verdict of ['reject', 'unknown']) {
  test(`routes a Fact Check ${verdict} verdict to fact resolution`, () => {
    const result = assessContentProductionHandoff(
      createInput((input) => {
        input.evidencePackage.factVerdicts[0].verdict = verdict;
      }),
    );

    assertRoute(
      result,
      'needs_fact_resolution',
      'fact_check_gate_blocked',
      'resolve_fact_evidence',
    );
  });
}

test('requires a Rework Envelope before routing source_conflict', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.conflictsAndUnknowns.push({
        conflictId: 'conflict-44-1',
        type: 'source_conflict',
        status: 'open',
      });
      input.evidencePackage.factVerdicts[0].verdict = 'unknown';
    }),
  );

  assertRoute(
    result,
    'needs_evidence',
    'rework_envelope_missing',
    'create_rework_envelope',
  );
});

test('routes source_conflict to Research and then Fact Check with a bounded envelope', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.conflictsAndUnknowns.push({
        conflictId: 'conflict-44-1',
        type: 'source_conflict',
        status: 'open',
      });
      input.evidencePackage.factVerdicts[0].verdict = 'unknown';
      input.reworkEnvelope = {
        conflictId: 'conflict-44-1',
        failedGate: 'fact_check',
        affectedClaims: ['claim-44-1'],
        allowedOutputPaths: ['research-source-card-v2'],
        fixedInputVersion: 'draft-v2',
        expectedClosureEvidence: ['updated source card', 'new fact verdict'],
        remainingCycleBudget: 1,
        escalationTarget: 'human_author_editor',
        targetRoles: ['research', 'fact_check'],
      };
    }),
  );

  assertRoute(
    result,
    'needs_fact_resolution',
    'source_conflict_requires_research',
    'research_then_fact_check',
  );
  assert.equal(result.responsibleRole, 'research');
});

test('stops bounded reflow when the cycle budget is exhausted', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.cycleState.currentCycle = 2;
      input.evidencePackage.conflictsAndUnknowns.push({
        conflictId: 'conflict-44-1',
        type: 'source_conflict',
        status: 'open',
      });
      input.evidencePackage.factVerdicts[0].verdict = 'unknown';
    }),
  );

  assertRoute(
    result,
    'needs_human_decision',
    'cycle_exhausted',
    'request_human_decision',
  );
});

test('routes clear dual gates to Human Decision', () => {
  const result = assessContentProductionHandoff(createInput());

  assertRoute(
    result,
    'ready_for_human_review',
    'content_evidence_ready',
    'request_human_review',
  );
  assert.equal(result.integrationOwner, 'chapter-44-integrator');
});

test('routes an explicit human return to revision without executing it', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.humanDecision = {
        status: 'returned_for_rework',
        decidedBy: 'human-editor',
        applicablePackageId: 'package-44-v1',
        reason: 'reader path is incomplete',
      };
    }),
  );

  assertRoute(
    result,
    'needs_revision',
    'human_returned_for_rework',
    'revise_draft',
  );
});

test('routes a current named human acceptance to chapter integration', () => {
  const result = assessContentProductionHandoff(
    createInput((input) => {
      input.evidencePackage.humanDecision = {
        status: 'accepted_for_integration',
        decidedBy: 'human-editor',
        applicablePackageId: 'package-44-v1',
        draftVersion: 'draft-v2',
        reason: 'bounded content evidence accepted',
        refreshCondition: 'draft or source changes',
      };
    }),
  );

  assertRoute(
    result,
    'ready_for_chapter_integration',
    'human_decision_accepts_current_package',
    'submit_to_integration_gate',
  );
  assert.equal(result.integrationOwner, 'chapter-44-integrator');
});

test('does not mutate injected evidence or perform external actions', () => {
  const input = createInput();
  const snapshot = structuredClone(input);

  const result = assessContentProductionHandoff(input);

  assert.deepEqual(input, snapshot);
  assert.equal(result.executionPerformed, false);
});
