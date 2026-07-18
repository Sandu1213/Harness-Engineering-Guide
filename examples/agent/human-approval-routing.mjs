function result(status, code, actionId, extra = {}) {
  return { status, code, actionId, ...extra };
}

/**
 * Route one proposed action using only injected teaching objects.
 * It does not persist data, invoke tools, or grant real authority.
 */
export function assessHumanApprovalRoute({ action, policy, approval, observation }) {
  const requiredFields = ['id', 'scope', 'effect', 'evidence', 'successCriteria'];
  const missing = requiredFields.filter((field) => !action[field]);

  if (missing.length > 0) {
    return result('needs_evidence', 'action_card_incomplete', action.id, { missing });
  }

  if (action.evidence.status !== 'fresh') {
    return result('needs_evidence', 'evidence_not_ready', action.id);
  }

  if (observation.effectStatus === 'unknown') {
    return result('blocked', 'effect_unknown', action.id, {
      effectId: observation.effectId,
    });
  }

  if (approval?.status === 'rejected') {
    return result('rejected', 'approval_rejected', action.id);
  }

  const requiresApproval =
    policy.requiresApprovalFor.includes(action.effect) ||
    !policy.allowsAutoFor.includes(action.effect);

  if (!requiresApproval) {
    return result('allowed', 'auto_candidate', action.id);
  }

  if (!approval) {
    return result('requires_approval', 'approval_required', action.id);
  }

  if (approval.status !== 'approved') {
    return result('requires_approval', `approval_${approval.status}`, action.id);
  }

  if (approval.scope !== action.scope) {
    return result('requires_approval', 'approval_scope_mismatch', action.id);
  }

  if (approval.evidenceStatus !== action.evidence.status) {
    return result('requires_approval', 'approval_evidence_mismatch', action.id);
  }

  return result('allowed', 'approval_matches_action', action.id);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessHumanApprovalRoute({
    action: {
      id: 'dependency-update-plan',
      scope: 'prepare-isolated-change',
      effect: 'reversible_write',
      evidence: { status: 'fresh' },
      successCriteria: 'reviewed-test-plan',
    },
    policy: {
      allowsAutoFor: ['read_only', 'reversible_write'],
      requiresApprovalFor: ['irreversible_write', 'sensitive_write'],
    },
    approval: null,
    observation: { effectStatus: 'not_started' },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
