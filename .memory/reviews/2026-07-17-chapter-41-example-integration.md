---
title: "第 41 章 Example Implementation：研究安全准入与审计评估"
chapter: "41"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-17"
---

# 第 41 章 Example Implementation：研究安全准入与审计评估

## 目标与边界

本轮实现纯内存 `assessResearchSecurityPlan(input)`，只判断调用方注入的威胁模型、任务、不可信内容、能力、秘密引用、策略、工具、审计、供应链和事件交接字段。实现不读取环境变量、文件、网络或真实时间，不调用模型、浏览器、OAuth、MCP、身份、权限、秘密、日志、SIEM、供应链或事件响应系统。

## TDD 证据

| 阶段 | 命令 | 实际结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/research-security-plan-assessment.test.mjs` | 退出码 1；实现模块尚不存在，报告 `ERR_MODULE_NOT_FOUND`。 |
| 初次 GREEN | 同一测试命令 | 退出码 0；12 项通过、0 项失败。 |
| 最小权限 RED | 增加“摘要能力夹带上传动作”测试后运行同一命令 | 退出码 1；12 项通过、1 项失败，实际错误地进入只读复核。 |
| 最终 GREEN | 将能力限制为当前候选所需的唯一动作后运行同一命令 | 退出码 0；13 项通过、0 项失败。 |
| EXECUTE | `rtk node examples/agent/research-security-plan-assessment.mjs` | 退出码 0；输出 `ready_for_read_only_review / read_only_security_plan_ready / review_extracted_facts / executionPerformed: false`。 |

## 覆盖的公开行为

- 完整只读计划最多进入事实复核，不产生外部效果。
- 威胁模型、内容来源、策略版本和审计关联缺失时补证。
- 外部内容改变控制、目标扩大、通配能力、敏感值进入审计、MCP audience 错配和供应链未审查时阻塞。
- 秘密疑似暴露但事件责任人缺失时，只进入安全审查升级。
- 所有返回对象固定包含 `executionPerformed: false`。

## 共享接入建议

按任务边界，本轮未修改 `package.json`、`scripts/validate.sh`、`README.md`、`examples/README.md`、`.ai/*` 或 `.context/*`。主线程若决定统一接入，可考虑：

- `test:research-security-plan-assessment`
- `example:research-security-plan-assessment`

在主线程实际修改共享入口前，这两个 npm script 只是建议名称，不得写成已存在命令。

## 待同步术语

- Harness 威胁模型（Harness Threat Model）
- 不可信内容信封（Untrusted Content Envelope）
- 能力授予记录（Capability Grant Record）
- 安全决定记录（Security Decision Record）
- 秘密引用卡（Secret Reference Card）
- 工具安全门（Tool Security Gate）
- 审计事件信封（Audit Event Envelope）
- Harness 供应链登记（Harness Supply-chain Register）
- 安全事件交接包（Security Incident Handoff）

这些术语由主线程统一判断是否进入 `.ai/glossary.md`；本轮没有修改共享术语表。

## 未覆盖范围

测试和演示不能证明提示注入已被检测或阻断、身份真实、权限生效、秘密存在或安全、MCP Server 已连接、日志已写入或不可篡改、供应链可信、人员已通知、事件已遏制或系统已恢复。

## 验证记录

- `rtk node --test examples/agent/research-security-plan-assessment.test.mjs`：退出码 0，13 项通过、0 项失败。
- `rtk node examples/agent/research-security-plan-assessment.mjs`：退出码 0，输出受限只读复核状态与 `executionPerformed: false`。
- `rtk node --check`：模块与测试文件均通过语法检查。
- `markdownlint-cli2`：正文、示例计划和本记录共 3 个 Markdown 文件，0 个错误。
- `git diff --check` 与 5 个阶段文件的独立行尾空白检查均通过。
