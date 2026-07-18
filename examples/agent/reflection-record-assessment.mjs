const REQUIRED_TRACE_FIELDS = ['id', 'scope', 'outcome', 'observationStatus', 'evidence'];
const REQUIRED_REFLECTION_FIELDS = [
  'symptom',
  'hypothesis',
  'falsifiableCheck',
  'counterfactual',
  'proposedChange',
  'changeScope',
];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function missingFields(record, prefix, fields) {
  if (!record || typeof record !== 'object') {
    return fields.map((field) => `${prefix}.${field}`);
  }

  return fields
    .filter((field) => !isNonEmptyString(record[field]))
    .map((field) => `${prefix}.${field}`);
}

function result(status, code, traceId, nextAction, missing = []) {
  return { status, code, traceId: traceId ?? null, nextAction, missing };
}

/**
 * Assess an injected failed trace and a proposed reflection record.
 * This teaching function performs no filesystem, network, model, process, clock, or persistence I/O.
 * It never writes a lesson, proves a root cause, or changes a Harness.
 *
 * @param {{
 *   trace?: { id?: string, scope?: string, outcome?: string, observationStatus?: string, evidence?: string },
 *   reflection?: { symptom?: string, hypothesis?: string, falsifiableCheck?: string, counterfactual?: string, proposedChange?: string, changeScope?: string },
 *   verification?: { status?: 'not_run' | 'passed' | 'failed' }
 * }} request
 * @returns {{
 *   status: 'candidate_for_validation' | 'eligible_for_review' | 'rejected' | 'needs_evidence' | 'not_applicable' | 'refresh_required' | 'blocked',
 *   code: string,
 *   traceId: string | null,
 *   nextAction: string,
 *   missing: string[]
 * }}
 */
export function assessReflectionRecord(request) {
  const trace = request?.trace;
  const reflection = request?.reflection;
  const verification = request?.verification;
  const traceId = isNonEmptyString(trace?.id) ? trace.id : null;
  const missingTrace = missingFields(trace, 'trace', REQUIRED_TRACE_FIELDS);

  if (missingTrace.length > 0) {
    return result('needs_evidence', 'reflection_input_incomplete', traceId, 'collect_trace_evidence', missingTrace);
  }

  if (!['failed', 'passed'].includes(trace.outcome)) {
    return result('needs_evidence', 'trace_outcome_unknown', traceId, 'evaluate_trace_outcome', ['trace.outcome:failed|passed']);
  }

  if (trace.outcome !== 'failed') {
    return result('not_applicable', 'no_verified_failure', traceId, 'preserve_trace_without_failure_lesson');
  }

  if (trace.observationStatus !== 'current') {
    return result('refresh_required', 'observation_not_current', traceId, 'refresh_observation');
  }

  const missingReflection = missingFields(reflection, 'reflection', REQUIRED_REFLECTION_FIELDS);
  if (missingReflection.length > 0) {
    const code = missingReflection.includes('reflection.falsifiableCheck')
      ? 'hypothesis_not_falsifiable'
      : 'reflection_input_incomplete';
    return result('needs_evidence', code, traceId, 'complete_reflection_record', missingReflection);
  }

  if (reflection.changeScope !== trace.scope) {
    return result('blocked', 'change_scope_expanded', traceId, 'narrow_or_escalate_change_scope');
  }

  if (!verification || !['not_run', 'passed', 'failed'].includes(verification.status)) {
    return result('needs_evidence', 'candidate_verification_unknown', traceId, 'record_candidate_verification', ['verification.status:not_run|passed|failed']);
  }

  if (verification.status === 'failed') {
    return result('rejected', 'candidate_check_failed', traceId, 'keep_trace_and_seek_new_hypothesis');
  }

  if (verification.status === 'passed') {
    return result('eligible_for_review', 'candidate_check_passed', traceId, 'review_before_adoption');
  }

  return result('candidate_for_validation', 'reflection_candidate_ready', traceId, 'run_falsifiable_check');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const teachingResult = assessReflectionRecord({
    trace: {
      id: 'link-check-attempt-02',
      scope: 'docs:chapter-16',
      outcome: 'failed',
      observationStatus: 'current',
      evidence: 'injected:link-check-output',
    },
    reflection: {
      symptom: '两个链接检查请求未通过。',
      hypothesis: '候选资料 URL 的格式可能不符合检查器规则。',
      falsifiableCheck: '用同一检查器对最小 URL 列表重新执行。',
      counterfactual: '若最小 URL 列表通过，优先检查暂态网络或原页面可达性。',
      proposedChange: '为候选资料增加可追溯链接预检查。',
      changeScope: 'docs:chapter-16',
    },
    verification: { status: 'not_run' },
  });

  console.log(JSON.stringify(teachingResult, null, 2));
}
