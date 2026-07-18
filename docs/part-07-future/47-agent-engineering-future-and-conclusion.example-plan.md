---
title: "第 47 章示例计划：Agent Engineering 准备度审查"
chapter: "47"
status: "completed"
updated_at: "2026-07-17"
---

# 第 47 章示例计划：Agent Engineering 准备度审查

## 目标与边界

`assessAgentEngineeringReadiness(input)` 只判断调用者注入的 Task Contract、上下文边界、能力边界、状态模型、观察证据、评估证据、交接证据、风险责任与自治请求。它不读取仓库、文件、环境变量或真实运行时，也不调用模型、Tool、网络、Git、CI、身份、权限、批准、部署或发布系统。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象，按固定顺序返回保守状态和原因码，打印无副作用演示 JSON。 | 检查真实权限、观察外部效果、运行评估、创建批准、启动 Agent、部署或发布。 |

## 接口草图

```js
assessAgentEngineeringReadiness({
  taskContract,
  contextBoundary,
  capabilityBoundary,
  stateModel,
  observationEvidence,
  evaluationEvidence,
  handoffEvidence,
  riskOwnership,
  autonomyRequest,
});
```

返回对象固定包含 `status`、`code`、`taskId`、`next` 与 `executionPerformed: false`。候选状态包括 `needs_contract`、`needs_context_evidence`、`needs_capability_boundary`、`state_not_ready`、`needs_effect_evidence`、`evaluation_not_comparable`、`handoff_not_ready`、`human_accountability_required`、`autonomy_not_justified` 和 `ready_for_bounded_pilot_review`。

## TDD 计划

1. **RED：** 已先建立 11 项行为测试；运行时退出码 1，唯一装配失败为实现模块尚不存在导致的 `ERR_MODULE_NOT_FOUND`。
2. **GREEN：** 已实现最小纯函数，按任务、上下文、能力、状态、观察、评估、交接、责任和自治顺序保守返回；同一测试命令退出码 0，11 项通过、0 项失败。
3. **EXECUTE：** 已运行模块内的完整虚构输入；输出 `ready_for_bounded_pilot_review / bounded_pilot_evidence_ready / request_named_human_decision / executionPerformed:false`，未执行外部动作。

## 实际运行结果

| 阶段 | 命令 | 退出码与结果 |
| --- | --- | --- |
| RED | `rtk proxy node --test examples/agent/agent-engineering-readiness-assessment.test.mjs` | 1；1 项装配失败，`ERR_MODULE_NOT_FOUND` 指向尚未创建的实现模块。 |
| GREEN | 同一测试命令 | 0；11 项通过、0 项失败。 |
| EXECUTE | `rtk proxy node examples/agent/agent-engineering-readiness-assessment.mjs` | 0；输出 `ready_for_bounded_pilot_review`、`bounded_pilot_evidence_ready`、`request_named_human_decision` 与 `executionPerformed: false`。 |

## 测试矩阵

| 路径 | 预期状态 | 不证明 |
| --- | --- | --- |
| Task Contract 缺范围或停止条件。 | `needs_contract` | 真实需求不存在或已被拒绝。 |
| 上下文过期或可见性不明。 | `needs_context_evidence` | 来源内容错误或被撤销。 |
| 目标、副作用或能力记录不完整。 | `needs_capability_boundary` | 真实权限已经撤销。 |
| 状态转换、恢复或效果不明。 | `state_not_ready` | 外部动作一定失败。 |
| 只有 Tool Result，没有独立观察与验收。 | `needs_effect_evidence` | Tool Result 为假。 |
| 版本不可比、场景不全或硬门失败。 | `evaluation_not_comparable` | 新版本一定更差。 |
| 输入／状态版本漂移或缺少下一责任者。 | `handoff_not_ready` | 交接包已被真实读取。 |
| 风险、批准、停止或事件责任未具名。 | `human_accountability_required` | 组织没有其他治理机制。 |
| 自治收益未测、缺预算或回滚。 | `autonomy_not_justified` | 动态路由永远无价值。 |
| 所有注入证据完整。 | `ready_for_bounded_pilot_review` | 已批准、部署、上线或可长期自治。 |

## 运行前提

只需要本仓 Node.js。输入全部是虚构对象；测试和演示不能作为模型能力、Tool 行为、权限有效、安全控制、供应链、组织责任或真实 Pilot 已经验证的证据。
