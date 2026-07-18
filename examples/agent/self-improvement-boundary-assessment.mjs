/**
 * 对注入的改进候选作教学用变更门判断。
 * 不写入配置、不部署、不监控真实系统，也不运行长期任务。
 */
export function assessImprovementChange({ candidate, evidence, approval }) {
  if (!candidate?.id || !candidate.target || !candidate.scope || !candidate.proposedChange) {
    return result('needs_spec', 'candidate_spec_incomplete', candidate?.id);
  }

  const validation = evidence?.independentValidation;
  if (!validation || validation.status !== 'passed') {
    return validation?.status === 'failed'
      ? result('rejected', 'independent_validation_failed', candidate.id)
      : result('needs_evidence', 'independent_validation_not_confirmed', candidate.id);
  }

  if (validation.scope !== candidate.scope) {
    return result('needs_evidence', 'validation_scope_mismatch', candidate.id);
  }

  if (approval?.status !== 'approved') {
    return result('needs_approval', 'release_approval_missing', candidate.id);
  }

  if (approval.scope !== candidate.scope) {
    return result('needs_approval', 'approval_scope_mismatch', candidate.id);
  }

  if (evidence?.rollback?.available !== true || evidence.rollback.tested !== true) {
    return result('needs_evidence', 'rollback_not_ready', candidate.id);
  }

  if (!Array.isArray(evidence?.monitoring?.metrics) || evidence.monitoring.metrics.length === 0) {
    return result('needs_evidence', 'monitoring_plan_incomplete', candidate.id);
  }

  return result('ready_for_controlled_release', 'candidate_change_gate_passed', candidate.id);
}

function result(status, code, candidateId) {
  return { status, code, candidateId };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessImprovementChange({
      candidate: {
        id: 'retry-policy-backoff-v2',
        target: 'retry-policy',
        scope: 'staging-only',
        proposedChange: 'increase bounded backoff after independently verified transient failures',
      },
      evidence: {
        independentValidation: { status: 'passed', scope: 'staging-only' },
        rollback: { available: true, tested: true },
        monitoring: { metrics: ['failure-rate', 'recovery-latency'] },
      },
      approval: { status: 'approved', scope: 'staging-only' },
    }),
  );
}
