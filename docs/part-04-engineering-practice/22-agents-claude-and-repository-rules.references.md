---
title: "第 22 章候选参考资料：AGENTS.md、CLAUDE.md 与仓库级规则"
chapter: "22"
status: "registered"
updated_at: "2026-07-16"
---

# 第 22 章候选参考资料：AGENTS.md、CLAUDE.md 与仓库级规则

> 本章已登记至全书引用表：CH22-001 → REF-075、CH22-002 → REF-076。正式正文只使用 REF 键；本表保留原始访问日和外推禁区。

| 正式 ID | 来源 | 类型与实际访问 | 允许支持的限定陈述 | 不可外推范围 |
| --- | --- | --- | --- | --- |
| REF-075 | [Codex Manual：Customization, Skills, Rules, MCP, and Integrations](https://learn.chatgpt.com/docs/customization/overview) | OpenAI 官方 Codex 手册；2026-07-16 通过官方手册助手读取，本地手册状态为 current。 | `AGENTS.md` 是 Codex 的持久项目指导入口；可在全局、仓库和更具体目录使用；更靠近当前目录的指导优先；主入口应保持实用、准确、简短，并可引用专用规则。 | 不将手册建议写成强制权限、所有环境的文件实际读取证明、Claude Code 行为或其他 Agent 的解析算法。 |
| REF-076 | [Claude Code Docs：How Claude remembers your project](https://code.claude.com/docs/en/memory) | Anthropic 官方 Claude Code 文档；2026-07-16 实际读取。 | `CLAUDE.md` 提供持久指令上下文，而非强制配置；文档建议常驻说明具体且简洁，局部/多步骤内容移至规则或 skills；Claude Code 读取 `CLAUDE.md`，并给出以 `@AGENTS.md` 导入共享规则的方式。 | 不将页面所述目录、设置、hook、自动记忆或加载细节视为所有版本/平台均可用；不把导入或上下文加载写成安全或权限保证。 |

## 使用规则

- `AGENTS.md`、`CLAUDE.md`、Rule Record、Rule Packet、读取顺序、冲突键、状态新鲜度与教学状态名均须区分：前两者的产品陈述只在上表限定范围内使用，后者是本书原创工程模型。
- 任何涉及版本、具体 CLI 命令、hook、设置、规则发现算法、文件大小阈值或产品权限的正式修订，必须在写作日重新读取对应官方页面。
- 示例 `ready_to_load` 仅表示注入对象满足本书的 Rule Packet 条件，不表示 Codex 或 Claude Code 已加载规则、模型会遵守规则、文件真实存在或工具获准执行。

## 候选资料完成检查

- [x] 每条来源有 URL、来源类型、实际访问日期、允许陈述和外推禁区。
- [x] 已登记全局引用，并保留局部键到全局键的映射。
- [x] 未复制官方文档长段落、命令清单或私有实现细节。
