import assert from 'node:assert/strict';
import test from 'node:test';

import { assessRepositoryRuleLoading } from './repository-rule-loading-assessment.mjs';

const baseTask = {
  id: 'chapter-22-draft',
  path: 'docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.md',
};

const baseState = {
  revision: 'state-r22',
  freshness: 'current',
};

const basePolicy = {
  requiredLayers: ['entry', 'stable', 'state', 'task'],
  layerOrder: ['entry', 'stable', 'context', 'state', 'task'],
};

function rule(id, layer, scope, directive, extra = {}) {
  return {
    id,
    layer,
    scope,
    directive,
    source: `${id}.md`,
    status: 'active',
    revision: 'r1',
    ...extra,
  };
}

function completeRules(extra = {}) {
  return [
    rule('entry-codex', 'entry', 'repo', 'read the project entry'),
    rule('book-rules', 'stable', 'repo', 'preserve source boundaries'),
    rule('project-context', 'context', 'repo', 'read project context before drafting'),
    rule('current-state', 'state', 'docs', 'read current task state'),
    rule('chapter-template', 'task', 'docs', 'use the chapter template'),
    ...(extra.rules ?? []),
  ];
}

test('orders matching active rules after all required layers and current state are present', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: completeRules(),
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'ready_to_load',
      code: 'rule_packet_ready',
      taskId: 'chapter-22-draft',
      ruleIds: ['entry-codex', 'book-rules', 'project-context', 'current-state', 'chapter-template'],
    },
  );
});

test('requires evidence when a required rule layer has no matching active rule', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: completeRules({ rules: [] }).filter((item) => item.layer !== 'task'),
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'needs_evidence',
      code: 'required_rule_layer_missing',
      taskId: 'chapter-22-draft',
      layer: 'task',
    },
  );
});

test('requires review when the injected project state is stale or unknown', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: completeRules(),
      state: { revision: 'state-r21', freshness: 'stale' },
      policy: basePolicy,
    }),
    {
      status: 'needs_review',
      code: 'state_freshness_not_current',
      taskId: 'chapter-22-draft',
    },
  );
});

test('blocks contradictory directives with the same layer, scope and conflict key', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: completeRules({
        rules: [
          rule('chapter-write-allowed', 'task', 'docs', 'allow chapter body edits', {
            conflictKey: 'chapter-write-mode',
          }),
          rule('chapter-write-blocked', 'task', 'docs', 'do not edit chapter body', {
            conflictKey: 'chapter-write-mode',
          }),
        ],
      }),
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'blocked',
      code: 'same_scope_rule_conflict',
      taskId: 'chapter-22-draft',
      conflictKey: 'chapter-write-mode',
    },
  );
});

test('does not leak a docs-only task rule into an examples task', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: { id: 'chapter-22-example', path: 'examples/agent/repository-rule-loading-assessment.mjs' },
      rules: [
        rule('entry-codex', 'entry', 'repo', 'read the project entry'),
        rule('book-rules', 'stable', 'repo', 'preserve source boundaries'),
        rule('current-state', 'state', 'examples', 'read current task state'),
        rule('example-plan', 'task', 'examples', 'keep the example pure in memory'),
        rule('docs-only', 'task', 'docs', 'never applies to the example'),
      ],
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'ready_to_load',
      code: 'rule_packet_ready',
      taskId: 'chapter-22-example',
      ruleIds: ['entry-codex', 'book-rules', 'current-state', 'example-plan'],
    },
  );
});

test('requires a specification when task, policy or an applicable rule has incomplete metadata', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: [
        rule('entry-codex', 'entry', 'repo', 'read the project entry'),
        rule('book-rules', 'stable', 'repo', 'preserve source boundaries'),
        rule('current-state', 'state', 'docs', 'read current task state'),
        { id: 'broken-task-rule', layer: 'task', scope: 'docs', directive: '', source: 'unknown' },
      ],
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'needs_spec',
      code: 'rule_record_incomplete',
      taskId: 'chapter-22-draft',
      ruleId: 'broken-task-rule',
    },
  );
});

test('ignores explicitly retired rules instead of treating them as active requirements', () => {
  assert.deepEqual(
    assessRepositoryRuleLoading({
      task: baseTask,
      rules: completeRules({
        rules: [rule('old-entry', 'entry', 'repo', 'read obsolete entry', { status: 'retired' })],
      }),
      state: baseState,
      policy: basePolicy,
    }),
    {
      status: 'ready_to_load',
      code: 'rule_packet_ready',
      taskId: 'chapter-22-draft',
      ruleIds: ['entry-codex', 'book-rules', 'project-context', 'current-state', 'chapter-template'],
    },
  );
});
