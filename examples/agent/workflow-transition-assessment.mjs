function result(status, code, from, to, extra = {}) {
  return { status, code, from, to, ...extra };
}

/**
 * Assess one proposed state transition using only injected teaching objects.
 * It does not persist state, invoke tools, or grant authority.
 */
export function assessWorkflowTransition({ contract, stateRecord, request }) {
  const from = stateRecord.currentState;
  const to = request.to;

  if (contract.version !== stateRecord.workflowVersion) {
    return result('blocked', 'workflow_version_mismatch', from, to);
  }

  if (contract.terminalStates.includes(from)) {
    return result('blocked', 'terminal_state_reentry', from, to);
  }

  const transition = contract.transitions.find(
    (candidate) => candidate.from === from && candidate.to === to,
  );

  if (!transition) {
    return result('blocked', 'transition_not_allowed', from, to);
  }

  if (stateRecord.handoff?.currentState !== from) {
    return result('blocked', 'conflicting_handoff', from, to);
  }

  if (transition.requiresCheckpoint && !stateRecord.checkpoint?.id) {
    return result('needs_evidence', 'missing_checkpoint', from, to);
  }

  const { observation, approval } = request;

  if (observation.kind === 'write' && observation.status === 'unknown') {
    return result('blocked', 'unknown_external_effect', from, to, {
      effectId: observation.effectId,
    });
  }

  if (transition.kind === 'write') {
    if (!approval) {
      return result('requires_approval', 'approval_missing', from, to);
    }

    if (approval.status !== 'active') {
      return result('requires_approval', `approval_${approval.status}`, from, to);
    }

    if (approval.scope !== 'write') {
      return result('requires_approval', 'approval_scope_mismatch', from, to);
    }
  }

  if (to === 'validated' && observation.status !== 'accepted') {
    return result('needs_evidence', 'validation_not_accepted', from, to);
  }

  if (
    from === 'ready_for_validation' &&
    to === 'in_progress' &&
    observation.status === 'rejected'
  ) {
    return result('allowed', 'recovery_after_validation_rejection', from, to);
  }

  return result('allowed', 'legal_transition', from, to);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessWorkflowTransition({
    contract: {
      version: 'chapter-10-v1',
      terminalStates: ['validated', 'stopped'],
      transitions: [{ from: 'ready', to: 'in_progress', kind: 'read_only' }],
    },
    stateRecord: {
      workflowVersion: 'chapter-10-v1',
      currentState: 'ready',
      handoff: { currentState: 'ready' },
    },
    request: {
      to: 'in_progress',
      observation: { kind: 'read_only', status: 'observed' },
      approval: { status: 'active', scope: 'write' },
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
