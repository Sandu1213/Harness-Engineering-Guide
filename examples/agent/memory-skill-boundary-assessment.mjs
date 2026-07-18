const LIFECYCLE_STATUSES = new Set(['stable', 'deprecated', 'superseded']);

/**
 * Assess an injected Memory/Skill Pattern Card without storage, Skill calls, or I/O.
 *
 * @param {unknown} card
 * @returns {{
 *   status: 'ready_for_isolated_example' | 'needs_evidence' | 'needs_refresh' | 'requires_review' | 'requires_approval' | 'stopped',
 *   code: string,
 *   next: string,
 *   executionPerformed: false,
 * }}
 */
export function assessMemorySkillBoundary(card) {
  if (!isRecord(card)) {
    return stopped('invalid_memory_skill_card');
  }

  if (!hasTaskBoundary(card.task)) {
    return stopped('task_boundary_missing');
  }

  if (!hasSkillContract(card.skill)) {
    return stopped('skill_contract_missing');
  }

  if (!isRecord(card.execution) || typeof card.execution.requested !== 'boolean' || typeof card.execution.claimedPerformed !== 'boolean') {
    return stopped('execution_boundary_missing');
  }

  if (card.execution.requested) {
    return requiresApproval('external_execution_request_requires_human_approval');
  }

  if (card.execution.claimedPerformed) {
    return requiresApproval('external_execution_claim_requires_human_review');
  }

  if (!Array.isArray(card.skill.prohibitedActions) || !card.skill.prohibitedActions.includes('write_memory')) {
    return requiresApproval('memory_write_boundary_requires_human_approval');
  }

  const evidenceDecision = assessEvidence(card.task, card.evidence);
  if (evidenceDecision) {
    return evidenceDecision;
  }

  if (!isRecord(card.lifecycle) || !LIFECYCLE_STATUSES.has(card.lifecycle.status)) {
    return stopped('lifecycle_status_missing');
  }

  if (card.lifecycle.status === 'deprecated' || (card.lifecycle.status === 'superseded' && !hasNonEmptyString(card.lifecycle.replacement))) {
    return requiresReview('deprecated_skill_requires_human_review');
  }

  if (!isRecord(card.writeProposal) || typeof card.writeProposal.requested !== 'boolean' || !hasNonEmptyString(card.writeProposal.boundary)) {
    return stopped('write_proposal_boundary_missing');
  }

  if (card.writeProposal.requested) {
    return requiresApproval('proposed_write_requires_human_approval');
  }

  return {
    status: 'ready_for_isolated_example',
    code: 'memory_skill_boundary_ready',
    next: 'continue_read_only_assessment',
    executionPerformed: false,
  };
}

/** @param {unknown} task */
function hasTaskBoundary(task) {
  return isRecord(task)
    && hasNonEmptyString(task.subject)
    && hasNonEmptyString(task.scope)
    && hasNonEmptyString(task.question)
    && hasNonEmptyString(task.budget)
    && hasNonEmptyString(task.stopCondition);
}

/** @param {unknown} skill */
function hasSkillContract(skill) {
  return isRecord(skill)
    && skill.mode === 'read_only'
    && Array.isArray(skill.readableCategories)
    && skill.readableCategories.includes('evidence_card');
}

/** @param {{ scope: string }} task @param {unknown} evidence */
function assessEvidence(task, evidence) {
  if (!isRecord(evidence) || !hasNonEmptyString(evidence.source)) {
    return {
      status: 'needs_evidence',
      code: 'evidence_source_missing',
      next: 'collect_evidence',
      executionPerformed: false,
    };
  }

  if (!hasNonEmptyString(evidence.scope) || evidence.scope !== task.scope) {
    return requiresReview('evidence_scope_cross_project');
  }

  if (evidence.freshness !== 'current') {
    return {
      status: 'needs_refresh',
      code: 'evidence_freshness_stale',
      next: 'refresh_evidence',
      executionPerformed: false,
    };
  }

  return undefined;
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/** @param {string} code */
function stopped(code) {
  return { status: 'stopped', code, next: 'stop', executionPerformed: false };
}

/** @param {string} code */
function requiresReview(code) {
  return {
    status: 'requires_review',
    code,
    next: 'obtain_human_review',
    executionPerformed: false,
  };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_human_approval',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessMemorySkillBoundary({
    task: {
      subject: 'source-backed teaching claim',
      scope: 'current_project',
      question: 'is the candidate ready for isolated review',
      budget: 'one_read_only_pass',
      stopCondition: 'missing_evidence_or_boundary',
    },
    evidence: {
      source: 'injected_reference_card',
      scope: 'current_project',
      freshness: 'current',
      reviewStatus: 'reviewable',
    },
    skill: {
      mode: 'read_only',
      readableCategories: ['evidence_card'],
      prohibitedActions: ['write_memory', 'external_execution'],
    },
    writeProposal: {
      requested: false,
      boundary: 'propose_only',
      reviewStatus: 'not_applicable',
    },
    lifecycle: {
      status: 'stable',
      replacement: 'not_required',
    },
    execution: {
      requested: false,
      claimedPerformed: false,
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
