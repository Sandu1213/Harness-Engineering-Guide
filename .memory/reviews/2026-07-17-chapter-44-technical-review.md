---
title: "第 44 章 Technical Review：AI Technical Book Factory"
chapter: "44"
stage: "Technical Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 44 章 Technical Review：AI Technical Book Factory

## 审查范围

- 第 44 章 Research Brief、参考资料、详细 Outline 与 First Draft。
- `BOOK_RULES.md`、`STYLE_GUIDE.md`、Technical Review Prompt、Review Checklist 与审查模板。
- REF-029、REF-134、REF-061、REF-135 与 REF-136 的原始页面、全局映射、允许用途和不可外推范围。
- Research、Outline、Writing、Review、Fact Check 与 Human Author/Editor 六类 Role Contract。
- Content Evidence Package、Versioned Queue、Review/Fact Check 双门、Conflict Router、Rework Envelope、质量信号与 Human Decision Record。
- CASE-44-A/B/C 的仓库事实、教学投影、虚构输入和未运行边界。
- 第 26 章的 Task Contract／Ownership Claim／Delivery Package／Integration Gate，第 38 章的一般反馈与批准模式，第 39 章的测试与 Benchmark，第 43 章的 Book Harness，以及第 45 章的跨工具接力边界。

## 结论

`可继续进入 Example Implementation`。正文经过局部修正后，六类角色的输入、专属输出、禁止动作、停止条件和下一责任入口一致；内容交付、质量门判定、人工接受、实际集成、Chapter DoD 和出版批准保持分层。五项来源只支持角色分类、编排模式、eval 术语、provenance 和学术出版责任的限定背景，没有被外推为内容工厂标准、Agent 独立性、队列实现、质量保证或法律结论。

本结论只覆盖 Technical Review。没有创建或运行示例，没有创建或渲染图源，没有执行 Fact Check、Language Editing、全仓 Validation、Agent、模型、消息队列、自动返工、文件集成或出版动作。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| “Versioned Queue”失效规则 | 初稿把 Research v1 更新为 v2 直接写成“必须 `stale_input`”，会把仅格式变化也误判为语义失效。 | Outline 要求由派生关系与 `invalidationCondition` 判断；影响不明才走保守失效。 | 改为先暂停并比较语义变化；命中失效条件或影响无法界定时才标记 `stale_input`。已修复。 |
| Queue Item 与 `delivered` | 字段缺少 `attempt`、`invalidationCondition` 和 `integrationOwner`；`delivered` 没有明确排除“已接受”。 | 第 26 章将交付与 Integration Gate 分开；Outline 明确列出队列尝试、失效和集成责任。 | 补齐字段，并把 `delivered` 定义为交付但尚未被质量门或集成者接受。已修复。 |
| `source_conflict` 路由 | 初稿从 Fact Check 直接交人工，跳过 Research 对时间、版本、适用范围和补充来源的责任。 | Research Role Contract 拥有来源冲突与未知项；Fact Check 负责判定而非补写研究。 | 先回 Research 补证，再由 Fact Check 重判；仍冲突才交人工。已修复。 |
| `review_fact_disagreement` | 初稿把“Review 接受、Fact Check 拒绝”直接称为冲突，混淆两扇门回答的问题。 | `review_passed != facts_verified`；两扇门本来可以给出不同结果。 | 只有对同一范围边界或修复动作提出不兼容要求时才形成冲突；普通情况按事实门失败处理。已修复。 |
| REF-061 类比 | 初稿写“grader 已接受 outcome”，但来源只把 grader 定义为对表现某方面评分的逻辑。 | REF-061 的 task/trial/grader/transcript/outcome 定义。 | 改为“trial 完成不代表 grader 已评分，更不代表 outcome 满足成功标准”。已修复。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| Role Contract | 与第 26 章 Task Contract 及第 45 章跨工具能力边界关系不够显式。 | 角色职责、一次可领取任务和真实工具能力是三个层次。 | 增加 Role Contract 管持续职责、Task Contract 管单次任务、工具档案管当前能力与权限的分工。已修复。 |
| Content Evidence Package | 初稿没有说明早期阶段如何处理尚未产生的 finding、verdict 和 human decision，也没有说明与 Delivery/Handoff Package 的关系。 | 空字段可能被误读为通过，内容包也可能被误读为共享集成权或跨工具权限载体。 | 增加版本化追加、`not_yet_recorded`、历史保留，以及第 26/45 章载荷边界。已修复。 |
| 并行所有权 | “独立写入目标或只读输入”的“或”条件过宽。 | 共享输入只读不能消除输出重叠。 | 改为专属输出不重叠、共享输入只读、集中集成同时成立。已修复。 |
| Human Decision 与硬性门 | `unknown`、历史 `stale_input` 和 `accepted_for_integration` 的适用范围不够精确。 | 未处理 unknown 必须阻塞事实门；已隔离的历史旧记录不应永久阻塞；人工接受也不执行集成。 | 限定为当前范围内 unknown、正在消费的 stale 输入，并明确只可提交第 26 章 Integration Gate，仍需第 43 章 Chapter DoD。已修复。 |
| CASE-44-A/C | 第 1 章 fact-check 被写得像原生 `factVerdicts`，v1/v2 又可能被理解为版本号变化即失效。 | 案例必须区分字段投影、注入判定和仓库历史。 | 明确人工映射与两门教学判定；为 CASE-44-C 加入“关键主张语义变化命中失效条件”。已修复。 |
| 首现术语 | 核心工件只使用英文名称，中文读者难以稳定映射。 | `STYLE_GUIDE.md` 要求重要英文术语首次出现时给出中文名称。 | 增加角色契约、内容证据包、版本化队列、审查门、事实核验门、冲突路由器、有界回流、返工信封和人工决定记录的中英文首现。已修复。 |

