# 第 14 章 Final Review

## 范围

- 第 14 章正文、Research Brief、候选资料、Chapter Outline、Example Plan 与 Fact Check。
- `human-approval-routing` 纯内存实现和 10 项 Node 内置测试。
- Mermaid 源、SVG/PNG 导出图、技术/图示/示例/语言审查记录。

## 复核结论

- 章节以依赖漏洞修复建议的原创教学场景组织，来源明确陈述、本书工程模型和教学案例均有不同主语。没有把 NIST、OpenAI Agents SDK、OpenAI 工程指南或 EU AI Act 改写成跨系统保证。
- `assessHumanApprovalRoute` 只处理显式注入对象，返回教学路由；它不访问任何真实审批、网络、文件、环境、时钟、身份、Tool 或外部系统。
- Mermaid 图源与正文 Mermaid 块一致，图中批准后只进入后续执行前检查，保留环境/权限和结果验证的独立边界。
- 本子任务的局部 Markdown 与链接校验均已运行；交叉审查提出的示例输入、覆盖和刷新条件边界已修正。共享状态的最终全仓校验由主线程统一记录。

## 已执行的专用验证

```bash
node --test examples/agent/human-approval-routing.test.mjs
node examples/agent/human-approval-routing.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-14-human-approval-routing.mmd -o diagrams/exported/chapter-14-human-approval-routing.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-14-human-approval-routing.mmd -o diagrams/exported/chapter-14-human-approval-routing.png -b transparent
```

实际结果：交叉审查补齐两条行为断言后，两条 Node 命令均退出 0；测试为 10 项通过、0 项失败，演示输出 `allowed` / `auto_candidate`。两条 Mermaid 命令均退出 0 并生成 SVG/PNG；PNG 已实际查看。正文图块与源文件的 `diff -u` 比较退出 0、无输出。

## 局部文档校验

实际执行：

```bash
npx markdownlint-cli2 "docs/part-02-components/14-human-in-the-loop*.md" ".memory/reviews/2026-07-16-chapter-14-*.md"
npx markdown-link-check -c .markdown-link-check.json docs/part-02-components/14-human-in-the-loop.md
npx markdown-link-check -c .markdown-link-check.json docs/part-02-components/14-human-in-the-loop.references.md
npx markdown-link-check -c .markdown-link-check.json docs/part-02-components/14-human-in-the-loop.fact-check.md
```

结果：Markdown lint 检查 11 个目标文件、0 个错误。正文链接检查 12 条链接、均成功或按现有配置忽略 OpenAI 工程指南的精确 URL；局部参考资料与 Fact Check 各检查 5 条链接，均成功或按同一配置忽略该 URL。

## 本章路径 diff 检查

实际执行 `git diff --check --` 并仅传入本章 Markdown、示例、图源、导出图和审查记录路径；命令退出 0、无输出。该结果只表示这些改动没有 Git 检测到的空白错误，不替代全仓校验。

## 未验证范围与主线程整合项

- 本子任务没有运行 `npm run validate`，也没有修改共享文件，以避免并发冲突。
- 主线程已将 REF-048 至 REF-052、相关术语与 npm 入口纳入共享工件，并同步目录、项目状态和示例说明；最终 `npm run validate` 与全仓交叉核对的真实结果由 `CURRENT_STATE.md` 与交接文件记录。
- 本章没有验证真实人类决定、权限、审批后端、Tool、漏洞、依赖变更、测试、发布、外部效果、法规适用性或合规。
