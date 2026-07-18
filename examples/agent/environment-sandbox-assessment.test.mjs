import assert from 'node:assert/strict';
import test from 'node:test';

import { assessEnvironmentAccess } from './environment-sandbox-assessment.mjs';

const createInput = (overrides = {}) => ({
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
      write: { filesystem: 'workspace_write', network: 'disabled' },
      external: { filesystem: 'workspace_write', network: 'allowlisted' },
    },
    approvalRequiredEffects: ['external'],
  },
  approval: null,
  ...overrides,
});

test('allows a dry-run read-only candidate with matching boundary', () => {
  assert.deepEqual(assessEnvironmentAccess(createInput()), {
    status: 'allowed',
    code: 'environment_admission_allowed',
    taskId: 'inspect-preview',
  });
});

test('blocks a write candidate when dry-run does not allow writes', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'update-preview',
          effect: 'write',
          targetScope: 'preview',
          credentialScope: 'test-deploy',
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'effect_not_allowed_in_environment',
      taskId: 'update-preview',
    },
  );
});

test('blocks a candidate when its target scope is outside the environment contract', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'inspect-production',
          effect: 'read_only',
          targetScope: 'production-service',
          credentialScope: 'none',
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'target_scope_not_allowed_in_environment',
      taskId: 'inspect-production',
    },
  );
});

test('allows a test write candidate with matching boundary and credential scope', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'deploy-test',
          effect: 'write',
          targetScope: 'test-service',
          credentialScope: 'test-deploy',
        },
        environment: {
          id: 'test',
          allowedEffects: ['read_only', 'write'],
          targetScopes: ['test-service'],
          filesystem: 'workspace_write',
          network: 'disabled',
          credentialScopes: ['none', 'test-deploy'],
        },
      }),
    ),
    {
      status: 'allowed',
      code: 'environment_admission_allowed',
      taskId: 'deploy-test',
    },
  );
});

test('requires approval for a production external candidate without a snapshot', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'deploy-production',
          effect: 'external',
          targetScope: 'production-service',
          credentialScope: 'production-deploy',
        },
        environment: {
          id: 'production',
          allowedEffects: ['read_only', 'write', 'external'],
          targetScopes: ['production-service'],
          filesystem: 'workspace_write',
          network: 'allowlisted',
          credentialScopes: ['production-deploy'],
        },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_missing',
      taskId: 'deploy-production',
    },
  );
});

test('requires a matching approval scope for an external candidate', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'deploy-production',
          effect: 'external',
          targetScope: 'production-service',
          credentialScope: 'production-deploy',
        },
        environment: {
          id: 'production',
          allowedEffects: ['read_only', 'write', 'external'],
          targetScopes: ['production-service'],
          filesystem: 'workspace_write',
          network: 'allowlisted',
          credentialScopes: ['production-deploy'],
        },
        approval: {
          status: 'active',
          environmentId: 'test',
          effect: 'external',
        },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_scope_mismatch',
      taskId: 'deploy-production',
    },
  );
});

test('blocks a candidate when its injected network boundary does not match policy', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        environment: {
          id: 'dry-run',
          allowedEffects: ['read_only'],
          targetScopes: ['preview'],
          filesystem: 'read_only',
          network: 'allowlisted',
          credentialScopes: ['none'],
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'boundary_not_satisfied',
      taskId: 'inspect-preview',
      boundary: 'network',
    },
  );
});

test('blocks a candidate whose injected credential scope is unavailable', () => {
  assert.deepEqual(
    assessEnvironmentAccess(
      createInput({
        task: {
          id: 'read-test',
          effect: 'read_only',
          targetScope: 'test-service',
          credentialScope: 'test-reader',
        },
        environment: {
          id: 'dry-run',
          allowedEffects: ['read_only'],
          targetScopes: ['preview', 'test-service'],
          filesystem: 'read_only',
          network: 'disabled',
          credentialScopes: ['none'],
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'credential_scope_missing',
      taskId: 'read-test',
    },
  );
});
