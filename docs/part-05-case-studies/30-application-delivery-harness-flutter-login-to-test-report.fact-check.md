---
title: "第 30 章事实核验：应用交付 Harness：Flutter 登录到测试报告"
chapter: "30"
status: "completed"
updated_at: "2026-07-16"
---

# 第 30 章事实核验：应用交付 Harness：Flutter 登录到测试报告

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | Flutter 文档区分 unit、widget 与 integration testing。 | CH30-REF-01，2026-07-16 读取 Flutter 官方 Testing Overview。 | 可用于说明测试层次承担不同责任；不能推断任何本仓 Flutter 测试已运行。 |
| FC-02 | Flutter 表单示例以 `Form`、`GlobalKey<FormState>` 与 `validate()` 检查表单有效性。 | CH30-REF-02，2026-07-16 读取官方 Cookbook。 | 可用于说明输入校验可成为独立场景；不表示真实登录认证。 |
| FC-03 | Flutter 集成测试文档包含交互测试，并说明在设备或模拟器等目标运行集成测试。 | CH30-REF-03，2026-07-16 读取官方文档。 | 可用于说明“设备验证”需要真实运行证据；本章没有执行该流程。 |
| FC-04 | 本章的 Node 测试使用 `node:test` 与 `node --test`。 | CH30-REF-04 与实际命令。 | 可使用；不将 Node 结果扩展为 Flutter 结果。 |

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-01 | Delivery Contract、State Model、Test Matrix、Observation Record、Report Contract 是本书为教学案例定义的交付工件。 | 不称为 Flutter、Dart、OWASP 或任何厂商的固定 schema。 |
| EM-02 | `success`、`validation_error`、`network_error` 是虚构登录案例必须覆盖的可观察场景。 | 不代表所有登录系统、错误协议或用户体验。 |
| EM-03 | `executionPerformed: false` 和 `claimState: 'planned'` 防止将计划写成执行结果。 | 不构成运行环境安全控制或审计系统。 |
| EM-04 | 环境执行请求需要显式批准。 | 不代表已存在审批流、设备库存或安全授权。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-05 | `node --test examples/agent/flutter-login-delivery-assessment.test.mjs`（实现前） | 退出失败，`ERR_MODULE_NOT_FOUND`，因为被测模块尚未创建。 | 红灯在实现前真实出现；不代表 Flutter、设备或登录失败。 |
| FC-06 | `npm run test:flutter-login-delivery-assessment`（实现后） | 8 项通过、0 项失败。 | 纯函数在测试构造的对象上按合同输出分类。 |
| FC-07 | `npm run example:flutter-login-delivery-assessment` | 输出 `ready`、`flutter_login_delivery_plan_ready`、`implement_in_isolated_example`、`executionPerformed: false` 与三条必需场景。 | 演示对象是可开始的教学计划；没有执行 Flutter 或测试环境。 |

## 明确未核验或不覆盖的范围

- 未创建、构建、安装、运行或测试任何 Flutter/Dart 项目、APK、IPA、设备、模拟器、浏览器或 CI 作业。
- 未请求网络、认证服务、OAuth、后端 API、真实用户、凭证、存储、日志、崩溃报告或测试云。
- 未验证 UI 可访问性、性能、平台兼容性、实际安全性、错误重试、离线策略、发布、签名或真实测试报告。
- CH30-REF-01 至 CH30-REF-04 已分别映射 REF-092、REF-093、REF-094、REF-090；映射只支持本页列出的限定 Flutter 与 Node 陈述。
