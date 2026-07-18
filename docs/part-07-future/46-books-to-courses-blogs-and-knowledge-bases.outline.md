---
title: "第 46 章大纲：从书籍扩展到课程、博客和知识库"
chapter: "46"
status: "completed"
updated_at: "2026-07-17"
---

# 第 46 章大纲：从书籍扩展到课程、博客和知识库

## 本章要完成的学习目标

读者完成本章后，应能：

1. 解释“书稿是规范事实源”不等于“所有渠道共享同一段文字”；
2. 为事实、示例、图示或术语定义 Content Atom 与 Source Anchor，而不丢失版本、来源和许可边界；
3. 用 Learning Path Contract 对齐受众、前置、可观察目标、练习和评估；
4. 为 Tutorial、Workshop、Blog、FAQ 与 Knowledge Base Entry 判断可复用内容和必须重写的部分；
5. 用 Derivative Content Manifest、Publication Adapter Profile 和 Consistency Gate 检测派生物漂移；
6. 把渠道反馈记录为待核验候选，而不是直接覆盖规范书稿。

**前置章节：** 第 13 章 Knowledge Base 与检索、第 28 章最小 Harness、第 43 章 Book Harness、第 44 章 AI Technical Book Factory。

**章节边界：** 本章设计内容派生与一致性接口，不实现真实 LMS、CMS、网站、搜索索引、课程平台、分析系统、发布适配档案或读者数据收集；不生成或上传实际课程、博客、FAQ 与知识库；不提供版权或法律意见；不把目标对齐、测试通过、预览成功或点击反馈写成学习效果、出版批准或事实正确证明。

## 叙事主线

全章围绕第 28 章“从零搭建最小 Harness”的当前仓库工件展开。相同规范输入分别派生为 Tutorial、Workshop 与 FAQ 候选：三者复用接口、来源、示例和术语身份，却必须重新定义目标、顺序、互动、删减和完成证据。读者沿着“规范源 → 内容原子 → 派生契约 → 媒介重写 → 一致性门 → 人工发布决定 → 反馈候选”看见内容复用的真正边界。

## 来源与论证边界

| 来源 | 本章允许使用 | 必须明确排除 |
| --- | --- | --- |
| CH46-REF-01 / REF-132 | Diátaxis 的四类用户需求与内容目的背景。 | 四类是唯一派生物、固定目录或完整质量标准。 |
| CH46-REF-02 / REF-145 | DITA 的 topic-oriented、information-typed、复用与 single-source 语境。 | 本书采用 DITA/XML、Markdown Atom 符合 DITA 或复用可自动无损完成。 |
| CH46-REF-03 / REF-146 | 学习目标、评估与教学策略对齐及可观察目标背景。 | 某个课程已对齐、测验等于能力或学习效果已发生。 |
| CH46-REF-04 / REF-147 | LearningResource 的教学、评估、前置、层级和资源类型候选字段。 | 开发版类型是强制 Schema、平台支持或互操作保证。 |
| CH46-REF-05 / REF-135 | Entity、Activity、Agent 与 derivation 等 provenance 概念。 | 本书工件兼容 PROV 或保存关系就证明事实、授权和责任充分。 |

## 逐节蓝图

### 1. 开场反例：复制章节为什么会制造五份真相

- **读者问题：** 为什么“复制后改短”不是可靠的多渠道策略？
- **核心内容：** 用接口已更新、博客仍旧；课程目标与练习错位；FAQ 丢失范围；KB 片段无版本；反馈无审查覆盖书稿五个故障串起章节。
- **案例输入：** 第 28 章正文、示例、图示、术语和来源均存在，但尚未生成任何派生产品。
- **证据边界：** 仓库路径证明输入存在，不证明派生物已创建、读者已使用或渠道发生漂移。
- **过渡：** 先纠正“单一来源等于共享文本”的误解。

### 2. 单一事实源不是单一文本副本

- **读者问题：** 什么保持唯一，什么允许针对媒介改变？
- **核心内容：** 分开规范事实源、派生契约和媒介实现；事实、接口、引用与术语身份可复用，导语、顺序、练习、标题与互动按媒介重写。
- **来源映射：** CH46-REF-01 支持不同内容目的；CH46-REF-02 只支持复用与 single-source 的 DITA 特定背景。
- **本书模型：** 源版本变化把派生物标成刷新候选，而不是自动改写。
- **失败出口：** 任何派生物不能定位源版本时进入 `needs_source_evidence`。

### 3. Content Atom 与 Source Anchor：先给复用单元身份证

