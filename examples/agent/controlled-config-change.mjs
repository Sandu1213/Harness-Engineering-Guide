/** Read an own property by a dot-separated configuration key. */
function readSnapshotValue(snapshot, key) {
  return key.split('.').reduce((current, segment) => {
    if (!current || typeof current !== 'object' || !Object.hasOwn(current, segment)) {
      return undefined;
    }

    return current[segment];
  }, snapshot);
}

/** Reject malformed teaching inputs before evaluating a configuration change. */
function validateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    throw new TypeError('snapshot must be an object');
  }

  const { proposal, policy, before, execution, approval } = snapshot;

  if (!proposal || typeof proposal !== 'object') {
    throw new TypeError('proposal must be an object');
  }

  if (typeof proposal.key !== 'string' || proposal.key === '' || typeof proposal.scope !== 'string' || proposal.scope === '' || typeof proposal.risk !== 'string' || proposal.risk === '') {
    throw new TypeError('proposal must include non-empty key, scope, and risk strings');
  }

  if (!policy || typeof policy !== 'object' || !Array.isArray(policy.allowedKeys) || !Array.isArray(policy.allowedScopes) || typeof policy.requiresApproval !== 'boolean') {
    throw new TypeError('policy must include allowedKeys, allowedScopes, and requiresApproval');
  }

  if (policy.allowedKeys.some((key) => typeof key !== 'string' || key === '') || policy.allowedScopes.some((scope) => typeof scope !== 'string' || scope === '')) {
    throw new TypeError('policy allowlists must contain non-empty strings');
  }

  if (!before || typeof before !== 'object') {
    throw new TypeError('before must be an object');
  }

  if (!execution || typeof execution !== 'object' || typeof execution.kind !== 'string') {
    throw new TypeError('execution must include a kind string');
  }

  if (!approval || typeof approval !== 'object' || typeof approval.granted !== 'boolean') {
    throw new TypeError('approval.granted must be a boolean');
  }
}

/**
 * Evaluate a deterministic, in-memory configuration-change snapshot.
 * It performs no filesystem, network, process, credential, or environment I/O.
 *
 * @param {{
 *   proposal: { key: string, expectedValue: unknown, scope: string, risk: string },
 *   policy: { allowedKeys: string[], allowedScopes: string[], requiresApproval: boolean },
 *   before: object,
 *   execution: { kind: 'applied' | 'rejected', observedValue?: unknown, reason?: string },
 *   approval: { granted: boolean },
 * }} snapshot
 * @returns {{
 *   state: 'succeeded' | 'blocked' | 'escalated',
 *   phase: 'verified' | 'preflight_rejected' | 'validation_rejected' | 'approval_required' | 'execution_rejected',
 *   change: { key: string, scope: string, before: unknown, observed: unknown | null },
 *   evidence: string[],
 *   failure: string | null,
 *   recovery: { action: 'restore_before_snapshot', key: string, value: unknown } | null,
 *   escalation: { reason: string, requestedAction: string } | null,
 *   events: string[],
 * }}
 */
export function evaluateConfigChange(snapshot) {
  validateSnapshot(snapshot);

  const { proposal, policy, before, execution, approval } = snapshot;
  const beforeValue = readSnapshotValue(before, proposal.key);
  const events = ['snapshot_received'];
  const baseChange = {
    key: proposal.key,
    scope: proposal.scope,
    before: beforeValue,
    observed: null,
  };

  if (!policy.allowedKeys.includes(proposal.key)) {
    events.push('preflight_rejected');
    return {
      state: 'blocked',
      phase: 'preflight_rejected',
      change: baseChange,
      evidence: ['proposal key is outside allowedKeys'],
      failure: 'proposal key is not allowed by policy',
      recovery: null,
      escalation: null,
      events,
    };
  }

  if (!policy.allowedScopes.includes(proposal.scope)) {
    events.push('preflight_rejected');
    return {
      state: 'blocked',
      phase: 'preflight_rejected',
      change: baseChange,
      evidence: ['proposal scope is outside allowedScopes'],
      failure: 'proposal scope is not allowed by policy',
      recovery: null,
      escalation: null,
      events,
    };
  }

  if (beforeValue === undefined) {
    events.push('preflight_rejected');
    return {
      state: 'blocked',
      phase: 'preflight_rejected',
      change: baseChange,
      evidence: ['before snapshot does not contain the proposal key'],
      failure: 'before snapshot is missing the proposal key',
      recovery: null,
      escalation: null,
      events,
    };
  }

  events.push('preflight_passed');

  const approvalRequired = policy.requiresApproval || proposal.risk === 'irreversible';
  if (approvalRequired && !approval.granted) {
    events.push('approval_required');
    return {
      state: 'escalated',
      phase: 'approval_required',
      change: baseChange,
      evidence: [
        'proposal key and scope are allowed',
        'approval has not been granted',
      ],
      failure: 'approval is required before this action',
      recovery: null,
      escalation: {
        reason: 'proposal risk requires human approval',
        requestedAction: proposal.key,
      },
      events,
    };
  }

  if (execution.kind === 'rejected') {
    events.push('execution_rejected');
    return {
      state: 'blocked',
      phase: 'execution_rejected',
      change: baseChange,
      evidence: ['execution result was rejected before verification'],
      failure: typeof execution.reason === 'string' && execution.reason !== ''
        ? execution.reason
        : 'execution result was rejected',
      recovery: null,
      escalation: null,
      events,
    };
  }

  if (execution.kind !== 'applied' || !Object.hasOwn(execution, 'observedValue')) {
    throw new TypeError('execution must be rejected or applied with observedValue');
  }

  const change = {
    ...baseChange,
    observed: execution.observedValue,
  };
  events.push('execution_observed');

  if (!Object.is(execution.observedValue, proposal.expectedValue)) {
    events.push('validation_rejected');
    return {
      state: 'blocked',
      phase: 'validation_rejected',
      change,
      evidence: ['observed value does not match expected value'],
      failure: 'observed value does not match expected value',
      recovery: {
        action: 'restore_before_snapshot',
        key: proposal.key,
        value: beforeValue,
      },
      escalation: null,
      events,
    };
  }

  events.push('verified');
  return {
    state: 'succeeded',
    phase: 'verified',
    change,
    evidence: [
      'proposal key and scope are allowed',
      'observed value matches expected value',
    ],
    failure: null,
    recovery: null,
    escalation: null,
    events,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = evaluateConfigChange({
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
  });

  console.log(JSON.stringify(result, null, 2));
}
