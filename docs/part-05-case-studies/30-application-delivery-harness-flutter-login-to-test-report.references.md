---
title: "第 30 章参考资料：应用交付 Harness：Flutter 登录到测试报告"
chapter: "30"
status: "registered"
updated_at: "2026-07-16"
---

# 第 30 章参考资料：应用交付 Harness：Flutter 登录到测试报告

> 本地 `CH30-REF-*` 键用于章节内追溯。主线程已核对并登记正式映射：CH30-REF-01、CH30-REF-02、CH30-REF-03、CH30-REF-04 分别对应 REF-092、REF-093、REF-094、REF-090；本地键仍保留，便于标记每项来源的限定用途。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- |
| CH30-REF-01 | [Flutter: Testing Flutter apps](https://docs.flutter.dev/testing/overview) | Flutter 官方文档 | 自动测试分为 unit、widget 与 integration 三类，并限定各自的测试范围。 | 2026-07-16：写作日重读；REF-092。 | 某项目已运行、已通过或必须具备某种测试数量。 |
| CH30-REF-02 | [Flutter: Build a form with validation](https://docs.flutter.dev/cookbook/forms/validation) | Flutter 官方 Cookbook | 示例使用带 `GlobalKey` 的 `Form` 与 `validate()` 检查表单输入。 | 2026-07-16：写作日重读；页面标注 Flutter 3.44.0、2026-05-05 更新；REF-093。 | 后端认证、账号存在性、密码安全性或网络调用。 |
| CH30-REF-03 | [Flutter: Check app functionality with an integration test](https://docs.flutter.dev/testing/integration-tests) | Flutter 官方文档 | 文档说明 `integration_test`、`WidgetTester`、`IntegrationTestWidgetsFlutterBinding` 与物理设备/模拟器运行语境。 | 2026-07-16：写作日重读；REF-094。 | 本章已启动设备、安装应用、连接 Firebase 或通过集成测试。 |
| CH30-REF-04 | [Node.js: Test runner](https://nodejs.org/api/test.html)；[Node.js CLI](https://nodejs.org/api/cli.html) | Node.js 官方文档 | `node:test` 与启动命令行测试运行器的 `--test` 标志是本章教学代码使用的测试机制。 | 2026-07-16：写作日重读；复用 REF-090；本机实际 Node 版本以命令输出为准。 | Flutter、移动设备、网络或应用行为已被测试。 |

## 写作规则

- CH30-REF-01 至 CH30-REF-03 仅支持 Flutter 文档明确说明的测试或表单机制；本章的交付工件、状态名、测试矩阵和报告合同全是本书工程模型。
- 任何 SDK 版本、设备矩阵、第三方登录、CI、测试云、包名或安全存储能力都必须在未来写作当天另行核验官方资料。
- 示例的实际 8 项 Node 测试结果只能由本章 Fact Check 的命令记录支持，不能由 CH30-REF-04 替代。

## 主线程登记提示

已登记 CH30-REF-01 至 CH30-REF-03 的 Flutter 官方条目 REF-092 至 REF-094；CH30-REF-04 已映射到既有 Node Test Runner 条目 REF-090。后续改写动态 Flutter 或 Node 行为时，仍须以写作当日的官方页面复核。
