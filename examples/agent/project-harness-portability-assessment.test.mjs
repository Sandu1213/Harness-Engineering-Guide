import assert from 'node:assert/strict';
import test from 'node:test';

import { assessProjectHarnessPortability } from './project-harness-portability-assessment.mjs';

const shared = {
  rules: { readOrder: ['entry', 'stable-rules', 'current-state'] },
  taskState: { taskId: 'chapter-21-review', status: 'ready' },
  handoff: { nextTask: 'technical-review' },
  validation: { scope: 'chapter-21', checks: ['markdownlint', 'links'] },
};

function adapter(overrides = {}) {
  return {
    productId: 'codex',
    instructionSurface: 'AGENTS.md',
    productEvidence: { reviewedAt: '2026-07-16', source: 'official-docs' },
    rulesAreEnforcement: false,
    permissionBoundaryDeclared: true,
    ...overrides,
  };
}

test('marks the same shared repository contract portable across two declared product adapters', () => {
  const codex = assessProjectHarnessPortability({ shared, adapter: adapter() });
  const claudeCode = assessProjectHarnessPortability({
    shared,
    adapter: adapter({ productId: 'claude-code', instructionSurface: 'CLAUDE.md' }),
  });

  assert.deepEqual(codex, {
    status: 'portable',
    code: 'shared_contract_and_adapter_boundary_present',
    productId: 'codex',
  });
  assert.deepEqual(claudeCode, {
    status: 'portable',
    code: 'shared_contract_and_adapter_boundary_present',
    productId: 'claude-code',
  });
});

test('requires shared state rather than treating an instruction file as the task record', () => {
  assert.deepEqual(
    assessProjectHarnessPortability({
      shared: { ...shared, taskState: undefined },
      adapter: adapter(),
    }),
    {
      status: 'needs_shared_context',
      code: 'task_state_missing',
      productId: 'codex',
    },
  );
});

test('requires adapter evidence before assigning product-specific loading behavior', () => {
  assert.deepEqual(
    assessProjectHarnessPortability({
      shared,
      adapter: adapter({ productEvidence: { source: 'official-docs' } }),
    }),
    {
      status: 'needs_adapter_evidence',
      code: 'adapter_evidence_incomplete',
      productId: 'codex',
    },
  );
});

test('flags the claim that context rules are an enforcement mechanism', () => {
  assert.deepEqual(
    assessProjectHarnessPortability({
      shared,
      adapter: adapter({ rulesAreEnforcement: true }),
    }),
    {
      status: 'needs_boundary_review',
      code: 'context_rules_not_enforcement',
      productId: 'codex',
    },
  );
});

test('requires a declared permission boundary even when the task handoff is ready', () => {
  assert.deepEqual(
    assessProjectHarnessPortability({
      shared,
      adapter: adapter({ permissionBoundaryDeclared: false }),
    }),
    {
      status: 'needs_adapter_evidence',
      code: 'permission_boundary_missing',
      productId: 'codex',
    },
  );
});

test('does not fabricate file, network, account, or tool execution fields', () => {
  const result = assessProjectHarnessPortability({ shared, adapter: adapter() });

  assert.equal(Object.hasOwn(result, 'filesRead'), false);
  assert.equal(Object.hasOwn(result, 'networkUsed'), false);
  assert.equal(Object.hasOwn(result, 'toolExecuted'), false);
  assert.equal(Object.hasOwn(result, 'account'), false);
});
