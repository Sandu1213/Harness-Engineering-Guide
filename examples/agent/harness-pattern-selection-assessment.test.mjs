import assert from 'node:assert/strict';
import test from 'node:test';

import { assessHarnessPatternSelection } from './harness-pattern-selection-assessment.mjs';

function validCard(overrides = {}) {
  return {
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
    ...overrides,
  };
}

test('continues a complete controlled single loop without execution', () => {
  assert.deepEqual(assessHarnessPatternSelection(validCard()), {
    status: 'ready',
    code: 'controlled_single_loop_ready',
    next: 'continue_controlled_single_loop',
    executionPerformed: false,
  });
});

test('stops when the control owner is missing', () => {
  assert.deepEqual(assessHarnessPatternSelection(validCard({ controlOwner: '' })), {
    status: 'stopped',
    code: 'control_owner_undefined',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when state and evidence are missing', () => {
  assert.deepEqual(assessHarnessPatternSelection(validCard({ stateAndEvidence: '' })), {
    status: 'stopped',
    code: 'state_and_evidence_undefined',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops a controlled single loop that declares invalid parallelism', () => {
  const card = validCard({
    concurrency: {
      mode: 'parallel',
    },
  });

  assert.deepEqual(assessHarnessPatternSelection(card), {
    status: 'stopped',
    code: 'parallelism_invalid_for_controlled_single_loop',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the concurrency state is undeclared', () => {
  const card = validCard({
    concurrency: {
      mode: 'undeclared',
    },
  });

  assert.deepEqual(assessHarnessPatternSelection(card), {
    status: 'stopped',
    code: 'concurrency_mode_undefined',
    next: 'stop',
    executionPerformed: false,
  });
});

test('requires approval for event, concurrent, write, and execution candidates', () => {
  const cases = [
    {
      card: validCard({ pattern: 'event_driven' }),
      code: 'event_driven_pattern_requires_human_review',
    },
    {
      card: validCard({
        pattern: 'supervisor_worker',
        concurrency: {
          mode: 'parallel',
        },
      }),
      code: 'concurrent_pattern_requires_human_review',
    },
    {
      card: validCard({ sideEffectBoundary: 'external_write_requested' }),
      code: 'external_write_requires_human_approval',
    },
    {
      card: validCard({
        execution: {
          requested: true,
        },
      }),
      code: 'execution_request_requires_human_approval',
    },
  ];

  for (const candidate of cases) {
    assert.deepEqual(assessHarnessPatternSelection(candidate.card), {
      status: 'requires_approval',
      code: candidate.code,
      next: 'obtain_human_approval',
      executionPerformed: false,
    });
  }
});

test('routes shared state without an owner to human review', () => {
  const card = validCard({
    sharedState: {
      scope: 'shared',
      owner: '',
    },
  });

  assert.deepEqual(assessHarnessPatternSelection(card), {
    status: 'requires_approval',
    code: 'shared_state_owner_undefined',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});

test('routes an undefined failure owner to human review', () => {
  const card = validCard({
    failureHandling: {
      owner: '',
    },
  });

  assert.deepEqual(assessHarnessPatternSelection(card), {
    status: 'requires_approval',
    code: 'failure_owner_undefined',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});
