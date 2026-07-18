# 第 17 章 Final Review

## 范围

- 第 17 章正文、Research Brief、候选资料、Chapter Outline、Example Plan 与 Fact Check。
- `evaluation-spec-assessment` 纯内存实现和 14 项 Node 内置测试。
- Mermaid 源、SVG/PNG 导出图及技术、示例、图示、语言审查记录。

## 复核结论

- 章节以原创的 Evaluation Spec、证据矩阵和质量门组织“可验证结果”，把来源级陈述、本书工程模型和教学案例分开表述。
- `assessEvaluationSpec` 只处理显式注入的任务、证据与策略；它不调用 Markdown lint、链接检查、模型、文件、网络、浏览器、CI、权限或外部系统。
- 模型评判器被限定为可选、需校准的证据；自我报告、证据缺失、未知/缺失状态、范围不匹配、不新鲜记录和冲突证据均不能进入接受路径。
- Mermaid 图源与正文图块一致，接受只代表评估接受，并把拒绝/接受的反馈交给第 18 章，而不描绘真实恢复操作。

## 已执行的专用验证

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -o diagrams/exported/chapter-17-evaluation-evidence-pipeline.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -o diagrams/exported/chapter-17-evaluation-evidence-pipeline.png -b transparent
```

初次结果为 Node 测试退出 0，9 项通过、0 项失败；演示退出 0，输出 `accepted` / `evaluation_accepted` / `docs-update-evaluation`。交叉审查修复未知状态、范围、新鲜度和可选项缺证契约后，专用测试再次退出 0，14 项通过、0 项失败；演示输出不变。两条 Mermaid 命令均退出 0 并生成 SVG/PNG；PNG 已实际查看。正文图块与源文件的 `diff -u` 比较退出 0、无输出。

## 局部文档校验

实际执行：

```bash
npx markdownlint-cli2 "docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results*.md" ".memory/reviews/2026-07-16-chapter-17-*.md"
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.research.md
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.references.md
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.outline.md
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.example-plan.md
npx markdown-link-check -c .markdown-link-check.json docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.fact-check.md
```

结果：初次局部检查时 Markdown lint 覆盖 10 个目标文件、0 个错误；加入本终审记录后再次执行，覆盖 11 个目标文件、0 个错误。正文检查 11 条链接，Research Brief 1 条，候选资料 4 条，Outline 0 条，Example Plan 1 条，Fact Check 5 条，均通过。

## 本章路径 diff 检查

已对本章 Markdown、示例、图源、导出图与审查记录执行 `git diff --check -- <paths>`；命令退出 0、无输出。当前这些第 17 章工件仍是未跟踪文件，因此该 Git 命令没有可检查的已跟踪差异；Markdown 的空白与结构由本章 markdownlint 覆盖。该检查不替代项目总校验。

## 交叉审查修复后复核

交叉审查提出的四项问题已被局部修正并重新验证：未知/缺失状态只会要求补证，范围与新鲜度成为接受路径的显式守卫，可选项缺证进入复核，第 16 章改为候选与准入审查而非自动经验写入。

实际重新执行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
npx markdownlint-cli2 "docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results*.md" ".memory/reviews/2026-07-16-chapter-17-*.md"
npx markdown-link-check -c .markdown-link-check.json <six-chapter-17-markdown-files>
awk '...' docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md | diff -u diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -
git diff --check -- <chapter-17-local-paths>
```

结果：Node 测试 14 项通过、0 项失败；演示退出 0 并输出 `accepted` / `evaluation_accepted` / `docs-update-evaluation`。Markdown lint 覆盖 12 个目标文件、0 个错误。链接检查分别验证正文 11 条、Research Brief 1 条、候选资料 4 条、Outline 0 条、Example Plan 1 条、Fact Check 5 条链接，均通过。Mermaid 图块与源文件比较退出 0 且无输出；局部 `git diff --check` 也退出 0，但仅能说明没有已跟踪差异的空白警告，不能覆盖当前未跟踪的章节工件。

## 未验证范围与主线程整合项

- 本子任务未运行 `npm run validate`，也未修改共享状态、引用、术语、目录、README、npm scripts 或总校验脚本，以避免与并行章节冲突。
- 主线程需要将 C17-REF-01 至 C17-REF-04 写入 `.ai/references.md` 的正式编号，更新正文 Front matter 和行内资料标识，并根据全局术语表调整首次出现。
- 主线程需要更新 `docs/SUMMARY.md`、`.ai/progress.md`、`.context/*`、`README.md`、示例说明、package scripts 与全仓校验，再以真实结果决定本章最终项目状态。
- 本章没有验证真实 Agent、模型评分器校准、人工复核、文档修改、链接可达性、CI、用户体验、权限、外部效果、性能、成本或 Benchmark。
