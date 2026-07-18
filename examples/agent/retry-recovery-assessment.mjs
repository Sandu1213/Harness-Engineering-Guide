/**
 * 对注入的教学恢复契约作确定性判断。
 * 不执行重试、等待、补偿、人工升级或任何外部 I/O。
 */
export function assessRecoveryDecision({ operation, failure, checkpoint, policy }) {
  if (
    !operation?.id ||
    !operation.target ||
    !Number.isInteger(operation.attempt) ||
    operation.attempt < 1 ||
    !operation.repeatability ||
    !operation.effectStatus ||
    !failure?.kind ||
    !failure.evidenceStatus ||
    !Number.isInteger(policy?.maxAttempts) ||
    policy.maxAttempts < 1 ||
    !Array.isArray(policy.retryableFailures) ||
    !Array.isArray(policy.allowedRepeatability) ||
    typeof policy.requireCheckpointForCompensation !== 'boolean'
  ) {
    return result('needs_spec', 'recovery_contract_incomplete', operation?.id);
  }

  if (!['not_applied', 'applied', 'unknown', 'irreversible'].includes(operation.effectStatus)) {
    return result('needs_spec', 'effect_status_not_supported', operation.id);
  }

  if (!['observed', 'unknown'].includes(failure.evidenceStatus)) {
    return result('needs_observation', 'failure_evidence_not_confirmed', operation.id);
  }

  if (failure.evidenceStatus === 'unknown') {
    return result('needs_observation', 'failure_evidence_unknown', operation.id);
  }

  if (operation.effectStatus === 'unknown') {
    return result('needs_observation', 'effect_status_unknown', operation.id);
  }

  if (operation.effectStatus === 'irreversible') {
    return result('escalate', 'irreversible_effect_requires_human', operation.id);
  }

  if (failure.kind === 'invalid_input' || failure.kind === 'permission_denied') {
    return result('escalate', 'failure_not_retryable', operation.id);
  }

  if (operation.effectStatus === 'applied') {
    if (operation.compensation !== 'available') {
      return result('escalate', 'applied_effect_requires_recovery_plan', operation.id);
    }

    if (policy.requireCheckpointForCompensation && checkpoint?.status !== 'recorded') {
      return result('escalate', 'compensation_checkpoint_missing', operation.id);
    }

    return result('compensate', 'compensation_required', operation.id);
  }

  if (!policy.retryableFailures.includes(failure.kind)) {
    return result('escalate', 'failure_not_retryable', operation.id);
  }

  if (!policy.allowedRepeatability.includes(operation.repeatability)) {
    return result('escalate', 'operation_not_safe_to_repeat', operation.id);
  }

  if (operation.attempt >= policy.maxAttempts) {
    return result('stop', 'retry_budget_exhausted', operation.id);
  }

  return result('retry', 'retry_allowed', operation.id);
}

function result(status, code, operationId) {
  return { status, code, operationId };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessRecoveryDecision({
      operation: {
        id: 'source-fetch-demo',
        target: 'candidate-source',
        repeatability: 'safe',
        effectStatus: 'not_applied',
        attempt: 1,
        compensation: 'none',
      },
      failure: { kind: 'transient_network', evidenceStatus: 'observed' },
      checkpoint: { status: 'recorded', correlationId: 'source-fetch-demo' },
      policy: {
        maxAttempts: 3,
        retryableFailures: ['transient_network', 'rate_limited'],
        allowedRepeatability: ['safe'],
        requireCheckpointForCompensation: true,
      },
    }),
  );
}
