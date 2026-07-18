import assert from 'node:assert/strict';
import test from 'node:test';

import { assessResearchSecurityPlan } from './research-security-plan-assessment.mjs';

const baseThreatModel = {
  assets: ['task_rules', 'external_content', 'secret_references', 'tool_capabilities'],
  entryPoints: ['external_content'],
  trustBoundaries: ['content_to_candidate', 'candidate_to_tool'],
  allowedEffect: 'read_only_summary_candidate',
  responsibleRole: 'security-review-owner',
};

const baseTask = {
  taskRef: 'research-task-41',
  targetRef: 'teaching-product-doc',
  allowedAction: 'summarize',
  dataScope: 'public_product_text',
};

const baseContentEnvelope = {
  sourceRef: 'teaching-product-doc',
  allowedUse: 'summarize',
  instructionStatus: 'untrusted_data',
  taskRef: 'research-task-41',
  attemptsControlChange: false,
  secretExposureSuspected: false,
};

const baseCapabilityGrant = {
  subjectRef: 'injected-research-agent',
  taskRef: 'research-task-41',
  targetRef: 'teaching-product-doc',
  actions: ['summarize'],
  dataScope: 'public_product_text',
  environment: 'teaching',
  validityStatus: 'current',
  approvalRef: 'teaching-read-only-policy',
  revocationRef: 'teaching-disable-path',
};

const baseCandidateAction = {
  taskRef: 'research-task-41',
  targetRef: 'teaching-product-doc',
  action: 'summarize',
  dataScope: 'public_product_text',
  source: 'task_bound_extraction',
  toolRequested: true,
};

const basePolicyDecision = {
  taskRef: 'research-task-41',
  policyVersion: 'teaching-policy-v1',
  decision: 'allowed_with_limits',
  eventRef: 'policy-event-41',
  approvalStatus: 'not_required_for_read_only_plan',
};

const baseToolSecurityGate = {
  protocol: 'mcp',
  sourceTrust: 'reviewed',
  capabilityGrantRef: 'grant-41',
  credentialAudience: 'teaching-doc-server',
  targetAudience: 'teaching-doc-server',
  scopeStatus: 'minimal',
  observationPlanPresent: true,
  localProcessBoundary: 'not_requested',
};

const baseAuditEvent = {
  taskRef: 'research-task-41',
  eventType: 'policy_decision',
  previousEventRef: 'policy-event-41',
  correlationId: 'interaction-41',
  result: 'allowed_with_limits',
  redactionState: 'redacted',
  containsSensitiveValue: false,
};

const baseSupplyChainRecord = {
  artifactRef: 'built-in-read-only-tool',
  source: 'reviewed_repository',
  owner: 'book-maintainer',
  versionRef: 'teaching-v1',
  reviewState: 'reviewed',
  requestedCapabilities: ['read_public_text'],
};

function createInput({
  threatModel = {},
  task = {},
  contentEnvelope = {},
  capabilityGrant = {},
  secretReferences = [],
  candidateAction = {},
  policyDecision = {},
  toolSecurityGate = {},
  auditEvent = {},
  supplyChainRecord = {},
  incidentRoute = { required: false },
} = {}) {
  return {
    threatModel: { ...baseThreatModel, ...threatModel },
    task: { ...baseTask, ...task },
    contentEnvelope: { ...baseContentEnvelope, ...contentEnvelope },
    capabilityGrant: { ...baseCapabilityGrant, ...capabilityGrant },
    secretReferences,
    candidateAction: { ...baseCandidateAction, ...candidateAction },
    policyDecision: { ...basePolicyDecision, ...policyDecision },
    toolSecurityGate: { ...baseToolSecurityGate, ...toolSecurityGate },
    auditEvent: { ...baseAuditEvent, ...auditEvent },
    supplyChainRecord: { ...baseSupplyChainRecord, ...supplyChainRecord },
    incidentRoute,
  };
}

test('routes a complete read-only teaching plan to fact review without execution', () => {
  assert.deepEqual(assessResearchSecurityPlan(createInput()), {
    status: 'ready_for_read_only_review',
    code: 'read_only_security_plan_ready',
    taskRef: 'research-task-41',
    next: 'review_extracted_facts',
    executionPerformed: false,
  });
});

