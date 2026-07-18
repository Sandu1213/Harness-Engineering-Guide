import assert from 'node:assert/strict';
import test from 'node:test';

import { assessWorkflowTransition } from './workflow-transition-assessment.mjs';

const contract = {
  version: 'chapter-10-v1',
  terminalStates: ['validated', 'stopped'],
  transitions: [
    { from: 'ready', to: 'in_progress', kind: 'read_only' },
    { from: 'in_progress', to: 'ready_for_validation', kind: 'read_only' },
    { from: 'ready_for_validation', to: 'validated', kind: 'read_only', requiresCheckpoint: true },
    { from: 'ready_for_validation', to: 'in_progress', kind: 'recovery', requiresCheckpoint: true },
    { from: 'in_progress', to: 'blocked', kind: 'recovery' },
    { from: 'blocked', to: 'in_progress', kind: 'recovery', requiresCheckpoint: true },
    { from: 'in_progress', to: 'requires_approval', kind: 'write' },
    { from: 'requires_approval', to: 'in_progress', kind: 'write', requiresCheckpoint: true },
  ],
};

function createInput({
  currentState = 'ready',
  to = 'in_progress',
  checkpoint = { id: 'checkpoint-1' },
  handoff = { currentState },
  observation = { kind: 'read_only', status: 'observed' },
  approval = { status: 'active', scope: 'write' },
} = {}) {
  return {
    contract,
    stateRecord: {
      workflowVersion: 'chapter-10-v1',
      currentState,
      checkpoint,
      handoff,
    },
    request: { to, observation, approval },
  };
}

test('allows a declared legal read-only transition', () => {
  assert.deepEqual(assessWorkflowTransition(createInput()), {
    status: 'allowed',
    code: 'legal_transition',
    from: 'ready',
    to: 'in_progress',
  });
});

test('blocks re-entry from a terminal state', () => {
  assert.deepEqual(
    assessWorkflowTransition(createInput({ currentState: 'validated' })),
    {
      status: 'blocked',
      code: 'terminal_state_reentry',
      from: 'validated',
      to: 'in_progress',
    },
  );
});

test('requests evidence when a checkpoint is required but missing', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({
        currentState: 'blocked',
        checkpoint: null,
        handoff: { currentState: 'blocked' },
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'missing_checkpoint',
      from: 'blocked',
      to: 'in_progress',
    },
  );
});

test('blocks an unknown write effect before requesting approval', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({
        currentState: 'in_progress',
        to: 'requires_approval',
        handoff: { currentState: 'in_progress' },
        observation: { kind: 'write', status: 'unknown', effectId: 'write-1' },
      }),
    ),
    {
      status: 'blocked',
      code: 'unknown_external_effect',
      from: 'in_progress',
      to: 'requires_approval',
      effectId: 'write-1',
    },
  );
});

test('requires a fresh approval snapshot for a write transition', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({
        currentState: 'requires_approval',
        handoff: { currentState: 'requires_approval' },
        observation: { kind: 'write', status: 'observed', effectId: 'write-2' },
        approval: { status: 'expired', scope: 'write' },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_expired',
      from: 'requires_approval',
      to: 'in_progress',
    },
  );
});

test('blocks a handoff whose stated state conflicts with the state record', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({ handoff: { currentState: 'blocked' } }),
    ),
    {
      status: 'blocked',
      code: 'conflicting_handoff',
      from: 'ready',
      to: 'in_progress',
    },
  );
});

test('allows a checkpointed recovery after validation rejection', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({
        currentState: 'ready_for_validation',
        handoff: { currentState: 'ready_for_validation' },
        observation: { kind: 'read_only', status: 'rejected' },
      }),
    ),
    {
      status: 'allowed',
      code: 'recovery_after_validation_rejection',
      from: 'ready_for_validation',
      to: 'in_progress',
    },
  );
});

test('requires accepted validation evidence before reaching the validated state', () => {
  assert.deepEqual(
    assessWorkflowTransition(
      createInput({
        currentState: 'ready_for_validation',
        to: 'validated',
        handoff: { currentState: 'ready_for_validation' },
        observation: { kind: 'read_only', status: 'observed' },
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'validation_not_accepted',
      from: 'ready_for_validation',
      to: 'validated',
    },
  );
});
