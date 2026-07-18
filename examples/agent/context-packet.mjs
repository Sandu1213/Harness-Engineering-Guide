const PRIORITY = {
  constraint: 0,
  'direct-evidence': 1,
  'history-summary': 2,
  reference: 3,
};

const VALID_RELEVANCE = new Set(['current', 'background']);
const VALID_FRESHNESS = new Set(['fresh', 'expired']);

/** Validate the teaching request without reading any external state. */
function validateRequest(request) {
  if (!request || typeof request !== 'object') {
    throw new TypeError('request must be an object');
  }

  const { taskAnchor, budgetUnits, candidates } = request;
  if (!taskAnchor || typeof taskAnchor !== 'object' || ['goal', 'stopCondition', 'verificationTarget'].some((key) => typeof taskAnchor[key] !== 'string' || taskAnchor[key] === '')) {
    throw new TypeError('taskAnchor must include non-empty goal, stopCondition, and verificationTarget strings');
  }
  if (!Number.isInteger(budgetUnits) || budgetUnits <= 0) {
    throw new TypeError('budgetUnits must be a positive integer');
  }
  if (!Array.isArray(candidates)) {
    throw new TypeError('candidates must be an array');
  }

  candidates.forEach((item) => {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || item.id === '' || !Object.hasOwn(PRIORITY, item.kind) || !VALID_RELEVANCE.has(item.relevance) || !VALID_FRESHNESS.has(item.freshness) || !Number.isInteger(item.sizeUnits) || item.sizeUnits <= 0) {
      throw new TypeError('each candidate must include id, kind, relevance, freshness, and positive sizeUnits');
    }
    if (item.source !== undefined && typeof item.source !== 'string') {
      throw new TypeError('candidate source must be a string when present');
    }
    if (item.capturedAt !== undefined && typeof item.capturedAt !== 'string') {
      throw new TypeError('candidate capturedAt must be a string when present');
    }
    if (item.content !== undefined && typeof item.content !== 'string') {
      throw new TypeError('candidate content must be a string when present');
    }
    if (item.reference !== undefined && typeof item.reference !== 'string') {
      throw new TypeError('candidate reference must be a string when present');
    }
    if (item.loadWhen !== undefined && typeof item.loadWhen !== 'string') {
      throw new TypeError('candidate loadWhen must be a string when present');
    }
    if (item.conflictsWith !== undefined && (!Array.isArray(item.conflictsWith) || item.conflictsWith.some((id) => typeof id !== 'string' || id === ''))) {
      throw new TypeError('candidate conflictsWith must be an array of non-empty strings when present');
    }
  });
}

/** Return the subset of a selected item that the pure teaching packet exposes. */
function selectedItem(item) {
  return {
    id: item.id,
    kind: item.kind,
    source: item.source,
    capturedAt: item.capturedAt,
    relevance: item.relevance,
    freshness: item.freshness,
    sizeUnits: item.sizeUnits,
    content: item.content,
  };
}

/** Return a deterministic result for candidates whose provenance is incomplete. */
function provenanceBlocked(unknowns) {
  return {
    state: 'blocked',
    phase: 'missing_provenance',
    packet: null,
    excluded: [],
    unknowns,
    refresh: [],
    evidence: ['candidate provenance is incomplete'],
  };
}

/**
 * Build a deterministic, in-memory Context Packet for the chapter's teaching model.
 * It performs no filesystem, network, model, retrieval, cache, process, time, or credential I/O.
 *
 * @param {{
 *   taskAnchor: { goal: string, stopCondition: string, verificationTarget: string },
 *   budgetUnits: number,
 *   candidates: Array<{
 *     id: string,
 *     kind: 'constraint' | 'direct-evidence' | 'history-summary' | 'reference',
 *     source?: string,
 *     capturedAt?: string,
 *     relevance: 'current' | 'background',
 *     freshness: 'fresh' | 'expired',
 *     sizeUnits: number,
 *     content?: string,
 *     reference?: string,
 *     loadWhen?: string,
 *     conflictsWith?: string[]
 *   }>
 * }} request
 * @returns {{
 *   state: 'ready' | 'blocked' | 'refresh_required',
 *   phase: 'assembled' | 'missing_provenance' | 'refresh_context',
 *   packet: object | null,
 *   excluded: Array<{ id: string, reason: string }>,
 *   unknowns: Array<{ id: string, missing: string[] }>,
 *   refresh: object[],
 *   evidence: string[]
 * }}
 */