test('requires evidence when the threat model omits protected assets', () => {
  assert.deepEqual(assessResearchSecurityPlan(createInput({ threatModel: { assets: [] } })), {
    status: 'needs_evidence',
    code: 'threat_model_incomplete',
    taskRef: 'research-task-41',
    next: 'complete_threat_model',
    executionPerformed: false,
  });
});

test('requires evidence when the content envelope has no source', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ contentEnvelope: { sourceRef: undefined } })),
    {
      status: 'needs_evidence',
      code: 'content_envelope_incomplete',
      taskRef: 'research-task-41',
      next: 'complete_content_envelope',
      executionPerformed: false,
    },
  );
});

test('blocks untrusted content that requests a control change', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(
      createInput({ contentEnvelope: { attemptsControlChange: true } }),
    ),
    {
      status: 'blocked',
      code: 'untrusted_content_requested_control',
      taskRef: 'research-task-41',
      next: 'stop_untrusted_instruction',
      executionPerformed: false,
    },
  );
});

test('blocks a candidate target that expands beyond the task', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ candidateAction: { targetRef: 'upload-target' } })),
    {
      status: 'blocked',
      code: 'candidate_target_out_of_scope',
      taskRef: 'research-task-41',
      next: 'stop_candidate_action',
      executionPerformed: false,
    },
  );
});

test('blocks a wildcard capability grant', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ capabilityGrant: { actions: ['*'] } })),
    {
      status: 'blocked',
      code: 'capability_not_minimal',
      taskRef: 'research-task-41',
      next: 'restrict_capability_grant',
      executionPerformed: false,
    },
  );
});

test('blocks a capability grant with an unrelated extra action', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(
      createInput({ capabilityGrant: { actions: ['summarize', 'upload'] } }),
    ),
    {
      status: 'blocked',
      code: 'capability_not_minimal',
      taskRef: 'research-task-41',
      next: 'restrict_capability_grant',
      executionPerformed: false,
    },
  );
});

test('requires evidence when the policy version is missing', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ policyDecision: { policyVersion: undefined } })),
    {
      status: 'needs_evidence',
      code: 'policy_version_missing',
      taskRef: 'research-task-41',
      next: 'identify_policy_version',
      executionPerformed: false,
    },
  );
});

test('blocks an audit event explicitly marked as containing a sensitive value', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ auditEvent: { containsSensitiveValue: true } })),
    {
      status: 'blocked',
      code: 'sensitive_data_in_audit_event',
      taskRef: 'research-task-41',
      next: 'redact_and_rebuild_audit_event',
      executionPerformed: false,
    },
  );
});

test('requires evidence when the audit chain does not reference the policy event', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(createInput({ auditEvent: { previousEventRef: 'other-event' } })),
    {
      status: 'needs_evidence',
      code: 'audit_chain_incomplete',
      taskRef: 'research-task-41',
      next: 'repair_audit_chain',
      executionPerformed: false,
    },
  );
});

test('blocks an MCP credential audience mismatch', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(
      createInput({ toolSecurityGate: { credentialAudience: 'different-service' } }),
    ),
    {
      status: 'blocked',
      code: 'credential_audience_mismatch',
      taskRef: 'research-task-41',
      next: 'stop_tool_request',
      executionPerformed: false,
    },
  );
});

test('blocks a supply-chain artifact whose source is not reviewed', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(
      createInput({ supplyChainRecord: { source: 'unknown', reviewState: 'unreviewed' } }),
    ),
    {
      status: 'blocked',
      code: 'supply_chain_unreviewed',
      taskRef: 'research-task-41',
      next: 'review_artifact_source',
      executionPerformed: false,
    },
  );
});

test('escalates suspected secret exposure when the incident owner is missing', () => {
  assert.deepEqual(
    assessResearchSecurityPlan(
      createInput({
        contentEnvelope: { secretExposureSuspected: true },
        incidentRoute: { required: true, responsibleRole: undefined },
      }),
    ),
    {
      status: 'escalate_security_review',
      code: 'incident_owner_missing',
      taskRef: 'research-task-41',
      next: 'assign_security_owner',
      executionPerformed: false,
    },
  );
});
