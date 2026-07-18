---
title: "第 7 章事实核验清单"
chapter: "07"
status: "fact-checked"
sources:
  - "REF-006"
  - "REF-020"
  - "REF-021"
  - "REF-022"
  - "REF-023"
updated_at: "2026-07-15"
---

# 第 7 章事实核验清单

本清单记录第 7 章在 2026-07-15 已读取的一手来源、可进入正文的限定陈述，以及不能从来源推出的内容。只有表中标为“已复核”的限定陈述可以作为产品、框架或论文背景；工作记忆、长期记忆、Memory Record、写入/读取门槛、生命周期与教学案例均为本书工程模型。Fact Check 不替代正文写作当天对动态产品资料的重新核验，也不替代图示、示例、语言编辑或 Final Review。

| ID | 拟使用的陈述或用途 | 类型 | 来源 | 来源是否直接支持 | 状态 | 正文写作规则 |
| --- | --- | --- | --- | --- | --- |
| FC-01 | Claude Code 文档说明，每个会话从新的 context window 开始；`CLAUDE.md` 是用户编写的指令，auto memory 是系统学习到的笔记或偏好。 | Claude Code 当前文档行为 | REF-006 | 是；该页面直接区分新会话、用户写入的项目记忆与自动记忆。 | 2026-07-15 已复核。 | 仅归因 Claude Code；不得外推为其他 Agent 的会话启动顺序、存储格式或持久化保证。 |
| FC-02 | Claude Code 文档将 `CLAUDE.md` 与 auto memory 在会话开始时作为 context 加载，并说明它们不是 enforced configuration。 | Claude Code 当前文档边界 | REF-006 | 是；页面直接说明加载时机和 context/non-enforced 的边界。 | 2026-07-15 已复核。 | 可用于解释“持久资料不自动成为强制控制”；不得写成安全隔离、权限策略、审计机制或不可绕过的规则。 |
| FC-03 | OpenAI Agents SDK 的 Session 在多次 agent run 间维护特定会话的消息历史；运行前取回历史并与输入组合，运行后保存新增条目。 | OpenAI Agents SDK 产品行为 | REF-020 | 是；官方 Sessions 文档直接描述会话历史的读写流程。 | 2026-07-15 已复核。 | 仅描述该 Python SDK 的当前 Session 机制；不得称为跨任务知识库、长期记忆或通用状态机。接口、后端和默认值在正文当天重查。 |
| FC-04 | OpenAI Agents SDK Sessions 文档要求在同一 run 中不要将 Session 与其列出的服务端延续机制叠加使用。 | OpenAI Agents SDK 产品边界 | REF-020 | 是；页面直接列出不可组合的 continuation 机制。 | 2026-07-15 已复核。 | 可作为“选择一个权威连续性承载方式”的特定产品例子；不得猜测字段、ID、迁移策略或其他 SDK 的行为。 |
| FC-05 | OpenAI Agents SDK 的 sandbox memory 与 Session 消息历史不同：前者把之前 run 的经验整理为 sandbox 工作区文件。 | OpenAI Agents SDK sandbox-agent beta 行为 | REF-021 | 是；官方 memory 页面直接将两种机制区分。 | 2026-07-15 已复核。 | 仅适用于该 sandbox-agent 的 beta 功能；不得泛化为所有 Agent 的“自动长期记忆”，也不描述目录、权限或写入算法。 |
| FC-06 | OpenAI Agents SDK 的 sandbox memory 使用摘要、索引和按需展开来读取记忆，并提醒记忆可能过时，应以当前环境为准。 | OpenAI Agents SDK sandbox-agent beta 边界 | REF-021 | 是；页面直接描述渐进读取与过时风险。 | 2026-07-15 已复核。 | 可作为“长期记录进入当前任务前仍需复核”的产品背景；不得把渐进读取写成事实保证、检索质量保证或自动刷新机制。 |
| FC-07 | LangChain 概念文档在其框架语境中将短期记忆描述为 thread-scoped 的持续状态与会话历史，将长期记忆描述为跨会话、跨 thread 的数据。 | LangChain/LangGraph 概念与框架语境 | REF-022 | 是；页面直接按短期和长期记忆说明 scope。 | 2026-07-15 已复核。 | 只作为一套框架术语与实现背景；不得声称它是行业标准，或把 scope 直接等同于保留时间、权限或正确性。 |
| FC-08 | LangChain 文档讨论以 namespace 组织长期数据，以及 hot path 与 background 写入在即时可用性、延迟、新鲜度和复杂度上的取舍。 | LangChain/LangGraph 文档范围 | REF-022 | 是；页面直接讨论 namespace 和两种写入路径的取舍。 | 2026-07-15 已复核。 | 只用于说明“写入位置和时机需要显式设计”；不规定默认存储、并发语义、TTL、异步可靠性或跨框架行为。 |
| FC-09 | MemGPT 论文将 virtual context management、不同 memory tier 与有限上下文内扩展可用上下文作为研究背景。 | 原始论文的研究背景 | REF-023 | 是；arXiv v2 摘要直接给出该问题和分层管理方向。 | 2026-07-15 已复核摘要页。 | 只用来交代分层记忆与有限上下文的研究背景；不使用性能数字、不复刻实现，也不把论文系统写成默认架构。 |
| FC-10 | Working Memory、Long-term Memory、Memory Record 字段、写入/读取闸门、生命周期状态和冲突处理。 | 本书工程模型 | 本章原创设计 | 不适用 | 2026-07-15 已确认其为本书扩展。 | 使用“本书提出”“本章模型”或“团队可采用的约定”等措辞；不得归因任何 SDK、框架或论文，也不写成通用 API、数据格式或安全控制。 |
| FC-11 | “部署失败后的接手者”、虚构测试失败、`decideMemoryRecord` 的分类输出与确定性测试路径。 | 教学案例与计划示例 | 本项目原创设计 | 不适用 | 2026-07-15 已确认其为教学设计。 | 不写成真实部署、真实仓库、模型调用、文件写入、检索、账户、凭证、权限控制或已运行测试。 |
| FC-12 | 产品接口、类名、方法、默认目录、后端、保留期、TTL、成本、token 数、并发、数据隔离、审计、自动写入规则、检索质量、模型能力、性能数字与安全效果。 | 动态或超出范围的事实 | 正文写作当天的官方资料 | 否；当前工件没有字段级、版本级或运行级证据。 | 不纳入本章当前事实。 | 如正文确有必要，先建立 `TODO(verify)：` 证据卡并逐项核验；无法核验时删除或缩小陈述。 |

