---
title: "第 34 章参考资料：团队级 Skill Library"
chapter: "34"
status: "registered"
updated_at: "2026-07-16"
---

# 第 34 章参考资料：团队级 Skill Library

> 本地 `CH34-REF-*` 键用于章节内追溯；`CH34-REF-01` 复用 `REF-024`，其余四条已分别登记为 `REF-106` 至 `REF-109`。下表只记录来源明确支持的有限陈述，不把产品文档、治理建议或版本规范外推为团队已经运行的能力。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- |
| CH34-REF-01 | [Agent Skills Specification](https://agentskills.io/specification) | 开放格式规范 | Skill 目录至少含 `SKILL.md`；frontmatter 的 `name`、`description` 为必填项，兼容性、元数据与 `allowed-tools` 为可选项；说明、引用与资源可按需加载。 | 2026-07-16：Research Brief 写作日读取；复用 `REF-024`。 | 所有客户端支持相同字段、验证器、工具策略或渐进加载实现。 |
| CH34-REF-02 | [OpenAI：Build skills](https://developers.openai.com/codex/skills/) | OpenAI 官方 Codex 文档 | Codex 的 Skill 可从仓库、用户、管理员和系统位置发现；`description` 会影响隐式触发；直接 Skill 与可分发 plugin 的用途不同。 | 2026-07-16：Research Brief 写作日读取；已登记为 `REF-106`。 | 其他产品有同样的扫描路径、插件格式、上下文预算或安装行为。 |
| CH34-REF-03 | [Anthropic：Agent Skills overview](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview) | Anthropic 官方产品文档 | 本轮 Fact Check 未取得可核验的正文，因此本章正文不将它作为事实依据。 | 2026-07-16：保留入口与 `REF-107` 登记以便后续重新核验；本轮不引用其产品行为。 | 一次上传或安装自动跨表面同步，或任何团队都具备集中管理员分发。 |
| CH34-REF-04 | [Anthropic：Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise) | Anthropic 官方治理指南 | 指南列出发布前风险审查、触发／隔离／共存／输出质量评估、所有者与版本登记、源码控制、监测和弃用的组织级建议。 | 2026-07-16：Research Brief 写作日读取；已登记为 `REF-108`。 | 这是跨供应商合规标准，或其中 API 数量、部署和分析功能适用于其他平台。 |
| CH34-REF-05 | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) | 版本规范 | SemVer 以清晰 public API 为前提；不兼容改动、兼容新增与兼容缺陷修复分别影响主、次、补丁版本；已发布版本不应原地修改。 | 2026-07-16：Research Brief 写作日读取；已登记为 `REF-109`。 | 自然语言指令、模型行为或外部依赖天然具备可用的语义化兼容性。 |

## 写作规则

- CH34-REF-01 只说明开放格式层；Skill Registry Record、Skill Contract、Admission Review、Quality Tier、Compatibility Declaration 和 Deprecation Record 都是本书团队治理模型。
- CH34-REF-02 与 CH34-REF-04 的产品行为、共享范围、API、插件和安全指南必须保留所属产品与文档版本的限定，不能组合成“所有 Agent 平台”的承诺；CH34-REF-03 在重新核验前不作为正文事实依据。
- CH34-REF-05 只能用于“先声明对外契约，再解释版本变化”的受限类比；不能把 SemVer 当作自然语言 Skill 行为、模型选择准确率或安全性的保证。
- 后续正文不得记录或声称真实 Skill 安装、插件发布、市场上架、MCP 连接、网络访问、凭证读取、生产审查、评估分数、组织授权或运行结果。

## 主线程登记提示

`CH34-REF-01` 已复用 `REF-024`，其余四条已完成正式登记；第 34 章 First Draft、Technical Review 与 Fact Check 的写作日仍须重新读取。引用时应保留“格式规范／Codex 产品文档／Anthropic 产品文档与治理指南／版本规范”的来源类型，避免把不同权威范围合并为一个通用事实。
