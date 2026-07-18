import assert from 'node:assert/strict';
import test from 'node:test';

import { assessImprovementChange } from './self-improvement-boundary-assessment.mjs';

const candidate = {
  id: 'retry-policy-backoff-v2',
  target: 'retry-policy',
  scope: 'staging-only',
  proposedChange: 'increase bounded backoff after independently verified transient failures',
};

const evidence = {
  independentValidation: { status: 'passed', scope: 'staging-only' },
  rollback: { available: true, tested: true },
  monitoring: { metrics: ['failure-rate', 'recovery-latency'] },
};

function approvedApproval(extra = {}) {
  return { status: 'approved', scope: 'staging-only', ...extra };
}

test('marks a bounded candidate ready only after validation, approval, monitoring, and rollback are present', () => {
  assert.deepEqual(
    assessImprovementChange({ candidate, evidence, approval: approvedApproval() }),
    {
      status: 'ready_for_controlled_release',
      code: 'candidate_change_gate_passed',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires a candidate specification before reviewing a vague self-improvement claim', () => {
  assert.deepEqual(
    assessImprovementChange({ candidate: { id: 'vague' }, evidence, approval: approvedApproval() }),
    { status: 'needs_spec', code: 'candidate_spec_incomplete', candidateId: 'vague' },
  );
});

test('rejects an independently evaluated candidate whose validation explicitly failed', () => {
  assert.deepEqual(
    assessImprovementChange({
      candidate,
      evidence: { ...evidence, independentValidation: { status: 'failed', scope: 'staging-only' } },
      approval: approvedApproval(),
    }),
    {
      status: 'rejected',
      code: 'independent_validation_failed',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('does not treat an unknown validation result as a release signal', () => {
  assert.deepEqual(
    assessImprovementChange({
      candidate,
      evidence: { ...evidence, independentValidation: { status: 'unknown', scope: 'staging-only' } },
      approval: approvedApproval(),
    }),
    {
      status: 'needs_evidence',
      code: 'independent_validation_not_confirmed',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires independent validation from the candidate scope', () => {
  assert.deepEqual(
    assessImprovementChange({
      candidate,
      evidence: { ...evidence, independentValidation: { status: 'passed', scope: 'production' } },
      approval: approvedApproval(),
    }),
    {
      status: 'needs_evidence',
      code: 'validation_scope_mismatch',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires explicit approval rather than inferring it from passing evidence', () => {
  assert.deepEqual(
    assessImprovementChange({ candidate, evidence, approval: undefined }),
    {
      status: 'needs_approval',
      code: 'release_approval_missing',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires approval that matches the candidate scope', () => {
  assert.deepEqual(
    assessImprovementChange({ candidate, evidence, approval: approvedApproval({ scope: 'production' }) }),
    {
      status: 'needs_approval',
      code: 'approval_scope_mismatch',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires an available and tested rollback before a candidate is ready', () => {
  assert.deepEqual(
    assessImprovementChange({
      candidate,
      evidence: { ...evidence, rollback: { available: true, tested: false } },
      approval: approvedApproval(),
    }),
    {
      status: 'needs_evidence',
      code: 'rollback_not_ready',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('requires named monitoring signals instead of claiming monitoring by default', () => {
  assert.deepEqual(
    assessImprovementChange({
      candidate,
      evidence: { ...evidence, monitoring: { metrics: [] } },
      approval: approvedApproval(),
    }),
    {
      status: 'needs_evidence',
      code: 'monitoring_plan_incomplete',
      candidateId: 'retry-policy-backoff-v2',
    },
  );
});

test('returns no publish or deployment instruction for a ready candidate', () => {
  const result = assessImprovementChange({ candidate, evidence, approval: approvedApproval() });

  assert.equal(Object.hasOwn(result, 'published'), false);
  assert.equal(Object.hasOwn(result, 'deploymentId'), false);
});
