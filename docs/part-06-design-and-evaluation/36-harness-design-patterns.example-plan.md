---
title: "第 36 章示例计划：Harness 模式选择"
chapter: "36"
status: "completed"
updated_at: "2026-07-16"
---

# 第 36 章示例计划：Harness 模式选择

## 目标与边界

`assessHarnessPatternSelection(card)` 只检查调用方注入的 JavaScript 模式卡（Pattern Card），判断一个虚构只读分析请求是否仍可保留在受控单循环（Controlled Single Loop），或应停止、路由人工复核／批准。它不启动 Agent、工作者、计划、流水线、事件、队列、工作流或并发，也不读取、写入、修复、测试、分派、发送消息、访问网络、文件、账户、凭证、Git、浏览器、CI 或任何外部系统。

| 允许 | 不允许 |
| --- | --- |
| 检查注入字段、返回结构化教学决定、打印演示 JSON。 | 创建或调度控制流，读取状态，执行并行、发布事件、调用工具，或产生任何外部副作用。 |

本计划落实第 36 章的本书工程模型：一张完整的受控单循环卡只能说明教学提案可继续比较；计划、事件、并发和写入都不构成执行许可。它们若被请求，只能返回人工批准出口；控制权、状态／证据或停止契约缺失时则保守停止。

## 接口草图

```js
assessHarnessPatternSelection({
  pattern: 'controlled_single_loop' | 'plan_execute' | 'supervisor_worker' | 'pipeline' | 'event_driven',
  trigger,
  controlOwner,
  workContract,
  stateAndEvidence,
  stopAndEscalation,
  sideEffectBoundary: 'no_external_execution' | 'external_write_requested',
  evolutionTrigger,
  concurrency: { mode: 'not_requested' | 'parallel' | 'undeclared' },
  sharedState: { scope: 'none' | 'shared', owner },
  failureHandling: { owner },
  execution: { requested: false },
});
```

只有完整的 `controlled_single_loop` 卡、`concurrency.mode: 'not_requested'`、`sideEffectBoundary: 'no_external_execution'` 与明确的失败所有者，才返回 `ready / controlled_single_loop_ready / continue_controlled_single_loop`，并固定 `executionPerformed: false`。

- 缺少 `controlOwner`、`stateAndEvidence`、`stopAndEscalation` 或其他模式卡基础字段时，返回 `stopped / stop`；它们不足以安全推断下一步。
- 在受控单循环卡中声明并行或留下 `concurrency.mode: 'undeclared'` 时，返回 `stopped / stop`；错误的并行用法不能通过更复杂的角色名称掩盖。
- 请求 `event_driven`、`supervisor_worker` 并发、外部写入边界或 `execution.requested: true` 时，返回 `requires_approval / obtain_human_approval`；这只说明需独立的人类判断，不说明批准、执行或效果已经发生。
- `sharedState.scope: 'shared'` 却无所有者，或 `failureHandling.owner` 缺失时，也返回 `requires_approval / obtain_human_approval`，防止共享状态与失败责任被静默推断。

## 红绿过程

1. **RED：** 先创建测试 import，再运行 `node --test examples/agent/harness-pattern-selection-assessment.test.mjs`；模块尚不存在时，预期为 `ERR_MODULE_NOT_FOUND`。
2. **GREEN：** 再实现纯函数，并重跑同一命令。测试只覆盖注入对象分类和固定的无执行标记。
3. **EXECUTE：** 运行 `node examples/agent/harness-pattern-selection-assessment.mjs`，预期只打印完整受控单循环的 `ready` 决定与 `executionPerformed: false`。

实际结果：

- **RED：** `node --test examples/agent/harness-pattern-selection-assessment.test.mjs` 在模块创建前以退出码 1 结束，Node 报告 `ERR_MODULE_NOT_FOUND`，且 1 个测试文件加载失败。它只证明教学模块尚不存在。
- **GREEN：** 同一命令在实现后以退出码 0 结束，8 项通过、0 项失败，覆盖完整受控单循环、控制权／状态缺失、错误并行、未声明并发、事件／并发／写入／执行请求、共享状态所有者缺失和失败所有者缺失。
- **EXECUTE：** `node examples/agent/harness-pattern-selection-assessment.mjs` 以退出码 0 输出 `ready`、`controlled_single_loop_ready`、`continue_controlled_single_loop` 与 `executionPerformed: false`。

这些结果不代表 Agent、并发、事件、计划、队列、工作流、外部写入或外部系统已运行。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 完整受控单循环卡，且无并发、写入或执行请求。 | `ready` | 返回受控单循环的后续动作与 `executionPerformed: false`。 | Agent、循环、计划或诊断已经运行。 |
| 控制权、状态／证据或停止契约不完整。 | `stopped` | 缺失条件不能被模型名称或角色数量补齐。 | 真实任务无法由人工补全。 |
| 受控单循环卡错误声明并行或并发状态未声明。 | `stopped` | 模式内矛盾保守停止。 | 并发已经发生或一定不安全。 |
| 事件、并发监督者—工作者、写入边界或执行请求。 | `requires_approval` | 复杂或外部效果候选统一走人工批准出口。 | 任何人已批准、任务已分派或动作已执行。 |
| 共享状态所有者或失败所有者不明确。 | `requires_approval` | 责任不明不得继续。 | 真实系统中没有其他责任人。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要 Agent、模型、队列、事件总线、工作流、浏览器、Git、文件、网络、账户或密钥。

```bash
node --test examples/agent/harness-pattern-selection-assessment.test.mjs
node examples/agent/harness-pattern-selection-assessment.mjs
```

两条命令只验证本书教学模块的纯内存分类，不能成为真实控制流、事件投递、并发、批准、写入、修复或外部执行已发生的证据。
