import assert from 'node:assert/strict';
import test from 'node:test';

import { assessObservationSnapshot } from './observation-snapshot-assessment.mjs';

const observationContract = {
  version: 'chapter-15-v1',
  requiredFields: [
    'observedAt',
    'source',
    'correlationId',
    'target',
    'state',
    'evidenceStatus',
    'freshness',
    'fingerprint',
  ],
  knownStates: ['submitted', 'pending', 'error'],
};

function createInput({
  action = {
    correlationId: 'ui-click-1',
    target: 'submit-status',
    expectedState: 'submitted',
  },
  snapshot = {
    observedAt: 'step-2',
    source: 'ui_state_assertion',
    correlationId: 'ui-click-1',
    target: 'submit-status',
    state: 'submitted',
    evidenceStatus: 'observed',
    freshness: 'fresh',
    fingerprint: 'status-submitted',
  },
  previousSnapshot,
} = {}) {
  return { action, observationContract, snapshot, previousSnapshot };
}

test('accepts a fresh matching state as an observation, not as a completed workflow', () => {
  assert.deepEqual(assessObservationSnapshot(createInput()), {
    status: 'observed',
    code: 'expected_state_observed',
    correlationId: 'ui-click-1',
    target: 'submit-status',
  });
});

test('blocks a snapshot whose correlation id belongs to a different action', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, correlationId: 'ui-click-other' } }),
    ),
    {
      status: 'blocked',
      code: 'correlation_mismatch',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('blocks a snapshot that observes a different target than the requested action', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, target: 'toast-message' } }),
    ),
    {
      status: 'blocked',
      code: 'target_mismatch',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('requests evidence when a snapshot omits required observation fields', () => {
  const { source, ...snapshotWithoutSource } = createInput().snapshot;

  assert.deepEqual(
    assessObservationSnapshot(createInput({ snapshot: snapshotWithoutSource })),
    {
      status: 'needs_evidence',
      code: 'snapshot_fields_missing',
      correlationId: 'ui-click-1',
      target: 'submit-status',
      missingFields: ['source'],
    },
  );
});

test('requests a new observation when the injected freshness status is stale', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, freshness: 'stale' } }),
    ),
    {
      status: 'needs_evidence',
      code: 'snapshot_not_fresh',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('requests evidence when a snapshot is labeled as inferred rather than observed', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, evidenceStatus: 'inferred' } }),
    ),
    {
      status: 'needs_evidence',
      code: 'snapshot_not_confirmed',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('blocks when an injected observation says the external effect is unknown', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, effectStatus: 'unknown' } }),
    ),
    {
      status: 'blocked',
      code: 'effect_unknown_requires_stop_or_escalation',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('does not treat an unchanged fingerprint as a fresh post-action observation', () => {
  const snapshot = { ...createInput().snapshot, fingerprint: 'status-pending' };

  assert.deepEqual(
    assessObservationSnapshot(createInput({ snapshot, previousSnapshot: { ...snapshot } })),
    {
      status: 'needs_evidence',
      code: 'snapshot_not_advanced',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('does not compare a matching fingerprint from a different action as advancement evidence', () => {
  const snapshot = { ...createInput().snapshot, fingerprint: 'status-pending' };
  const previousSnapshot = {
    ...snapshot,
    correlationId: 'ui-click-other',
  };

  assert.deepEqual(
    assessObservationSnapshot(createInput({ snapshot, previousSnapshot })),
    {
      status: 'observed',
      code: 'expected_state_observed',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('does not compare a matching fingerprint from a different target as advancement evidence', () => {
  const snapshot = { ...createInput().snapshot, fingerprint: 'status-pending' };
  const previousSnapshot = {
    ...snapshot,
    target: 'toast-message',
  };

  assert.deepEqual(
    assessObservationSnapshot(createInput({ snapshot, previousSnapshot })),
    {
      status: 'observed',
      code: 'expected_state_observed',
      correlationId: 'ui-click-1',
      target: 'submit-status',
    },
  );
});

test('reports an observed but nonmatching known state without inventing a failure cause', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, state: 'pending' } }),
    ),
    {
      status: 'not_observed',
      code: 'expected_state_not_observed',
      correlationId: 'ui-click-1',
      target: 'submit-status',
      observedState: 'pending',
    },
  );
});

test('blocks an unknown state instead of guessing its meaning', () => {
  assert.deepEqual(
    assessObservationSnapshot(
      createInput({ snapshot: { ...createInput().snapshot, state: 'redirected' } }),
    ),
    {
      status: 'blocked',
      code: 'unrecognized_observed_state',
      correlationId: 'ui-click-1',
      target: 'submit-status',
      observedState: 'redirected',
    },
  );
});
