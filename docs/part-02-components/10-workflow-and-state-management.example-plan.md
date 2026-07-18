---
title: "第 10 章示例实现记录：状态迁移评估"
chapter: "10-workflow-and-state-management"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 10 章示例实现记录：状态迁移评估

## 目的与边界

本示例将第 10 章的工作流契约（Workflow Contract）、状态记录（State Record）、检查点（Checkpoint）、交接一致性、未知写入效果与批准快照，收束成一个纯内存判断函数：`assessWorkflowTransition`。

它只判断一项候选状态迁移应当被允许、补证、阻塞或要求批准；不保存或修改状态，也不执行任何动作。它不调用模型、网络、文件、Git、CI、Tool、数据库、环境变量、时钟、凭证或权限系统，因而不能证明真实工作流、重试、恢复、审批、审计、持久化或外部效果。

## 接口

实现位于 [`examples/agent/workflow-transition-assessment.mjs`](../../examples/agent/workflow-transition-assessment.mjs)，接收：

```js
{
  contract: {
    version: 'chapter-10-v1',
    terminalStates: ['validated', 'stopped'],
    transitions: [
      { from: 'ready', to: 'in_progress', kind: 'read_only' },
      { from: 'blocked', to: 'in_progress', kind: 'recovery', requiresCheckpoint: true },
    ],
  },
  stateRecord: {
    workflowVersion: 'chapter-10-v1',
    currentState: 'ready',
    checkpoint: { id: 'checkpoint-1' },
    handoff: { currentState: 'ready' },
  },
  request: {
    to: 'in_progress',
    observation: { kind: 'read_only', status: 'observed' },
    approval: { status: 'active', scope: 'write' },
  },
}
```

返回对象固定包含 `status`、`code`、`from` 与 `to`。当写入效果未知时，返回值额外带回注入的 `effectId`，只帮助调用方定位待重新观察的对象，不表示该效果真实发生。

| 判断顺序 | 条件 | 返回状态 / 代码 | 目的 |
| --- | --- | --- | --- |
| 1 | 契约版本与状态记录不一致 | `blocked` / `workflow_version_mismatch` | 阻止用不匹配规则继续 |
| 2 | 当前状态是终态 | `blocked` / `terminal_state_reentry` | 阻止把已结束执行直接重入 |
| 3 | 契约没有该迁移 | `blocked` / `transition_not_allowed` | 只接受显式声明的路径 |
| 4 | 交接状态与状态记录冲突 | `blocked` / `conflicting_handoff` | 不用摘要覆盖当前记录 |
| 5 | 迁移要求检查点但记录缺失 | `needs_evidence` / `missing_checkpoint` | 先补可恢复依据 |
| 6 | 写入效果是未知 | `blocked` / `unknown_external_effect` | 不把未知效果当作可重放 |
| 7 | 写入迁移缺少、过期或范围不符的注入批准 | `requires_approval` | 将授权判断留在明确边界上 |
| 8 | 进入 `validated` 没有接受的验证观察 | `needs_evidence` / `validation_not_accepted` | 将“观察到”与“验收接受”分开 |
| 9 | 其余合法路径 | `allowed` | 只表示教学对象通过此函数的判断 |

`approval` 是测试注入的快照，而不是授权机制；函数既不检查真实时间，也不授予权限。`observation` 同样是注入值，不是 Tool 结果或重新观察。

## 红绿验证

测试文件先于实现创建。实现模块缺失时，已实际执行：

```bash
node --test examples/agent/workflow-transition-assessment.test.mjs
```

该命令以 `ERR_MODULE_NOT_FOUND` 退出，原因是 `workflow-transition-assessment.mjs` 当时尚不存在。这是预期的红灯，只证明测试先于目标模块存在，不证明任何工作流行为。

实现后应执行：

```bash
npm run test:workflow-transition-assessment
npm run example:workflow-transition-assessment
```

实现后已实际运行专用测试与演示：8 项 Node 内置测试全部通过、0 项失败；演示输出 `allowed` / `legal_transition`、`ready`、`in_progress`。完整命令、红绿证据和边界已登记在[示例整合审查](../../.memory/reviews/2026-07-16-chapter-10-example-integration.md)。这些结果只证明纯函数对注入对象的判断。

## 测试矩阵

| 路径 | 输入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 合法只读迁移 | `ready → in_progress` | `allowed` / `legal_transition` | 任务已执行 |
| 终态重入 | `validated → in_progress` | `blocked` / `terminal_state_reentry` | 终态在真实系统不可改变 |
| 缺检查点 | `blocked → in_progress` 且无 checkpoint | `needs_evidence` / `missing_checkpoint` | 检查点真实可恢复 |
| 未知写入效果 | 写入观察状态为 `unknown` | `blocked` / `unknown_external_effect` | 写入已经发生或未发生 |
| 过期批准 | 写入迁移的批准快照为 `expired` | `requires_approval` / `approval_expired` | 人类批准或权限已失效 |
| 冲突交接 | handoff 状态不同于 State Record | `blocked` / `conflicting_handoff` | 哪一份真实记录正确 |
| 验证拒绝后的恢复 | `ready_for_validation → in_progress` 且观察为 `rejected` | `allowed` / `recovery_after_validation_rejection` | 修订必然成功 |
| 验证证据不足 | `ready_for_validation → validated` 但观察未接受 | `needs_evidence` / `validation_not_accepted` | 真实验收完成 |

## 完成检查

- [x] 接口只使用显式注入的教学对象。
- [x] 测试先于实现创建，并已记录模块缺失红灯。
- [x] 覆盖工作流契约、状态记录、检查点、交接、未知效果、批准与恢复判断。
- [x] 已运行实现后的专用测试和演示，并登记真实输出。
- [x] 已完成全仓校验并在示例整合审查中补充结果。
