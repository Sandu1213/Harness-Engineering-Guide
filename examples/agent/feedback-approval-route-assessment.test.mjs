import assert from 'node:assert/strict';
import test from 'node:test';

import { assessFeedbackApprovalRoute } from './feedback-approval-route-assessment.mjs';

const baseCandidate = {
  id: 'relative-link-candidate',
  scope: 'docs/chapter-38',
  operation: 'read_only',
  evidenceVersion: 'evidence-v1',
};

const baseEvidence = {
  status: 'fresh',
  scope: 'docs/chapter-38',
  version: 'evidence-v1',
};

const baseReflection = {
  observationId: 'observation-38-1',
  hypothesis: 'relative path needs review',
  falsifiableCheck: 'compare against the injected path rule',
};

const baseEvaluation = {
  status: 'accepted',
  independent: true,
  scope: 'docs/chapter-38',
  evidenceVersion: 'evidence-v1',
};

const completeEscalation = {
  reason: 'external effect needs a human decision',
  owner: 'content-maintainer',
  unresolvedItems: ['external effect not observed'],
};

function createInput({
  candidate = {},
  evidence = {},
  reflection = {},
  evaluation = {},
  approval = null,
  escalation,
  execution = { requested: false },
} = {}) {
  return {
    candidate: { ...baseCandidate, ...candidate },
    evidence: { ...baseEvidence, ...evidence },
    reflection: { ...baseReflection, ...reflection },
    evaluation: { ...baseEvaluation, ...evaluation },
    approval,
    escalation,
    execution,
  };
}

test('continues a complete read-only candidate without claiming execution', () => {
  assert.deepEqual(assessFeedbackApprovalRoute(createInput()), {
    status: 'ready_for_approval',
    code: 'read_only_candidate_ready',
    candidateId: 'relative-link-candidate',
    next: 'continue_to_decision',
    executionPerformed: false,
  });
});

test('stops for missing fresh evidence before evaluating a candidate', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(createInput({ evidence: { status: 'missing' } })),
    {
      status: 'needs_evidence',
      code: 'evidence_not_fresh',
      candidateId: 'relative-link-candidate',
      next: 'collect_more_evidence',
      executionPerformed: false,
    },
  );
});

test('stops when an evaluation is not independent', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(createInput({ evaluation: { independent: false } })),
    {
      status: 'needs_independent_review',
      code: 'independent_evaluation_missing',
      candidateId: 'relative-link-candidate',
      next: 'request_independent_evaluation',
      executionPerformed: false,
    },
  );
});

test('routes a write candidate to approval without performing it', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(
      createInput({
        candidate: { operation: 'write_requested' },
        escalation: completeEscalation,
      }),
    ),
    {
      status: 'approval_required',
      code: 'write_candidate_requires_approval',
      candidateId: 'relative-link-candidate',
      next: 'request_human_approval',
      executionPerformed: false,
    },
  );
});

test('routes an external execution request to approval without performing it', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(
      createInput({
        escalation: completeEscalation,
        execution: { requested: true },
      }),
    ),
    {
      status: 'approval_required',
      code: 'external_execution_requires_approval',
      candidateId: 'relative-link-candidate',
      next: 'request_human_approval',
      executionPerformed: false,
    },
  );
});

test('routes an expired approval to human review', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(
      createInput({
        candidate: { operation: 'write_requested' },
        approval: {
          status: 'expired',
          scope: 'docs/chapter-38',
          evidenceVersion: 'evidence-v1',
        },
        escalation: completeEscalation,
      }),
    ),
    {
      status: 'escalated',
      code: 'approval_expired',
      candidateId: 'relative-link-candidate',
      next: 'human_review',
      executionPerformed: false,
    },
  );
});

test('routes an approval with a mismatched scope to human review', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(
      createInput({
        candidate: { operation: 'write_requested' },
        approval: {
          status: 'approved',
          scope: 'docs/other-chapter',
          evidenceVersion: 'evidence-v1',
        },
        escalation: completeEscalation,
      }),
    ),
    {
      status: 'escalated',
      code: 'approval_scope_mismatch',
      candidateId: 'relative-link-candidate',
      next: 'human_review',
      executionPerformed: false,
    },
  );
});

test('routes an external candidate with an incomplete escalation record to human review', () => {
  assert.deepEqual(
    assessFeedbackApprovalRoute(
      createInput({ candidate: { operation: 'write_requested' }, escalation: { reason: 'write' } }),
    ),
    {
      status: 'escalated',
      code: 'escalation_record_incomplete',
      candidateId: 'relative-link-candidate',
      next: 'human_review',
      executionPerformed: false,
    },
  );
});
