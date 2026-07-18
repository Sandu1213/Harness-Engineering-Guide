const REQUIRED_CANDIDATE_FIELDS = [
  'id',
  'kind',
  'scope',
  'subject',
  'source',
  'observedAt',
  'writeReason',
  'readTrigger',
  'validity',
];

const RECORD_FIELDS = [
  ...REQUIRED_CANDIDATE_FIELDS,
  'revisionOrRevocation',
];

function isNonEmptyString(value) {
  return typeof value === 'string' && value !== '';
}

function recordId(candidate) {
  return isNonEmptyString(candidate?.id) ? candidate.id : null;
}

function recordView(candidate) {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  return Object.fromEntries(RECORD_FIELDS
    .filter((field) => candidate[field] !== undefined)
    .map((field) => [field, candidate[field]]));
}

function blocked(candidate, phase, missing, reason) {
  return {
    state: 'blocked',
    phase,
    record: recordView(candidate),
    reasons: [reason],
    unknowns: [{
      id: recordId(candidate),
      missing,
    }],
    nextAction: 'add_evidence',
  };
}

/**
 * Decide how one injected Memory Record may be used in this chapter's teaching model.
 * The function performs no filesystem, network, model, process, clock, or persistence I/O.
 *
 * @param {{ taskAnchor?: string, subject?: string, candidate?: object }} request
 * @returns {{
 *   state: 'working' | 'long_term_candidate' | 'blocked' | 'refresh_required',
 *   phase: 'current_task' | 'candidate_review' | 'missing_metadata' | 'subject_mismatch' | 'refresh_before_read',
 *   record: object | null,
 *   reasons: string[],
 *   unknowns: Array<{ id: string | null, missing: string[] }>,
 *   nextAction: 'keep_in_working_memory' | 'review_for_long_term' | 'add_evidence' | 'refresh_current_evidence'
 * }}
 */
export function decideMemoryRecord(request) {
  const taskAnchor = request?.taskAnchor;
  const subject = request?.subject;
  const candidate = request?.candidate;

  if (!candidate || typeof candidate !== 'object') {
    return blocked(null, 'missing_metadata', ['candidate'], '缺少候选记录，不能推断应当记住什么。');
  }

  const missing = [
    ...(!isNonEmptyString(taskAnchor) ? ['taskAnchor'] : []),
    ...(!isNonEmptyString(subject) ? ['subject'] : []),
    ...REQUIRED_CANDIDATE_FIELDS.filter((field) => !isNonEmptyString(candidate[field])),
    ...(candidate.scope === 'cross-task' && !isNonEmptyString(candidate.revisionOrRevocation)
      ? ['revisionOrRevocation']
      : []),
  ];

  if (missing.length > 0) {
    return blocked(candidate, 'missing_metadata', missing, '记录的可追溯元数据不完整，不能补写猜测值。');
  }

  if (!['task', 'cross-task'].includes(candidate.scope)) {
    return blocked(candidate, 'missing_metadata', ['scope:task|cross-task'], '记录的适用范围未知，不能决定其可读边界。');
  }

  if (!['current', 'expired'].includes(candidate.validity)) {
    return blocked(candidate, 'missing_metadata', ['validity:current|expired'], '记录的有效性未知，不能把它当作当前依据。');
  }

  if (candidate.subject !== subject) {
    return blocked(candidate, 'subject_mismatch', ['subject_match'], '候选记录属于其他主体，不能在当前任务中复用。');
  }

  if (candidate.validity === 'expired') {
    return {
      state: 'refresh_required',
      phase: 'refresh_before_read',
      record: recordView(candidate),
      reasons: ['记录已过期；保留其来源指针，但必须先刷新当前证据。'],
      unknowns: [],
      nextAction: 'refresh_current_evidence',
    };
  }

  if (candidate.scope === 'task') {
    return {
      state: 'working',
      phase: 'current_task',
      record: recordView(candidate),
      reasons: ['记录满足当前任务的工作记忆条件，不代表已持久化或事实已经成立。'],
      unknowns: [],
      nextAction: 'keep_in_working_memory',
    };
  }

  return {
    state: 'long_term_candidate',
    phase: 'candidate_review',
    record: recordView(candidate),
    reasons: ['记录只能作为跨任务候选，仍需按修订或撤销路径审查，而非直接持久化。'],
    unknowns: [],
    nextAction: 'review_for_long_term',
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = decideMemoryRecord({
    taskAnchor: '定位当前测试失败',
    subject: 'project:demo',
    candidate: {
      id: 'failure-observation',
      kind: 'observation',
      scope: 'task',
      subject: 'project:demo',
      source: 'injected:test-output',
      observedAt: '2026-07-15',
      writeReason: '记录当前验证对象',
      readTrigger: '当前任务仍在处理此失败',
      validity: 'current',
      revisionOrRevocation: 'replace-on-new-observation',
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
