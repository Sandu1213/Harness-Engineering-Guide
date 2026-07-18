---
title: "第 34 章事实核验：团队级 Skill Library"
chapter: "34"
status: "completed"
updated_at: "2026-07-16"
---

# 第 34 章事实核验：团队级 Skill Library

## 核验范围

本轮逐项检查正文中可归因给格式规范、Codex、Anthropic 或 Semantic Versioning 的陈述。技能注册记录（Skill Registry Record）、技能契约（Skill Contract）、准入审查（Admission Review）、质量等级（Quality Tier）、兼容性声明（Compatibility Declaration）、反馈记录（Feedback Record）与弃用记录（Deprecation Record）均是本书工程模型；三个候选也均是虚构教学输入，不作为外部事实核验对象。

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | Agent Skills Specification 将 Skill 规定为至少含有 `SKILL.md` 的目录；其 frontmatter 要求 `name` 和 `description`，并定义了可选的兼容性、元数据与实验性 `allowed-tools` 字段。 | REF-024，2026-07-16 通过 AgentReach 的网页读取路径重读规范。 | 可作为目录、格式字段和按需资源组织的有限背景；不支持任一客户端均实现同一校验、加载顺序、工具策略或团队治理流程。 |
| FC-02 | Codex 文档说明其 Skill 可从仓库、用户、管理员和系统位置发现；`description` 参与隐式触发；直接 Skill 面向本地创作，而 plugin 用于可复用分发。 | REF-106，2026-07-16 通过 AgentReach 重读 OpenAI 官方 Codex 文档。 | 可作为 Codex 产品语境中的发现、描述与分发边界；不支持其他产品具有相同路径、插件格式、上下文预算或触发结果。 |
| FC-03 | Anthropic 的企业指南要求在部署第三方或内部贡献的 Skill 前进行审查，并把不受信任来源的 Skill 安装按生产软件同等严格对待。该指南还列出触发准确性、隔离、共存和输出质量等部署前评估维度。 | REF-108，2026-07-16 通过 AgentReach 重读 Anthropic 官方企业指南。 | 可作为安全审查、评估、所有权、版本、监测和弃用的组织层背景；不是跨供应商合规标准、运行时授权、隔离保证或实际部署证明。 |
| FC-04 | Semantic Versioning 2.0.0 要求先声明清晰的 public API；不兼容 API 改动、向后兼容新增和向后兼容缺陷修复分别对应主、次、补丁版本语义；已发布版本不可原地修改。 | REF-109，2026-07-16 通过 AgentReach 重读规范。 | 可作为“先声明可观察契约，再讨论版本意图”的受限类比；不支持从自然语言 Skill 的版本号推断模型选择、输出质量、安全属性、外部工具结果或迁移已经兼容。 |

CH34-REF-01、CH34-REF-02、CH34-REF-04 与 CH34-REF-05 分别映射 REF-024、REF-106、REF-108 与 REF-109；上述映射只支持本表中的有限陈述。

## 来源受阻与收紧措施

CH34-REF-03／REF-107 的 Anthropic overview 本轮经 AgentReach 读取时未返回可核验的正文；改用带有可读正文的企业指南只能核对其自身的治理与审计陈述，不能代替 overview 的目录结构或产品表面结论。因此正文已移除对 REF-107 的重新确认性表述，且本轮不以该来源支撑任何正文事实。该来源保留在 Research Brief 和参考资料中作为既有研究追溯，不等于本轮已重新核验。

## 本书工程模型，不归因来源

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-01 | Skill Registry Record、Skill Contract、Admission Review、Quality Tier、Compatibility Declaration、Feedback Record 与 Deprecation Record。 | 是本书为团队治理提出的可审查工件，不称为 Agent Skills、Codex、Anthropic 或 SemVer 的固定 schema 或已运行服务。 |
| EM-02 | `proposal`、`limited`、`maintained`、`stopped`、`requires_approval`、`requires_review` 与 `not_ready_to_publish`。 | 是本章教学路由，不是任何产品的状态枚举、风险分级、授权或执行结论。 |
| EM-03 | API 契约测试、文档事实核验和发布检查三个候选。 | 是注入的虚构教学记录；不读取仓库、网络、凭证、产品账户或外部系统，也不代表任何 Skill 已安装、发布、选择或执行。 |
| EM-04 | Mermaid 生命周期图和计划中的纯内存准入评估器。 | 只表达本书的证据缺口、人工复核和保守停止路线，不代表发现、工具调用、发布、外部动作或效果已经发生。 |

## 明确未核验或不覆盖的范围

- 未验证任何真实 Skill 的发现、安装、打包、发布、产品配置、插件市场、组织登记、网络、MCP、浏览器、文件写入、凭证、运行时权限、生产评估、使用分析、迁移或弃用执行。
- 未把 Agent Skills 的格式、Codex 的产品发现、Anthropic 的企业治理建议或 SemVer 的版本语义拼接成通用平台行为、安全认证、选择准确率或业务效果保证。
- 本次不重跑示例或全仓 `npm run validate`；示例运行与全仓验证由其独立阶段及主线程统一记录。
