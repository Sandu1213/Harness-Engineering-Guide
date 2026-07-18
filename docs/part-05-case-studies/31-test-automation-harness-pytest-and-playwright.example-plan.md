---
title: "第 31 章示例计划：测试证据计划准入"
chapter: "31"
status: "completed"
updated_at: "2026-07-16"
---

# 第 31 章示例计划：测试证据计划准入

## 目标与边界

`assessTestEvidencePlan(plan)` 只检查调用方传入的 JavaScript 对象，判断虚构登录场景是否同时声明 API 契约、UI 前后观察、隔离、Failure Record 和 Report Gate。它不导入 pytest 或 Playwright，不创建 HTTP 请求、浏览器、文件、子进程、账户、凭证、网络或 CI。

| 允许 | 不允许 |
| --- | --- |
| 检查计划字段、返回结构化决定、打印演示 JSON。 | 运行 pytest／Playwright、调用 API、启动浏览器、读取环境变量、读写文件或生成真实报告。 |

## 接口草图

```js
assessTestEvidencePlan({
  scenario: { id, feature: 'login', dataPolicy: 'no-real-identities' },
  apiContract: {
    fixtureScope: 'function',
    substituteBoundary,
    restoreAfterRequest: true,
    expectedCategories: ['accepted', 'authentication_rejected', 'service_unavailable'],
    executionState: 'planned',
  },
  uiFlow: {
    contextIsolation: 'fresh-browser-context',
    locatorStrategy: 'user-facing-or-test-contract',
    beforeObservation,
    primaryAction,
    afterObservation,
    executionState: 'planned',
  },
  failureRecord: { scenarioId, requiredLayers: ['api', 'ui'], limitation },
  reportGate: {
    scenarioId,
    requiredLayers: ['api', 'ui'],
    claimState: 'planned',
    observationRequiredForExecution: true,
    limitation,
  },
  approvals: { environmentExecution: 'not-requested' },
});
```

完整计划只返回 `ready / test_evidence_plan_ready / implement_in_isolated_example`，并固定 `executionPerformed: false`。缺少关键证据时返回 `stopped`；任何环境执行请求返回 `requires_approval`，不会假定真实服务、浏览器或授权可用。

## 红绿过程

1. **RED：** 已先创建测试 import，再运行 `node --test examples/agent/test-evidence-plan-assessment.test.mjs`。
   - 实际结果：模块尚不存在，Node 报告 `ERR_MODULE_NOT_FOUND`，1 个测试文件加载失败。
   - 结论边界：只证明被测教学模块尚未存在，不涉及 pytest、Playwright、API 或浏览器。
2. **GREEN：** 已实现纯函数，并运行同一命令。
   - 实际结果：8 项通过、0 项失败，覆盖完整双层计划、API 契约缺失或不完整、UI 动作后观察缺失、隔离不足、Failure Record 关联不足、报告越界及环境请求未批准。
3. **EXECUTE：** 已运行 `node examples/agent/test-evidence-plan-assessment.mjs`。
   - 实际结果：输出 `ready`、`test_evidence_plan_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 双层计划完整且不请求环境。 | `ready` | 原因码、下一步、`executionPerformed: false`。 | pytest 或 Playwright 已运行。 |
| API Contract 缺失或不能涵盖三种教学类别。 | `stopped` | 不允许用 UI 观察补 API 缺口。 | 真实 API 已失败。 |
| UI 缺动作后观察或 Browser Context 边界。 | `stopped` | 不允许旧快照或隔离声明替代用户流程。 | 浏览器渲染存在问题。 |
| Failure Record 无法关联场景和两层。 | `stopped` | 失败不能脱离对象或层级。 | 根因已经找到。 |
| 报告声称执行却无观察。 | `stopped` | `planned` 不能越级为 `executed`。 | 报告能验证产品。 |
| 请求环境执行。 | `requires_approval` | 明确升级出口。 | 服务、浏览器或权限存在。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要 pytest、Playwright、浏览器、HTTP 服务、网络、账户或密钥。

```bash
node --test examples/agent/test-evidence-plan-assessment.test.mjs
node examples/agent/test-evidence-plan-assessment.mjs
```

两条命令只验证本书教学模块的纯内存分类。它们不能成为 API、UI 或端到端测试已执行的证据。
