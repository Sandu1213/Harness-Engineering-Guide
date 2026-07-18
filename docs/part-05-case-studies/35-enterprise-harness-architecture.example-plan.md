---
title: "第 35 章示例计划：企业 Harness 准入"
chapter: "35"
status: "completed"
updated_at: "2026-07-16"
---

# 第 35 章示例计划：企业 Harness 准入

## 目标与边界

`assessEnterpriseHarnessPlan(plan)` 只检查调用方传入的 JavaScript 对象，判断虚构知识助手的只读候选工作是否同时具备企业控制平面（Enterprise Control Plane）、执行平面（Execution Plane）、策略决定记录（Policy Decision Record）、租户与数据边界（Tenant and Data Boundary）、关联观察记录（Correlated Observation Record）、预算状态和人工升级门（Human Escalation Gate）。它不会查询身份、策略、集群、遥测、工单、知识库、审计、网络、文件、账户、凭证或外部 API，也不会创建审批或执行外部动作。

| 允许 | 不允许 |
| --- | --- |
| 检查注入字段、返回结构化教学决定、打印演示 JSON。 | 发起读写、运行策略引擎、请求遥测、启动工具、读取文件或环境、创建审批、调用网络或外部系统。 |

## 接口草图

```js
assessEnterpriseHarnessPlan({
  controlPlane: {
    subjectClaim,
    tenantDataBoundary: {
      tenantDefinition,
      dataCategory,
      targetBoundary,
      sharedException,
    },
    policyDecisionRecord: {
      id,
      decision: 'allowed' | 'denied' | 'pending_approval',
      ruleVersion,
      limits: { allowedCapabilities, targetBoundary },
      correlationId,
    },
    budget: { limit, status: 'within_limit' | 'expired', expiresAtState },
  },
  executionPlane: {
    taskId,
    requestedCapability,
    targetBoundary,
    executionRequest: 'not-requested' | 'requested',
    stopCondition,
    observationRequirement,
  },
  correlatedObservationRecord: {
    decisionId,
    taskId,
    correlationId,
    state: 'planned',
    freshness,
  },
  escalationGate: { triggers, owner, route: 'human_review' },
});
```

只有能力为 `read_approved_summary`、策略为 `allowed`、预算仍可继续且三份关联标识一致的输入，才返回 `ready / enterprise_read_only_candidate_ready / continue_read_only_candidate`，并固定 `executionPerformed: false`。关键控制或执行边界缺失时返回 `stopped / stop`；写入能力、外部执行请求、待批准策略、预算过期或关联不一致时返回 `requires_approval / obtain_human_approval`，不推断任何真实授权、读取、写入、审批或业务效果。

## 红绿过程

1. **RED：** 已先创建测试 import，再运行 `node --test examples/agent/enterprise-harness-admission-assessment.test.mjs`。
   - 实际结果：模块尚不存在，Node 报告 `ERR_MODULE_NOT_FOUND`；1 个测试文件加载失败，0 项通过、1 项失败。
   - 结论边界：只证明教学模块尚未存在，不涉及身份、策略、集群、遥测、工单或任何外部动作。
2. **GREEN：** 已实现纯函数，并重跑同一命令。
   - 实际结果：9 项通过、0 项失败，覆盖完整只读候选、控制平面／租户边界／策略限制缺失、待批准策略、外部执行、写入能力、预算过期与关联不一致。
3. **EXECUTE：** 已运行 `node examples/agent/enterprise-harness-admission-assessment.mjs`。
   - 实际结果：输出 `ready`、`enterprise_read_only_candidate_ready`、`continue_read_only_candidate` 与 `executionPerformed: false`。

上述结果只证明对象分类和固定的无执行标记；它们不代表企业系统、策略、身份、预算、追踪、人工审批或外部动作已执行。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 控制／执行平面、租户边界、允许策略、关联观察、预算和升级门完整。 | `ready` | 仅只读候选可继续，且 `executionPerformed: false`。 | 外部知识已读取或结果已验收。 |
| 缺控制平面、租户边界或策略限制。 | `stopped` | 缺关键边界不能进入候选路径。 | 真实边界或策略存在。 |
| 策略为待批准、请求写入能力或请求外部执行。 | `requires_approval` | 统一路由人工升级。 | 人工一定批准或具有权限。 |
| 预算过期或关联标识不一致。 | `requires_approval` | 预算与关联不足均不能继续。 | 真实预算、trace 或审计已被读取。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要身份提供方、OPA、Kubernetes、OpenTelemetry、工单、知识库、浏览器、网络、账户或密钥。

```bash
node --test examples/agent/enterprise-harness-admission-assessment.test.mjs
node examples/agent/enterprise-harness-admission-assessment.mjs
```

两条命令只验证本书教学模块的纯内存分类，不能成为企业部署、身份验证、策略求值、资源计量、追踪、审计、人工审批或外部系统已运行的证据。
