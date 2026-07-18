---
title: "第 13 章 Chapter Outline：Knowledge Base 与检索"
chapter: "13"
status: "complete"
updated_at: "2026-07-16"
---

# 第 13 章 Chapter Outline：Knowledge Base 与检索

## 章节契约

- **学习目标：** 读者能够把检索设计为带范围、来源、新鲜度和引用回链的证据准备层，并在证据不足时拒绝生成确定结论。
- **核心问题：** 何时检索、检索什么、怎样筛选、怎样保留来源，以及为什么检索分数不等于事实证明？
- **前置依赖：** 第 6 章的 Context Engineering；第 7 章的记忆范围；第 10 章的状态与证据语义。
- **后续接口：** 第 14 章使用证据支持人类判断；第 17 章对结果建立验收；第 33、44 章把证据层用于长期项目与 Book Factory。
- **非目标：** 不教读者部署向量库、选择嵌入模型或复制某一厂商参数。

## 逐节蓝图

| 节 | 读者问题 | 本节内容与边界 | 计划工件 | 验收点 |
| --- | --- | --- | --- | --- |
| 为什么检索结果不能直接成为答案 | “搜到了”为什么仍会出错？ | 区分资料库、索引、候选片段、证据和验收；引用 C13-REF-01 的外置检索背景，不把论文结果外推。 | 失败场景表。 | 读者能指出“高分片段”仍缺哪类信息。 |
| Knowledge Base Profile | 我检索的到底是什么？ | 用资料范围、来源种类、负责人、更新时间和排除项定义资料库；本书模型。 | Knowledge Base Profile 表。 | 不把索引误称为全部事实。 |
| Evidence Unit 与切分边界 | 一个片段何时失去上下文？ | 用来源位置、片段边界、主题、时间和限制描述证据单元；C13-REF-02 仅作为切分影响语境的背景。 | Evidence Unit 卡片。 | 读者能识别缺主体/日期的片段。 |
| Retrieval Policy | 如何在检索前就拒绝坏候选？ | 查询范围、来源优先级、元数据筛选、新鲜度、敏感数据和停止条件；本书模型。 | Policy 表。 | Policy 能解释为什么博客或过期材料未进入答案。 |
| 从查询到 Evidence Card | 候选怎样变成可引用上下文？ | 查询澄清、候选、排序信号、范围/来源/新鲜度门、上下文装配和引用；C13-REF-02 与 C13-REF-03 的限定例子。 | Mermaid 证据流水线、Evidence Card。 | 每个输出主张能回到稳定来源位置。 |
| 分数与新鲜度 | 为什么相似度不能替代来源判断？ | 说明语义/词法信号、分数、过滤和时间的各自职责；不提供阈值或默认参数。 | 排序信号对照表。 | 读者能写出“分数高但不能引用”的反例。 |
| 案例：当前 API 鉴权方式 | 如何处理时间敏感技术问题？ | 虚构任务下的来源优先级、拒绝路径、Evidence Card 和停止条件；不查询真实 API。 | 案例决策表。 | 对无日期博客、范围不明页面和官方当前页给出不同结论。 |
| 失败、停止与交接 | 没有证据时怎么办？ | 空结果、冲突、过期、不可定位、敏感资料和检索记录；连接第 14、17 章。 | 失败分类表、交接最小集。 | 不把“没找到”写成“没有答案”。 |

## 图示与示例

### 图示

- **问题：** 任务范围、来源策略和新鲜度如何限制从检索候选到带引用输出的路径？
- **图源：** `diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd`。
- **节点：** Task Scope、Retrieval Policy、Candidate Set、Evidence Gates、Evidence Card、Context Package、Cited Output，以及补证/停止出口。
- **箭头语义：** 实线是本书模型中的信息或判断流；虚线是“需要回链/重新检查”的约束，不表示真实网络检索、索引或事实正确性。

### 最小示例

- **模块：** `examples/agent/retrieval-evidence-assessment.mjs`。
- **输入：** 注入的查询范围、候选元数据、来源种类策略和引用选择。
- **输出：** `allowed`、`needs_evidence` 或 `blocked` 及可审查代码。
- **测试：** 新鲜官方候选、缺候选、来源种类拒绝、新鲜度未知、范围不匹配、URL 缺失、引用缺失。
- **边界：** 不访问知识库、网络、文件、向量索引、模型、浏览器、环境变量、凭证或外部系统。

## 章节阶段记录

- [x] Research Brief 与候选资料。
- [x] Chapter Outline。
- [x] First Draft。
- [x] Technical Review。
- [x] Example Implementation。
- [x] Diagram Review。
- [x] Fact Check。
- [x] Language Editing。
- [x] Final Review。

## 交付物清单

- 正文：`13-knowledge-base-and-retrieval.md`。
- Research Brief 与局部候选资料。
- Evidence Card、Retrieval Policy、失败分类和教学案例。
- Mermaid 源及 SVG/PNG 导出。
- 纯内存示例、7 项 Node 内置测试、红绿记录和演示。
- 技术、图示、事实、语言、最终审查记录。
