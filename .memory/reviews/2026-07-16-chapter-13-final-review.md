---
chapter: "13-knowledge-base-and-retrieval"
stage: "Final Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 13 章 Final Review：Knowledge Base 与检索

## 范围

- 正文、Research Brief、局部候选资料、Chapter Outline、Example Plan 和 Fact Check。
- 纯内存 `assessRetrievalEvidence` 模块、7 项 Node 内置测试与演示。
- Mermaid 源、正文 Mermaid 块、SVG/PNG 导出图与技术、示例、图示、语言审查记录。

## 复核结论

- 正文以原创的资料边界、Evidence Unit、Retrieval Policy、Evidence Card 和“当前 API 鉴权方式”教学案例组织；没有逐句翻译或复刻 RAG 论文、Anthropic 工程文章或 OpenAI API 参考。
- C13-REF-01 只用于参数化/非参数记忆与 provenance 问题的研究背景；C13-REF-02 只用于切分语境和检索信号的工程背景；C13-REF-03 只用于 OpenAI 产品级的切块、查询与文件属性接口例子。所有产品动态信息均保留重查要求。
- `assessRetrievalEvidence` 不导入外部包，也不访问网络、资料库、文件、索引、模型、浏览器、数据库、环境变量、凭证、权限或其他外部系统；它只返回注入教学对象的受限判断。
- Mermaid 图已重新导出 SVG/PNG，正文 Mermaid 块与图源一致；图中 Evidence Gates、`needs_evidence`、`blocked` 和停止/升级路径没有被表述为真实搜索、来源可信度或验收行为。
- 语言审查保持了候选、证据、引用和验收的边界：有 Evidence Card 只表示可以回链，不表示任务已经接受。

## 已执行的本地验证

2026-07-16 实际执行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
node examples/agent/retrieval-evidence-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd -o diagrams/exported/chapter-13-retrieval-evidence-pipeline.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd -o diagrams/exported/chapter-13-retrieval-evidence-pipeline.png -b transparent
```

测试以退出码 `0` 结束，7 项通过、0 项失败；演示以退出码 `0` 输出 `allowed / evidence_selection_allowed`。两次 Mermaid 命令均以退出码 `0` 结束；PNG 已实际查看，节点、箭头、补证回路、拒绝出口和 Evaluation 约束可辨识。

随后实际执行：

```bash
npx --no-install markdownlint-cli2 <第 13 章的 10 个 Markdown 工件>
npx --no-install markdown-link-check -c .markdown-link-check.json <正文、Research Brief、候选资料>
node -e '<比较正文 Mermaid 块与 .mmd 图源>'
git diff --check -- <第 13 章路径>
```

结果如下：Markdown lint 检查 10 个第 13 章 Markdown 工件、0 个错误；链接检查通过正文的 10 条链接、Research Brief 的 1 条链接和候选资料的 3 条链接；正文 Mermaid 块与 `.mmd` 图源一致；限定路径的 `git diff --check` 无输出、退出码 `0`。

## 历史主线程整合项（已完成）

- 当时尚未执行全仓 `npm run validate`，因为并行工作约定将全局验证留给主线程。
- 主线程现已将 C13-REF-01 至 C13-REF-03 映射为 REF-045 至 REF-047，登记术语并把专用 Node 命令纳入 npm 脚本和总校验；目录、项目状态和示例说明也已同步。
- 本地验证不能替代全仓验证；最终全仓校验的真实结果由 `CURRENT_STATE.md` 与交接文件记录。

## 未验证范围

本章没有实现或验证真实网页搜索、资料解析、切分、嵌入、向量化、索引、重排、检索分数、缓存、来源可信度、内容正确性、资料更新、数据删除、权限、提示注入隔离、模型调用、文件、网络、数据库、产品 API 或任务验收。测试、演示、链接检查和图示只证明本书工件与注入教学对象在其限定范围内可检查。
