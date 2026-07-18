# 第 8 章 Technical Review

## 审查范围

- 工件：`08-skills-and-reusable-capabilities.md`、`.research.md`、`.references.md`、`.outline.md`、`.ai/references.md` 与 `.ai/glossary.md`。
- 审查类型：技术边界、来源归因、术语、计划工件状态与跨章节责任。
- 规则与来源：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`，以及于 2026-07-15 重新读取的 REF-024 至 REF-027。

## 结论

`可进入 Example Implementation`。正文的单一学习目标是把重复任务写成可审查、可选择且可维护的 Skill Contract。Agent Skills 规范事实、Claude Code/ChatGPT/OpenAI Plugin 的产品行为、本书工程模型和 Markdown 审查教学案例已明确分层；正文没有将自动发现、`allowed-tools`、安装、Plugin 或扫描写成外部授权、真实执行或验证证据。

审查发现一处术语首现不符合本项目简体中文术语规则，已在本阶段修正为“技能契约（Skill Contract）”。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `08-skills-and-reusable-capabilities.md` 的“本章目标” | 首次出现 `Skill Contract` 时未先给出中文术语。 | `STYLE_GUIDE.md` 要求术语首次出现保留英文并给出中文表达；`.ai/glossary.md` 已登记“技能契约”。 | 改为“技能契约（Skill Contract）”。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| 无 | 无需在本阶段扩大的技术或事实问题。 | 所有产品陈述均限制在相应来源范围；案例和计划工件已标明未实现。 | 在 Example Implementation 后只核对纯内存契约与真实测试记录，不扩展到产品安装或权限实现。 |

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| 第 8 章 Example Implementation | 先以模块缺失或失败断言建立红灯，再实现仅处理注入对象的 `evaluateSkillSelection`。 | 让 `selected`、`blocked`、`requires_approval` 与 `not_applicable` 具有可复现的教学证据。 |
| 第 8 章 Diagram Review | 图源完成后检查权限边界没有被箭头绕过，并确认图示不从“Skill 被发现”直接连到“动作被授权”或“结果已验证”。 | 防止读者把本书生命周期图误读为产品调用链或安全控制。 |

## 已执行验证与未验证范围

- 2026-07-15：重新读取 Agent Skills Specification、Claude Code Skills、Skills in ChatGPT 和 Plugins in ChatGPT and Codex。正文只使用其直接支持的目录或资源、产品发现、上传审查、Plugin/App 与源系统权限等限定陈述。
- 逐项检查正文的 `Skill`、技能契约（Skill Contract）、`Prompt`、`Tool`、`Workflow`、`Hook`、`Plugin`、`allowed-tools`、`selected`、`blocked`、`requires_approval` 与 `not_applicable`，确认跨概念职责表为本书模型，未声称为产品 schema 或运行协议。
- First Draft 后已实际运行 `npm run validate` 与 `git diff --check`：155 个 Markdown 文件 lint 0 错误，链接检查、七组既有示例共 34 项 Node 内置测试和状态检查通过；`git diff --check` 无输出。
- 未验证：第 8 章没有示例实现、红绿测试、演示、Mermaid 图源、导出图或视觉审查。本次审查不证明真实 Skill 安装、Tool 调用、文件读取、Plugin/App 权限、上传扫描或外部系统行为。
