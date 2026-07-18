---
title: "第 13 章候选资料：Knowledge Base 与检索"
chapter: "13"
status: "reviewed-for-draft"
updated_at: "2026-07-16"
---

# 第 13 章候选资料：Knowledge Base 与检索

> 说明：以下本地研究键已经映射到全局 `.ai/references.md` 的正式 `REF-*` 编号。本地键仅用于历史追溯，正文和发布工件应使用正式编号，并保留本页的限定用途。

| 局部 ID | 正式引用 | 一手来源 | 本章可使用的限定陈述 | 不得外推 | 访问日期 |
| --- | --- | --- | --- | --- | --- |
| C13-REF-01 | REF-045 | [Lewis et al.：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) | 论文提出把预训练的参数化序列到序列模型与经神经检索器访问的、基于 Wikipedia 的非参数稠密向量索引结合，并把知识溯源与知识更新列为开放问题。 | 任意 RAG 都能提升事实性、论文结果可复现于本书案例，或向量检索本身提供引用与新鲜度保证。 | 2026-07-16 |
| C13-REF-02 | REF-046 | [Anthropic：Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) | 该工程文章将 RAG 描述为：切分资料、建立嵌入并在运行时检索相关片段加入模型上下文；文章还指出词法匹配可补足部分精确术语检索。 | 文章中的性能数字、特定 Top-K、模型、供应商、成本或其“Contextual Retrieval”流程是通用最优做法。 | 2026-07-16 |
| C13-REF-03 | REF-047 | [OpenAI API：Vector stores](https://developers.openai.com/api/reference/resources/vector_stores) | 当前 API 参考把 vector store 用于语义搜索和 `file_search`，并列出切块策略、查询及文件属性筛选等该产品接口概念。 | 默认切块参数、限制、价格、保留期、索引质量、安全属性或该接口适用于其他检索系统。 | 2026-07-16 |

## 写作时的来源规则

- 只有 REF-045 的论文背景、REF-046 的工程文章和 REF-047 的产品接口陈述可以被归因；知识分层、来源优先级、证据卡、引用回链和保守拒绝规则都是本书工程模型。
- REF-047 是动态 API 文档。任何再次修改正文中与 OpenAI vector store 有关的句子，必须在写作当日重新访问该页；不沿用本页的接口细节作为当前事实。
- “当前 API 鉴权方式”的案例只是虚构教学任务。它不声称已查询某个真实 API，也不把博客、搜索结果或纯内存示例包装成官方资料。
