---
title: "第 8 章事实核验：Skills 与可复用能力"
chapter: "08"
status: "fact-check-complete"
sources:
  - "REF-024"
  - "REF-025"
  - "REF-026"
  - "REF-027"
updated_at: "2026-07-15"
---

# 第 8 章事实核验：Skills 与可复用能力

## 核验范围

本清单核验 `08-skills-and-reusable-capabilities.md`、`.research.md`、`.references.md`、`.outline.md`、`.example-plan.md`、纯内存示例和 Mermaid 图中可归因的规范或产品陈述。Skill Contract、选择状态、生命周期、职责矩阵、测试矩阵、Markdown 审查案例、纯内存函数和图示均为本书工程模型或教学工件，不作为产品事实核验。

## 来源级核验

| ID | 写作日复核的来源陈述 | 正文允许用途 | 禁止外推 | 状态 |
| --- | --- | --- | --- | --- |
| REF-024 | Agent Skills Specification 将 Skill 定义为至少含 `SKILL.md` 的目录；该入口有 YAML front matter 和 Markdown 正文，`name`、`description` 为必填字段；`scripts/`、`references/`、`assets/` 可选；规范说明渐进加载。`allowed-tools` 是实验性字段，客户端支持可能不同。 | 说明开放规范中的最小工件、资源分层、渐进加载与实验字段边界。 | 所有 Agent 都支持相同字段、加载策略、目录发现或权限语义；将 `allowed-tools` 写成源系统授权。 | 2026-07-15 已重读 [Specification](https://agentskills.io/specification)。 |
| REF-025 | Claude Code 当前文档说明其 Skill 使用 `SKILL.md`，可在相关时使用或直接调用；正文在使用时加载。目录位置、覆盖、嵌套发现和扩展 front matter 是 Claude Code 的产品行为。 | 仅说明 Claude Code 的 Skill 发现、调用、目录与专有字段。 | Codex、ChatGPT 或其他 Agent 的目录、优先级、调用方式、权限或自动选择机制。 | 2026-07-15 已重读 [Claude Code Skills](https://docs.anthropic.com/en/docs/claude-code/skills)。 |
| REF-026 | ChatGPT 当前帮助页将 Skill 描述为可复用、可共享工作流，可含说明、示例和代码；安装后可在有帮助时自动使用。上传前会扫描，但页面明确该扫描不替代使用者的审查、政策或判断。 | 仅说明该页面定义的 ChatGPT 和所述 OpenAI 产品中的 Skill、资源与上传审查提醒。 | 扫描是充分安全保证；工作区控制直接适用于 Codex；所有 OpenAI 表面同步或行为相同。 | 2026-07-15 已重读 [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)。 |
| REF-027 | OpenAI Plugin 文档说明 Plugin 可包含 Skills、Apps 或 App templates；使用 App 的 Plugin 继承 App 的访问与动作控制，且不会越过连接源系统的既有权限。 | 仅说明该 OpenAI 产品范围内 Plugin、App 与源系统权限边界。 | 所有 Plugin 的组成相同；安装、可见或启用 Plugin 即代表用户能访问或写入源系统。 | 2026-07-15 已重读 [Plugins in ChatGPT and Codex](https://help.openai.com/en/articles/20001256-plugins-in-codex)。 |

## 本书模型与非事实边界

| 工件或术语 | 事实状态 | 核验结论 |
| --- | --- | --- |
| 技能契约（Skill Contract） | 本书工程模型。 | 不属于 REF-024 至 REF-027 的共同 schema；字段、状态与版本规则不可归因给任何产品。 |
| `selected`、`blocked`、`requires_approval`、`not_applicable` | 本书教学状态。 | 不代表模型、Claude Code、ChatGPT、Codex、Plugin 或 Tool 的返回值。 |
| `review-markdown-chapter` | 原创教学案例。 | 未安装、未发现、未调用真实 Skill；默认只读边界不是外部权限策略。 |
| `evaluateSkillSelection` | 纯内存示例。 | 只处理注入对象，不读取真实章节、规则、引用登记或环境，不调用模型、工具、Plugin、Hook、MCP 或权限系统。 |
| Skill 生命周期 Mermaid 图 | 本书工程模型。 | 图示不代表任何产品内部调用链；发现、Contract、授权、外部动作和验证仍是不同阶段。 |

## 事实陈述核对

| 正文主题 | 归因来源 | 核验结果 | 写作限制 |
| --- | --- | --- | --- |
| 最小目录、`SKILL.md`、必填 metadata、可选资源和渐进加载。 | REF-024 | 与规范一致。 | 限定为该规范，正文不得写“所有 Agent”。 |
| Claude Code 可在相关时使用 Skill，正文按使用时加载。 | REF-025 | 与当前产品文档一致。 | 必须保留“Claude Code”主语，不写成跨产品结论。 |
| ChatGPT Skill 可复用、可共享、可含支持资源；上传扫描不替代独立审查。 | REF-026 | 与当前帮助页一致。 | 不把扫描、安装或共享写成安全、授权或可执行保证。 |
| Plugin 与 App 及源系统权限的关系。 | REF-027 | 与当前产品文档一致。 | 仅限该产品资料，且不把可见性、连接或启用写成源系统访问。 |
| Contract 与运行环境权限不同。 | 本书模型，受 REF-024、REF-027 的限定背景启发。 | 本章明确标为工程推论。 | 不声称任何来源规定本书 Contract 或所有授权结构。 |
| 纯内存选择状态与 6 条路径。 | 本仓库示例。 | 2026-07-15 重跑测试与演示。 | 只证明固定对象的确定性函数行为。 |

## 示例与图示复核

2026-07-15 实际运行：

```bash
npm run test:skill-selection
npm run example:skill-selection
```

测试结果为 6 项通过、0 项失败；演示输出 `selected / ready_for_read_only_review`。这些结果只说明 `evaluateSkillSelection` 对注入 Contract、任务、前置条件与证据返回预期的教学状态；它们不验证真实 Markdown 审查、Skill 发现、产品安装、Tool 调用、文件访问、Plugin/App、审批、身份或源系统权限。

Mermaid 图源已由 Mermaid CLI 11.16.0 导出 SVG/PNG 并实际查看。该渲染只验证本书图源可生成可读发布图，不验证图中任何产品行为、真实授权、外部动作或结果正确性。

## 动态信息与待复核项

- Claude Code 的发现位置、覆盖、嵌套目录、扩展 front matter 与版本条件在正文或示例更新当天必须重新访问 REF-025。
- ChatGPT Skills 的可用计划、共享、上传扫描、工作区角色与管理行为在正文或示例更新当天必须重新访问 REF-026。
- OpenAI Plugin、App、计划、工作区、角色、动作和源系统连接行为在正文或示例更新当天必须重新访问 REF-027。
- `TODO(verify)：` 若以后加入任何真实 Skill 包、Tool、Hook、Plugin、MCP、凭证、文件访问、自动修改或发布流程，必须建立新的一手来源证据与运行记录；不得复用本章纯内存示例作为授权或执行证据。

## Fact Check 完成检查

- [x] REF-024 至 REF-027 已在 2026-07-15 重新读取并限定允许用途和外推禁区。
- [x] 正文将规范或产品事实、本书模型、教学案例、示例和图示分开。
- [x] 已重跑第 8 章 6 项纯内存测试与演示，并记录其非产品边界。
- [x] 已记录动态产品行为和未来真实集成需要重新取证的条件。
- [x] 未把扫描、`allowed-tools`、安装、发现、Plugin、图示或纯内存结果表述为真实授权、执行或验证保证。