- **读者问题：** 一段内容什么时候足够稳定，可以复用？
- **核心内容：** Atom 必须有 ID、类型、锚点、版本、资产引用、复核日期、许可、适用范围和状态；Anchor 指向路径、小节、引用键和版本。
- **可复用类型：** 限定事实、接口契约、独立示例输入、图源、术语定义、已核验警告。
- **反例：** 同时承担解释、步骤、营销导语和结论的整段文字不是稳定原子。
- **来源映射：** CH46-REF-02 仅提供 topic-oriented/information-typed 背景；字段为本书设计。
- **验证：** 锚点存在、版本匹配、许可可说明、脱离上下文没有改变适用范围。

### 4. Learning Path Contract：课程从目标和证据出发

- **读者问题：** 怎样避免“把章节切成幻灯片”冒充课程？
- **核心内容：** 受众、前置、可观察目标、顺序、练习、评估、反馈和完成证据必须逐项对齐。
- **来源映射：** CH46-REF-03 支持目标—评估—教学策略对齐和动作化目标。
- **本书扩展：** 目标使用“装配、判断、解释、诊断”等可观察动作；练习与评估各自指向目标 ID。
- **失败出口：** 目标没有对应练习/评估，或评估只测记忆时返回 `learning_alignment_failed`。
- **边界：** 对齐证明设计可检查，不证明学员掌握、认证有效或教学公平。

### 5. Derivative Content Manifest：固定派生物究竟来自哪里

- **读者问题：** 如何区分一次可审查派生和失控副本？
- **核心内容：** Manifest 记录派生物 ID、媒介、受众、源版本、Atom、重写项、删减边界、责任者、校验和刷新触发。
- **候选元数据：** `teaches`、`assesses`、`competencyRequired`、`educationalLevel`、`learningResourceType` 可作为受限参考。
- **来源映射：** CH46-REF-04 只提供 Schema.org 开发版字段背景；CH46-REF-05 支持派生关系语境。
- **失败出口：** 缺源版本、责任者、删减边界或刷新触发时不得进入预览。
- **边界：** Manifest 不执行转换、不保证平台接受，也不等于 PROV 兼容实现。

### 6. 五种媒介的复用与重写矩阵

- **读者问题：** Tutorial、Workshop、Blog、FAQ 与 KB Entry 分别要改什么？
- **核心内容：** 用一张矩阵比较主要任务、可复用候选、必须重写项、最小完成证据和不可声称结论。
- **Tutorial：** 连续步骤、检查点、错误恢复和结束观察。
- **Workshop：** 时间盒、讲师提示、分组活动、练习数据、rubric 和复盘。
- **Blog：** 单一论点、短案例、范围上下文和来源回链。
- **FAQ：** 可定位问题、短答案、限制、更新时间与升级入口。
- **KB Entry：** 产品/版本/权限范围、失效条件、维护者和证据回链。
- **来源映射：** CH46-REF-01 解释内容目的差异；具体矩阵是本书模型。

### 7. 贯穿案例：第 28 章的 Tutorial、Workshop 与 FAQ

- **CASE-46-A Tutorial：** 装配纯内存最小 Harness，逐步观察 `ready` 或带原因码的 `stopped`；不得声称真实 Tool 已运行。
- **CASE-46-B Workshop：** 为缺证据、缺权限和允许执行三个输入写准入判断并解释失败出口；完成练习不等于生产授权。
- **CASE-46-C FAQ：** 回答“最小 Harness 是否等于一个 Prompt 加工具调用？”，保留计划/执行/验证不可替代的边界。
- **共用输入：** 第 28 章接口、测试输入、图示和术语 ID。
- **各自重写：** 步骤与恢复、教学活动与 rubric、短答案与升级入口。
- **验证：** 每条案例都显示源锚点、目标、删减边界和仍未运行范围。

### 8. 版本、许可与刷新：检测漂移而不是自动覆盖

- **读者问题：** 什么时候必须刷新派生物？
- **核心内容：** 比较源章节、派生物和发布适配档案三类版本；列出锚点消失、来源过期、术语改名、接口/图示变化、目标错位和平台规则变化等触发。
- **许可边界：** 当前仓库 `LICENSE` 不自动覆盖第三方图片、长引用、商标、课程平台条款和未来素材。
- **状态：** `current`、`refresh_required`、`blocked_by_license_review`、`retired`；状态名为本书模型。
- **失败出口：** 发现触发只生成刷新任务，未经审查不得自动改写并发布。

### 9. 发布适配档案（Publication Adapter Profile）与一致性门（Consistency Gate）

