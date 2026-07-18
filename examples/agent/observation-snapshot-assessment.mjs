function result(status, code, action, extra = {}) {
  return {
    status,
    code,
    correlationId: action.correlationId,
    target: action.target,
    ...extra,
  };
}

function missingFields(requiredFields, snapshot) {
  return requiredFields.filter((field) => {
    const value = snapshot?.[field];
    return value === undefined || value === null || value === '';
  });
}

/**
 * Assess injected observation snapshots without reading a real UI or external system.
 */
export function assessObservationSnapshot({
  action,
  observationContract,
  snapshot,
  previousSnapshot,
}) {
  const missing = missingFields(observationContract.requiredFields, snapshot);
  if (missing.length > 0) {
    return result('needs_evidence', 'snapshot_fields_missing', action, {
      missingFields: missing,
    });
  }

  if (snapshot.correlationId !== action.correlationId) {
    return result('blocked', 'correlation_mismatch', action);
  }

  if (snapshot.target !== action.target) {
    return result('blocked', 'target_mismatch', action);
  }

  if (snapshot.evidenceStatus !== 'observed') {
    return result('needs_evidence', 'snapshot_not_confirmed', action);
  }

  if (snapshot.freshness !== 'fresh') {
    return result('needs_evidence', 'snapshot_not_fresh', action);
  }

  if (snapshot.effectStatus === 'unknown') {
    return result('blocked', 'effect_unknown_requires_stop_or_escalation', action);
  }

  if (
    previousSnapshot?.correlationId === snapshot.correlationId &&
    previousSnapshot?.target === snapshot.target &&
    previousSnapshot.fingerprint === snapshot.fingerprint
  ) {
    return result('needs_evidence', 'snapshot_not_advanced', action);
  }

  if (!observationContract.knownStates.includes(snapshot.state)) {
    return result('blocked', 'unrecognized_observed_state', action, {
      observedState: snapshot.state,
    });
  }

  if (snapshot.state !== action.expectedState) {
    return result('not_observed', 'expected_state_not_observed', action, {
      observedState: snapshot.state,
    });
  }

  return result('observed', 'expected_state_observed', action);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessObservationSnapshot({
    action: {
      correlationId: 'ui-click-demo',
      target: 'submit-status',
      expectedState: 'submitted',
    },
    observationContract: {
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
    },
    snapshot: {
      observedAt: 'step-2',
      source: 'ui_state_assertion',
      correlationId: 'ui-click-demo',
      target: 'submit-status',
      state: 'submitted',
      evidenceStatus: 'observed',
      freshness: 'fresh',
      fingerprint: 'status-submitted',
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
