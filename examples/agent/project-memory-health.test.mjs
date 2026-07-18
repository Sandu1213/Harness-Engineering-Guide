import assert from 'node:assert/strict';
import test from 'node:test';

import { assessProjectMemoryGraph } from './project-memory-health.mjs';

function validGraph(overrides = {}) {
  const graph = {
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
  };

  return { ...graph, ...overrides };
}

test('admits a complete in-memory project memory graph without execution', () => {
  assert.deepEqual(assessProjectMemoryGraph(validGraph()), {
    status: 'ready_for_followup',
    code: 'project_memory_graph_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  });
});

test('routes a stable node without a source to evidence collection', () => {
  const graph = validGraph();
  delete graph.nodes[0].source;

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'needs_evidence',
    code: 'stable_node_missing_source',
    next: 'collect_evidence',
    executionPerformed: false,
  });
});

test('stops followup when a memory node lacks a required field', () => {
  const graph = validGraph();
  graph.nodes[0].owner = '';

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'needs_evidence',
    code: 'incomplete_memory_node',
    next: 'collect_evidence',
    executionPerformed: false,
  });
});

test('routes a relationship whose target is absent to review', () => {
  const graph = validGraph({
    relationships: [
      {
        from: 'source-ref-097',
        relation: 'supports',
        to: 'missing-chapter',
      },
    ],
  });

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'needs_review',
    code: 'relationship_target_missing',
    next: 'review_relationship',
    executionPerformed: false,
  });
});

test('routes a stale review to a refresh without judging its content', () => {
  const graph = validGraph();
  graph.nodes[0].reviewed_at = '2026-06-30';

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'needs_review',
    code: 'review_refresh_required',
    next: 'refresh_review',
    executionPerformed: false,
  });
});

test('escalates when the synchronization boundary is not declared', () => {
  const graph = validGraph({ synchronization_boundary: undefined });

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'needs_review',
    code: 'synchronization_boundary_undefined',
    next: 'create_escalation_record',
    executionPerformed: false,
  });
});

test('requires approval for any requested external execution', () => {
  const graph = validGraph({ execution: { requested: true } });

  assert.deepEqual(assessProjectMemoryGraph(graph), {
    status: 'requires_approval',
    code: 'execution_request_not_approved',
    next: 'obtain_environment_approval',
    executionPerformed: false,
  });
});
