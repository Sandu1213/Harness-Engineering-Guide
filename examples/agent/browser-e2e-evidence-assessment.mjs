function result(status, code, action, extra = {}) {
  return {
    status,
    code,
    actionId: action.actionId,
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
 * Assess injected E2E evidence without opening a browser or changing an external system.
 */
export function assessBrowserE2EEvidence({
  action,
  beforeSnapshot,
  afterSnapshot,
  evidenceContract,
}) {
  if (action.kind !== evidenceContract.primaryAction) {
    return result('blocked', 'primary_click_missing', action);
  }

  const missingBefore = missingFields(evidenceContract.requiredBeforeFields, beforeSnapshot);
  if (missingBefore.length > 0) {
    return result('needs_evidence', 'before_snapshot_fields_missing', action, {
      missingFields: missingBefore,
    });
  }

  const missingAfter = missingFields(evidenceContract.requiredAfterFields, afterSnapshot);
  if (missingAfter.length > 0) {
    return result('needs_evidence', 'after_snapshot_fields_missing', action, {
      missingFields: missingAfter,
    });
  }

  if (action.dispatchStatus !== 'dispatched') {
    return result('blocked', 'primary_action_not_dispatched', action);
  }

  if (action.effectStatus === 'unknown') {
    return result('blocked', 'primary_action_effect_unknown', action);
  }

  if (beforeSnapshot.target !== action.target) {
    return result('blocked', 'before_snapshot_target_mismatch', action);
  }

  if (afterSnapshot.target !== action.target) {
    return result('blocked', 'after_snapshot_target_mismatch', action);
  }

  if (beforeSnapshot.sequence >= action.sequence) {
    return result('needs_evidence', 'pre_action_snapshot_missing', action);
  }

  if (afterSnapshot.sequence <= action.sequence) {
    return result('needs_evidence', 'post_action_snapshot_missing', action);
  }

  if (beforeSnapshot.snapshotId === afterSnapshot.snapshotId) {
    return result('needs_evidence', 'post_action_snapshot_reused', action);
  }

  if (beforeSnapshot.evidenceStatus !== 'observed') {
    return result('needs_evidence', 'before_snapshot_not_observed', action);
  }

  if (afterSnapshot.evidenceStatus !== 'observed') {
    return result('needs_evidence', 'post_action_snapshot_not_observed', action);
  }

  if (afterSnapshot.state !== action.expectedState) {
    return result('not_observed', 'expected_ui_state_not_observed', action, {
      observedState: afterSnapshot.state,
    });
  }

  return result('observed', 'e2e_evidence_chain_complete', action);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessBrowserE2EEvidence({
    action: {
      actionId: 'submit-order-demo',
      kind: 'click',
      target: 'submit-order',
      sequence: 2,
      dispatchStatus: 'dispatched',
      effectStatus: 'known',
      expectedState: 'submitted',
    },
    beforeSnapshot: {
      snapshotId: 'before-demo',
      sequence: 1,
      target: 'submit-order',
      state: 'ready',
      evidenceStatus: 'observed',
    },
    afterSnapshot: {
      snapshotId: 'after-demo',
      sequence: 3,
      target: 'submit-order',
      state: 'submitted',
      evidenceStatus: 'observed',
    },
    evidenceContract: {
      version: 'chapter-25-v1',
      primaryAction: 'click',
      requiredBeforeFields: ['snapshotId', 'sequence', 'target', 'state', 'evidenceStatus'],
      requiredAfterFields: ['snapshotId', 'sequence', 'target', 'state', 'evidenceStatus'],
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
