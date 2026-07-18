import assert from 'node:assert/strict';
import test from 'node:test';

import { assessTeamSkillAdmission } from './skill-library-admission-assessment.mjs';

function validCandidate(overrides = {}) {
  const candidate = {
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
  };

  return { ...candidate, ...overrides };
}

test('admits a complete read-only candidate without execution', () => {
  assert.deepEqual(assessTeamSkillAdmission(validCandidate()), {
    status: 'ready',
    code: 'skill_library_candidate_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  });
});

test('stops when the registry has no owner', () => {
  const candidate = validCandidate();
  candidate.registry.owner = '';

  assert.deepEqual(assessTeamSkillAdmission(candidate), {
    status: 'stopped',
    code: 'missing_skill_owner',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the skill contract is absent', () => {
  assert.deepEqual(assessTeamSkillAdmission(validCandidate({ contract: undefined })), {
    status: 'stopped',
    code: 'missing_skill_contract',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when quality evidence is absent', () => {
  const candidate = validCandidate();
  candidate.admission.qualityEvidence = '';

  assert.deepEqual(assessTeamSkillAdmission(candidate), {
    status: 'stopped',
    code: 'missing_quality_evidence',
    next: 'stop',
    executionPerformed: false,
  });
});

test('requires approval for a write candidate', () => {
  const candidate = validCandidate();
  candidate.contract.effect = 'write';

  assert.deepEqual(assessTeamSkillAdmission(candidate), {
    status: 'requires_approval',
    code: 'write_candidate_requires_approval',
    next: 'obtain_admission_approval',
    executionPerformed: false,
  });
});

test('routes an incompatible candidate to human review', () => {
  assert.deepEqual(assessTeamSkillAdmission(validCandidate({ compatibility: { status: 'incompatible' } })), {
    status: 'requires_review',
    code: 'incompatible_skill_contract',
    next: 'request_human_review',
    executionPerformed: false,
  });
});

test('routes a deprecated candidate to human review', () => {
  assert.deepEqual(assessTeamSkillAdmission(validCandidate({ deprecation: { status: 'deprecated' } })), {
    status: 'requires_review',
    code: 'deprecated_skill_candidate',
    next: 'request_human_review',
    executionPerformed: false,
  });
});
