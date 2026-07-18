---
title: "第 21 章 Research Brief：Claude Code 与 Codex 的项目 Harness"
chapter: "21-claude-code-and-codex-project-harness"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 21 章 Research Brief：Claude Code 与 Codex 的项目 Harness

## 要解决的读者问题

当同一仓库先后由 Codex 与 Claude Code 协作时，团队怎样让规则、当前状态、验证和交接保持可读、可审查，而不是把某一产品的加载细节误写成所有 Agent 的通用行为？本章的答案是把仓库 Harness 分为两层：可移植的共享工件契约，以及需要按产品、版本、入口与信任状态复核的适配声明。

本章不比较模型质量、价格、账户权限或某个界面的能力；不安装或配置任何产品；不读取真实 `AGENTS.md`、`CLAUDE.md`、用户配置、自动记忆、账户、网络或 Tool；也不证明两种产品会在任意环境中得到相同结果。

## 写作日读取的候选来源

| 正式 ID | 写作日实际读取的来源 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- |
| REF-072 | [OpenAI Codex Manual：Best practices / AGENTS.md](https://developers.openai.com/codex/codex-manual.md)，经 `openai-docs` 的 Codex manual helper 于 2026-07-16 刷新 | 手册将 `AGENTS.md` 描述为可自动进入 Codex 上下文的仓库指导入口；可使用全局、仓库与更具体目录层级的文件，较近目录的指导优先；短而具体的主入口可引用专题规则。 | 不据此保证所有 Codex 表面、版本、嵌套路径或本地会话的实际加载结果；不把指导上下文写成权限或强制执行。 |
| REF-073 | [OpenAI Codex Manual：Project config files](https://developers.openai.com/codex/codex-manual.md)，经同一 helper 于 2026-07-16 刷新 | 手册说明受信任项目可加载 `.codex/config.toml` 的项目作用域覆盖，且信任条件会影响项目配置、项目 hooks 与项目 rules 是否加载。 | 不声称本仓库存在 `.codex/` 配置；不把受信任、配置或 hooks 视为通用 Agent 标准或安全保证。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory)（2026-07-16 实际读取） | 文档说明 `CLAUDE.md` 是持久项目指令上下文；项目根与目录层级文件有加载规则；其内容是上下文而非强制配置。文档还建议现有 `AGENTS.md` 仓库通过 `CLAUDE.md` 的 `@AGENTS.md` import 共享规则。 | 不泛化为所有 Claude Code 版本、设置层、工作树或自动记忆行为；不写成对命令、文件、网络或权限的硬性阻断。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project — settings and enforcement boundary](https://docs.anthropic.com/en/docs/claude-code/memory)（2026-07-16 实际读取） | 文档把 `CLAUDE.md` 的行为指导与 settings、sandbox、`permissions.deny`、PreToolUse hook 等技术控制分开。 | 不宣称任意 hook 或 settings 已配置、已执行或可替代测试、人工审批与外部状态观察。 |

## 可移植的本书工程扩展

- **共享仓库契约（Shared Repository Contract）**：稳定规则、当前任务状态、验证契约和交接包是产品无关的项目工件；它们定义“下一位维护者需要什么输入”，不定义某个产品怎样发现文件。
- **产品适配声明（Product Adapter Declaration）**：用产品标识、当前官方来源、复核日期、指令入口、权限边界和未验证范围记录某次接入的事实。它不把某个产品细节提升为共享规则。
- **可移植性评估（Portability Assessment）**：纯内存函数只检查上述教学对象是否齐备，返回 `portable` 或保守缺口状态；它不读取真实仓库，也不代表产品集成已发生。

## 章节边界和依赖

| 相邻章节 | 本章消费或保留的边界 |
| --- | --- |
| 第 03 章 | 复用“仓库是可审查项目上下文”的思想；不重复定义状态文件的全部职责。 |
| 第 05、08 章 | 把指令和 Skill 作为可移植工件或产品适配项，不重新设计 Prompt 或 Skill Contract。 |
| 第 10 至 12 章 | 复用工作流、Tool 和环境边界；不把文本指令误作状态机、工具协议或权限系统。 |
| 第 20 章 | 继承“范围、证据、批准和停止”的工程边界；不讨论自改进发布。 |
| 第 22、23、45 章 | 第 22 章细化规则分层，第 23 章讨论 hooks/自动化，第 45 章讨论跨工具长期交接；本章只建立比较框架。 |

## 计划交付物

- 原创正文：共享仓库 Harness 与产品适配层的对比矩阵、接力工作流和失败边界。
- Mermaid 图：两类产品适配器经同一仓库工件层进入受控任务循环，且权限与验证独立。
- 纯内存示例：`assessProjectHarnessPortability`，覆盖共享状态缺失、适配证据缺失、把上下文误称为强制执行、权限边界缺失和两类适配声明。
- Fact Check 与审查记录：保存来源限定、红绿测试、Mermaid 导出和本章局部校验结果。

## 风险与核验策略

- **版本漂移：** 产品加载、配置、hooks、记忆与权限表面可能变化；每次正文修订均须重读相应官方页面并更新访问日。
- **错误等同：** `AGENTS.md` 和 `CLAUDE.md` 都是 Markdown 文件，不表示语法、优先级、加载时机、强制力或工具权限相同。
- **上下文越权：** 指令文件只能传达行为预期；真实副作用仍需要环境、工具、批准和独立观察。
- **交接幻觉：** 共享文件存在不等于它们新鲜或一致；交接前仍要运行约定校验并记录范围。

## 阶段门

- [x] 已在写作日使用 Codex manual helper 和 Anthropic 官方文档建立动态能力的来源边界。
- [x] 已将可移植的仓库工件、产品适配事实与教学示例分开。
- [x] 已列出第 03、05、08、10、11、12、20、22、23、45 章的责任边界。
- [x] 未把候选产品事实或示例计划写成真实产品配置或运行验证。
