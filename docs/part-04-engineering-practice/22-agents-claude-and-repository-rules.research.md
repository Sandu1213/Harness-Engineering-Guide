---
title: "第 22 章 Research Brief：AGENTS.md、CLAUDE.md 与仓库级规则"
chapter: "22"
status: "research-complete"
sources:
  - "REF-075"
  - "REF-076"
updated_at: "2026-07-16"
---

# 第 22 章 Research Brief：AGENTS.md、CLAUDE.md 与仓库级规则

## 任务与读者问题

第 3 章说明仓库可保存项目上下文，第 5 章说明稳定规则、任务请求和数据上下文不应混为一段 Prompt，第 21 章比较不同编码 Agent 如何接入同一 Harness。本章继续回答更具体的问题：**如何设计一个短小的仓库入口，让 Agent 先找到正确规则、状态和任务工件，并能发现范围冲突或陈旧上下文？**

读者完成本章后应能：

1. 区分根入口、稳定规则、可变状态和任务局部规则的更新频率与责任。
2. 为 Codex 与 Claude Code 维护可共享、又不重复堆砌的项目说明。
3. 用来源、范围、层级、版本和状态证据审查规则冲突，而非假定 Markdown 文本会强制执行。
4. 为“未读规则就修改”“规则过长”“范围不明”和“状态已过期”设计保守出口。

## 范围与非范围

**范围：** 仓库中 `AGENTS.md`、`CLAUDE.md`、启动说明、稳定规则、状态文件、模板和任务局部规则的职责划分；以本书仓库的入口拆分为原创教学案例；讨论读取顺序、冲突检查、范围匹配、陈旧状态和更新责任。

**非范围：** 不描述任何产品的隐藏提示词、内部优先级或安全策略；不承诺规则文本可阻止工具调用；不替代 Sandbox、hooks、权限、审查或测试；不设计 Skills、MCP、Git worktree、跨工具交接协议或组织级治理细节。

## 写作日实际读取的产品来源与限定结论

