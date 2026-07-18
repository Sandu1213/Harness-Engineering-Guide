import assert from 'node:assert/strict';
import test from 'node:test';

import { assessFlutterLoginDelivery } from './flutter-login-delivery-assessment.mjs';

function validPackage(overrides = {}) {
  return {
    task: {
      id: 'mobile-login-01',
      feature: 'login',
      objective: '为受控登录界面准备可审查的交付计划。',
      state: 'ready',
      dataPolicy: 'no-real-credentials',
    },
    stateModel: {
      states: ['idle', 'validating', 'submitting', 'authenticated', 'validation_error', 'network_error'],
      terminalStates: ['authenticated', 'validation_error', 'network_error'],
    },
    testMatrix: {
      scenarios: ['success', 'validation_error', 'network_error'],
      layers: ['unit', 'widget', 'integration'],
      executionTarget: 'planned',
    },
    reportContract: {
      correlationId: 'mobile-login-01',
      requiredFields: ['scenario', 'layer', 'observation', 'verdict', 'limitation'],
      claimState: 'planned',
    },
    approvals: {
      environmentExecution: 'not-requested',
    },
    ...overrides,
  };
}

test('should accept a complete no-execution Flutter login delivery plan', () => {
  const result = assessFlutterLoginDelivery(validPackage());

  assert.equal(result.status, 'ready');
  assert.equal(result.code, 'flutter_login_delivery_plan_ready');
  assert.equal(result.next, 'implement_in_isolated_example');
  assert.equal(result.executionPerformed, false);
  assert.deepEqual(result.requiredScenarios, ['success', 'validation_error', 'network_error']);
});

test('should stop when the task contract is incomplete', () => {
  const result = assessFlutterLoginDelivery(validPackage({ task: { id: 'mobile-login-01' } }));

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_task_contract');
  assert.equal(result.next, 'stop');
});

test('should stop when the delivery plan allows real credentials', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({ task: { ...validPackage().task, dataPolicy: 'real-credentials-allowed' } }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'credential_policy_violation');
  assert.equal(result.executionPerformed, false);
});

test('should stop when the login state model lacks a network failure state', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({
      stateModel: {
        ...validPackage().stateModel,
        states: ['idle', 'validating', 'submitting', 'authenticated', 'validation_error'],
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_required_state');
  assert.equal(result.next, 'stop');
});

test('should stop when the test matrix omits a required observable scenario', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({
      testMatrix: {
        ...validPackage().testMatrix,
        scenarios: ['success', 'validation_error'],
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'missing_test_scenario');
  assert.equal(result.next, 'stop');
});

test('should stop when a report claims execution without observations', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({
      reportContract: {
        ...validPackage().reportContract,
        claimState: 'executed',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'report_claim_not_observed');
  assert.equal(result.executionPerformed, false);
});

test('should require approval before an environment execution request', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({
      approvals: { environmentExecution: 'requested' },
    }),
  );

  assert.equal(result.status, 'requires_approval');
  assert.equal(result.code, 'environment_execution_not_approved');
  assert.equal(result.next, 'obtain_environment_approval');
  assert.equal(result.executionPerformed, false);
});

test('should stop when the report contract cannot be linked to the task', () => {
  const result = assessFlutterLoginDelivery(
    validPackage({
      reportContract: {
        ...validPackage().reportContract,
        correlationId: 'another-task',
      },
    }),
  );

  assert.equal(result.status, 'stopped');
  assert.equal(result.code, 'report_not_linked_to_task');
  assert.equal(result.next, 'stop');
});
