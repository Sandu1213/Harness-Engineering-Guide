---
title: "第 37 章示例计划：Memory 与 Skill 边界评估"
chapter: "37"
status: "completed"
updated_at: "2026-07-16"
---

# 第 37 章示例计划：Memory 与 Skill 边界评估

## 目标与边界

`assessMemorySkillBoundary(card)` 只检查调用方注入的 Memory／Skill Pattern Card，保守地区分可继续的只读教学候选、待补证、待刷新、待人工复核、待人工批准和停止。它不读取项目记忆、调用 Skill、访问模型、数据库、网络、文件、Git、账户、凭证、同步服务或任何外部系统，也不产生写入、审查、批准或执行效果。

| 允许 | 不允许 |
| --- | --- |
| 检查注入字段、返回结构化教学决定、打印演示 JSON。 | 检索或保存记忆、启动或发现 Skill、使用工具、读写文件、访问网络或让任何外部动作发生。 |

## 接口草图

```js
assessMemorySkillBoundary({
  task: { subject, scope, question, budget, stopCondition },
  evidence: { source, scope, freshness: 'current' | 'stale', reviewStatus },
  skill: {
    mode: 'read_only',
    readableCategories: ['evidence_card'],
    prohibitedActions: ['write_memory', 'external_execution'],
  },
  writeProposal: { requested: boolean, boundary, reviewStatus },
  lifecycle: { status: 'stable' | 'deprecated' | 'superseded', replacement },
  execution: { requested: boolean, claimedPerformed: boolean },
});
```

- 完整的当前项目只读候选返回 `ready_for_isolated_example / memory_skill_boundary_ready / continue_read_only_assessment`，并固定 `executionPerformed: false`。
- 缺来源返回 `needs_evidence`，资料陈旧返回 `needs_refresh`，来源范围与任务范围不一致返回 `requires_review`。
- 提议写入、未明确禁止记忆写入、请求或声称外部执行都返回 `requires_approval`；它们不代表批准、保存或执行已经发生。
- Skill 契约、任务边界、生命周期或提议写入边界缺失时保守停止；弃用或替代不清的 Skill 保留给人工复核。

## 红绿与运行证据

1. **RED：** 先创建测试 import，运行 `node --test examples/agent/memory-skill-boundary-assessment.test.mjs`。
   - 实际结果：模块创建前以退出码 1 结束，Node 报告 `ERR_MODULE_NOT_FOUND`，且 1 个测试文件加载失败。
2. **GREEN：** 添加纯函数后重跑同一命令。
   - 实际结果：退出码 0，8 项通过、0 项失败；覆盖完整只读路径、缺来源、陈旧资料、跨项目范围、提议／隐式写入、弃用、执行请求／声称与缺 Skill 契约。
3. **EXECUTE：** 运行 `node examples/agent/memory-skill-boundary-assessment.mjs`。
   - 实际结果：退出码 0，输出 `ready_for_isolated_example`、`memory_skill_boundary_ready`、`continue_read_only_assessment` 与 `executionPerformed: false`。

这些命令只证明教学对象的纯内存路由；不证明真实 Session、项目记忆、Evidence Card、Skill、审查、批准、同步、文件、网络、数据库或外部执行已经发生。

## 测试矩阵

| 路径 | 预期决定 | 不证明 |
| --- | --- | --- |
| 完整只读候选，且来源、范围、新鲜度、生命周期和执行边界明确。 | `ready_for_isolated_example`。 | 真实资料已读取、事实已核验或项目记忆已更新。 |
| 来源缺失或陈旧。 | `needs_evidence` 或 `needs_refresh`。 | 来源不可得、内容错误或刷新已经完成。 |
| 证据来自另一项目。 | `requires_review`。 | 跨项目读取已获授权或一定不适用。 |
| 提议写入、未禁止写入、请求／声称执行。 | `requires_approval`。 | 人工已批准、写入或外部动作已发生。 |
| Skill 已弃用、替代不清或契约缺失。 | `requires_review` 或 `stopped`。 | 旧项已删除、迁移已完成或真实 Skill 可被调用。 |

## 运行前提与命令

只需要本仓 Node.js：

```bash
node --test examples/agent/memory-skill-boundary-assessment.test.mjs
node examples/agent/memory-skill-boundary-assessment.mjs
```

两条命令不访问真实项目或外部环境；它们只能验证本书教学模型是否保留了候选、提议、审查与执行之间的责任断点。
