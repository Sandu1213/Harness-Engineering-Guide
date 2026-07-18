/** Return a deterministic teaching result without scheduling or external I/O. */
function planResult(status, phase, taskId, reasons, missing = [], waitingFor = [], parallelCandidates = [], effects = []) {
  return {
    status,
    phase,
    taskId,
    reasons,
    missing,
    waitingFor,
    parallelCandidates,
    effects,
  };
}

/** Return true only for non-empty strings or non-empty arrays. */
function isPresent(value) {
  return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value !== '';
}

/** Reject malformed teaching input before evaluating a plan. */
function validateRequest(request) {
  if (!request || typeof request !== 'object') {
    throw new TypeError('request must be an object');
  }

  const { planBrief, tasks, request: taskRequest } = request;
  if (!planBrief || typeof planBrief !== 'object' || !Array.isArray(planBrief.completionEvidence) || !Array.isArray(planBrief.stopConditions)) {
    throw new TypeError('planBrief must include completionEvidence and stopConditions arrays');
  }
  if (typeof planBrief.goal !== 'string') {
    throw new TypeError('planBrief goal must be a string');
  }
  if (!Array.isArray(tasks)) {
    throw new TypeError('tasks must be an array');
  }
  tasks.forEach((task) => {
    if (!task || typeof task !== 'object' || typeof task.id !== 'string' || typeof task.question !== 'string' || !Array.isArray(task.inputs) || typeof task.output !== 'string' || !Array.isArray(task.acceptanceEvidence) || !Array.isArray(task.dependencies) || typeof task.effect !== 'string' || !Array.isArray(task.resources)) {
      throw new TypeError('each task must include its teaching contract fields');
    }
  });
  if (!taskRequest || typeof taskRequest !== 'object' || typeof taskRequest.taskId !== 'string' || !Array.isArray(taskRequest.parallelWith) || !Array.isArray(taskRequest.completedTaskIds) || !taskRequest.approvedEffects || typeof taskRequest.approvedEffects !== 'object') {
    throw new TypeError('request must include taskId, parallelWith, completedTaskIds, and approvedEffects');
  }
}

/** Return shared resource labels for two in-memory task cards. */
function sharedResources(task, candidate) {
  return task.resources.filter((resource) => candidate.resources.includes(resource));
}

/**
 * Assess an injected task plan without planning, executing, authorizing, or scheduling work.
 *
 * @param {{
 *   planBrief: { goal: string, completionEvidence: string[], stopConditions: string[] },
 *   tasks: Array<{
 *     id: string, question: string, inputs: string[], output: string,
 *     acceptanceEvidence: string[], dependencies: string[], effect: string, resources: string[]
 *   }>,
 *   request: {
 *     taskId: string, parallelWith: string[], completedTaskIds: string[], approvedEffects: object
 *   }
 * }} input
 * @returns {{
 *   status: 'ready' | 'blocked' | 'requires_approval' | 'not_ready',
 *   phase: string, taskId: string, reasons: string[], missing: string[],
 *   waitingFor: string[], parallelCandidates: string[], effects: string[]
 * }}
 */
export function assessTaskPlan(input) {
  validateRequest(input);

  const { planBrief, tasks, request } = input;
  const missingBrief = ['goal', 'completionEvidence', 'stopConditions']
    .filter((key) => !isPresent(planBrief[key]));
  if (missingBrief.length > 0) {
    return planResult('not_ready', 'missing_plan_brief', request.taskId, ['plan brief is incomplete'], missingBrief);
  }

  const task = tasks.find((item) => item.id === request.taskId);
  if (!task) {
    return planResult('not_ready', 'task_not_found', request.taskId, ['requested task is not in the plan']);
  }

  const missingTaskFields = ['question', 'inputs', 'output', 'acceptanceEvidence']
    .filter((key) => !isPresent(task[key]));
  if (missingTaskFields.length > 0) {
    return planResult('blocked', 'missing_task_contract', task.id, ['task contract is incomplete'], missingTaskFields);
  }

  const waitingFor = task.dependencies.filter((dependency) => !request.completedTaskIds.includes(dependency));
  if (waitingFor.length > 0) {
    return planResult('blocked', 'unmet_dependencies', task.id, ['task dependencies are not complete'], [], waitingFor);
  }

  if (task.effect !== 'read_only' && request.approvedEffects[task.effect] !== true) {
    return planResult('requires_approval', 'effect_requires_approval', task.id, ['planned effect is outside the injected approval snapshot'], [], [], [], [task.effect]);
  }

  const candidates = request.parallelWith.map((candidateId) => tasks.find((item) => item.id === candidateId));
  if (candidates.some((candidate) => !candidate)) {
    return planResult('not_ready', 'parallel_candidate_not_found', task.id, ['parallel candidate is not in the plan']);
  }
  if (candidates.some((candidate) => sharedResources(task, candidate).length > 0)) {
    return planResult('not_ready', 'parallel_candidate_conflict', task.id, ['parallel candidate shares declared resources']);
  }

  return planResult(
    'ready',
    'ready_for_planned_task',
    task.id,
    ['plan brief, task contract, dependencies, effect boundary, and parallel resources are ready'],
    [],
    [],
    request.parallelWith,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = assessTaskPlan({
    planBrief: {
      goal: '为虚构服务形成认证测试方案',
      completionEvidence: ['认证契约已定位', '断言已审查'],
      stopConditions: ['认证契约不可定位'],
    },
    tasks: [
      {
        id: 'research-auth-contract',
        question: '认证契约能否被定位？',
        inputs: ['injected:requirement'],
        output: 'contract-evidence',
        acceptanceEvidence: ['traceable-source'],
        dependencies: [],
        effect: 'read_only',
        resources: ['auth-contract'],
      },
    ],
    request: {
      taskId: 'research-auth-contract',
      parallelWith: [],
      completedTaskIds: [],
      approvedEffects: {},
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
