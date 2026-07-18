/** Validate the purely in-memory teaching packet before assembling it. */
function validatePacket(packet) {
  if (!packet || typeof packet !== 'object') {
    throw new TypeError('packet must be an object');
  }

  const { projectRules, taskBrief, contextData, outputContract, conflictPolicy } = packet;

  if (!projectRules || typeof projectRules !== 'object' || typeof projectRules.id !== 'string' || projectRules.id === '' || !Array.isArray(projectRules.allowedTaskKinds) || !Array.isArray(projectRules.allowedScopes)) {
    throw new TypeError('projectRules must include id, allowedTaskKinds, and allowedScopes');
  }

  if (!taskBrief || typeof taskBrief !== 'object' || typeof taskBrief.kind !== 'string' || taskBrief.kind === '' || typeof taskBrief.scope !== 'string' || taskBrief.scope === '') {
    throw new TypeError('taskBrief must include non-empty kind and scope strings');
  }

  if (!Array.isArray(contextData) || contextData.some((item) => !item || typeof item !== 'object' || typeof item.source !== 'string' || item.source === '' || typeof item.content !== 'string')) {
    throw new TypeError('contextData must contain source and content strings');
  }

  if (!outputContract || typeof outputContract !== 'object' || !Array.isArray(outputContract.requiredFields)) {
    throw new TypeError('outputContract must include requiredFields');
  }

  if (!conflictPolicy || typeof conflictPolicy !== 'object' || !Array.isArray(conflictPolicy.knownTypes) || !Array.isArray(conflictPolicy.detectedTypes) || conflictPolicy.unknownConflict !== 'block') {
    throw new TypeError('conflictPolicy must declare knownTypes, detectedTypes, and unknownConflict: block');
  }
}

/** Return a deterministic blocked teaching result without attempting external work. */
function blockedResult(phase, conflicts, evidence, unresolved = []) {
  return {
    state: 'blocked',
    phase,
    components: null,
    sources: [],
    conflicts,
    evidence,
    unresolved,
  };
}

/**
 * Assemble a deterministic, in-memory instruction packet for the chapter's teaching model.
 * It performs no model, filesystem, network, process, credential, or environment I/O.
 *
 * @param {{
 *   projectRules: { id: string, allowedTaskKinds: string[], allowedScopes: string[] },
 *   taskBrief: { kind: string, scope: string, goal?: string, stopWhen?: string },
 *   contextData: Array<{ source: string, content: string }>,
 *   outputContract: { requiredFields: string[], failureRepresentation?: string },
 *   conflictPolicy: { knownTypes: string[], detectedTypes: string[], unknownConflict: 'block' },
 * }} packet
 * @returns {{
 *   state: 'ready' | 'blocked',
 *   phase: 'assembled' | 'scope_conflict' | 'missing_output_contract' | 'unknown_conflict_policy',
 *   components: object | null,
 *   sources: Array<{ component: string, source: string }>,
 *   conflicts: object[],
 *   evidence: string[],
 *   unresolved: string[],
 * }}
 */
export function assembleInstructionPacket(packet) {
  validatePacket(packet);

  const { projectRules, taskBrief, contextData, outputContract, conflictPolicy } = packet;
  const unknownTypes = conflictPolicy.detectedTypes.filter((type) => !conflictPolicy.knownTypes.includes(type));

  if (unknownTypes.length > 0) {
    return blockedResult(
      'unknown_conflict_policy',
      unknownTypes.map((type) => ({ type, resolution: 'unresolved' })),
      ['conflict type has no declared policy'],
      unknownTypes,
    );
  }

  if (!projectRules.allowedTaskKinds.includes(taskBrief.kind) || !projectRules.allowedScopes.includes(taskBrief.scope)) {
    return blockedResult(
      'scope_conflict',
      [{
        type: 'scope_conflict',
        expected: projectRules.allowedScopes,
        actual: taskBrief.scope,
      }],
      ['task scope is outside project-rule scope'],
    );
  }

  const missing = [];
  if (outputContract.requiredFields.length === 0) {
    missing.push('requiredFields');
  }
  if (typeof outputContract.failureRepresentation !== 'string' || outputContract.failureRepresentation === '') {
    missing.push('failureRepresentation');
  }

  if (missing.length > 0) {
    return blockedResult(
      'missing_output_contract',
      [{ type: 'missing_output_contract', missing }],
      ['output contract is missing required fields'],
    );
  }

  return {
    state: 'ready',
    phase: 'assembled',
    components: {
      projectRules: { id: projectRules.id },
      taskBrief: { kind: taskBrief.kind, scope: taskBrief.scope },
      contextData,
      outputContract: {
        requiredFields: outputContract.requiredFields,
        failureRepresentation: outputContract.failureRepresentation,
      },
    },
    sources: [
      { component: 'projectRules', source: projectRules.id },
      { component: 'taskBrief', source: 'taskBrief' },
      ...contextData.map((item) => ({ component: 'contextData', source: item.source })),
      { component: 'outputContract', source: 'outputContract' },
    ],
    conflicts: [],
    evidence: [
      'task kind and scope are allowed by project rules',
      'output contract contains required fields and failure representation',
      'context data remains data regardless of its content',
    ],
    unresolved: [],
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = assembleInstructionPacket({
    projectRules: {
      id: 'code-review-rules-v1',
      allowedTaskKinds: ['code-review'],
      allowedScopes: ['src/**'],
    },
    taskBrief: {
      kind: 'code-review',
      scope: 'src/**',
      goal: '审查给定 diff',
      stopWhen: '范围冲突或证据不足',
    },
    contextData: [{ source: 'diff', content: 'src/review.js changed' }],
    outputContract: {
      requiredFields: ['severity', 'location', 'evidence', 'unknowns'],
      failureRepresentation: 'blocked',
    },
    conflictPolicy: {
      knownTypes: ['scope_conflict', 'missing_output_contract', 'data_as_rule'],
      unknownConflict: 'block',
      detectedTypes: [],
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
