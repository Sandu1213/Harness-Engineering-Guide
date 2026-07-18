---
title: "第 30 章示例计划：Flutter 登录交付计划准入"
chapter: "30"
status: "completed"
updated_at: "2026-07-16"
---

# 第 30 章示例计划：Flutter 登录交付计划准入

## 目标与边界

`assessFlutterLoginDelivery(deliveryPackage)` 只审查调用者传入的 JavaScript 对象，判断虚构登录案例的交付计划是否拥有可审查输入。它不会创建 Flutter 项目、编译 Dart、访问设备、模拟器、浏览器、网络、认证服务、文件、CI、密钥或真实报告。

| 允许 | 不允许 |
| --- | --- |
| 检查任务、状态模型、测试矩阵、报告合同与批准状态；返回结构化决定；打印演示 JSON。 | 运行 `flutter`、调用 HTTP、保留密码、启动设备、执行浏览器交互、读取环境变量、写入文件或生成真实测试报告。 |

## 接口草图

```js
assessFlutterLoginDelivery({
  task: { id, feature: 'login', objective, state: 'ready', dataPolicy: 'no-real-credentials' },
  stateModel: { states, terminalStates },
  testMatrix: {
    scenarios: ['success', 'validation_error', 'network_error'],
    layers: ['unit', 'widget', 'integration'],
    executionTarget: 'planned',
  },
  reportContract: {
    correlationId,
    requiredFields: ['scenario', 'layer', 'observation', 'verdict', 'limitation'],
    claimState: 'planned',
  },
  approvals: { environmentExecution: 'not-requested' },
});
```

成功只返回 `ready / flutter_login_delivery_plan_ready / implement_in_isolated_example`，同时固定 `executionPerformed: false`。若有人请求环境执行，函数返回 `requires_approval`，而不是假定已有设备、模拟器或授权。

## 红绿过程

1. **RED：** 先建立测试 import，尚未创建模块时运行 `node --test examples/agent/flutter-login-delivery-assessment.test.mjs`。
   - 实际结果：`ERR_MODULE_NOT_FOUND`，进程失败，测试文件未能加载。
   - 结论边界：只证明被测教学模块还不存在。
2. **GREEN：** 新建纯函数，逐一检查合同、无真实凭证策略、六个状态、三条场景、三层测试、报告字段及环境批准。
   - 实际结果：同一命令 8 项通过、0 项失败。
3. **EXECUTE：** 运行 `node examples/agent/flutter-login-delivery-assessment.mjs`。
   - 实际结果：输出 `ready`、`flutter_login_delivery_plan_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。
4. **边界：** 不增加“模拟登录请求”或“设备模拟器”；它们会把教学准入器误写成真实移动测试。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 计划完整、无真实凭证、只声明计划执行 | `ready` | 原因码、下一步、`executionPerformed: false`。 | Flutter 应用已实现。 |
| 任务合同不完整 | `stopped / missing_task_contract` | 不进入任何实现步骤。 | 真实需求是否完整。 |
| 策略允许真实凭证 | `stopped / credential_policy_violation` | 不会被准入。 | 凭证存储或传输真的安全。 |
| 状态模型缺网络失败 | `stopped / missing_required_state` | 三条失败路径未被合并。 | 网络请求发生过。 |
| 测试矩阵缺场景 | `stopped / missing_test_scenario` | 场景覆盖被拒绝。 | 任意测试已运行。 |
| 报告声称已执行 | `stopped / report_claim_not_observed` | 无观察不能增强结论。 | 报告能验证产品。 |
| 请求环境执行 | `requires_approval / environment_execution_not_approved` | 明确升级出口。 | 设备或权限存在。 |
| 报告关联其他任务 | `stopped / report_not_linked_to_task` | 证据不被错误归属。 | 真实报告完整性。 |

## 运行前提与命令

- 本仓可执行 Node.js；本次实际输出的版本为 `v24.16.0`。
- 不需要 Flutter SDK、设备、模拟器、浏览器、网络、账户、密钥或其他安装。

```bash
node --test examples/agent/flutter-login-delivery-assessment.test.mjs
node examples/agent/flutter-login-delivery-assessment.mjs
```

Node 测试机制见 [CH30-REF-04](30-application-delivery-harness-flutter-login-to-test-report.references.md)。实际测试结果以本页与 Fact Check 的命令记录为准。
