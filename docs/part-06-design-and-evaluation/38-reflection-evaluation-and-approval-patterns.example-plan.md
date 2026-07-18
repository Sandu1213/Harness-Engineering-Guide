---
title: "第 38 章示例计划：反馈、评估与批准路由"
chapter: "38"
status: "completed"
updated_at: "2026-07-16"
---

# 第 38 章示例计划：反馈、评估与批准路由

## 目标与边界

`assessFeedbackApprovalRoute(input)` 只检查调用方注入的反馈、反思、评估、批准和升级记录，决定一个教学候选可否继续到决定、必须补证、需要独立评估，或必须交给人工批准／复核。它不检查真实链接，不读取或写入文件，不调用模型、工具、网络、Git、CI、浏览器、账户、凭证、审批、回滚或任何外部系统。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象、返回确定性的教学路由、打印演示 JSON。 | 验证真实外部状态、请求批准、执行写入、触发重试、生成回滚或声称外部效果。 |

本计划落实第 38 章的五类记录与五张模式卡：完整的只读候选只能得到“可继续到决定”的教学状态；评估接受、批准记录和升级记录都不等于真实执行。任何写入或外部执行请求仍须人工批准，任何过期／错配批准或不完整升级记录仍须人工复核。

## 接口草图

```js
assessFeedbackApprovalRoute({
  candidate: {
    id,
    scope,
    operation: 'read_only' | 'write_requested',
    evidenceVersion,
  },
  evidence: { status: 'fresh', scope, version },
  reflection: { observationId, hypothesis, falsifiableCheck },
  evaluation: { status: 'accepted', independent: true, scope, evidenceVersion },
  approval: null | { status, scope, evidenceVersion },
  escalation: null | { reason, owner, unresolvedItems },
  execution: { requested: false },
});
```

返回对象固定包含 `status`、`code`、`candidateId`、`next` 和 `executionPerformed: false`。状态和原因码只表示注入对象的路由：

- 完整只读候选：`ready_for_approval / read_only_candidate_ready / continue_to_decision`。
- 证据、反思或评价对齐不足：`needs_evidence`；缺少独立评估：`needs_independent_review`。
- 写入候选或 `execution.requested: true`：`approval_required`，并返回 `request_human_approval`。
- 过期批准、批准范围／证据版本错配或升级记录不完整：`escalated`，并返回 `human_review`。

`ready_for_approval` 不是“批准已发生”，`approval_required` 不是“已请求到真实批准”，`escalated` 不是“已通知人工”，所有路径均固定 `executionPerformed: false`。

## 红绿过程

1. **RED：** 先只创建测试 import，再运行 `node --test examples/agent/feedback-approval-route-assessment.test.mjs`。模块尚不存在时，命令以退出码 1 结束并报告 `ERR_MODULE_NOT_FOUND`；这只证明教学模块尚未创建。
2. **GREEN：** 创建纯函数后重跑同一命令。实际结果为退出码 0，8 项通过、0 项失败。
3. **EXECUTE：** 运行 `node examples/agent/feedback-approval-route-assessment.mjs`。实际输出为只读候选的 `ready_for_approval`、`read_only_candidate_ready`、`continue_to_decision` 与 `executionPerformed: false`。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 完整只读候选、证据新鲜、反思完整且独立评估接受。 | `ready_for_approval` | 可继续到教学决定，且没有执行。 | 真实链接已检查或批准已发生。 |
| 证据不新鲜。 | `needs_evidence` | 先补证。 | 结论必定错误。 |
| 评估不独立。 | `needs_independent_review` | 不能用同一链路自我放行。 | 存在真实独立评估者。 |
| 写入候选或请求外部执行。 | `approval_required` | 只能请求人工批准。 | 请求已发送、批准已得到或外部动作已执行。 |
| 批准过期或范围不匹配。 | `escalated` | 必须进入 `human_review`。 | 人工已经查看。 |
| 升级记录缺少所有者或未决项。 | `escalated` | 责任不完整不能静默通过。 | 真实组织没有责任人。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要 Agent、模型、链接检查器、文件、Git、CI、浏览器、网络、账户、密钥、审批或回滚系统。

```bash
node --test examples/agent/feedback-approval-route-assessment.test.mjs
node examples/agent/feedback-approval-route-assessment.mjs
```

两条命令只验证纯内存教学对象的路由，不能作为真实反思、评估、批准、写入、执行、回滚或外部效果已经发生的证据。
