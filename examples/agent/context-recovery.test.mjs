import assert from 'node:assert/strict';
import test from 'node:test';

import { recoverTask } from './context-recovery.mjs';

function createSnapshot(overrides = {}) {
  return {
    currentState: {
      chapter: '03',
      nextPhase: 'outline',
      research: 'complete',
      outline: 'not_started',
    },
    progress: {
      research: 'complete',
      outline: 'not_started',
    },
    artifacts: {
      research: { present: true },
    },
    historySummary: {},
    ...overrides,
  };
}

test('should make the outline task claimable when required context agrees', () => {
  const result = recoverTask(createSnapshot());

  assert.equal(result.state, 'ready');
  assert.equal(result.phase, 'task_claimable');
  assert.equal(result.task, 'outline');
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.conflicts, []);
  assert.deepEqual(result.requiredInputs, [
    'currentState',
    'progress',
    'artifacts.research',
  ]);
  assert.deepEqual(result.evidence, [
    'research artifact is present',
    'current state and progress agree on outline',
  ]);
});

test('should block the outline task when the research artifact is missing', () => {
  const result = recoverTask(createSnapshot({
    artifacts: { research: { present: false } },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'missing_prerequisite');
  assert.deepEqual(result.missing, ['artifacts.research']);
  assert.deepEqual(result.conflicts, []);
  assert.deepEqual(result.evidence, ['research artifact is required before outline']);
});

test('should block when current state names a different next phase', () => {
  const result = recoverTask(createSnapshot({
    currentState: {
      chapter: '03',
      nextPhase: 'draft',
      research: 'complete',
      outline: 'not_started',
    },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'state_conflict');
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.conflicts, ['current state does not name outline as the next phase']);
  assert.deepEqual(result.evidence, ['confirm the next phase before claiming outline work']);
});

test('should block when current state and progress disagree about the outline phase', () => {
  const result = recoverTask(createSnapshot({
    currentState: {
      chapter: '03',
      nextPhase: 'outline',
      research: 'complete',
      outline: 'complete',
    },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'state_conflict');
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.conflicts, ['outline status differs between current state and progress']);
  assert.deepEqual(result.evidence, ['resolve the status conflict with reproducible evidence before claiming work']);
});

test('should not let a history summary override current unfinished state', () => {
  const result = recoverTask(createSnapshot({
    historySummary: { outline: 'complete' },
  }));

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'state_conflict');
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.conflicts, ['history summary conflicts with current unfinished outline state']);
  assert.deepEqual(result.evidence, ['current state takes precedence until reproducible evidence resolves the conflict']);
});
