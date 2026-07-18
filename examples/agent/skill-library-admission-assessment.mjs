/**
 * Assess an injected team Skill candidate for the chapter 34 teaching scenario.
 * This function does not discover, install, publish, select, or execute a Skill,
 * and it never reads files, environment state, credentials, or network resources.
 *
 * @param {unknown} candidate
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval' | 'requires_review',
 *   code: string,
 *   next: 'implement_in_isolated_example' | 'stop' | 'obtain_admission_approval' | 'request_human_review',
 *   executionPerformed: false,
 * }}
 */
export function assessTeamSkillAdmission(candidate) {
  if (!isRecord(candidate)) {
    return stopped('invalid_skill_candidate');
  }

  if (!isRecord(candidate.registry)) {
    return stopped('missing_skill_registry');
  }

  if (!hasText(candidate.registry.owner)) {
    return stopped('missing_skill_owner');
  }

  if (!hasSkillContract(candidate.contract)) {
    return stopped('missing_skill_contract');
  }

  if (!isRecord(candidate.admission) || !hasText(candidate.admission.qualityEvidence)) {
    return stopped('missing_quality_evidence');
  }

  if (!isRecord(candidate.compatibility) || candidate.compatibility.status !== 'compatible') {
    return requiresReview('incompatible_skill_contract');
  }

  if (!isRecord(candidate.deprecation) || candidate.deprecation.status !== 'active') {
    return requiresReview('deprecated_skill_candidate');
  }

  if (candidate.contract.effect === 'write') {
    return requiresApproval('write_candidate_requires_approval');
  }

  return {
    status: 'ready',
    code: 'skill_library_candidate_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  };
}

/** @param {unknown} contract */
function hasSkillContract(contract) {
  return (
    isRecord(contract) &&
    hasText(contract.version) &&
    hasText(contract.trigger) &&
    hasText(contract.nonTrigger) &&
    (contract.effect === 'read_only' || contract.effect === 'write')
  );
}

/** @param {unknown} value */
function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/** @param {unknown} value */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** @param {string} code */
function stopped(code) {
  return { status: 'stopped', code, next: 'stop', executionPerformed: false };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_admission_approval',
    executionPerformed: false,
  };
}

/** @param {string} code */
function requiresReview(code) {
  return {
    status: 'requires_review',
    code,
    next: 'request_human_review',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessTeamSkillAdmission({
    registry: {
      id: 'documentation-fact-check',
      owner: 'documentation-quality-maintainer',
    },
    contract: {
      version: '1.0.0',
      trigger: 'a source list and claims are supplied for review',
      nonTrigger: 'the request requires an external write',
      effect: 'read_only',
    },
    admission: {
      qualityEvidence: 'teaching review sample is linked',
    },
    compatibility: { status: 'compatible' },
    deprecation: { status: 'active' },
  });

  console.log(JSON.stringify(result, null, 2));
}
