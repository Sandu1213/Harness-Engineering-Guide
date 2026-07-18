import assert from 'node:assert/strict';
import test from 'node:test';

import { runBoundaryHarness } from './runtime-boundaries.mjs';

test('should reject a candidate outside allowed paths before calling the runtime', () => {
  let runtimeCalled = false;

  const result = runBoundaryHarness({
    allowedPaths: ['docs/'],
    candidate: { path: 'secrets/config.txt', content: 'change' },
    runtime: {
      write: () => {
        runtimeCalled = true;
        return { ok: true, observedContent: 'change' };
      },
    },
    validate: () => true,
  });

  assert.equal(result.state, 'failed');
  assert.equal(result.phase, 'candidate_rejected');
  assert.equal(result.failure, 'candidate path is outside allowed paths');
  assert.deepEqual(result.events, ['candidate_received', 'candidate_rejected']);
  assert.equal(runtimeCalled, false);
});

test('should preserve a permission rejection as a runtime result without validation', () => {
  let validatorCalled = false;

  const result = runBoundaryHarness({
    allowedPaths: ['docs/'],
    candidate: { path: 'docs/chapter.md', content: 'change' },
    runtime: {
      write: () => ({ ok: false, error: 'permission denied' }),
    },
    validate: () => {
      validatorCalled = true;
      return true;
    },
  });

  assert.equal(result.state, 'blocked');
  assert.equal(result.phase, 'runtime_rejected');
  assert.equal(result.failure, 'permission denied');
  assert.deepEqual(result.events, ['candidate_received', 'execution_requested', 'runtime_rejected']);
  assert.equal(validatorCalled, false);
});

test('should reject a successful runtime observation when validation fails', () => {
  const result = runBoundaryHarness({
    allowedPaths: ['docs/'],
    candidate: { path: 'docs/chapter.md', content: 'change' },
    runtime: {
      write: () => ({ ok: true, observedContent: 'change' }),
    },
    validate: () => false,
  });

  assert.equal(result.state, 'failed');
  assert.equal(result.phase, 'validation_rejected');
  assert.equal(result.observation, 'change');
  assert.equal(result.failure, 'validator rejected runtime observation');
  assert.deepEqual(result.events, [
    'candidate_received',
    'execution_requested',
    'observation_received',
    'validation_rejected',
  ]);
});

test('should accept a validated runtime observation with explicit evidence', () => {
  const result = runBoundaryHarness({
    allowedPaths: ['docs/'],
    candidate: { path: 'docs/chapter.md', content: 'change' },
    runtime: {
      write: () => ({ ok: true, observedContent: 'change' }),
    },
    validate: ({ path, observedContent }) => path === 'docs/chapter.md' && observedContent === 'change',
  });

  assert.equal(result.state, 'succeeded');
  assert.equal(result.phase, 'validated');
  assert.equal(result.observation, 'change');
  assert.equal(result.evidence, 'validator accepted runtime observation');
  assert.deepEqual(result.events, [
    'candidate_received',
    'execution_requested',
    'observation_received',
    'validated',
  ]);
});
