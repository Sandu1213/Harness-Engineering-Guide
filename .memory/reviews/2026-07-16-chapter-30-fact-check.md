# 第 30 章事实核验

## 复核材料与结论

| 章节键 | 正式映射 | 当前官方复核 | 可保留的限定陈述 |
| --- | --- | --- | --- |
| CH30-REF-01 | REF-092 | Flutter Testing Overview 将自动测试分为 unit、widget、integration，并说明其范围。 | 三类测试提供不同范围的证据；不证明任何项目已运行。 |
| CH30-REF-02 | REF-093 | Flutter 表单示例使用 `Form`、`GlobalKey<FormState>` 与 `FormState.validate()`；`validate()` 调用各字段的 validator，并以布尔结果和错误显示反映校验。 | 输入校验可以作为独立可观察分支；不推断认证或网络行为。 |
| CH30-REF-03 | REF-094 | 集成测试资料使用 `integration_test`、`IntegrationTestWidgetsFlutterBinding` 与 `WidgetTester`，并指向物理设备或模拟器运行语境。 | 设备／模拟器结论需要真实目标和观察；本章未执行。 |
| CH30-REF-04 | REF-090 | Node 官方资料说明 `node:test` 用于创建 JavaScript 测试，`--test` 是本章 Node 测试入口的受限背景。 | Node 测试机制不证明 Flutter、设备、网络或登录行为。 |

## 本书模型与运行证据

- Delivery Contract、State Model、Test Matrix、Observation Record、Report Contract，以及 `ready`、`requires_approval`、`planned` 都是本书工程模型或教学输入，不归因 Flutter、Node 或任何厂商。
- 虚构的成功、输入校验错误和网络错误场景只用于说明交付证据边界，不断言真实认证协议或用户体验。
- 本轮实际运行 `npm run test:flutter-login-delivery-assessment`：8 项通过、0 项失败；`npm run example:flutter-login-delivery-assessment` 输出 `ready`、`flutter_login_delivery_plan_ready`、`implement_in_isolated_example`、`executionPerformed: false` 与三条必需场景。
- 上述运行只证明注入 JavaScript 对象的分类。未创建或运行 Flutter/Dart 项目，未使用设备、模拟器、网络、认证、凭证、浏览器、CI、日志或真实测试报告。
- `npm run validate` 以退出码 0 完成：409 个 Markdown 文件零 lint 错误，链接检查、30 组 Node.js 示例测试及章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。

## 结论

`通过`。正文、提纲、事实核验清单与正式映射的可归因陈述均被当前官方资料支持；没有发现需要修正的来源范围、模型边界或运行结论。
