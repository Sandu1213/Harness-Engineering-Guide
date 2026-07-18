# 第 22 章终审

日期：2026-07-16
范围：第 22 章局部正文、研究、提纲、来源、示例计划、事实核验、纯内存示例、图示与审查记录。

## 工件完整性

- 正文、Research Brief、详细 Outline、局部候选来源、示例计划和 Fact Check 均位于 `docs/part-04-engineering-practice/`。
- 纯内存示例及其 Node 内置测试位于 `examples/agent/`。
- Mermaid 源与 SVG/PNG 导出位于 `diagrams/`。
- 技术、示例、图示、语言与终审记录位于 `.memory/reviews/`。
- 本章只使用 CH22-001、CH22-002 局部键；全书引用、术语、目录、npm 入口和项目状态由主线程统一登记。

## 实际验证

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
node examples/agent/repository-rule-loading-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.png -b transparent
awk '/^```mermaid$/{inside=1;next}/^```$/{if(inside)exit}inside' docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.md | diff -u diagrams/mermaid/chapter-22-repository-rule-loading.mmd -
npx --no-install markdownlint-cli2 "docs/part-04-engineering-practice/22-agents-claude-and-repository-rules*.md" ".memory/reviews/2026-07-16-chapter-22-*.md"
find docs/part-04-engineering-practice -maxdepth 1 -name '22-agents-claude-and-repository-rules*.md' -print0 | xargs -0 -n 1 ./node_modules/.bin/markdown-link-check -c .markdown-link-check.json
git diff --check
zsh -lc 'files=(docs/part-04-engineering-practice/22-agents-claude-and-repository-rules*.md examples/agent/repository-rule-loading-assessment.mjs examples/agent/repository-rule-loading-assessment.test.mjs diagrams/mermaid/chapter-22-repository-rule-loading.mmd .memory/reviews/2026-07-16-chapter-22-*.md); for file in $files; do output=$(git diff --no-index --check /dev/null "$file" 2>&1); rc=$?; if [[ $rc -gt 1 || -n "$output" ]]; then print -r -- "$file: $output"; exit 1; fi; done'
```

结果：

- Node 内置测试 7 项通过、0 项失败；演示返回 `ready_to_load` / `rule_packet_ready`。
- Mermaid SVG 与 PNG 导出成功；PNG 为 784 × 1395，已视觉检查；正文图块和 `.mmd` 源比较无输出。
- Markdown lint 检查 11 个本章文档/审查文件，0 个错误。
- 6 个章节 Markdown 文件的本地/外部链接均通过；共检查 15 个链接。
- 当前已跟踪工作树的 `git diff --check` 无输出；新增文本工件另以 `git diff --no-index --check` 对 `/dev/null` 做白空格检查，无输出。

## 质量结论

- 产品事实：Codex 仅使用写作日 official manual helper；Claude Code 仅使用写作日 Anthropic 官方页面。二者没有混写成统一加载机制。
- 原创性：场景、Rule Record、Rule Packet、冲突键、状态新鲜度和教学示例均为本书工程模型，未逐段改写外部资料。
- 代码边界：示例不读取真实文件、环境、网络、时钟、Agent 会话或产品配置；测试结果不被写成真实加载或授权证据。
- 图示边界：图只表达本书的预检与停止路径，不表示产品内部顺序或权限架构。

## 移交主线程的事项

1. 将 CH22-001、CH22-002 映射并登记到 `.ai/references.md`。
2. 按共享工作流更新术语表、`docs/SUMMARY.md`、示例 README、`package.json`/总校验入口与状态文件。
3. 在共享文件收口后运行完整 `npm run validate`、全量 Node 测试和全仓 `git diff --check`；本终审不声称这些共享校验已由本章执行。