- **读者问题：** 媒介完成后，怎样进入平台预览而不把适配等同发布？
- **核心内容：** Profile 记录目标平台、格式、链接规则、资源约束、可访问性检查、预览和回滚入口；Gate 检查源版本、锚点、引用/术语、学习对齐、链接、渲染和责任人。
- **状态断点：** `ready_for_preview_review` 仍需要平台预览和人工判断；`publication_approval_required` 不是已发布。
- **边界：** 不使用真实凭证，不调用 LMS/CMS，不上传内容，不声称可访问性合规或平台兼容。
- **验证：** 表格列出每个检查能证明和不能证明什么。

### 10. Feedback Candidate：把渠道反馈送回正确层

- **读者问题：** 评论、练习失败和搜索问题应该改哪里？
- **核心内容：** 区分媒介局部、派生契约、规范事实候选和证据不足；记录位置、观察时间、证据、影响范围、候选目标与裁决状态。
- **回流路径：** 只有规范事实候选在补齐证据后进入书稿 Research、Fact Check 或 Technical Review。
- **反例：** 点击率、单个评论或模型摘要直接改写书稿。
- **失败出口：** 无复现/来源/范围时保持 `needs_feedback_evidence`。
- **边界：** 收到反馈不等于源错误，源修改不等于所有派生物已刷新。

### 11. 计划纯内存示例：`assessDerivedContentPackage(input)`

- **输入：** `sourceSnapshot`、`contentAtoms`、`learningPath`、`derivativeManifest`、`adapterProfile`、`consistencyEvidence`、`feedbackCandidates`、`publicationRequest`。
- **输出：** `needs_source_evidence`、`needs_medium_rewrite`、`learning_alignment_failed`、`refresh_required`、`ready_for_preview_review` 或 `publication_approval_required`。
- **测试计划：** 缺锚点、版本漂移、许可未决、无媒介重写、目标未对齐、反馈越权、完整预览候选、请求发布但缺人工批准。
- **TDD：** 先建立模块缺失或行为缺失红灯，再写最小分类函数，最后重跑专用测试与演示。
- **副作用边界：** 不读取仓库，不访问模型、LMS、CMS、网站、知识库或分析系统，不生成、上传或发布内容；演示固定 `executionPerformed: false`。

### 12. 计划图示：内容供应链与三条不可跳过边界

- **图源：** `diagrams/mermaid/chapter-46-content-derivation-supply-chain.mmd`。
- **流程：** 规范书稿 → Content Atom/Source Anchor → Learning Path/Manifest → 媒介重写 → Consistency Gate → 预览候选 → 人工发布决定 → Feedback Candidate。
- **回路：** 版本/引用/目标漂移回到对应复核；反馈先分类，再进入派生物或书稿阶段。
- **图中断点：** `source_reused ≠ medium_ready`、`preview_validated ≠ publication_approved`、`feedback_received ≠ source_changed`。
- **审查：** Mermaid CLI 11.16.0 实际导出 SVG/PNG，正文块与 `.mmd` 逐字一致，PNG 视觉检查后才能完成 Diagram Review。

### 13. 渐进增强与章节收束

- **Level 1：** 为单个 FAQ 保存源锚点和复核日期。
- **Level 2：** 为一种媒介建立 Manifest 与刷新触发。
- **Level 3：** 为课程补 Learning Path Contract 和目标对齐检查。
- **Level 4：** 维护多渠道适配档案、一致性门和反馈候选队列。
- **Level 5：** 在具备权限、预览、回滚和人工批准后接入真实发布平台；不属于本章实现。
- **收束：** 可持续复用依赖可定位身份、媒介重写、版本/许可和验证证据，而不是复制速度。
- **衔接第 47 章：** 将内容工程中的稳定原则与仍开放的问题带入全书结语。

## 写作与审查检查表

- [x] 学习目标、前置章节、章节责任和非范围明确。
- [x] 五项来源逐节映射，并写明不可外推范围。
- [x] 规范事实源、派生契约和媒介实现分层。
- [x] Tutorial、Workshop、Blog、FAQ、KB Entry 的责任不同。
- [x] 第 28 章三条案例不冒充真实派生或发布结果。
- [x] 示例接口、TDD 测试路径和副作用边界明确。
- [x] 图示节点、回路、输出路径与视觉审查要求明确。
- [x] 版本、许可、学习目标、平台适配和反馈回流有保守失败出口。
- [ ] First Draft 当天重读动态来源和第 28 章当前工件。
- [ ] 后续阶段分别完成技术、示例、图示、事实、语言与最终审查。