| 正式 ID | 来源与访问日 | 本章允许使用的陈述 | 不可外推范围 |
| --- | --- | --- | --- |
| REF-075 | [Codex Manual：Customization, Skills, Rules, MCP, and Integrations](https://learn.chatgpt.com/docs/customization/overview)，通过官方手册助手于 2026-07-16 读取。 | Codex 将 `AGENTS.md` 用作仓库持久指导；可在全局、仓库和更具体目录放置，靠近当前工作目录的指导优先；官方建议主文件保持短小并引用任务专用资料。 | 不写成 Claude Code 或其他 Agent 的加载实现；不把“指导优先”写成可强制的权限模型；不推断当前会话一定实际读取了某个文件。 |
| REF-076 | [Claude Code Docs：How Claude remembers your project](https://code.claude.com/docs/en/memory)，于 2026-07-16 实际读取。 | `CLAUDE.md` 是用户编写的持久项目、个人或组织指令上下文；Claude Code 将其视为上下文而非强制配置；页面建议将常驻内容保持具体、简洁，并将局部或多步骤内容移至 path-scoped rules 或 skills。页面还说明 Claude Code 读取 `CLAUDE.md` 而不是 `AGENTS.md`，可用 `@AGENTS.md` 导入共享内容。 | 不把该文档中的路径、版本、命令、hooks 或设置字段当作所有环境都可用；不把导入或规则加载写成安全控制；不把 Claude 行为推广到 Codex。 |

## 研究问题与结论边界

| 研究问题 | 证据需求 | 受限结论 |
| --- | --- | --- |
| Codex 的 `AGENTS.md` 适合放什么？ | Codex 官方手册对持久指导、目录层级和篇幅的说明。 | 适合放仓库布局、常用验证、约束和完成定义；过长内容应转到被引用的专用材料。 |
| Claude Code 如何与已有 `AGENTS.md` 共用规则？ | Anthropic 官方记忆页面。 | Claude Code 读取 `CLAUDE.md`，文档给出 `@AGENTS.md` 导入或符号链接作为避免重复的选择。实际采用哪种方式取决于仓库和平台。 |
| 规则文件会自动阻止高风险动作吗？ | Anthropic 页面将 `CLAUDE.md` 定位为上下文而非强制配置；Codex 手册将 `AGENTS.md` 定位为指导。 | 不能。必须另设工具权限、Sandbox、hooks、审查或审批；具体机制归第 12、14、23、41 章。 |
| 如何处理冲突和过期？ | 产品资料只提供各自的上下文加载背景；需要本书原创工程模型。 | 本章提出 Rule Record 和 Rule Packet：每条规则记录来源、层级、范围、状态和修订；冲突与陈旧状态输出为停止、补证或复核，不声称产品内置相同算法。 |

## 本书工程扩展

以下设计均是本书的原创 Harness 模型：

1. **根入口（Entry）：** 只回答“先读什么、何时停止、最后验证什么”，不复写所有规则。
2. **稳定规则（Stable Rules）：** 保存低频改变的目标、禁止事项、Definition of Done 与通用验证方式。
3. **可变状态（State）：** 保存当前完成、阻塞、下一项任务与最近可复现校验；不能复制进稳定规则。
4. **任务局部规则（Task Rules）：** 模板、章节范围、示例约束或目录专用做法，仅在相关任务中读取。
5. **Rule Record：** 用 `id`、`layer`、`scope`、`directive`、`source`、`status` 与 `revision` 描述一条可审查规则。
6. **Rule Packet：** 在行动前组织本次任务必须读取的层级，并检测缺层、状态新鲜度未知、同层同范围冲突和范围外规则泄漏。

这些模型不复刻 Codex 或 Claude Code 的解析器，也不对文件实际读取、模型遵从、hook 执行、权限拦截或测试结果作保证。

## 章节结构与案例

1. 从“根入口变成千行规则、状态被复制三份、Agent 未读状态就修改”的教学情景引入。
2. 分离根入口、稳定规则、可变状态、历史记录和任务局部规则，解释为什么更新频率决定存放位置。
3. 在限定范围内介绍 `AGENTS.md` 与 `CLAUDE.md` 的产品事实，并给出共享规则的两种组织选择。
4. 定义读取顺序和 Rule Packet；强调顺序是本书工作流，不是产品通用优先级。
5. 用来源、范围、层级、状态和修订解决冲突、范围泄漏与陈旧状态。
6. 以“为本书新增第 22 章”说明怎样从入口走到模板、校验、状态回写和人工复核。

## 计划图示、示例与验证

- **图示：** `chapter-22-repository-rule-loading.mmd` 展示 Agent 从根入口依序定位稳定规则、项目上下文、可变状态、当前任务与局部模板；冲突、状态陈旧或范围不匹配进入补证/复核，不进入修改。图中的路由是本书模型。
- **示例：** `assessRepositoryRuleLoading` 只检查注入的 `task`、`rules`、`state` 与 `policy`。它输出 `ready_to_load`、`needs_evidence`、`needs_review` 或 `blocked`，不读取真实文件、环境、网络、时钟、Agent 会话、产品配置或工具。
- **验证：** 先运行 Node 内置测试得到目标模块缺失的红灯；实现后重跑测试和演示。对 Mermaid 源导出 SVG/PNG，比较正文图块和 `.mmd` 源，执行本章 Markdown 与链接校验。全仓接入由主线程负责。

## 风险与事实核验计划

| 风险 | 预防措施 | 后续阶段 |
| --- | --- | --- |
| 把两个产品的加载行为混成统一协议 | 每个产品事实使用独立本地键，正文紧邻限定语。 | Draft、Fact Check |
| 把读取规则写成安全保证 | 明确转交权限、hooks、Sandbox 与审批章节；示例没有任何 I/O。 | Technical Review、Example |
| 根入口膨胀 | 用“根入口只导航、具体规则外置”的检查表审查。 | Draft、Language Editing |
| 当前状态陈旧 | Rule Packet 要求注入明确新鲜度判定；未知进入 `needs_review`。 | Example、Fact Check |
| 规则冲突被静默覆盖 | 相同层级、相同范围、同一冲突键但指令不同即 `blocked`，交给维护者裁决。 | Example、Technical Review |

## Research 完成检查

- [x] 已限定本章与第 3、5、21、23、41 章的边界。
- [x] Codex 事实使用写作日官方手册助手；Claude Code 事实使用写作日 Anthropic 官方资料。
- [x] 产品资料、教学案例与本书 Rule Packet 模型已分开。
- [x] 已定义图示、纯内存示例、验证方式和动态事实的再核验要求。
- [x] 未把动态功能、默认配置、权限或产品行为伪装为跨产品结论。
