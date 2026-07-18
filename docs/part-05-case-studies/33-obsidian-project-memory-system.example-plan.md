---
title: "第 33 章示例计划：项目记忆健康检查"
chapter: "33"
status: "completed"
updated_at: "2026-07-16"
---

# 第 33 章示例计划：项目记忆健康检查

## 目标与边界

`assessProjectMemoryGraph(graph)` 只检查调用方注入的 JavaScript 教学对象，判断记忆节点（Memory Node）、链接契约（Link Contract）、复核阈值和同步边界（Synchronization Boundary）是否足以继续受限交接。它不会读取 Markdown 文件、打开 Obsidian、执行同步、访问网络、云盘、Git、账户、设备、文件系统、子进程、插件或 Agent 工具。

| 允许 | 不允许 |
| --- | --- |
| 检查对象字段、关系目标与日期字符串，返回结构化路由，打印演示 JSON。 | 读取或修改 vault、笔记、文件、环境变量，调用同步服务、网络、账户、插件或任何外部系统。 |

本计划落实正文中的本书工程模型：`stable` 节点缺来源进入 `needs_evidence`，关系缺口、过期复核和未声明同步边界进入 `needs_review`；这些路由不判断内容真伪，也不修复输入。任何 `execution.requested: true` 都返回 `requires_approval`，不推断环境、授权或外部效果存在。

## 接口草图

```js
assessProjectMemoryGraph({
  nodes: [{
    id,
    kind,
    status: 'collected' | 'under_review' | 'stable' | 'superseded' | 'archived' | 'pending_removal',
    owner,
    source,
    reviewed_at: 'YYYY-MM-DD',
    next_action,
  }],
  relationships: [{ from, relation: 'supports' | 'covers' | 'blocks' | 'supersedes' | 'next_step', to }],
  review_policy: { stale_before: 'YYYY-MM-DD' },
  synchronization_boundary: {
    scope,
    channel: 'undecided' | 'declared-channel',
    owner,
    conflict_exit,
    backup_responsibility,
  },
  execution: { requested: false },
});
```

完整教学图只返回 `ready_for_followup / project_memory_graph_ready / implement_in_isolated_example`，并固定 `executionPerformed: false`。`review_policy.stale_before` 是调用方注入的教学阈值，不读取当前时间；`channel: 'undecided'` 仅表示边界已记录，不能表示同步已经发生。

## 路由与测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 完整节点、关系、复核阈值和同步边界。 | `ready_for_followup` | 原因码、下一步与 `executionPerformed: false`。 | 真实 vault 正确、已读取或已同步。 |
| `stable` 节点缺来源。 | `needs_evidence` | 不能让状态字段替代来源。 | 来源不可用或内容错误。 |
| 节点缺 `owner` 等基础字段。 | `needs_evidence` | 不自动补齐未知责任。 | 节点不能被人工修复。 |
| 关系目标不在注入节点中。 | `needs_review` | 悬空 Link Contract 不能继续交接。 | 真实文件一定不存在。 |
| 复核日期早于注入阈值。 | `needs_review` | 要求刷新复核，而不裁判内容。 | 内容必然错误或应删除。 |
| 未声明同步边界。 | `needs_review` | 建立升级记录，而非假定已同步。 | 已获写入或同步授权。 |
| 请求任何外部执行。 | `requires_approval` | 明确批准出口。 | 环境、账户或目标可用。 |

## 红绿过程

1. **RED：** 已先创建测试 import，再运行 `node --test examples/agent/project-memory-health.test.mjs`。
   - 实际结果：模块尚不存在，Node 报告 `ERR_MODULE_NOT_FOUND`；1 个测试文件加载失败。
   - 结论边界：只证明教学模块尚未存在，不涉及 vault、Obsidian、同步、网络或外部系统。
2. **GREEN：** 已实现纯函数，并重跑同一命令。
   - 实际结果：7 项通过、0 项失败，覆盖完整教学图、缺来源、缺基础字段、悬空关系、过期复核、未声明同步边界和真实执行请求。
3. **EXECUTE：** 已运行 `node examples/agent/project-memory-health.mjs`。
   - 实际结果：输出 `ready_for_followup`、`project_memory_graph_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。

## 运行前提与命令

- 只需要本仓 Node.js；不需要 Obsidian、vault、同步服务、网络、账户或密钥。

```bash
node --test examples/agent/project-memory-health.test.mjs
node examples/agent/project-memory-health.mjs
```

两条命令只验证本书教学模块的纯内存分类，不能成为真实项目记忆、vault、链接、同步或外部执行已发生的证据。
