import assert from 'node:assert/strict';
import test from 'node:test';

import { assessEnterpriseHarnessPlan } from './enterprise-harness-admission-assessment.mjs';

function validPlan(overrides = {}) {
  return {
    controlPlane: {
      subjectClaim: 'declared_training_requester',
      tenantDataBoundary: {
        tenantDefinition: 'single_training_tenant',
        dataCategory: 'approved_knowledge_summary',
        targetBoundary: 'approved_summary_scope',
        sharedException: 'none',
      },
      policyDecisionRecord: {
        id: 'policy-training-01',
        decision: 'allowed',
        ruleVersion: 'training-policy-v1',
        limits: {
          allowedCapabilities: ['read_approved_summary'],
          targetBoundary: 'approved_summary_scope',
        },
        correlationId: 'training-correlation-01',
      },
      budget: {
        limit: 'declared_limit',
        status: 'within_limit',
        expiresAtState: 'not_expired',
      },
    },
    executionPlane: {
      taskId: 'knowledge-summary-review',
      requestedCapability: 'read_approved_summary',
      targetBoundary: 'approved_summary_scope',
      executionRequest: 'not-requested',
      stopCondition: 'missing_or_unlinked_observation',
      observationRequirement: 'correlated_record_required',
    },
    correlatedObservationRecord: {
      decisionId: 'policy-training-01',
      taskId: 'knowledge-summary-review',
      correlationId: 'training-correlation-01',
      state: 'planned',
      freshness: 'declared_current',
    },
    escalationGate: {
      triggers: ['cross_tenant', 'budget_expired', 'correlation_inconsistent'],
      owner: 'training_reviewer',
      route: 'human_review',
    },
    ...overrides,
  };
}

test('admits a complete read-only enterprise harness candidate without execution', () => {
  assert.deepEqual(assessEnterpriseHarnessPlan(validPlan()), {
    status: 'ready',
    code: 'enterprise_read_only_candidate_ready',
    next: 'continue_read_only_candidate',
    executionPerformed: false,
  });
});

test('stops when the control plane is missing', () => {
  assert.deepEqual(assessEnterpriseHarnessPlan(validPlan({ controlPlane: undefined })), {
    status: 'stopped',
    code: 'missing_control_plane',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the tenant and data boundary is incomplete', () => {
  const plan = validPlan();
  plan.controlPlane.tenantDataBoundary.targetBoundary = '';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'stopped',
    code: 'incomplete_tenant_data_boundary',
    next: 'stop',
    executionPerformed: false,
  });
});

test('stops when the policy decision lacks capability limits', () => {
  const plan = validPlan();
  plan.controlPlane.policyDecisionRecord.limits.allowedCapabilities = [];

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'stopped',
    code: 'incomplete_policy_decision_record',
    next: 'stop',
    executionPerformed: false,
  });
});

test('routes a pending policy decision to human approval', () => {
  const plan = validPlan();
  plan.controlPlane.policyDecisionRecord.decision = 'pending_approval';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'requires_approval',
    code: 'policy_pending_approval_requires_human_review',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});

test('routes an external execution request to human approval', () => {
  const plan = validPlan();
  plan.executionPlane.executionRequest = 'requested';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'requires_approval',
    code: 'external_execution_requires_human_review',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});

test('routes a write capability to human approval', () => {
  const plan = validPlan();
  plan.executionPlane.requestedCapability = 'write_ticket_status';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'requires_approval',
    code: 'non_read_only_capability_requires_human_review',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});

test('routes an expired budget to human approval', () => {
  const plan = validPlan();
  plan.controlPlane.budget.status = 'expired';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'requires_approval',
    code: 'expired_budget_requires_human_review',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});

test('routes inconsistent correlations to human approval', () => {
  const plan = validPlan();
  plan.correlatedObservationRecord.decisionId = 'another-policy-decision';

  assert.deepEqual(assessEnterpriseHarnessPlan(plan), {
    status: 'requires_approval',
    code: 'correlation_inconsistent_requires_human_review',
    next: 'obtain_human_approval',
    executionPerformed: false,
  });
});
