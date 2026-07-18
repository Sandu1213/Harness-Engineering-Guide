---
title: "第 45 章事实核验：Codex、Claude Code 接力与长期项目上下文"
chapter: "45"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章事实核验：Codex、Claude Code 接力与长期项目上下文

## 可归因产品陈述

| 编号 | 正文中的陈述 | 来源与访问日期 | 直接支持与限定结论 |
| --- | --- | --- | --- |
| FC-45-01 | Codex 使用 `AGENTS.md` 保存持久仓库指导，并按全局、项目根至当前目录建立指令链；更接近当前目录的指导后出现并覆盖较早指导。 | CH45-REF-01／REF-140；2026-07-17 刷新当前 Codex Manual 并重读 [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md)。 | 当前手册直接支持指令链、层级和覆盖关系；Customization 段直接列出构建/测试命令、审查期望、仓库约定和目录特定指导。只支持 Codex 产品行为，不证明本仓规则已加载、被遵守或获得权限。 |
| FC-45-02 | Codex 可以把独立工作交给 subagent，主线程收集结果，支持界面可检查各 agent thread。 | CH45-REF-02／REF-141；2026-07-17 刷新当前 Codex Manual 并重读 [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md)。 | 当前手册直接支持并行 subagent、主线程汇总和线程检查。它同时提醒并行写入可能冲突；因此正文没有外推文件隔离、自动正确拆分、跨会话持久或结果已集成。 |
| FC-45-03 | Claude Code 使用 `CLAUDE.md` 和 auto memory 跨会话提供持久上下文，并把两者视为上下文而非强制配置。 | CH45-REF-03／REF-142；2026-07-17 重读 [How Claude remembers your project](https://code.claude.com/docs/en/memory)。 | 官方页面直接说明每次会话以新 context window 开始，两种机制跨会话提供知识，并明确二者是 context、不是 enforced configuration。正文没有把记忆写成共享事实、永久记录或强制权限层。 |
| FC-45-04 | Claude Code 官方工作流提供恢复既有会话、使用 Git worktree 运行并行会话和委派研究给 subagent 的入口。 | CH45-REF-04／REF-143；2026-07-17 重读 [Common workflows](https://code.claude.com/docs/en/common-workflows)。 | 当前页面直接列出 `--continue`／`--resume`、`--worktree` 和研究委派。只支持这些入口存在；不证明恢复后的项目状态新鲜、worktree 外部状态隔离、并行无冲突或工作已集成。 |
| FC-45-05 | Claude Code 非 fork subagent 从独立的新 context window 开始，可使用自己的 prompt、工具和权限并把结果返回主会话；fork 继承父会话上下文。 | CH45-REF-05／REF-144；2026-07-17 重读 [Create custom subagents](https://code.claude.com/docs/en/sub-agents)。 | 官方页面的 “What loads at startup” 和 fork 段直接支持 fresh isolated context、返回结果与 fork 例外。正文没有外推跨会话团队、共享状态一致、事实正确或结果已验收。 |

五项产品资料仍保持 Research Brief 与章节 references 文件中的产品边界。当前页面还包含版本、模型、命令、存储位置、权限继承和其他产品细节；本章没有依赖这些额外动态事实，也没有把 Codex 行为用于解释 Claude Code，或反向外推。

## 本书工程模型与虚构输入

| 编号 | 工程模型或教学输入 | 事实边界 |
| --- | --- | --- |
| EM-45-01 | Shared Project Core、Tool Adapter Layer、Shared Project Contract、Tool Adapter Profile、Context Read Protocol、Capability Difference Record、Handoff Package、State Conflict Record 与 Resume Gate。 | 均为本书的跨工具接力模型，不称为 Codex、Claude Code、Agent SDK 或其他产品的共同协议、权限系统或内置状态。 |
| EM-45-02 | `draft`、`delivered`、`integrated_snapshot_ready`、`integration_required`、`ready_to_resume` 等状态和两扇 Gate 的串联。 | 是本书和纯内存示例使用的保守状态；不表示真实 Handoff、共享写入、仓库 Validation、会话恢复或任务执行已经发生。 |
| EM-45-03 | “Codex Research → Claude Code Technical Review → 人工 Integration Gate”案例。 | 是虚构任务角色和教学输入。本章没有启动另一个产品、subagent、worktree、浏览器、MCP、模型、网络、账户或外部权限。 |
| EM-45-04 | Mermaid 图中的 Shared Project Core、两侧 Tool Adapter、Integration Gate、Resume Gate 及 `≠` 断点。 | 只表达责任和证据流，不是已部署编排器、消息协议、锁、队列或自动执行系统。 |

## 当前仓库与运行证据

| 编号 | 检查 | 当前结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-45-06 | 本仓库根 `CLAUDE.md`。 | 2026-07-17 实际重读；文件引导读取 `AI_BOOTSTRAP.md`、`BOOK_RULES.md` 与相关 `.context/`、`.ai/` 工件，并称自己是 Claude Code 的等价入口。 | 只证明文件内容和路径当前存在；不证明任何 Claude Code 会话已加载、理解或遵守。 |
| FC-45-07 | `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs`。 | 退出码 0；15 项通过、0 项失败。 | 纯函数对虚构注入对象按 Shared Project Contract、Adapter、Capability、Conflict、Integration 与 Resume 条件路由；不读取真实项目状态或执行 Gate。 |
| FC-45-08 | `rtk node examples/agent/cross-tool-handoff-assessment.mjs`。 | 退出码 0；输出 `ready_to_resume`、`cross_tool_handoff_ready`、`claim_next_task` 与 `executionPerformed: false`。 | 只证明完整教学输入得到准入判断；没有恢复会话、领取任务、集成、运行命令或改变外部状态。 |
| FC-45-09 | Mermaid 图源、正文图块、SVG/PNG 与 Diagram Review。 | 正文图块与 `.mmd` 均为 2556 个字符且逐字一致；导出物是 SVG 与 1568×1962 RGB PNG，Diagram Review 已记录实际视觉检查。 | 只证明当前图示工件一致、导出物存在且已做定向视觉检查；不证明图中工具、Gate 或状态真实运行。 |

## 最小事实修订

- 当前 Codex Manual 的 `AGENTS.md` Customization 段直接列出构建/测试命令、审查期望、仓库约定和目录特定指导。正文原先写成“布局、构建、测试、约束和完成定义”，本轮已收窄为当前页面直接支持的四类内容。
- Claude Code 三项陈述和 Codex subagent 陈述继续得到当前官方页面直接支持，不需要扩大或删除 claim。
- 正文继续把五项动态产品事实、本书工程模型、本仓库文件事实、虚构角色案例、纯内存测试结果和图示证据分开。
- 本章完成检查已把 Fact Check 标为完成；Language Editing、Final Review、全仓 Validation 与共享状态同步仍未执行。

## 本轮定向检查

- `openai-docs` skill 的 Codex Manual helper 退出码 0，报告本地手册仍为当前版本，并返回当前 manual 与 outline 路径。
- 复跑 `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs`：退出码 0，15 项通过、0 项失败。
- 复跑 `rtk node examples/agent/cross-tool-handoff-assessment.mjs`：退出码 0，输出包含 `executionPerformed: false`。
- 对实现与测试运行 `rtk node --check`：两个文件均退出码 0。
- 以 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者均为 2556 个字符，逐字一致。
- 正文与本记录的定向 Markdown lint：退出码 0，2 个文件、0 个错误。
- 两个文件的链接检查均退出码 0；正文 13 个链接、Fact Check 5 个官方链接全部通过。
- 正文、Fact Check 和 Mermaid 图源均以换行结尾，尾随空白扫描无匹配；`rtk git diff --check` 退出码 0。

## 明确未核验或不覆盖的范围

- 未运行真实 Codex 或 Claude Code CLI 命令，未恢复产品会话，未创建 worktree，未启动 subagent 或 agent team，未验证账户、权限、浏览器、MCP、网络、数据库、缓存、凭证或外部状态。
- 未运行全仓 `npm run validate`，未证明 `.ai/progress.md`、Current State、Next Task 或 Handoff 当前一致。
- 未重新执行外部集成、共享写入、审批、发布或端到端跨工具流程；本轮网络读取仅用于重读五份官方产品资料。
- 产品页面中的版本、模型、价格、存储限制、环境变量、命令细节和 staged rollout 不属于本章稳定 claim，未带入正文。
