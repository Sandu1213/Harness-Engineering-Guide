---
title: "第 13 章事实核验清单：Knowledge Base 与检索"
chapter: "13"
status: "completed"
updated_at: "2026-07-16"
---

# 第 13 章事实核验清单：Knowledge Base 与检索

## 核验范围

本轮核验正文中对 REF-045 至 REF-047 的限定陈述，并检查本书模型、纯内存示例和 Mermaid 图没有被表述为真实检索或事实接受。本地研究键已经映射到全局 `.ai/references.md`，不再作为发布引用。

## 来源级核验

| ID | 写作日复核的来源陈述 | 正文允许用途 | 禁止外推 | 状态 |
| --- | --- | --- | --- | --- |
| REF-045 | Lewis 等人的论文将 RAG 表述为结合预训练参数化记忆与非参数记忆的语言生成模型；其实现使用经神经检索器访问的 Wikipedia 稠密向量索引，并把 provenance 与世界知识更新列为开放问题。 | 说明“可检索外置资料”和“生成模型”可区分，以及检索不自动完成溯源。 | 对任何 RAG 的质量、事实性、索引设计、结果复现或本书 Evidence Card 字段的保证。 | 2026-07-16 已重读 [arXiv 摘要与正文](https://arxiv.org/abs/2005.11401)。 |
| REF-046 | Anthropic 的工程文章说明传统 RAG 常将资料切成片段以便检索，并指出孤立片段可能缺少主体或时间等上下文；文章讨论嵌入与 BM25 的组合。 | 说明切分边界和精确术语信号是需要单独审查的工程问题。 | 文章的 Contextual Retrieval、Top-K、模型、成本、实验数字、性能收益或供应商选择是本书默认方案。 | 2026-07-16 已重读 [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval)。 |
| REF-047 | OpenAI 当前 Vector Stores API 参考列出 Vector Store 的创建、查询和文件工件，并将切块策略、搜索结果内容、文件属性和相似度分数放在该产品接口定义中。 | 以产品例子说明：索引、切块、检索和元数据是显式接口选择。 | 当前默认值、字段、限额、价格、保留期、索引质量、安全性、其他平台行为或生产配置。 | 2026-07-16 已重读 [OpenAI Vector Stores API](https://developers.openai.com/api/reference/resources/vector_stores)。 |

## 本书模型与非事实边界

| 工件或术语 | 事实状态 | 核验结论 |
| --- | --- | --- |
| Knowledge Base Profile、Evidence Unit、Retrieval Policy、Evidence Card、Retrieval Record | 本书工程模型。 | 不属于 RAG 论文、Anthropic 文章或 OpenAI API 的共同 schema、产品接口、权限或审计格式。 |
| `allowed`、`needs_evidence`、`blocked` | 本章纯内存教学状态。 | 不是搜索引擎结果码、网页状态、来源可信度、权限状态或任务验收结论。 |
| `assessRetrievalEvidence` | 纯内存教学函数。 | 只处理注入的范围、候选元数据、Policy 与引用选择；不访问或评估真实资料。 |
| 证据流水线图及其 SVG/PNG | 本书的可读图示。 | 渲染成功不表示检索、网页访问、索引、来源可信度、内容正确性或验收已发生。 |
| “当前 API 鉴权方式”场景 | 原创教学案例。 | 不对应真实产品、网页或鉴权配置；不提供实际 API 行为。 |

## 正文陈述核对

| 正文主题 | 归因或性质 | 核验结论 | 写作限制 |
| --- | --- | --- | --- |
| RAG 结合参数化与可检索非参数记忆，并未自动解决 provenance。 | REF-045。 | 与论文摘要、引言中的限定陈述一致。 | 保留论文主语；不引用其基准数据。 |
| 切分可能让片段丢失语境；词法信号可作为精确术语的补充。 | REF-046。 | 与工程文章的片段语境讨论一致。 | 不使用其性能、成本、Top-K 或模型结论。 |
| Vector Store 参考包含切块、搜索、结果内容和文件属性的产品接口。 | REF-047。 | 与写作日的官方 API 参考一致。 | 不写入动态默认参数、限制或跨产品推论。 |
| 来源优先级、新鲜度门、稳定位置、引用回链、拒绝路径和 Evidence Card。 | 本书模型。 | 正文、图示和示例都明确标注为教学/工程模型。 | 不归因给三项来源，也不表示真实系统已实现。 |

## 示例与图示复核

2026-07-16 实际执行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
node examples/agent/retrieval-evidence-assessment.mjs
```

测试结果为 7 项通过、0 项失败；演示输出为 `allowed / evidence_selection_allowed` 和 `official-auth-doc`。这些结果仅说明 `assessRetrievalEvidence` 对注入教学对象给出了确定性判断；它们不验证真实页面、向量库、索引、文件、网络、模型、检索分数、来源新鲜度、内容正确性或答案验收。

Mermaid 图已由 Mermaid CLI 11.16.0 导出 SVG/PNG，并在 Diagram Review 中实际查看 PNG。渲染和查看只说明本书图源可生成可读图，不证明图中的来源、规则、检索或结论在真实系统中成立。

## 动态信息与待复核项

- REF-047 指向持续演进的产品 API。以后改动任何带有 OpenAI 产品能力或字段的正文句子时，必须重新访问官方页，并以当日语境取代本页摘要。
- REF-046 是厂商工程文章。它可用于理解其明确描述的案例与方法背景，不能成为没有本地评估的性能或成本承诺。
- `TODO(verify)：` 未来若实现网页搜索、文件上传、向量索引、重排、缓存、权限、删除、更新、敏感数据过滤或真实 API 鉴权，须为具体实现补充官方资料、授权边界、实际命令和独立结果观察。
- 未验证的资料覆盖率、召回率、精度、阈值、延迟、成本、合规、保留和安全属性不得写入正文。

## Fact Check 完成检查

- [x] REF-045 至 REF-047 已在 2026-07-16 重新读取，且正文只使用限定陈述。
- [x] 论文、工程文章、动态产品 API 和本书模型已分开。
- [x] 已重跑纯内存示例与演示，并说明它们不证明真实检索或事实接受。
- [x] 已为动态资料和未来真实集成记录重新取证条件。
- [x] 未将图示、测试或教学场景写成真实知识库、索引、来源核验、权限或任务结果证据。
