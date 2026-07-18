import assert from 'node:assert/strict';
import test from 'node:test';

import { assessHumanApprovalRoute } from './human-approval-routing.mjs';

const policy = {
  allowsAutoFor: ['read_only', 'reversible_write'],
  requiresApprovalFor: ['irreversible_write', 'sensitive_write'],
};

function createInput({
  action = {},
  approval = null,
  observation = { effectStatus: 'not_started' },
} = {}) {
  return {
    action: {
      id: 'dependency-update-plan',
      scope: 'prepare-isolated-change',
      effect: 'reversible_write',
      evidence: { status: 'fresh' },
      successCriteria: 'reviewed-test-plan',
      ...action,
    },
    policy,
    approval,
    observation,
  };
}

test('allows a fresh reversible candidate when policy permits automatic routing', () => {
  assert.deepEqual(assessHumanApprovalRoute(createInput()), {
    status: 'allowed',
    code: 'auto_candidate',
    actionId: 'dependency-update-plan',
  });
});

test('requests approval for an irreversible candidate', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({ action: { effect: 'irreversible_write' } }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_required',
      actionId: 'dependency-update-plan',
    },
  );
});

test('requests missing action-card fields before asking for a decision', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({ action: { successCriteria: undefined } }),
    ),
    {
      status: 'needs_evidence',
      code: 'action_card_incomplete',
      actionId: 'dependency-update-plan',
      missing: ['successCriteria'],
    },
  );
});

test('requests fresh evidence before routing a stale candidate', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({ action: { evidence: { status: 'stale' } } }),
    ),
    {
      status: 'needs_evidence',
      code: 'evidence_not_ready',
      actionId: 'dependency-update-plan',
    },
  );
});

test('blocks an unknown prior effect before evaluating approval', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        observation: { effectStatus: 'unknown', effectId: 'change-attempt-1' },
      }),
    ),
    {
      status: 'blocked',
      code: 'effect_unknown',
      actionId: 'dependency-update-plan',
      effectId: 'change-attempt-1',
    },
  );
});

test('requires a new decision when approval is expired', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        action: { effect: 'irreversible_write' },
        approval: {
          status: 'expired',
          scope: 'prepare-isolated-change',
          evidenceStatus: 'fresh',
        },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_expired',
      actionId: 'dependency-update-plan',
    },
  );
});

test('does not reuse an approval for a different scope', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        action: { effect: 'irreversible_write' },
        approval: {
          status: 'approved',
          scope: 'publish-production',
          evidenceStatus: 'fresh',
        },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_scope_mismatch',
      actionId: 'dependency-update-plan',
    },
  );
});

test('requires a new decision when approval evidence is no longer fresh', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        action: { effect: 'irreversible_write' },
        approval: {
          status: 'approved',
          scope: 'prepare-isolated-change',
          evidenceStatus: 'stale',
        },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_evidence_mismatch',
      actionId: 'dependency-update-plan',
    },
  );
});

test('allows an approved action when scope and evidence still match', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        action: { effect: 'irreversible_write' },
        approval: {
          status: 'approved',
          scope: 'prepare-isolated-change',
          evidenceStatus: 'fresh',
        },
      }),
    ),
    {
      status: 'allowed',
      code: 'approval_matches_action',
      actionId: 'dependency-update-plan',
    },
  );
});

test('preserves a human rejection instead of selecting an automatic fallback', () => {
  assert.deepEqual(
    assessHumanApprovalRoute(
      createInput({
        action: { effect: 'irreversible_write' },
        approval: {
          status: 'rejected',
          scope: 'prepare-isolated-change',
          evidenceStatus: 'fresh',
        },
      }),
    ),
    {
      status: 'rejected',
      code: 'approval_rejected',
      actionId: 'dependency-update-plan',
    },
  );
});