## 术语与边界复核

| 容易混称的概念 | 本章允许的最小说法 | 不能据此推出的内容 | 交给的章节 |
| --- | --- | --- | --- |
| 会话历史 | 某些产品可以维护特定会话跨 run 的消息历史。 | 等同于长期记忆、项目知识、正确恢复或当前事实。 | 第 6、10 章。 |
| 自动或 sandbox memory | 某些产品提供持久指令、自动笔记或 run 间经验文件。 | 通用 memory 架构、自动授权、无过期风险或安全隔离。 | 第 12、41 章。 |
| 工作记忆 | 本书中为当前任务或阶段服务的可观察状态与中间结果。 | 产品 API、完整状态机、可恢复检查点或永久保存。 | 第 10 章。 |
| 长期记忆 | 本书中跨任务可能复用、但带来源、范围与生命周期的记录。 | 知识库、向量索引、所有历史或无条件模型输入。 | 第 13、19 章。 |
| 检索与压缩 | 用于定位候选资料或减少长任务负担的相邻能力。 | 记忆写入依据、当前事实验证或数据治理。 | 第 13、19 章。 |
| 权限、隐私与审计 | 长期记录可能需要这些治理设计。 | Memory Record 字段本身已经完成授权、合规或审计。 | 第 41 章。 |

## 正文前与审查前的复核步骤

1. 正文写作当天重新访问 REF-006、REF-020、REF-021 和 REF-022，核对 URL、页面标题、访问日期、beta 标记与上表的限定用途；任何接口、默认范围、存储、价格或保留细节均以当天官方页面为准。
2. 搜索草稿中的 `Claude Code`、`CLAUDE.md`、`auto memory`、`OpenAI Agents SDK`、`Session`、`sandbox memory`、`LangChain`、`LangGraph`、`MemGPT`、`thread`、`namespace`、`memory`、`TTL`、`token`、价格、版本号、数字、引号和绝对词。没有本表支持的产品或论文陈述应删除、缩小或标记 `TODO(verify)：`。
3. Working Memory、Long-term Memory、Memory Record、scope、写入/读取闸门、生命周期、刷新、修订与撤销必须标注为本书工程模型；它们不是供应商协议、模型安全控制、访问授权或合规方案。
4. 审查图示，确认候选记录经过来源、主体、scope、时效与撤销路径检查后才可成为工作记忆或长期记录；任何写入或检索箭头都不能直接连向“事实”“授权”“安全”或“完成”。
5. 纯内存示例只有在实现、测试与演示实际运行后才能记录运行结论。Fact Check 不构成模型调用、文件读写、网络检索、向量数据库、真实 memory 功能、权限控制或真实测试执行的证据。

## 事实核验执行记录

- **REF-006：** 已阅读 Anthropic 的 *How Claude remembers your project*，核对新会话、`CLAUDE.md`、auto memory 以及它们作为 context 而非 enforced configuration 的限定说明。正文只将其归因 Claude Code。
- **REF-020：** 已阅读 OpenAI Agents SDK 的 *Sessions*，核对特定 Session 的多 run 消息历史、运行前读取、运行后写入，以及不可与列出延续机制叠加的边界。正文不猜测接口、后端、ID 或默认值。
- **REF-021：** 已阅读 OpenAI Agents SDK 的 *Agent memory*，核对它与 Session 消息历史不同、经验写入 sandbox 工作区文件、渐进读取、过时风险与 beta 状态。正文只作为该产品能力背景使用。
- **REF-022：** 已阅读 LangChain 的 *Memory overview*，核对 thread-scoped 短期状态、跨 thread 长期数据、namespace，以及同步与后台写入的取舍。正文不将其作为统一术语标准。
- **REF-023：** 已阅读 MemGPT arXiv v2 摘要页，核对 virtual context management、memory tier 与有限上下文的研究背景。正文不使用论文的性能数字、系统细节或默认架构主张。
- **未验证范围：** 本次只核验来源范围与本书模型的标记方式；它不为第 7 章正文、Mermaid 图源、图示导出、示例计划、示例实现、测试、模型调用、真实记忆读写、检索、压缩、权限、隐私或审计提供完成证据。后续阶段必须独立记录真实执行结果，不能倒灌为本次核验成果。
