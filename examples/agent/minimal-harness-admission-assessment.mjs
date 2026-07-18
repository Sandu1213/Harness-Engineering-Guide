const REQUIRED_STOP_CONDITIONS = [
  'onMissingContract',
  'onDisallowedTool',
  'onMissingEvidencePlan',
];

/**
 * Assess whether a deliberately small, in-memory teaching task has enough
 * contract, scope, evidence-plan, and stop-condition information to proceed.
 * It never invokes a tool or performs external I/O.
 *
 * @param {unknown} candidate
 * @returns {{
 *   status: 'ready' | 'stopped',
 *   code: string,
 *   next: 'run_in_memory_evaluator' | 'stop',
 *   executionPerformed: false,
 *   requiredEvidence?: string[],
 * }}
 */
export function assessMinimalHarnessAdmission(candidate) {
  if (!isRecord(candidate)) {
    return stopped('invalid_candidate');
  }

  const { task, toolRequest, evidencePlan, stopConditions } = candidate;

  if (!hasCompleteTaskContract(task)) {
    return stopped('missing_task_contract');
  }

  if (task.state !== 'ready') {
    return stopped('task_not_ready');
  }

  if (!hasRequiredStopConditions(stopConditions)) {
    return stopped('missing_stop_condition');
  }

  if (!isRecord(toolRequest) || !hasNonEmptyString(toolRequest.id) || !hasNonEmptyString(toolRequest.capability)) {
    return stopped('missing_tool_request');
  }

  if (!task.allowedCapabilities.includes(toolRequest.capability)) {
    return stopped('tool_out_of_scope');
  }

  if (toolRequest.effect !== 'none' || toolRequest.target !== 'in-memory') {
    return stopped('effect_not_allowed');
  }

  if (!hasCompleteEvidencePlan(evidencePlan)) {
    return stopped('missing_evidence_plan');
  }

  if (evidencePlan.correlationId !== task.id) {
    return stopped('evidence_plan_not_linked');
  }

  return {
    status: 'ready',
    code: 'minimal_harness_ready',
    next: 'run_in_memory_evaluator',
    executionPerformed: false,
    requiredEvidence: ['correlationId', 'observation', 'acceptance'],
  };
}

/** @param {unknown} task */
function hasCompleteTaskContract(task) {
  return (
    isRecord(task) &&
    hasNonEmptyString(task.id) &&
    hasNonEmptyString(task.objective) &&
    hasNonEmptyString(task.state) &&
    Array.isArray(task.allowedCapabilities) &&
    task.allowedCapabilities.length > 0 &&
    task.allowedCapabilities.every(hasNonEmptyString)
  );
}

/** @param {unknown} evidencePlan */
function hasCompleteEvidencePlan(evidencePlan) {
  return (
    isRecord(evidencePlan) &&
    hasNonEmptyString(evidencePlan.correlationId) &&
    hasNonEmptyString(evidencePlan.observation) &&
    hasNonEmptyString(evidencePlan.acceptance)
  );
}

/** @param {unknown} stopConditions */
function hasRequiredStopConditions(stopConditions) {
  return (
    isRecord(stopConditions) &&
    REQUIRED_STOP_CONDITIONS.every((name) => stopConditions[name] === 'stop')
  );
}

/** @param {string} code */
function stopped(code) {
  return {
    status: 'stopped',
    code,
    next: 'stop',
    executionPerformed: false,
  };
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessMinimalHarnessAdmission({
    task: {
      id: 'classify-incident-01',
      objective: '将输入标签归入已知分类。',
      state: 'ready',
      allowedCapabilities: ['classify-label'],
    },
    toolRequest: {
      id: 'in-memory-classifier',
      capability: 'classify-label',
      effect: 'none',
      target: 'in-memory',
      input: { label: 'network-timeout' },
    },
    evidencePlan: {
      correlationId: 'classify-incident-01',
      observation: '记录分类值与拒绝原因。',
      acceptance: '分类值属于预先声明的集合。',
    },
    stopConditions: {
      onMissingContract: 'stop',
      onDisallowedTool: 'stop',
      onMissingEvidencePlan: 'stop',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
