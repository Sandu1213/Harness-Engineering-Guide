import assert from 'node:assert/strict';
import test from 'node:test';

import { assessBrowserE2EEvidence } from './browser-e2e-evidence-assessment.mjs';

const evidenceContract = {
  version: 'chapter-25-v1',
  primaryAction: 'click',
  requiredBeforeFields: ['snapshotId', 'sequence', 'target', 'state', 'evidenceStatus'],
  requiredAfterFields: ['snapshotId', 'sequence', 'target', 'state', 'evidenceStatus'],
};

function createInput({
  action = {
    actionId: 'submit-order-1',
    kind: 'click',
    target: 'submit-order',
    sequence: 2,
    dispatchStatus: 'dispatched',
    effectStatus: 'known',
    expectedState: 'submitted',
  },
  beforeSnapshot = {
    snapshotId: 'before-1',
    sequence: 1,
    target: 'submit-order',
    state: 'ready',
    evidenceStatus: 'observed',
  },
  afterSnapshot = {
    snapshotId: 'after-1',
    sequence: 3,
    target: 'submit-order',
    state: 'submitted',
    evidenceStatus: 'observed',
  },
} = {}) {
  return { action, beforeSnapshot, afterSnapshot, evidenceContract };
}

test('accepts an evidence chain with a pre-snapshot, dispatched click and fresh post-snapshot', () => {
  assert.deepEqual(assessBrowserE2EEvidence(createInput()), {
    status: 'observed',
    code: 'e2e_evidence_chain_complete',
    actionId: 'submit-order-1',
    target: 'submit-order',
  });
});

test('blocks a non-click primary action instead of treating inspection as an E2E interaction', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ action: { ...createInput().action, kind: 'inspect' } }),
    ),
    {
      status: 'blocked',
      code: 'primary_click_missing',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('requests evidence when the pre-action snapshot is incomplete', () => {
  const { state, ...beforeSnapshot } = createInput().beforeSnapshot;

  assert.deepEqual(assessBrowserE2EEvidence(createInput({ beforeSnapshot })), {
    status: 'needs_evidence',
    code: 'before_snapshot_fields_missing',
    actionId: 'submit-order-1',
    target: 'submit-order',
    missingFields: ['state'],
  });
});

test('blocks when the primary action was not dispatched', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ action: { ...createInput().action, dispatchStatus: 'not_dispatched' } }),
    ),
    {
      status: 'blocked',
      code: 'primary_action_not_dispatched',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('blocks when the action effect is unknown', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ action: { ...createInput().action, effectStatus: 'unknown' } }),
    ),
    {
      status: 'blocked',
      code: 'primary_action_effect_unknown',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('blocks a pre-action snapshot for a different target', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ beforeSnapshot: { ...createInput().beforeSnapshot, target: 'cancel-order' } }),
    ),
    {
      status: 'blocked',
      code: 'before_snapshot_target_mismatch',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('rejects an after snapshot that is not later than the primary action', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ afterSnapshot: { ...createInput().afterSnapshot, sequence: 2 } }),
    ),
    {
      status: 'needs_evidence',
      code: 'post_action_snapshot_missing',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('rejects an inferred post-action snapshot', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ afterSnapshot: { ...createInput().afterSnapshot, evidenceStatus: 'inferred' } }),
    ),
    {
      status: 'needs_evidence',
      code: 'post_action_snapshot_not_observed',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});

test('reports a re-snapshot whose observed state does not meet the expected state', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ afterSnapshot: { ...createInput().afterSnapshot, state: 'validating' } }),
    ),
    {
      status: 'not_observed',
      code: 'expected_ui_state_not_observed',
      actionId: 'submit-order-1',
      target: 'submit-order',
      observedState: 'validating',
    },
  );
});

test('does not accept a reused pre-action snapshot as post-action evidence', () => {
  assert.deepEqual(
    assessBrowserE2EEvidence(
      createInput({ afterSnapshot: { ...createInput().beforeSnapshot, sequence: 3, state: 'submitted' } }),
    ),
    {
      status: 'needs_evidence',
      code: 'post_action_snapshot_reused',
      actionId: 'submit-order-1',
      target: 'submit-order',
    },
  );
});
