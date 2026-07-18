import assert from 'node:assert/strict';
import test from 'node:test';

import { assessAgentEngineeringReadiness } from './agent-engineering-readiness-assessment.mjs';

const baseInput = {
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
    scenariosCovered: ['normal', 'refusal', 'boundary', 'failure'],
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
};

function createInput(overrides = {}) {
  return Object.fromEntries(
    Object.entries(baseInput).map(([key, value]) => [
      key,
      { ...value, ...overrides[key] },
    ]),
  );
}

test('requires a scoped task contract before readiness review', () => {
  assert.deepEqual(
    assessAgentEngineeringReadiness(
      createInput({ taskContract: { stopConditionsDefined: false } }),
    ),
    {
      status: 'needs_contract',
      code: 'task_contract_incomplete',
      taskId: 'bounded-pilot-teaching-input',
      next: 'complete_task_contract',
      executionPerformed: false,
    },
  );
});

test('rejects stale context evidence', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({ contextBoundary: { current: false } }),
    ).code,
    'context_evidence_stale',
  );
});

test('requires a bounded and recorded capability grant', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({ capabilityBoundary: { effectsBounded: false } }),
    ).status,
    'needs_capability_boundary',
  );
});

test('stops when workflow effects are unknown', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({ stateModel: { effectsKnown: false } }),
    ).code,
    'workflow_effect_unknown',
  );
});

test('requires independent observation beyond a tool result', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({
        observationEvidence: { independentObservationRecorded: false },
      }),
    ).status,
    'needs_effect_evidence',
  );
});

test('rejects evaluation evidence from incomparable versions', () => {
  assert.deepEqual(
    assessAgentEngineeringReadiness(
      createInput({ evaluationEvidence: { comparable: false } }),
    ),
    {
      status: 'evaluation_not_comparable',
      code: 'evaluation_versions_not_comparable',
      taskId: 'bounded-pilot-teaching-input',
      next: 'establish_comparable_evaluation',
      executionPerformed: false,
    },
  );
});

test('requires normal refusal boundary and failure scenarios', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({
        evaluationEvidence: { scenariosCovered: ['normal', 'failure'] },
      }),
    ).code,
    'evaluation_scenarios_incomplete',
  );
});

test('rejects a handoff built from a drifted state version', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({ handoffEvidence: { stateVersionMatches: false } }),
    ).status,
    'handoff_not_ready',
  );
});

test('requires named human accountability roles', () => {
  assert.equal(
    assessAgentEngineeringReadiness(
      createInput({ riskOwnership: { stopAuthorityNamed: false } }),
    ).status,
    'human_accountability_required',
  );
});

test('rejects an autonomy request without measured benefit', () => {
  assert.deepEqual(
    assessAgentEngineeringReadiness(
      createInput({ autonomyRequest: { benefitMeasured: false } }),
    ),
    {
      status: 'autonomy_not_justified',
      code: 'autonomy_benefit_unproven',
      taskId: 'bounded-pilot-teaching-input',
      next: 'keep_manual_workflow',
      executionPerformed: false,
    },
  );
});

test('routes complete injected evidence to bounded pilot review', () => {
  assert.deepEqual(assessAgentEngineeringReadiness(createInput()), {
    status: 'ready_for_bounded_pilot_review',
    code: 'bounded_pilot_evidence_ready',
    taskId: 'bounded-pilot-teaching-input',
    next: 'request_named_human_decision',
    executionPerformed: false,
  });
});