## 建议

本轮没有需要继续修改正文的非阻塞建议。共享术语登记属于集成请求，不应由本章 owner 修改 `.ai/glossary.md`。

## 六类 Role Contract 复核

| 角色 | 本章保留的责任 | 禁止冒充的责任 | 审查结论 |
| --- | --- | --- | --- |
| Research | Source Card、Claim Candidate、来源边界、冲突和未知项 | 完整正文、最终事实接受或出版决定 | 一致；来源冲突已回到 Research 补证。 |
| Outline | 论证顺序、案例槽位、来源与交付物路由 | 新增事实、内容完成或共享状态更新 | 一致；继续依赖已接受 Research 版本。 |
| Writing | 指定输入上的原创 Draft 与 claim 连接 | 扩大来源、关闭自己的 finding、声明未运行结果 | 一致；`scope_overreach` 只能缩窄或删除后复核。 |
| Review | 结构、读者路径、工程边界与一致性 finding | 事实 verdict、出版批准或静默改写来源 | 一致；与 Fact Check 保持两门分离。 |
| Fact Check | claim 级 `supported`／`narrow`／`reject`／`unknown` | 文风优化、研究补写、作者意图或出版决定 | 一致；`unknown` 阻止当前事实门通过。 |
| Human Author/Editor | 接受集成、退回、延期、拒绝、删减和披露责任 | 把 Agent 通过转移成人类责任或出版许可 | 一致；决定只适用于具名 package/Draft 版本。 |

## 职责、状态与证据链复核

| 层次 | 本章状态或工件 | 只支持的结论 | 不能推出 |
| --- | --- | --- | --- |
| 角色产出 | Role Contract + output artifact | 角色按指定版本交付了候选工件 | 工件已通过门 |
| 队列交付 | `delivered` | 输出和证据包已交给下一责任入口 | 已接受、已集成或完成 |
| 技术审查 | Review finding | 指定结构／教学／边界问题的判定 | 事实已核验 |
| 事实核验 | Fact verdict | 指定 claim 与来源边界的判定 | 教学结构有效或章节完成 |
| 冲突回流 | Rework Envelope + cycle state | 一次有范围、有预算的返工可以领取 | 修改已经执行或冲突已消失 |
| 人工决定 | `accepted_for_integration` 等 | 人工对指定版本作出受限决定 | 文件已集成、Chapter DoD 或出版已批准 |
| 章节集成 | 第 26 章 Integration Gate | 局部交付可进入共享真相 | 第 43 章 Completion 或 Publication Candidate 已完成 |

## 相邻章节边界

| 章节 | 相邻章节负责 | 第 44 章只负责 | 结论 |
| --- | --- | --- | --- |
| 第 26 章 | 通用 Task Contract、Ownership Claim、Delivery Package、Integration Gate 与共享写入 | 内容角色、claim/finding/verdict 载荷、队列失效和内容返工 | 已显式专门化，不重复 worktree、锁或通用集成协议。 |
| 第 38 章 | Evidence-first Retry、Separated Evaluation、Approval Gate、Escalate-and-Replay 等一般模式 | 把一般模式应用到 Draft、claim、finding、verdict 和 Rework Envelope | 已明确 Conflict Router 不执行修改，人工决定不是授权令牌。 |
| 第 39 章 | Eval Suite、trial、grader、Benchmark、回归矩阵和测试证据 | 内容工厂的诊断信号与双硬门 | 已明确不实现 evaluation harness、固定阈值或统计结论。 |
| 第 43 章 | Book Contract、Chapter DoD、Production Board、Publication Candidate 和 Completion | 一章内部的角色生产、审查与人工集成资格 | 已明确 `accepted_for_integration` 仍需 Chapter DoD、验证与状态同步。 |
| 第 45 章 | Shared Project Contract、Context Read Protocol、Tool Adapter Profile、Handoff Package 与跨工具恢复 | 工具无关的内容证据包与角色协议 | 已明确内容包不能传递会话、能力、权限或替代目标工具新鲜检查。 |

