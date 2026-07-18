import assert from 'node:assert/strict';
import test from 'node:test';

import { assessTestEvidencePlan } from './test-evidence-plan-assessment.mjs';

function validPlan(overrides = {}) {
  return {
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
    ...overrides,
  };
}

test('should admit a complete two-layer test evidence plan without execution', () => {
  const result = assessTestEvidencePlan(validPlan());

  assert.equal(result.status, 'ready');
  assert.equal(result.code, 'test_evidence_plan_ready');
  assert.equal(result.next, 'implement_in_isolated_example');
  assert.equal(result.executionPerformed, false);
  assert.deepEqual(result.requiredLayers, ['api', 'ui']);
});

test('should stop when the API contract is absent', () => {
  const result = assessTestEvidencePlan(validPlan({ apiContract: undefined }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_api_contract');
  assert.equal(result.next, 'stop');
});

test('should stop when the API contract cannot classify every teaching outcome', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      apiContract: {
        ...validPlan().apiContract,
        expectedCategories: ['accepted', 'authentication_rejected'],
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'incomplete_api_contract');
  assert.equal(result.executionPerformed, false);
});

test('should stop when UI evidence has no observation after its primary action', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      uiFlow: {
        ...validPlan().uiFlow,
        afterObservation: '',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_ui_after_observation');
  assert.equal(result.next, 'stop');
});

test('should stop when the UI plan does not declare browser-state isolation', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      uiFlow: {
        ...validPlan().uiFlow,
        contextIsolation: 'unspecified',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'invalid_ui_isolation');
  assert.equal(result.executionPerformed, false);
});

test('should stop when the failure record cannot be linked to the scenario and both layers', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      failureRecord: {
        ...validPlan().failureRecord,
        scenarioId: 'another-scenario',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'failure_record_not_linked');
  assert.equal(result.next, 'stop');
});

test('should stop when the report claims execution without observations', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      reportGate: {
        ...validPlan().reportGate,
        claimState: 'executed',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'report_claim_not_observed');
  assert.equal(result.executionPerformed, false);
});

test('should require approval before an environment execution request', () => {
  const result = assessTestEvidencePlan(
    validPlan({
      approvals: { environmentExecution: 'requested' },
    }),
  );

  assert.equal(result.status, 'requires_approval');
  assert.equal(result.code, 'environment_execution_not_approved');
  assert.equal(result.next, 'obtain_environment_approval');
  assert.equal(result.executionPerformed, false);
});
