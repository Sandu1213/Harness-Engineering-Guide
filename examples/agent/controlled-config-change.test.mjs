import assert from 'node:assert/strict';
import test from 'node:test';

import { evaluateConfigChange } from './controlled-config-change.mjs';

function createSnapshot(overrides = {}) {
  return {
    proposal: {
      key: 'feature.checkoutMode',
      expectedValue: 'standard',
      scope: 'teaching',
      risk: 'reversible-write',
    },
    policy: {
      allowedKeys: ['feature.checkoutMode'],
      allowedScopes: ['teaching'],
      requiresApproval: false,
    },
    before: {
      feature: { checkoutMode: 'trial' },
    },
    execution: {
      kind: 'applied',
      observedValue: 'standard',
    },
    approval: {
      granted: false,
    },
    ...overrides,
  };
}

test('should accept a permitted reversible configuration change after observation matches the target', () => {
  const result = evaluateConfigChange(createSnapshot());

  assert.equal(result.state, 'succeeded');
  assert.equal(result.phase, 'verified');
  assert.equal(result.failure, null);
  assert.equal(result.recovery, null);
  assert.equal(result.escalation, null);
  assert.deepEqual(result.change, {
    key: 'feature.checkoutMode',
    scope: 'teaching',
    before: 'trial',
    observed: 'standard',
  });
  assert.deepEqual(result.events, [
    'snapshot_received',
    'preflight_passed',
    'execution_observed',
    'verified',
  ]);
  assert.deepEqual(result.evidence, [
    'proposal key and scope are allowed',
    'observed value matches expected value',
  ]);
});

test('should block an out-of-policy key before observing execution', () => {
  const result = evaluateConfigChange(createSnapshot({
    proposal: {
      key: 'feature.experimentalFlag',
      expectedValue: 'enabled',
      scope: 'teaching',
      risk: 'reversible-write',
    },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'preflight_rejected');
  assert.equal(result.failure, 'proposal key is not allowed by policy');
  assert.equal(result.recovery, null);
  assert.equal(result.escalation, null);
  assert.deepEqual(result.events, ['snapshot_received', 'preflight_rejected']);
  assert.deepEqual(result.evidence, ['proposal key is outside allowedKeys']);
});

test('should block a mismatched observation and return a recovery recommendation', () => {
  const result = evaluateConfigChange(createSnapshot({
    execution: {
      kind: 'applied',
      observedValue: 'trial',
    },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'validation_rejected');
  assert.equal(result.failure, 'observed value does not match expected value');
  assert.deepEqual(result.recovery, {
    action: 'restore_before_snapshot',
    key: 'feature.checkoutMode',
    value: 'trial',
  });
  assert.equal(result.escalation, null);
  assert.deepEqual(result.change, {
    key: 'feature.checkoutMode',
    scope: 'teaching',
    before: 'trial',
    observed: 'trial',
  });
  assert.deepEqual(result.events, [
    'snapshot_received',
    'preflight_passed',
    'execution_observed',
    'validation_rejected',
  ]);
});

test('should escalate an irreversible action without approval before observing execution', () => {
  const result = evaluateConfigChange(createSnapshot({
    proposal: {
      key: 'feature.checkoutMode',
      expectedValue: 'standard',
      scope: 'teaching',
      risk: 'irreversible',
    },
  }));

  assert.equal(result.state, 'escalated');
  assert.equal(result.phase, 'approval_required');
  assert.equal(result.failure, 'approval is required before this action');
  assert.equal(result.recovery, null);
  assert.deepEqual(result.escalation, {
    reason: 'proposal risk requires human approval',
    requestedAction: 'feature.checkoutMode',
  });
  assert.deepEqual(result.events, [
    'snapshot_received',
    'preflight_passed',
    'approval_required',
  ]);
  assert.deepEqual(result.evidence, [
    'proposal key and scope are allowed',
    'approval has not been granted',
  ]);
});

test('should preserve an execution rejection without claiming verification', () => {
  const result = evaluateConfigChange(createSnapshot({
    execution: {
      kind: 'rejected',
      reason: 'simulated execution policy denied the change',
    },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'execution_rejected');
  assert.equal(result.failure, 'simulated execution policy denied the change');
  assert.equal(result.recovery, null);
  assert.equal(result.escalation, null);
  assert.deepEqual(result.events, [
    'snapshot_received',
    'preflight_passed',
    'execution_rejected',
  ]);
  assert.deepEqual(result.evidence, ['execution result was rejected before verification']);
});
