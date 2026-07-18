import assert from 'node:assert/strict';
import test from 'node:test';

import { assessMemorySkillBoundary } from './memory-skill-boundary-assessment.mjs';

function validCard(overrides = {}) {
  return {
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
    ...overrides,
  };
}

test('admits a complete read-only memory and skill card without execution', () => {
  assert.deepEqual(assessMemorySkillBoundary(validCard()), {
    status: 'ready_for_isolated_example',
    code: 'memory_skill_boundary_ready',
    next: 'continue_read_only_assessment',
    executionPerformed: false,
  });
});

test('routes a candidate without a source to evidence collection', () => {
  const card = validCard({
    evidence: {
      ...validCard().evidence,
      source: '',
    },
  });

  assert.deepEqual(assessMemorySkillBoundary(card), {
    status: 'needs_evidence',
    code: 'evidence_source_missing',
    next: 'collect_evidence',
    executionPerformed: false,
  });
});

test('routes stale evidence to refresh without judging its content', () => {
  const card = validCard({
    evidence: {
      ...validCard().evidence,
      freshness: 'stale',
    },
  });

  assert.deepEqual(assessMemorySkillBoundary(card), {
    status: 'needs_refresh',
    code: 'evidence_freshness_stale',
    next: 'refresh_evidence',
    executionPerformed: false,
  });
});

test('routes a cross-project candidate to human review', () => {
  const card = validCard({
    evidence: {
      ...validCard().evidence,
      scope: 'other_project',
    },
  });

  assert.deepEqual(assessMemorySkillBoundary(card), {
    status: 'requires_review',
    code: 'evidence_scope_cross_project',
    next: 'obtain_human_review',
    executionPerformed: false,
  });
});

test('requires approval for proposed and implicit memory writes', () => {
  const cases = [
    validCard({
      writeProposal: {
        requested: true,
        boundary: 'propose_only',
        reviewStatus: 'pending',
      },
    }),
    validCard({
      skill: {
        ...validCard().skill,
        prohibitedActions: ['external_execution'],
      },
    }),
  ];

  for (const card of cases) {
    assert.deepEqual(assessMemorySkillBoundary(card), {
      status: 'requires_approval',
      code: card.writeProposal.requested
        ? 'proposed_write_requires_human_approval'
        : 'memory_write_boundary_requires_human_approval',
      next: 'obtain_human_approval',
      executionPerformed: false,
    });
  }
});

test('routes deprecated skills to human review', () => {
  const card = validCard({
    lifecycle: {
      status: 'deprecated',
      replacement: '',
    },
  });

  assert.deepEqual(assessMemorySkillBoundary(card), {
    status: 'requires_review',
    code: 'deprecated_skill_requires_human_review',
    next: 'obtain_human_review',
    executionPerformed: false,
  });
});

test('requires approval when execution is requested or claimed', () => {
  const cases = [
    validCard({
      execution: {
        requested: true,
        claimedPerformed: false,
      },
    }),
    validCard({
      execution: {
        requested: false,
        claimedPerformed: true,
      },
    }),
  ];

  for (const card of cases) {
    assert.deepEqual(assessMemorySkillBoundary(card), {
      status: 'requires_approval',
      code: card.execution.requested
        ? 'external_execution_request_requires_human_approval'
        : 'external_execution_claim_requires_human_review',
      next: 'obtain_human_approval',
      executionPerformed: false,
    });
  }
});

test('stops when the skill contract is missing', () => {
  assert.deepEqual(assessMemorySkillBoundary(validCard({ skill: null })), {
    status: 'stopped',
    code: 'skill_contract_missing',
    next: 'stop',
    executionPerformed: false,
  });
});
