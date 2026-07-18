---
chapter: "13-knowledge-base-and-retrieval"
stage: "Technical Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 13 章 Technical Review：Knowledge Base 与检索

## 审查范围

- 工件：第 13 章正文、Research Brief、局部候选资料、Chapter Outline、Example Plan 与 Fact Check。
- 审查类型：来源归因、技术边界、章节责任、术语与阶段语义。
- 使用的规则：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/research-policy.md`、`.ai/review-checklist.md`。
- 复读来源：C13-REF-01 的 RAG 论文、C13-REF-02 的 Anthropic 工程文章、C13-REF-03 的 OpenAI Vector Stores API 参考。

## 结论

`本地工件可进入主线程整合`。本章的学习目标保持单一：将检索设计为有范围、来源、新鲜度、稳定位置和输出回链的证据准备层。RAG 论文、Anthropic 工程文章与 OpenAI API 参考分别只支持各自的研究、工程和产品接口背景；Knowledge Base Profile、Evidence Unit、Retrieval Policy、Evidence Card、状态代码和案例均明确为本书模型。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `.ai/references.md`、`.ai/glossary.md`、`.ai/progress.md` 与 `.context/*` | 本工作线程遵守共享写入限制，未登记本章来源、术语或完成状态。 | `BOOK_RULES.md` 要求全局引用、术语与状态在完成时同步。 | 主线程分配正式 `REF-` 编号，登记 Knowledge Base、Evidence Unit、Retrieval Policy、Evidence Card 术语，并在全仓校验后更新状态。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| `docs/SUMMARY.md` 与 `examples/agent/README.md` | 当前目录尚未索引第 13 章正文、图示和示例。 | 读者无法从出版目录或示例索引直接发现本章工件。 | 主线程在整合时添加稳定链接和直接 Node 验证命令。 |
| `package.json` 与 `scripts/validate.sh` | 示例目前通过直接 Node 命令验证，未被全仓示例入口调用。 | 全仓校验不能自动覆盖新示例。 | 主线程增加 `example:`、`test:` 脚本和总校验调用，再运行完整验证。 |

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| 第 17 章 | 将 Evidence Card 作为输入，而不是把引用存在视为验收通过。 | 保持“证据准备”和“任务接受”的职责分离。 |
| 第 33、44 章 | 复用 Knowledge Base Profile、Retrieval Policy 和 Evidence Card 模板。 | 将书籍研究过程沉淀为可接力资产。 |

## 已执行验证与未验证范围

- 2026-07-16：实际重读三项来源，确认正文仅保留以下限定范围：RAG 论文的参数化/非参数记忆与 provenance 问题；Anthropic 的片段语境和检索信号背景；OpenAI Vector Stores 的产品级切块、查询和文件属性接口概念。
- 2026-07-16：实际运行纯内存测试，7 项通过、0 项失败；实际运行演示，输出 `allowed / evidence_selection_allowed`。这些结果只证明注入对象上的判断。
- 2026-07-16：实际渲染并查看 Mermaid PNG；图表达本书证据流水线，没有把候选、Policy 或 Evidence Card 画成真实检索、事实正确性或验收。
- 未运行 `npm run validate`，未修改共享状态、全局引用、全局词表、目录、包脚本或总校验入口；上述事项由主线程统一完成。
