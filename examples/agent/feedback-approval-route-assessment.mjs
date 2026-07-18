function result(status, code, candidateId, next) {
  return { status, code, candidateId, next, executionPerformed: false };
}

function hasCompleteEscalationRecord(escalation) {
  return (
    Boolean(escalation?.reason) &&
    Boolean(escalation?.owner) &&
    Array.isArray(escalation?.unresolvedItems) &&
    escalation.unresolvedItems.length > 0
  );
}

/**
 * Routes one injected feedback-and-approval teaching object without external I/O.
 */
export function assessFeedbackApprovalRoute({
  candidate,
  evidence,
  reflection,
  evaluation,
  approval,
  escalation,
  execution,
}) {
  const candidateId = candidate?.id;

  if (!candidateId || !candidate.scope || !candidate.operation || !candidate.evidenceVersion) {
    return result('needs_evidence', 'candidate_incomplete', candidateId, 'collect_more_evidence');
  }

  if (
    evidence?.status !== 'fresh' ||
    evidence.scope !== candidate.scope ||
    evidence.version !== candidate.evidenceVersion
  ) {
    return result('needs_evidence', 'evidence_not_fresh', candidateId, 'collect_more_evidence');
  }

  if (!reflection?.observationId || !reflection.hypothesis || !reflection.falsifiableCheck) {
    return result('needs_evidence', 'reflection_record_incomplete', candidateId, 'collect_more_evidence');
  }

  if (evaluation?.independent !== true) {
    return result(
      'needs_independent_review',
      'independent_evaluation_missing',
      candidateId,
      'request_independent_evaluation',
    );
  }

  if (
    evaluation.status !== 'accepted' ||
    evaluation.scope !== candidate.scope ||
    evaluation.evidenceVersion !== candidate.evidenceVersion
  ) {
    return result('needs_evidence', 'evaluation_not_aligned', candidateId, 'collect_more_evidence');
  }

  const externalExecutionRequested =
    candidate.operation !== 'read_only' || execution?.requested === true;

  if (!externalExecutionRequested) {
    return result(
      'ready_for_approval',
      'read_only_candidate_ready',
      candidateId,
      'continue_to_decision',
    );
  }

  if (approval?.status === 'expired') {
    return result('escalated', 'approval_expired', candidateId, 'human_review');
  }

  if (approval && approval.scope !== candidate.scope) {
    return result('escalated', 'approval_scope_mismatch', candidateId, 'human_review');
  }

  if (approval && approval.evidenceVersion !== candidate.evidenceVersion) {
    return result('escalated', 'approval_evidence_version_mismatch', candidateId, 'human_review');
  }

  if (!hasCompleteEscalationRecord(escalation)) {
    return result('escalated', 'escalation_record_incomplete', candidateId, 'human_review');
  }

  return result(
    'approval_required',
    candidate.operation === 'read_only'
      ? 'external_execution_requires_approval'
      : 'write_candidate_requires_approval',
    candidateId,
    'request_human_approval',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessFeedbackApprovalRoute({
    candidate: {
      id: 'relative-link-candidate',
      scope: 'docs/chapter-38',
      operation: 'read_only',
      evidenceVersion: 'evidence-v1',
    },
    evidence: {
      status: 'fresh',
      scope: 'docs/chapter-38',
      version: 'evidence-v1',
    },
    reflection: {
      observationId: 'observation-38-1',
      hypothesis: 'relative path needs review',
      falsifiableCheck: 'compare against the injected path rule',
    },
    evaluation: {
      status: 'accepted',
      independent: true,
      scope: 'docs/chapter-38',
      evidenceVersion: 'evidence-v1',
    },
    approval: null,
    escalation: null,
    execution: { requested: false },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
