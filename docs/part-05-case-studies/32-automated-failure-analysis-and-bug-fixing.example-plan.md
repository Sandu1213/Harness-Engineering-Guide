---
title: "第 32 章示例计划：缺陷调查准入"
chapter: "32"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章示例计划：缺陷调查准入

## 目标与边界

`assessBugInvestigation(investigation)` 只检查调用方传入的 JavaScript 对象，判断虚构的提交后观察缺失是否具有症状、复现契约、可证伪假设、候选修复和双分支回归门。它不会复现失败、改动补丁、调用 Git、启动浏览器、请求网络、读取文件或环境变量，也不访问账户、凭证、CI 或生产系统。

| 允许 | 不允许 |
| --- | --- |
| 检查对象字段、返回结构化决定、打印演示 JSON。 | 运行 Bug 修复、pytest、Playwright、Git `bisect`、浏览器、API、网络、文件、子进程或 CI。 |

## 接口草图

```js
assessBugInvestigation({
  symptom: { id, expected, actual },
  reproduction: {
    input,
    preconditions,
    failurePredicate,
    allowedActions,
    untrustedVariables,
  },
  hypotheses: [{
    id,
    mechanism,
    prediction,
    counterfactual,
    check: { id, distinguishesHypotheses: true, executionState: 'planned' },
    status: 'supported',
  }],
  fixCandidate: {
    hypothesisId,
    change,
    expectedImpact,
    protectedScope,
    executionState: 'planned',
  },
  regressionGate: {
    originalFailureCheck,
    expectedBehaviorObservation,
    scope,
    uncovered,
    claimState: 'planned',
  },
  approvals: { environmentExecution: 'not-requested' },
});
```

完整输入只返回 `ready / bug_investigation_ready / implement_in_isolated_example`，并固定 `executionPerformed: false`。缺少关键证据时返回 `stopped`；任何真实环境请求返回 `requires_approval`，不会推断目标、授权或外部效果已经存在。

## 红绿过程

1. **RED：** 已先创建测试 import，再运行 `node --test examples/agent/bug-investigation-assessment.test.mjs`。
   - 实际结果：模块尚不存在，Node 报告 `ERR_MODULE_NOT_FOUND`，1 个测试文件加载失败。
   - 结论边界：只证明教学模块尚未存在，不涉及 Bug 修复、测试框架、浏览器、API 或 Git。
2. **GREEN：** 已实现纯函数，并运行同一命令。
   - 实际结果：8 项通过、0 项失败，覆盖完整调查、复现契约缺失、预测缺失、不可区分检查、候选修复关联不足、双分支回归门缺口和环境请求。
3. **EXECUTE：** 已运行 `node examples/agent/bug-investigation-assessment.mjs`。
   - 实际结果：输出 `ready`、`bug_investigation_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 调查链完整且不请求环境。 | `ready` | 原因码、下一步、`executionPerformed: false`。 | 真实失败已复现或修复。 |
| 缺少 Reproduction Contract。 | `stopped` | 无失败判定不能进入最小化或修复。 | 真实复现条件不存在。 |
| 假设缺预测或检查不能区分替代解释。 | `stopped` | 不能把猜测作为原因。 | 根因已经排除。 |
| 候选修复没有关联被支持假设。 | `stopped` | 不允许补丁越过证据。 | 任何修改已写入。 |
| 回归门缺原失败或修复后观察。 | `stopped` | 双分支都必须保留。 | 真实回归已经运行。 |
| 请求真实环境执行。 | `requires_approval` | 明确升级出口。 | 环境、目标或权限可用。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要 pytest、Playwright、浏览器、Git、HTTP 服务、网络、账户或密钥。

```bash
npm run test:bug-investigation-assessment
npm run example:bug-investigation-assessment
```

两条命令只验证本书教学模块的纯内存分类，不能成为真实 Bug 修复、浏览器、API、Git 历史或端到端流程已执行的证据。
