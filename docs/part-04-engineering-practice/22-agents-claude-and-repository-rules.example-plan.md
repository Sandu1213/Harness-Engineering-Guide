---
title: "第 22 章示例实现记录：Repository Rule Loading Assessment"
chapter: "22"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 22 章示例实现记录：Repository Rule Loading Assessment

## 读者问题

在修改前，如何区分“当前任务缺少必须规则”“状态需要重新确认”和“同一范围内的规则互相矛盾”？

## 目的与边界

`assessRepositoryRuleLoading` 是一个纯内存的教学预检器。它接收由调用者注入的 `task`、`rules`、`state` 和 `policy`，只判断 Rule Packet 是否具备最小可读条件。

它不会读取 `AGENTS.md`、`CLAUDE.md`、模板、环境变量、Git、时钟、网络、Agent 会话、产品配置、权限或工具输出。它也不调用 Codex 或 Claude Code。因此输出不能证明真实文件被发现、规则已进入模型上下文、写入获得授权或任务结果正确。

## 接口与字段

| 对象 | 最小字段 | 教学含义 |
| --- | --- | --- |
| `task` | `id`、`path` | 将要处理的工作项和其仓库路径。 |
| `rules[]` | `id`、`layer`、`scope`、`directive`、`source`、`status`、`revision` | 一条可审查的 Rule Record。`scope` 只支持本例的 `repo` 或路径首段，例如 `docs`、`examples`。 |
| `state` | `revision`、`freshness` | 外部调用者已经得到的状态判断；函数不从时间戳推断是否过期。 |
| `policy` | `requiredLayers`、`layerOrder` | 本书定义的最小层级与排序，不是任何产品的优先级。 |

`conflictKey` 是可选字段。若两条**同层、同范围**的活跃规则拥有相同冲突键但不同指令，函数返回阻止状态，而不是猜测哪条“更高优先级”。

## 判定顺序

| 顺序 | 条件 | 返回 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 输入、策略、任务或状态修订缺失 | `needs_spec` / `rule_packet_input_incomplete` | 真实仓库没有规则。 |
| 2 | 状态不是明确 `current` | `needs_review` / `state_freshness_not_current` | 状态文件已被真实读取或外部任务失败。 |
| 3 | 适用规则缺元数据或层级不在策略中 | `needs_spec` / `rule_record_incomplete` | 产品拒绝读取该文件。 |
| 4 | 缺少必须层 | `needs_evidence` / `required_rule_layer_missing` | 任务不能在人工确认后继续。 |
| 5 | 同层同范围冲突键的指令不同 | `blocked` / `same_scope_rule_conflict` | 真实工具已停止写入。 |
| 6 | 条件齐备 | `ready_to_load` / `rule_packet_ready` | 真实规则已加载、已遵守或已授权。 |

## 红绿验证

测试先于实现创建，首次执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
```

实际红灯为 `ERR_MODULE_NOT_FOUND`，原因是目标模块尚未创建。这只证明测试先于实现，不表示真实仓库、Codex 或 Claude Code 出错。

实现后执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
node examples/agent/repository-rule-loading-assessment.mjs
```

实际结果见[示例整合审查](../../.memory/reviews/2026-07-16-chapter-22-example-integration.md)。

## 测试矩阵

| 路径 | 预期 | 不证明 |
| --- | --- | --- |
| 分层与状态齐备 | `ready_to_load` | 某产品已读取文件。 |
| 缺少任务层 | `needs_evidence` | 任务永久无法开始。 |
| 状态陈旧 | `needs_review` | 外部状态一定错误。 |
| 同层同范围冲突 | `blocked` | 写入已被系统级拦截。 |
| `docs` 规则用于 `examples` 任务 | 规则不进入 Packet | 真实 glob 或目录发现行为。 |
| Rule Record 元数据不完整 | `needs_spec` | 某个文件已经删除。 |
| 已退役规则 | 不进入活跃 Packet | 历史规则不应保留审计记录。 |

## 升级触发

1. 若需要解析真实文件路径或 glob，先定义路径规范、文件读取权限、符号链接和错误语义；本例不能替代它们。
2. 若需要证明某个 Agent 实际加载了哪些规则，使用该产品在写作日提供的可观察诊断；不要从本函数的输出推断。
3. 若规则必须机械阻止工具、命令或写入，使用运行时权限、Sandbox 或 hook，并在第 12、23、41 章的边界下审查。

## 完成检查

- [x] 仅使用 Node.js 内置模块与纯函数。
- [x] 红灯和绿灯均实际运行并记录为教学代码验证。
- [x] 状态、冲突、范围和退役规则的保守出口均有精确断言。
- [x] 主线程决定是否将专用命令加入共享 `package.json` 与总校验。
