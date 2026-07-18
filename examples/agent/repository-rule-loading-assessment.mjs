/**
 * 对注入的教学规则记录作确定性预检。
 * 不读取真实文件、环境、网络、时钟、Agent 会话或任何产品配置。
 */
export function assessRepositoryRuleLoading({ task, rules, state, policy }) {
  if (
    !task?.id ||
    !task.path ||
    !Array.isArray(rules) ||
    !Array.isArray(policy?.requiredLayers) ||
    !Array.isArray(policy?.layerOrder) ||
    !state?.revision
  ) {
    return result('needs_spec', 'rule_packet_input_incomplete', task?.id);
  }

  if (state.freshness !== 'current') {
    return result('needs_review', 'state_freshness_not_current', task.id);
  }

  const matching = rules.filter((item) => ruleMatchesTask(item, task.path));
  for (const item of matching) {
    if (item.status !== 'retired' && (!hasCompleteRuleRecord(item) || !policy.layerOrder.includes(item.layer))) {
      return result('needs_spec', 'rule_record_incomplete', task.id, { ruleId: item?.id });
    }
  }
  const active = matching.filter((item) => item.status === 'active');

  for (const layer of policy.requiredLayers) {
    if (!active.some((item) => item.layer === layer)) {
      return result('needs_evidence', 'required_rule_layer_missing', task.id, { layer });
    }
  }

  const conflicts = new Map();
  for (const item of active) {
    if (!item.conflictKey) continue;

    const key = `${item.layer}:${item.scope}:${item.conflictKey}`;
    const seen = conflicts.get(key);
    if (seen && seen.directive !== item.directive) {
      return result('blocked', 'same_scope_rule_conflict', task.id, {
        conflictKey: item.conflictKey,
      });
    }
    conflicts.set(key, item);
  }

  const ruleIds = active
    .slice()
    .sort((left, right) => policy.layerOrder.indexOf(left.layer) - policy.layerOrder.indexOf(right.layer))
    .map((item) => item.id);

  return result('ready_to_load', 'rule_packet_ready', task.id, { ruleIds });
}

function ruleMatchesTask(item, taskPath) {
  if (!item) return false;
  if (item.scope === 'repo') return true;
  return typeof item.scope === 'string' && taskPath.startsWith(`${item.scope}/`);
}

function hasCompleteRuleRecord(item) {
  return Boolean(
    item?.id &&
      item.layer &&
      item.scope &&
      typeof item.directive === 'string' &&
      item.directive.trim() &&
      item.source &&
      item.status === 'active' &&
      item.revision,
  );
}

function result(status, code, taskId, extra = {}) {
  return { status, code, taskId, ...extra };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessRepositoryRuleLoading({
      task: {
        id: 'chapter-22-draft',
        path: 'docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.md',
      },
      rules: [
        {
          id: 'entry-codex',
          layer: 'entry',
          scope: 'repo',
          directive: 'read the project entry',
          source: 'AGENTS.md',
          status: 'active',
          revision: 'r1',
        },
        {
          id: 'book-rules',
          layer: 'stable',
          scope: 'repo',
          directive: 'preserve source boundaries',
          source: 'BOOK_RULES.md',
          status: 'active',
          revision: 'r4',
        },
        {
          id: 'project-context',
          layer: 'context',
          scope: 'repo',
          directive: 'read project context before drafting',
          source: '.context/PROJECT_CONTEXT.md',
          status: 'active',
          revision: 'r8',
        },
        {
          id: 'current-state',
          layer: 'state',
          scope: 'docs',
          directive: 'read current task state',
          source: '.context/CURRENT_STATE.md',
          status: 'active',
          revision: 'state-r22',
        },
        {
          id: 'chapter-template',
          layer: 'task',
          scope: 'docs',
          directive: 'use the chapter template',
          source: 'CHAPTER_TEMPLATE.md',
          status: 'active',
          revision: 'r2',
        },
      ],
      state: { revision: 'state-r22', freshness: 'current' },
      policy: {
        requiredLayers: ['entry', 'stable', 'state', 'task'],
        layerOrder: ['entry', 'stable', 'context', 'state', 'task'],
      },
    }),
  );
}
