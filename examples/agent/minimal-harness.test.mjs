import assert from 'node:assert/strict';
import test from 'node:test';

import { createEchoTool, runHarness } from './minimal-harness.mjs';

test('should record a succeeded run after the validator accepts tool output', () => {
  const result = runHarness({
    instruction: 'Return the task in uppercase.',
    task: 'verify state',
    tool: createEchoTool(),
    validate: ({ output }) => output === 'VERIFY STATE',
  });

  assert.equal(result.state, 'succeeded');
  assert.equal(result.output, 'VERIFY STATE');
  assert.equal(result.evidence, 'validator accepted tool output');
  assert.deepEqual(result.events, ['planned', 'tool_called', 'validated']);
});

test('should stop at a failed tool result without claiming validation', () => {
  const result = runHarness({
    instruction: 'Inspect the task.',
    task: 'verify state',
    tool: () => ({ ok: false, error: 'simulated tool failure' }),
    validate: () => true,
  });

  assert.equal(result.state, 'failed');
  assert.equal(result.failure, 'simulated tool failure');
  assert.deepEqual(result.events, ['planned', 'tool_called', 'tool_failed']);
});

test('should fail when the validator rejects an otherwise successful tool result', () => {
  const result = runHarness({
    instruction: 'Return the task in uppercase.',
    task: 'verify state',
    tool: createEchoTool(),
    validate: () => false,
  });

  assert.equal(result.state, 'failed');
  assert.equal(result.failure, 'validator rejected tool output');
  assert.deepEqual(result.events, ['planned', 'tool_called', 'validation_failed']);
});

test('should reject an empty instruction before the tool is called', () => {
  let toolCalled = false;

  assert.throws(
    () =>
      runHarness({
        instruction: ' ',
        task: 'verify state',
        tool: () => {
          toolCalled = true;
          return { ok: true, output: 'VERIFY STATE' };
        },
        validate: () => true,
      }),
    /instruction must be a non-empty string/,
  );

  assert.equal(toolCalled, false);
});
