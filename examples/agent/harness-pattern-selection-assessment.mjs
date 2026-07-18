const PATTERNS = new Set([
  'controlled_single_loop',
  'plan_execute',
  'supervisor_worker',
  'pipeline',
  'event_driven',
]);

const CONCURRENCY_MODES = new Set(['not_requested', 'parallel', 'undeclared']);
const SHARED_STATE_SCOPES = new Set(['none', 'shared']);

/**
 * Assess an injected Pattern Card without scheduling, execution, or I/O.
 * The function never starts agents, workers, plans, pipelines, events, or
 * concurrency, and never reads or writes files, networks, accounts, or tools.
 *
 * @param {unknown} card
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval',
 *   code: string,
 *   next: 'continue_controlled_single_loop' | 'stop' | 'obtain_human_approval',
 *   executionPerformed: false,
 * }}
 */
export function assessHarnessPatternSelection(card) {
  if (!isRecord(card)) {
    return stopped('invalid_pattern_card');
  }

  if (!PATTERNS.has(card.pattern)) {
    return stopped('unsupported_pattern');
  }

  if (!hasNonEmptyString(card.trigger)) {
    return stopped('trigger_undefined');
  }

  if (!hasNonEmptyString(card.controlOwner)) {
    return stopped('control_owner_undefined');
  }

  if (!hasNonEmptyString(card.workContract)) {
    return stopped('work_contract_undefined');
  }

  if (!hasNonEmptyString(card.stateAndEvidence)) {
    return stopped('state_and_evidence_undefined');
  }

  if (!hasNonEmptyString(card.stopAndEscalation)) {
    return stopped('stop_and_escalation_undefined');
  }

  if (!hasNonEmptyString(card.evolutionTrigger)) {
    return stopped('evolution_trigger_undefined');
  }

  if (!isRecord(card.execution) || typeof card.execution.requested !== 'boolean') {
    return stopped('execution_boundary_undefined');
  }

  if (card.execution.requested) {
    return requiresApproval('execution_request_requires_human_approval');
  }

  if (card.sideEffectBoundary === 'external_write_requested') {
    return requiresApproval('external_write_requires_human_approval');
  }

  if (card.sideEffectBoundary !== 'no_external_execution') {
    return stopped('side_effect_boundary_undefined');
  }

  const sharedStateDecision = assessSharedState(card.sharedState);
  if (sharedStateDecision) {
    return sharedStateDecision;
  }

  if (!isRecord(card.failureHandling) || !hasNonEmptyString(card.failureHandling.owner)) {
    return requiresApproval('failure_owner_undefined');
  }

  if (card.pattern === 'event_driven') {
    return requiresApproval('event_driven_pattern_requires_human_review');
  }

  if (!isRecord(card.concurrency) || !CONCURRENCY_MODES.has(card.concurrency.mode)) {
    return stopped('concurrency_mode_undefined');
  }

  if (card.pattern === 'supervisor_worker' && card.concurrency.mode === 'parallel') {
    return requiresApproval('concurrent_pattern_requires_human_review');
  }

  if (card.concurrency.mode === 'undeclared') {
    return stopped('concurrency_mode_undefined');
  }

  if (card.pattern === 'controlled_single_loop') {
    if (card.concurrency.mode === 'parallel') {
      return stopped('parallelism_invalid_for_controlled_single_loop');
    }

    return {
      status: 'ready',
      code: 'controlled_single_loop_ready',
      next: 'continue_controlled_single_loop',
      executionPerformed: false,
    };
  }

  return stopped('pattern_not_admitted_for_isolated_example');
}

/** @param {unknown} sharedState */
function assessSharedState(sharedState) {
  if (!isRecord(sharedState) || !SHARED_STATE_SCOPES.has(sharedState.scope)) {
    return stopped('shared_state_scope_undefined');
  }

  if (sharedState.scope === 'shared' && !hasNonEmptyString(sharedState.owner)) {
    return requiresApproval('shared_state_owner_undefined');
  }

  return undefined;
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/** @param {string} code */
function stopped(code) {
  return { status: 'stopped', code, next: 'stop', executionPerformed: false };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_human_approval',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessHarnessPatternSelection({
    pattern: 'controlled_single_loop',
    trigger: 'injected_diagnostic_summary',
    controlOwner: 'analysis_owner',
    workContract: 'read_only_analysis',
    stateAndEvidence: 'symptom_and_scope_record',
    stopAndEscalation: 'human_approval_for_external_effect',
    sideEffectBoundary: 'no_external_execution',
    evolutionTrigger: 'stable_independent_questions',
    concurrency: {
      mode: 'not_requested',
    },
    sharedState: {
      scope: 'none',
      owner: 'analysis_owner',
    },
    failureHandling: {
      owner: 'analysis_owner',
    },
    execution: {
      requested: false,
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
