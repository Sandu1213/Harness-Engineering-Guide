/**
 * Assess a proposed software change as a deliberately in-memory teaching
 * package. It never reads a repository, invokes a test command, uses Git, or
 * changes files. A ready result only means the supplied evidence plan is
 * sufficiently explicit to request human or automated review next.
 *
 * @param {unknown} candidate
 * @returns {{
 *   status: 'ready_for_review' | 'stopped',
 *   code: string,
 *   next: 'request_review' | 'stop',
 *   executionPerformed: false,
 *   requiredEvidence?: string[],
 * }}
 */
export function assessSoftwareChangeDelivery(candidate) {
  if (!isRecord(candidate)) {
    return stopped('invalid_delivery_package');
  }

  const {
    changeBrief,
    explorationRecord,
    implementationPlan,
    verificationPlan,
    documentationDecision,
    reviewPackage,
  } = candidate;

  if (!hasChangeBriefIdentity(changeBrief)) {
    return stopped('missing_change_brief');
  }

  if (!hasNonEmptyStringArray(changeBrief.acceptanceCriteria)) {
    return stopped('missing_acceptance_criteria');
  }

  if (!hasExplorationRecord(explorationRecord)) {
    return stopped('missing_exploration_record');
  }

  if (!hasImplementationPlan(implementationPlan)) {
    return stopped('missing_implementation_plan');
  }

  if (!arePlannedPathsInScope(implementationPlan.plannedPaths, changeBrief.allowedPaths)) {
    return stopped('scope_expansion_detected');
  }

  if (!hasVerificationPlan(verificationPlan)) {
    return stopped('missing_verification_plan');
  }

  if (!hasDocumentationDecision(documentationDecision)) {
    return stopped('documentation_impact_unknown');
  }

  if (!hasReviewPackage(reviewPackage)) {
    return stopped('missing_review_package');
  }

  if (!areChangedPathsInScope(reviewPackage.changedPaths, changeBrief.allowedPaths)) {
    return stopped('review_scope_mismatch');
  }

  return {
    status: 'ready_for_review',
    code: 'software_change_package_ready',
    next: 'request_review',
    executionPerformed: false,
    requiredEvidence: ['verificationPlan', 'documentationDecision', 'reviewPackage'],
  };
}

/** @param {unknown} value */
function hasChangeBriefIdentity(value) {
  return (
    isRecord(value) &&
    hasNonEmptyString(value.id) &&
    hasNonEmptyString(value.objective) &&
    hasNonEmptyStringArray(value.nonGoals) &&
    hasNonEmptyStringArray(value.allowedPaths)
  );
}

/** @param {unknown} value */
function hasExplorationRecord(value) {
  return (
    isRecord(value) &&
    hasNonEmptyStringArray(value.inspectedPaths) &&
    hasNonEmptyString(value.relevantBehavior) &&
    Array.isArray(value.unknowns)
  );
}

/** @param {unknown} value */
function hasImplementationPlan(value) {
  return isRecord(value) && hasNonEmptyStringArray(value.steps) && hasNonEmptyStringArray(value.plannedPaths);
}

/** @param {unknown} value */
function hasVerificationPlan(value) {
  return (
    isRecord(value) &&
    hasNonEmptyString(value.command) &&
    hasNonEmptyStringArray(value.expectedEvidence) &&
    value.externalEffects === 'none'
  );
}

/** @param {unknown} value */
function hasDocumentationDecision(value) {
  return (
    isRecord(value) &&
    (value.impact === 'update' || value.impact === 'none') &&
    hasNonEmptyString(value.rationale) &&
    (value.impact === 'none' || hasNonEmptyStringArray(value.paths))
  );
}

/** @param {unknown} value */
function hasReviewPackage(value) {
  return (
    isRecord(value) &&
    hasNonEmptyStringArray(value.changedPaths) &&
    hasNonEmptyString(value.diffSummary) &&
    value.evidenceStatus === 'planned' &&
    value.reviewState === 'ready_for_review'
  );
}

/** @param {unknown} paths @param {unknown} allowedPaths */
function arePlannedPathsInScope(paths, allowedPaths) {
  return hasNonEmptyStringArray(paths) && hasNonEmptyStringArray(allowedPaths) && paths.every((path) => allowedPaths.includes(path));
}

/** @param {unknown} paths @param {unknown} allowedPaths */
function areChangedPathsInScope(paths, allowedPaths) {
  return hasNonEmptyStringArray(paths) && hasNonEmptyStringArray(allowedPaths) && paths.every((path) => allowedPaths.includes(path));
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

/** @param {unknown} value */
function hasNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(hasNonEmptyString);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessSoftwareChangeDelivery({
    changeBrief: {
      id: 'add-format-summary',
      objective: '为报告摘要增加格式化字段。',
      acceptanceCriteria: ['摘要包含格式化字段。', '既有摘要字段保持不变。'],
      nonGoals: ['不修改报告存储格式。'],
      allowedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs', 'README.md'],
    },
    explorationRecord: {
      inspectedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs'],
      relevantBehavior: '现有测试断言摘要对象字段。',
      unknowns: [],
    },
    implementationPlan: {
      steps: ['先写失败断言。', '只修改摘要构造。', '运行相关测试。'],
      plannedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs'],
    },
    verificationPlan: {
      command: 'node --test tests/report/summary.test.mjs',
      expectedEvidence: ['新增断言通过。', '既有断言通过。'],
      externalEffects: 'none',
    },
    documentationDecision: {
      impact: 'update',
      paths: ['README.md'],
      rationale: '公开摘要字段发生变化。',
    },
    reviewPackage: {
      changedPaths: ['src/report/summary.mjs', 'tests/report/summary.test.mjs', 'README.md'],
      diffSummary: '新增格式化字段及其测试和文档说明。',
      evidenceStatus: 'planned',
      reviewState: 'ready_for_review',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
