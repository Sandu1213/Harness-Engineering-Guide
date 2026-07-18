/**
 * 对共享仓库工件和产品适配声明作纯内存教学判断。
 * 不读取 AGENTS.md、CLAUDE.md、配置、环境、账户或网络，也不调用任何 Tool。
 */
export function assessProjectHarnessPortability({ shared, adapter }) {
  const productId = adapter?.productId;

  if (!shared?.rules?.readOrder?.length) {
    return result('needs_shared_context', 'rules_read_order_missing', productId);
  }

  if (!shared?.taskState?.taskId || !shared.taskState.status) {
    return result('needs_shared_context', 'task_state_missing', productId);
  }

  if (!shared?.handoff?.nextTask) {
    return result('needs_shared_context', 'handoff_next_task_missing', productId);
  }

  if (!shared?.validation?.scope || !Array.isArray(shared.validation.checks) || shared.validation.checks.length === 0) {
    return result('needs_shared_context', 'validation_contract_missing', productId);
  }

  if (!productId || !adapter.instructionSurface) {
    return result('needs_adapter_evidence', 'adapter_identity_incomplete', productId);
  }

  if (!adapter.productEvidence?.reviewedAt || !adapter.productEvidence.source) {
    return result('needs_adapter_evidence', 'adapter_evidence_incomplete', productId);
  }

  if (adapter.rulesAreEnforcement === true) {
    return result('needs_boundary_review', 'context_rules_not_enforcement', productId);
  }

  if (adapter.permissionBoundaryDeclared !== true) {
    return result('needs_adapter_evidence', 'permission_boundary_missing', productId);
  }

  return result('portable', 'shared_contract_and_adapter_boundary_present', productId);
}

function result(status, code, productId) {
  return { status, code, productId };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessProjectHarnessPortability({
      shared: {
        rules: { readOrder: ['entry', 'stable-rules', 'current-state'] },
        taskState: { taskId: 'chapter-21-review', status: 'ready' },
        handoff: { nextTask: 'technical-review' },
        validation: { scope: 'chapter-21', checks: ['markdownlint', 'links'] },
      },
      adapter: {
        productId: 'codex',
        instructionSurface: 'AGENTS.md',
        productEvidence: { reviewedAt: '2026-07-16', source: 'official-docs' },
        rulesAreEnforcement: false,
        permissionBoundaryDeclared: true,
      },
    }),
  );
}
