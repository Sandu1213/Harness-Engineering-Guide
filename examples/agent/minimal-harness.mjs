/** @typedef {{ ok: true, output: string } | { ok: false, error: string }} ToolResult */

/**
 * Create the deterministic tool used by the example.
 *
 * @returns {(task: string) => ToolResult}
 */
export function createEchoTool() {
  return (task) => ({ ok: true, output: task.toUpperCase() });
}

/**
 * Run one in-memory task through instruction, tool, validation, and evidence recording.
 *
 * @param {{
 *   instruction: string,
 *   task: string,
 *   tool: (task: string) => ToolResult,
 *   validate: (result: ToolResult) => boolean,
 * }} input
 * @returns {{
 *   instruction: string,
 *   task: string,
 *   state: 'succeeded' | 'failed',
 *   output: string | null,
 *   evidence: string,
 *   events: string[],
 *   failure: string | null,
 * }}
 */
export function runHarness({ instruction, task, tool, validate }) {
  requireNonEmptyString(instruction, 'instruction');
  requireNonEmptyString(task, 'task');

  if (typeof tool !== 'function') {
    throw new TypeError('tool must be a function');
  }

  if (typeof validate !== 'function') {
    throw new TypeError('validate must be a function');
  }

  const events = ['planned', 'tool_called'];
  const toolResult = tool(task);

  if (!toolResult || typeof toolResult.ok !== 'boolean') {
    throw new TypeError('tool must return an object with an ok boolean');
  }

  if (!toolResult.ok) {
    return {
      instruction,
      task,
      state: 'failed',
      output: null,
      evidence: 'tool reported failure',
      events: [...events, 'tool_failed'],
      failure: toolResult.error || 'tool returned a failed result',
    };
  }

  if (validate(toolResult) !== true) {
    return {
      instruction,
      task,
      state: 'failed',
      output: toolResult.output,
      evidence: 'validator rejected tool output',
      events: [...events, 'validation_failed'],
      failure: 'validator rejected tool output',
    };
  }

  return {
    instruction,
    task,
    state: 'succeeded',
    output: toolResult.output,
    evidence: 'validator accepted tool output',
    events: [...events, 'validated'],
    failure: null,
  };
}

/** @param {unknown} value @param {string} name */
function requireNonEmptyString(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${name} must be a non-empty string`);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = runHarness({
    instruction: 'Return the task in uppercase.',
    task: 'verify state',
    tool: createEchoTool(),
    validate: ({ output }) => output === 'VERIFY STATE',
  });

  console.log(JSON.stringify(result, null, 2));
}