## 来源与仓库证据复核

| 引用或证据 | 2026-07-17 重读结论 | 保留的外推禁区 |
| --- | --- | --- |
| REF-029 | 官方文章仍区分预定义 workflow 与动态 agent，并描述 parallelization、orchestrator-workers、evaluator-optimizer 的适用背景和停止条件。 | 不支持本章角色、状态、队列、Agent 数量、并发安全、循环次数或事实保证。 |
| REF-134 | CRediT 页面仍列出 Investigation、Validation、Writing – original draft、Writing – review & editing、Supervision，并说明不用于决定 authorship。 | 不把贡献分类改写成 Agent 权限、作者身份或出版流程。 |
| REF-061 | 官方文章仍区分 task、trial、grader、transcript、outcome、evaluation harness 与 agent harness。 | 不把这些术语当作内容工厂标准，也不让 trial、transcript 或 grader 单独证明正文正确。 |
| REF-135 | PROV-DM 仍提供 Entity、Activity、Agent 及 generation、usage、derivation、attribution、association 等 provenance 概念。 | 不声称 Content Evidence Package 已实现 PROV、来源真实、责任充分或内容可发布。 |
| REF-136 | WAME 页面仍在学术出版语境中要求人类作者、AI 使用透明度，以及作者对材料、准确性和来源归属负责。 | 不外推为所有图书、组织、合同或司法辖区的法律规则，也不采用其具体披露格式。 |
| 第 1 章工件 | Research、References、Outline、Draft 与 Fact Check 路径存在，Fact Check 使用自身 FC 状态。 | 只能进行字段投影；不声称原生采用本章 schema 或由本章工厂重跑。 |

## 共享术语集成请求

`.ai/glossary.md` 当前没有以下术语。正文已完成中文（English）首现，但本轮禁止修改共享文件，请主线程后续统一登记：

1. 角色契约（Role Contract）：某类内容角色的目标、输入、专属输出、禁止动作、验收、停止和交接责任；不等于单次 Task Contract 或权限令牌。
2. 内容证据包（Content Evidence Package）：连接输入版本、输出、claim、执行证据、finding、verdict、冲突与人工决定的版本化内容载荷；不等于 Chapter Evidence Package、共享集成权或 PROV 实现。
3. 版本化队列（Versioned Queue）：把 Queue Item 与输入版本、失效条件、尝试和集成责任绑定的教学模型；不表示真实消息队列。
4. 审查门（Review Gate）与事实核验门（Fact Check Gate）：分别判断结构／教学／边界和 claim／来源支持的两扇硬门。
5. 冲突路由器（Conflict Router）：按冲突类型选择最小必要责任角色的路由模型；不执行修改。
6. 返工信封（Rework Envelope）：保存失败门、受影响范围、固定输入、关闭证据、循环预算和升级对象的返工契约。
7. 人工决定记录（Human Decision Record）：对指定 package/Draft 的接受集成、退回、延期或拒绝记录；不是授权令牌或出版许可。

## 已执行验证与未验证范围

- 已按 `agent-reach` 的只读网页流程于 2026-07-17 重读 REF-029、REF-134、REF-061、REF-135 与 REF-136 的原始页面；只使用上表中的限定结论。
- 已执行正文定向 Markdown lint：退出码 0，1 个文件，0 个错误。
- 已执行正文链接检查：退出码 0，7 个链接全部通过。
- 已逐项检查第 1 章五项案例工件、五个提示入口和第 26/38/39/43/45 章正文路径：均存在；路径存在不证明内容正确或流程运行。
- 已执行正文尾随空白扫描：无匹配；定向 `git diff --check`：退出码 0。
- 已执行正文与本记录的联合 Markdown lint：退出码 0，2 个文件，0 个错误；本记录没有超链接，正文 7 个链接全部通过。
- 已执行两个目标文件的联合尾随空白扫描：无匹配；定向 `git diff --check`：退出码 0。两个文件当前均为未跟踪新增文件，未执行 Git 写操作。
- 未运行全仓 `npm run validate`、示例测试、Mermaid 渲染、PDF／EPUB 构建、Agent、模型、消息队列、自动返工、外部审查、共享集成或出版。
- 未修改 `.ai/glossary.md`、`.ai/references.md`、`.ai/progress.md`、`.context/*`、目录或其他共享文件。
