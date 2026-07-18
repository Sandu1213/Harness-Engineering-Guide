import assert from 'node:assert/strict';
import test from 'node:test';

import { assessBugInvestigation } from './bug-investigation-assessment.mjs';

function validInvestigation(overrides = {}) {
  const investigation = {
    symptom: {
      id: 'checkout-welcome-missing',
      expected: 'welcome state is observable after submission',
      actual: 'welcome state was not observed after submission',
    },
    reproduction: {
      input: 'teaching submission record',
      preconditions: 'controlled teaching state',
      failurePredicate: 'welcome state is absent after the declared observation',
      allowedActions: ['compare-observations'],
      untrustedVariables: ['timing'],
    },
    hypotheses: [
      {
        id: 'observe-too-early',
        mechanism: 'the observation precedes the declared target condition',
        prediction: 'the missing observation correlates with the target condition',
        counterfactual: 'inspect target or precondition evidence',
        check: {
          id: 'compare-target-condition',
          distinguishesHypotheses: true,
          executionState: 'planned',
        },
        status: 'supported',
      },
    ],
    fixCandidate: {
      hypothesisId: 'observe-too-early',
      change: 'bind the observation to the named target condition',
      expectedImpact: 'the teaching observation follows the declared condition',
      protectedScope: 'do not change timing, data, or external environment',
      executionState: 'planned',
    },
    regressionGate: {
      originalFailureCheck: 'recheck the declared failure predicate',
      expectedBehaviorObservation: 'observe the declared welcome state',
      scope: 'teaching UI observation only',
      uncovered: 'service, data, and release behavior remain uncovered',
      claimState: 'planned',
    },
    approvals: { environmentExecution: 'not-requested' },
  };

  return { ...investigation, ...overrides };
}

test('admits a complete in-memory bug investigation without execution', () => {
  assert.deepEqual(assessBugInvestigation(validInvestigation()), {
    status: 'ready',
    code: 'bug_investigation_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  });
});

test('stops when the reproduction contract is absent', () => {
  assert.deepEqual(assessBugInvestigation(validInvestigation({ reproduction: undefined })), {
    status: 'stopped',
    code: 'missing_reproduction_contract',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when a hypothesis lacks a falsifiable prediction', () => {
  const investigation = validInvestigation();
  investigation.hypotheses[0].prediction = '';

  assert.deepEqual(assessBugInvestigation(investigation), {
    status: 'stopped',
    code: 'missing_hypothesis_prediction',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when a hypothesis check cannot distinguish alternatives', () => {
  const investigation = validInvestigation();
  investigation.hypotheses[0].check.distinguishesHypotheses = false;

  assert.deepEqual(assessBugInvestigation(investigation), {
    status: 'stopped',
    code: 'missing_discriminating_check',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the candidate fix is not linked to a supported hypothesis', () => {
  const investigation = validInvestigation();
  investigation.hypotheses[0].status = 'undecided';

  assert.deepEqual(assessBugInvestigation(investigation), {
    status: 'stopped',
    code: 'fix_candidate_not_linked_to_supported_hypothesis',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the regression gate omits the original failure branch', () => {
  const investigation = validInvestigation();
  investigation.regressionGate.originalFailureCheck = '';

  assert.deepEqual(assessBugInvestigation(investigation), {
    status: 'stopped',
    code: 'missing_original_failure_regression_check',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the regression gate omits the expected behavior observation', () => {
  const investigation = validInvestigation();
  investigation.regressionGate.expectedBehaviorObservation = '';

  assert.deepEqual(assessBugInvestigation(investigation), {
    status: 'stopped',
    code: 'missing_expected_behavior_observation',
    next: 'stop',
    executionPerformed: false,
  });
});

test('requires approval before an environment execution request', () => {
  assert.deepEqual(
    assessBugInvestigation(validInvestigation({ approvals: { environmentExecution: 'requested' } })),
    {
      status: 'requires_approval',
      code: 'environment_execution_not_approved',
      next: 'obtain_environment_approval',
      executionPerformed: false,
    },
  );
});
