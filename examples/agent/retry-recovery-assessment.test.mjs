import assert from 'node:assert/strict';
import test from 'node:test';

import { assessRecoveryDecision } from './retry-recovery-assessment.mjs';

const baseOperation = {
  id: 'source-fetch-1',
  target: 'candidate-source',
  repeatability: 'safe',
  effectStatus: 'not_applied',
  attempt: 1,
  compensation: 'none',
};

const baseFailure = { kind: 'transient_network', evidenceStatus: 'observed' };

const baseCheckpoint = { status: 'recorded', correlationId: 'source-fetch-1' };

const basePolicy = {
  maxAttempts: 3,
  retryableFailures: ['transient_network', 'rate_limited'],
  allowedRepeatability: ['safe'],
  requireCheckpointForCompensation: true,
};

function assess(overrides = {}) {
  return assessRecoveryDecision({
    operation: { ...baseOperation, ...(overrides.operation ?? {}) },
    failure: { ...baseFailure, ...(overrides.failure ?? {}) },
    checkpoint: { ...baseCheckpoint, ...(overrides.checkpoint ?? {}) },
    policy: { ...basePolicy, ...(overrides.policy ?? {}) },
  });
}

test('allows one bounded retry for an observed transient failure before any effect', () => {
  assert.deepEqual(assess(), {
    status: 'retry',
    code: 'retry_allowed',
    operationId: 'source-fetch-1',
  });
});

test('requires a recovery contract when the retry limit is missing', () => {
  assert.deepEqual(assess({ policy: { maxAttempts: undefined } }), {
    status: 'needs_spec',
    code: 'recovery_contract_incomplete',
    operationId: 'source-fetch-1',
  });
});

test('requires observation when the failure evidence is unknown', () => {
  assert.deepEqual(assess({ failure: { evidenceStatus: 'unknown' } }), {
    status: 'needs_observation',
    code: 'failure_evidence_unknown',
    operationId: 'source-fetch-1',
  });
});

test('requires observation when the external effect is unknown', () => {
  assert.deepEqual(assess({ operation: { effectStatus: 'unknown' } }), {
    status: 'needs_observation',
    code: 'effect_status_unknown',
    operationId: 'source-fetch-1',
  });
});

test('requires a specification when the effect status is not supported', () => {
  assert.deepEqual(assess({ operation: { effectStatus: 'not_a_status' } }), {
    status: 'needs_spec',
    code: 'effect_status_not_supported',
    operationId: 'source-fetch-1',
  });
});

test('escalates an invalid input instead of retrying it', () => {
  assert.deepEqual(assess({ failure: { kind: 'invalid_input' } }), {
    status: 'escalate',
    code: 'failure_not_retryable',
    operationId: 'source-fetch-1',
  });
});

test('escalates a permission failure instead of retrying it', () => {
  assert.deepEqual(assess({ failure: { kind: 'permission_denied' } }), {
    status: 'escalate',
    code: 'failure_not_retryable',
    operationId: 'source-fetch-1',
  });
});

test('stops after the configured retry budget is exhausted', () => {
  assert.deepEqual(assess({ operation: { attempt: 3 } }), {
    status: 'stop',
    code: 'retry_budget_exhausted',
    operationId: 'source-fetch-1',
  });
});

test('escalates an operation that is not declared safe to repeat', () => {
  assert.deepEqual(assess({ operation: { repeatability: 'unsafe' } }), {
    status: 'escalate',
    code: 'operation_not_safe_to_repeat',
    operationId: 'source-fetch-1',
  });
});

test('requests compensation for an applied effect with a recorded plan', () => {
  assert.deepEqual(
    assess({ operation: { effectStatus: 'applied', compensation: 'available' } }),
    {
      status: 'compensate',
      code: 'compensation_required',
      operationId: 'source-fetch-1',
    },
  );
});

test('escalates an applied effect when compensation lacks a checkpoint', () => {
  assert.deepEqual(
    assess({
      operation: { effectStatus: 'applied', compensation: 'available' },
      checkpoint: { status: 'missing' },
    }),
    {
      status: 'escalate',
      code: 'compensation_checkpoint_missing',
      operationId: 'source-fetch-1',
    },
  );
});

test('escalates an applied effect without a declared compensation path', () => {
  assert.deepEqual(assess({ operation: { effectStatus: 'applied' } }), {
    status: 'escalate',
    code: 'applied_effect_requires_recovery_plan',
    operationId: 'source-fetch-1',
  });
});

test('escalates an irreversible effect without offering automatic recovery', () => {
  assert.deepEqual(assess({ operation: { effectStatus: 'irreversible' } }), {
    status: 'escalate',
    code: 'irreversible_effect_requires_human',
    operationId: 'source-fetch-1',
  });
});
