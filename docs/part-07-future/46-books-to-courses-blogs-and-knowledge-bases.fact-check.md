---
title: "第 46 章事实核验：从书籍扩展到课程、博客和知识库"
chapter: "46"
status: "completed"
updated_at: "2026-07-17"
---

# 第 46 章事实核验：从书籍扩展到课程、博客和知识库

## 一手来源陈述

| 编号 | 正文中的陈述 | 来源与访问日期 | 直接支持与限定结论 |
| --- | --- | --- | --- |
| FC-46-01 | Diátaxis 区分教程、操作指南、参考和解释，并将四种形式对应到不同的文档用户需要。 | CH46-REF-01／REF-132；2026-07-17 重读 [Diátaxis](https://diataxis.fr/)。 | 当前页面直接支持四种需要、四种形式及其系统关系。它不规定本章必须生产哪些渠道，不表示四类是所有派生内容的唯一分类，也不证明按此分类后内容就正确。 |
| FC-46-02 | DITA 是面向主题、按信息类型组织、支持复用与 single-source 的 XML 架构，并可用于培训和教育材料。 | CH46-REF-02／REF-145；2026-07-17 重读 [Introduction to DITA](https://docs.oasis-open.org/dita/dita/v1.3/os/part1-base/archSpec/base/introduction-to-dita.html)。 | OASIS 页面直接支持 XML-based、topic-oriented、information-typed、reused、single-sourced 及教育材料范围。正文只把它作为复用背景；Markdown Content Atom 不是 DITA 实现，未经过 specialization、XML 验证或 DITA 工具兼容测试。 |
| FC-46-03 | 课程内部一致性要求学习目标、评估与教学策略对齐；学习目标应以学生能执行的具体、可测动作表达，并把复杂能力拆成组成技能。 | CH46-REF-03／REF-146；2026-07-17 重读 [Learning Objectives](https://www.cmu.edu/teaching/designteach/design/learningobjectives.html)。 | CMU Eberly Center 页面直接支持三者对齐、学生中心、动作动词、可测目标和复杂技能拆分。它不证明本章案例已完成课程设计、真实教学、评估效度、学习效果、公平性或认证。 |
| FC-46-04 | Schema.org 的 LearningResource 提供 `teaches`、`assesses`、`competencyRequired`、`educationalLevel` 与 `learningResourceType` 等候选属性。 | CH46-REF-04／REF-147；2026-07-17 重读 [LearningResource](https://schema.org/LearningResource)。 | 当前页面直接列出这些属性，并说明 LearningResource 通常作为 Book、VideoObject 等主类型的补充。页面仍明确标为 development version 和 “new” area；正文不把属性写成强制 Schema，也不外推 LMS、CMS、搜索引擎或其他平台已经采用、互操作或能改善学习效果。 |
| FC-46-05 | W3C PROV-DM 用 Entity、Activity、Agent 及 generation、usage、derivation、attribution 等关系表达 provenance。 | CH46-REF-05／REF-135；2026-07-17 重读 [PROV-DM](https://www.w3.org/TR/prov-dm/)。 | W3C Recommendation 的核心结构和组件直接支持这些概念与关系。正文只借此说明派生链应记录输入、转换、输出与责任；本书字段没有经过 PROV 兼容性验证，记录 provenance 也不证明事实正确、授权充分或反馈可以安全合并。 |

五项来源均只支持正文中的限定背景，没有支持“本书已经实现 DITA／Schema.org／PROV”、
“真实课程有效”或“外部平台已经兼容”等结论。来源页面还包含更多术语与实现细节，
本章未依赖的动态内容没有进入稳定 claim。

## 本书工程模型

| 编号 | 工程模型 | 事实边界 |
| --- | --- | --- |
| EM-46-01 | Content Atom 与 Source Anchor。 | 是本书为 Markdown 书稿设计的内容身份、来源、版本、证据、适用范围与许可模型。它们不属于 DITA、Schema.org 或 PROV-DM，也不因可定位或可复用就自动成为正确事实。 |
| EM-46-02 | Learning Path Contract。 | 是本书把受众、前置、目标、顺序、练习、评估、反馈与完成证据显式对齐的教学设计工件。契约通过不等于学员已学习、评估有效或生产能力获得认证。 |
| EM-46-03 | Derivative Content Manifest 与 Publication Adapter Profile。 | 是本书固定派生物身份、媒介重写、删减、刷新触发和目标平台边界的工程工件。它们不包含真实凭证，不证明平台可用、格式兼容、预览成功或内容已发布。 |
| EM-46-04 | Consistency Gate 及 `ready_for_preview_review`、`publication_approval_required` 等状态。 | 是本书纯内存示例使用的保守路由模型。Gate 只检查调用方注入的证据，不执行预览、审批、上传、发布、回滚或外部系统动作。 |
| EM-46-05 | Feedback Candidate Record。 | 是本书把渠道观察路由到媒介、派生契约、规范事实候选或补证队列的模型。反馈记录不自动改变源章节，也不证明反馈真实、充分、有代表性或允许公开。 |

## 虚构派生输入

| 编号 | 教学输入 | 事实边界 |
| --- | --- | --- |
| FI-46-01 | `chapter-28-v3`。 | 是测试和演示注入的虚构源版本，不是第 28 章当前 commit、发布号、内容哈希或仓库版本声明。 |
| FI-46-02 | `workshop-28-v1`。 | 是虚构派生物 ID，不表示 Workshop 已生成、试讲、评估、批准或发布。 |
| FI-46-03 | `injected-preview-target`。 | 是虚构目标平台名，不对应真实 LMS、CMS、网站、搜索服务、账户、预览环境或平台能力。 |
| FI-46-04 | `chapter-46-teaching-owner`。 | 是虚构责任者，不对应真实人员、团队、权限主体、审批者或法律责任归属。 |
| FI-46-05 | 示例中的 Source Snapshot、Content Atom、Learning Path、Manifest、Adapter、Consistency Evidence、Feedback Candidate 与 Publication Request。 | 都是调用方注入的纯内存对象；字段完整只表示判断器的当前条件满足，不证明仓库、外部来源、许可、课程、平台、反馈或批准状态真实存在。 |

## 当前仓库与运行证据

| 编号 | 检查 | 当前结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-46-06 | `rtk node --test examples/agent/derived-content-package-assessment.test.mjs`。 | 退出码 0；17 项通过、0 项失败。 | 纯函数能对虚构注入对象覆盖来源、许可、版本、媒介重写、学习对齐、Adapter、Consistency、反馈和发布请求分支；不证明真实派生或平台流程。 |
| FC-46-07 | `rtk node examples/agent/derived-content-package-assessment.mjs`。 | 退出码 0；输出 `ready_for_preview_review`、`derived_content_evidence_ready`、`review_preview_candidate` 与 `executionPerformed: false`。 | 只证明完整教学输入得到预览审查候选判断；没有读取仓库、生成内容、创建预览、请求人工决定、上传或发布。 |
| FC-46-08 | 正文 Mermaid、`.mmd`、SVG/PNG 与 Diagram Review。 | 正文 Mermaid 块与 `.mmd` 均为 2354 个字符且逐字一致；PNG 为 1568×1470 RGB，本轮重新查看可读性。 | 只证明当前图源、正文块和导出物一致，且图中节点、边界和箭头可读；不证明图中的派生、反馈、预览、批准或发布动作真实发生。 |
| FC-46-09 | 实现边界与审查记录。 | 实现固定 `executionPerformed: false`；定向扫描未发现真实文件、环境变量、网络、子进程、动态导入或外部平台调用。 | 支持“当前示例是纯内存判断器”；不证明未来调用方、其他代码或真实 Adapter 也没有副作用。 |

## 最小事实修订

- 五项正文来源陈述继续得到一手来源直接支持，不需要扩大或删除 claim。
- Schema.org LearningResource 页面当前仍明确处于 development version 的 “new” area；正文继续只把属性作为候选元数据。
- 正文继续把外部来源、本书工程模型、虚构教学输入、纯内存测试结果和图示证据分开。
- 本章完成检查已把 Fact Check 标为完成；Language Editing、Final Review、全仓 Validation 与共享状态同步仍未执行。

## 本轮定向检查

- 通过 `agent-reach` 的 Jina Reader 入口于 2026-07-17 重读五项一手来源，并重新核对直接支持与外推边界。
- 复跑 `rtk node --test examples/agent/derived-content-package-assessment.test.mjs`：退出码 0，17 项通过、0 项失败。
- 复跑 `rtk node examples/agent/derived-content-package-assessment.mjs`：退出码 0，输出包含 `executionPerformed: false`。
- 以 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者均为 2354 个字符，逐字一致。
- `file` 与 `sips` 均确认 PNG 为 1568×1470 RGB；本轮重新查看 PNG，节点、标签、箭头与边界可读，无明显裁切。
- 正文与本记录的定向 Markdown lint、链接、换行、尾随空白和 diff 检查均通过。

## 明确未核验或不覆盖的范围

- 未生成真实 Tutorial、Workshop、Blog、FAQ 或 Knowledge Base Entry，未进入真实 LMS、CMS、网站、搜索、分析、账户、模型、浏览器或数据库。
- 未创建真实预览、人工批准、上传、发布、通知、回滚或反馈采集，也未处理真实凭证、个人数据、客户数据或受限内容。
- 未证明来源事实永久有效、许可或法律结论、平台兼容、无障碍合规、课程质量、评估效度、学习效果、职业认证或真实责任归属。
- 未运行全仓 `npm run validate`，未同步共享 `.context/` 或 `.ai/` 状态；这些工作不属于本轮第 46 章 Fact Check 的专属范围。
