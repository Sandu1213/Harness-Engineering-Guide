/**
 * Run a deterministic, in-memory example of the boundary between a Harness
 * and a runtime. It performs no filesystem, network, credential, or process I/O.
 *
 * @param {{
 *   allowedPaths: string[],
 *   candidate: { path: string, content: string },
 *   runtime: { write: (candidate: { path: string, content: string }) => { ok: boolean, observedContent?: string, error?: string } },
 *   validate: (observation: { path: string, observedContent: string }) => boolean,
 * }} input
 * @returns {{
 *   state: 'succeeded' | 'failed' | 'blocked',
 *   phase: 'candidate_rejected' | 'runtime_rejected' | 'validation_rejected' | 'validated',
 *   observation: string | null,
 *   evidence: string,
 *   failure: string | null,
 *   events: string[],
 * }}
 */
export function runBoundaryHarness({ allowedPaths, candidate, runtime, validate }) {
  if (!Array.isArray(allowedPaths) || allowedPaths.some((path) => typeof path !== 'string' || path === '')) {
    throw new TypeError('allowedPaths must be an array of non-empty path prefixes');
  }

  if (!candidate || typeof candidate.path !== 'string' || typeof candidate.content !== 'string') {
    throw new TypeError('candidate must include string path and content values');
  }

  if (!runtime || typeof runtime.write !== 'function') {
    throw new TypeError('runtime.write must be a function');
  }

  if (typeof validate !== 'function') {
    throw new TypeError('validate must be a function');
  }

  const events = ['candidate_received'];
  const candidateAllowed = allowedPaths.some((allowedPath) => candidate.path.startsWith(allowedPath));

  if (!candidateAllowed) {
    events.push('candidate_rejected');
    return {
      state: 'failed',
      phase: 'candidate_rejected',
      observation: null,
      evidence: 'candidate rejected before runtime execution',
      failure: 'candidate path is outside allowed paths',
      events,
    };
  }

  events.push('execution_requested');
  const runtimeResult = runtime.write(candidate);

  if (!runtimeResult || typeof runtimeResult.ok !== 'boolean') {
    throw new TypeError('runtime.write must return an object with boolean ok');
  }

  if (!runtimeResult.ok) {
    events.push('runtime_rejected');
    return {
      state: 'blocked',
      phase: 'runtime_rejected',
      observation: null,
      evidence: 'runtime rejected execution',
      failure: runtimeResult.error || 'runtime returned a failed result',
      events,
    };
  }

  if (typeof runtimeResult.observedContent !== 'string') {
    throw new TypeError('a successful runtime result must include observedContent');
  }

  events.push('observation_received');
  const accepted = validate({
    path: candidate.path,
    observedContent: runtimeResult.observedContent,
  });

  if (!accepted) {
    events.push('validation_rejected');
    return {
      state: 'failed',
      phase: 'validation_rejected',
      observation: runtimeResult.observedContent,
      evidence: 'validator rejected runtime observation',
      failure: 'validator rejected runtime observation',
      events,
    };
  }

  events.push('validated');
  return {
    state: 'succeeded',
    phase: 'validated',
    observation: runtimeResult.observedContent,
    evidence: 'validator accepted runtime observation',
    failure: null,
    events,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = runBoundaryHarness({
    allowedPaths: ['docs/'],
    candidate: { path: 'docs/chapter.md', content: 'boundary verified' },
    runtime: {
      write: ({ content }) => ({ ok: true, observedContent: content }),
    },
    validate: ({ path, observedContent }) => path === 'docs/chapter.md' && observedContent === 'boundary verified',
  });

  console.log(JSON.stringify(result, null, 2));
}
