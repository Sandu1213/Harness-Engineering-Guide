function result(status, code, taskId, extra = {}) {
  return { status, code, taskId, ...extra };
}

/**
 * Assess injected teaching objects without reading local state or performing an action.
 */
export function assessEnvironmentAccess({ task, environment, policy, approval }) {
  const taskId = task.id;

  if (!environment.allowedEffects.includes(task.effect)) {
    return result('blocked', 'effect_not_allowed_in_environment', taskId);
  }

  if (!environment.targetScopes.includes(task.targetScope)) {
    return result('blocked', 'target_scope_not_allowed_in_environment', taskId);
  }

  const requiredBoundary = policy.requiredBoundaryByEffect[task.effect];
  if (!requiredBoundary) {
    return result('blocked', 'boundary_policy_missing', taskId);
  }

  for (const boundary of ['filesystem', 'network']) {
    if (environment[boundary] !== requiredBoundary[boundary]) {
      return result('blocked', 'boundary_not_satisfied', taskId, { boundary });
    }
  }

  if (!environment.credentialScopes.includes(task.credentialScope)) {
    return result('blocked', 'credential_scope_missing', taskId);
  }

  if (policy.approvalRequiredEffects.includes(task.effect)) {
    if (!approval) {
      return result('requires_approval', 'approval_missing', taskId);
    }

    if (approval.status !== 'active') {
      return result('requires_approval', `approval_${approval.status}`, taskId);
    }

    if (approval.environmentId !== environment.id || approval.effect !== task.effect) {
      return result('requires_approval', 'approval_scope_mismatch', taskId);
    }
  }

  return result('allowed', 'environment_admission_allowed', taskId);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessEnvironmentAccess({
    task: {
      id: 'inspect-preview',
      effect: 'read_only',
      targetScope: 'preview',
      credentialScope: 'none',
    },
    environment: {
      id: 'dry-run',
      allowedEffects: ['read_only'],
      targetScopes: ['preview'],
      filesystem: 'read_only',
      network: 'disabled',
      credentialScopes: ['none'],
    },
    policy: {
      requiredBoundaryByEffect: {
        read_only: { filesystem: 'read_only', network: 'disabled' },
      },
      approvalRequiredEffects: [],
    },
    approval: null,
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