export function buildContextPacket(request) {
  validateRequest(request);

  const provenanceUnknowns = request.candidates
    .map((item) => ({
      id: item.id,
      missing: ['source', 'capturedAt'].filter((key) => item[key] === '' || item[key] === undefined),
    }))
    .filter((item) => item.missing.length > 0);

  if (provenanceUnknowns.length > 0) {
    return provenanceBlocked(provenanceUnknowns);
  }

  const selected = [];
  const pointers = [];
  const excluded = [];
  const refresh = [];
  let usedBudgetUnits = 0;
  const selectedDirectEvidence = new Set();

  const orderedCandidates = request.candidates
    .map((item, index) => ({ item, index }))
    .sort((left, right) => PRIORITY[left.item.kind] - PRIORITY[right.item.kind] || left.index - right.index)
    .map(({ item }) => item);

  for (const item of orderedCandidates) {
    if (item.freshness === 'expired') {
      excluded.push({ id: item.id, reason: 'expired' });
      if (item.kind === 'direct-evidence') {
        refresh.push({
          id: item.id,
          reason: 'direct_evidence_expired',
          source: item.source,
        });
      }
      continue;
    }

    const conflictsWithCurrentEvidence = item.kind === 'history-summary'
      && (item.conflictsWith ?? []).filter((id) => selectedDirectEvidence.has(id));
    if (conflictsWithCurrentEvidence.length > 0) {
      excluded.push({ id: item.id, reason: 'conflicting_history_summary' });
      refresh.push({
        id: item.id,
        reason: 'conflicts_with_current_direct_evidence',
        conflictsWith: conflictsWithCurrentEvidence,
      });
      continue;
    }

    const hasFullContent = typeof item.content === 'string' && item.content !== '';
    const fitsBudget = usedBudgetUnits + item.sizeUnits <= request.budgetUnits;
    if (hasFullContent && fitsBudget && item.kind !== 'reference') {
      selected.push(selectedItem(item));
      usedBudgetUnits += item.sizeUnits;
      if (item.kind === 'direct-evidence') {
        selectedDirectEvidence.add(item.id);
      }
      continue;
    }

    if (typeof item.reference === 'string' && item.reference !== '') {
      pointers.push({
        id: item.id,
        reference: item.reference,
        loadWhen: item.loadWhen || 'when the current packet needs full content',
      });
      continue;
    }

    excluded.push({
      id: item.id,
      reason: hasFullContent ? 'over_budget_without_reference' : 'missing_content_and_reference',
    });
  }

  const needsRefresh = refresh.length > 0;
  return {
    state: needsRefresh ? 'refresh_required' : 'ready',
    phase: needsRefresh ? 'refresh_context' : 'assembled',
    packet: {
      taskAnchor: request.taskAnchor,
      selected,
      pointers,
      usedBudgetUnits,
      budgetUnits: request.budgetUnits,
    },
    excluded,
    unknowns: [],
    refresh,
    evidence: [
      'candidate provenance and selection order are explicit',
      'budget decisions are recorded as selected items, pointers, or exclusions',
    ],
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = buildContextPacket({
    taskAnchor: {
      goal: '定位单一测试失败',
      stopCondition: '缺少可追溯的直接证据时停止',
      verificationTarget: 'injected:test-name',
    },
    budgetUnits: 8,
    candidates: [
      {
        id: 'failure-output',
        kind: 'direct-evidence',
        source: 'injected:test-output',
        capturedAt: '2026-07-15',
        relevance: 'current',
        freshness: 'fresh',
        sizeUnits: 3,
        content: 'expected status 401 but received 200',
      },
      {
        id: 'large-ci-log',
        kind: 'reference',
        source: 'injected:ci-log',
        capturedAt: '2026-07-15',
        relevance: 'background',
        freshness: 'fresh',
        sizeUnits: 9,
        reference: 'injected:ci-log#auth-test',
        loadWhen: '失败断言指向认证模块',
      },
    ],
  });

  console.log(JSON.stringify(result, null, 2));
}
