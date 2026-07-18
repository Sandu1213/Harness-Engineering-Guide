const LIFECYCLE_STATUSES = new Set([
  'collected',
  'under_review',
  'stable',
  'superseded',
  'archived',
  'pending_removal',
]);
const RELATION_TYPES = new Set(['supports', 'covers', 'blocks', 'supersedes', 'next_step']);

/**
 * Assess an injected project-memory teaching graph without external execution.
 * The function never reads files, opens Obsidian, performs synchronization, or
 * accesses a network, account, plugin, process, or environment value.
 *
 * @param {unknown} graph
 * @returns {{
 *   status: 'ready_for_followup' | 'needs_evidence' | 'needs_review' | 'requires_approval',
 *   code: string,
 *   next: string,
 *   executionPerformed: false,
 * }}
 */
export function assessProjectMemoryGraph(graph) {
  if (!isRecord(graph)) {
    return needsEvidence('invalid_project_memory_graph');
  }

  if (isRecord(graph.execution) && graph.execution.requested === true) {
    return requiresApproval('execution_request_not_approved');
  }

  if (!Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    return needsEvidence('missing_memory_nodes');
  }

  const nodeIds = new Set();
  for (const node of graph.nodes) {
    const nodeDecision = assessNode(node, nodeIds);
    if (nodeDecision) {
      return nodeDecision;
    }
  }

  if (!isRecord(graph.review_policy) || !isIsoDate(graph.review_policy.stale_before)) {
    return needsReview('review_policy_undefined', 'define_review_policy');
  }

  for (const node of graph.nodes) {
    if (node.reviewed_at < graph.review_policy.stale_before) {
      return needsReview('review_refresh_required', 'refresh_review');
    }
  }

  if (!Array.isArray(graph.relationships)) {
    return needsReview('relationships_undefined', 'review_relationship');
  }

  for (const relationship of graph.relationships) {
    const relationshipDecision = assessRelationship(relationship, nodeIds);
    if (relationshipDecision) {
      return relationshipDecision;
    }
  }

  if (!hasSynchronizationBoundary(graph.synchronization_boundary)) {
    return needsReview('synchronization_boundary_undefined', 'create_escalation_record');
  }

  return {
    status: 'ready_for_followup',
    code: 'project_memory_graph_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  };
}

/** @param {unknown} node @param {Set<string>} nodeIds */
function assessNode(node, nodeIds) {
  if (!isRecord(node) || !hasNodeShape(node)) {
    return needsEvidence('incomplete_memory_node');
  }

  if (nodeIds.has(node.id)) {
    return needsReview('duplicate_memory_node_id', 'review_identity');
  }

  nodeIds.add(node.id);

  if (node.status === 'stable' && !hasNonEmptyString(node.source)) {
    return needsEvidence('stable_node_missing_source');
  }

  if (node.status === 'superseded' && !hasNonEmptyString(node.replacement)) {
    return needsReview('superseded_node_missing_replacement', 'review_replacement');
  }

  return undefined;
}

/** @param {unknown} node */
function hasNodeShape(node) {
  return (
    isRecord(node) &&
    hasNonEmptyString(node.id) &&
    hasNonEmptyString(node.kind) &&
    LIFECYCLE_STATUSES.has(node.status) &&
    hasNonEmptyString(node.owner) &&
    isIsoDate(node.reviewed_at) &&
    hasNonEmptyString(node.next_action)
  );
}

/** @param {unknown} relationship @param {Set<string>} nodeIds */
function assessRelationship(relationship, nodeIds) {
  if (!isRecord(relationship) || !hasNonEmptyString(relationship.from) || !hasNonEmptyString(relationship.to)) {
    return needsReview('incomplete_link_contract', 'review_relationship');
  }

  if (!RELATION_TYPES.has(relationship.relation)) {
    return needsReview('unsupported_link_relation', 'review_relationship');
  }

  if (!nodeIds.has(relationship.from)) {
    return needsReview('relationship_source_missing', 'review_relationship');
  }

  if (!nodeIds.has(relationship.to)) {
    return needsReview('relationship_target_missing', 'review_relationship');
  }

  return undefined;
}

/** @param {unknown} boundary */
function hasSynchronizationBoundary(boundary) {
  return (
    isRecord(boundary) &&
    hasNonEmptyString(boundary.scope) &&
    hasNonEmptyString(boundary.channel) &&
    hasNonEmptyString(boundary.owner) &&
    hasNonEmptyString(boundary.conflict_exit) &&
    hasNonEmptyString(boundary.backup_responsibility)
  );
}

/** @param {unknown} value */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/** @param {unknown} value */
function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** @param {string} code */
function needsEvidence(code) {
  return {
    status: 'needs_evidence',
    code,
    next: 'collect_evidence',
    executionPerformed: false,
  };
}

/** @param {string} code @param {string} next */
function needsReview(code, next) {
  return {
    status: 'needs_review',
    code,
    next,
    executionPerformed: false,
  };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_environment_approval',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessProjectMemoryGraph({
    nodes: [
      {
        id: 'chapter-31',
        kind: 'chapter',
        status: 'stable',
        owner: 'documentation-maintainer',
        source: 'chapter-31-scope',
        reviewed_at: '2026-07-16',
        next_action: 'review-open-question',
      },
      {
        id: 'source-ref-097',
        kind: 'source-card',
        status: 'under_review',
        owner: 'evidence-maintainer',
        reviewed_at: '2026-07-16',
        next_action: 'review-source-scope',
      },
    ],
    relationships: [
      {
        from: 'source-ref-097',
        relation: 'supports',
        to: 'chapter-31',
      },
    ],
    review_policy: {
      stale_before: '2026-07-01',
    },
    synchronization_boundary: {
      scope: 'chapter-memory',
      channel: 'undecided',
      owner: 'documentation-maintainer',
      conflict_exit: 'request_human_review',
      backup_responsibility: 'documentation-maintainer',
    },
    execution: {
      requested: false,
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
