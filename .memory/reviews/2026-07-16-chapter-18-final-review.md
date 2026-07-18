# 第 18 章 Final Review

## 本地范围

- 第 18 章正文、Research Brief、Outline、候选资料、Example Plan 与 Fact Check。
- 纯内存 `retry-recovery-assessment` 实现、13 项 Node 内置测试和演示。
- Mermaid 状态机、SVG/PNG 导出图，以及技术、示例、图示与语言审查记录。

## 复核结论

第 18 章将失败后的判断组织为恢复契约：先检查失败证据和外部效果是否可知，再根据可重复性、上限、检查点和补偿路径选择 `retry`、`needs_observation`、`compensate`、`stop` 或 `escalate`。来源事实、本书模型和资料获取教学案例已分层；章节没有承诺真实网络、工作流、补偿、熔断或人工处理已经发生。

技术审查中发现的非法效果状态校验顺序已修复，并以新增测试锁定；未知效果和未知失败证据仍不会进入重试路径。图中 `Retry` 与 `Compensate` 都回到观察，避免把动作候选误画为完成。

## 已执行的局部验证

```bash
node --test examples/agent/retry-recovery-assessment.test.mjs
node examples/agent/retry-recovery-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -o diagrams/exported/chapter-18-retry-recovery-state-machine.svg -b transparent -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -o diagrams/exported/chapter-18-retry-recovery-state-machine.png -b transparent -s 2
awk '...' docs/part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.md | diff -u diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -
npx markdownlint-cli2 "docs/part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance*.md" ".memory/reviews/2026-07-16-chapter-18-*.md"
npx markdown-link-check -c .markdown-link-check.json <six-chapter-18-markdown-files>
git diff --check -- <chapter-18-local-paths>
```

实际结果：Node 测试退出码 0，13 项通过、0 项失败；演示退出码 0，输出 `retry` / `retry_allowed` / `source-fetch-demo`。两条 Mermaid 渲染命令均退出码 0，PNG 已实际查看；正文图块与 Mermaid 源的比较退出码 0、无输出。最终局部 Markdown lint 覆盖 11 个目标文件、0 个错误。链接检查分别验证正文 11 条、Research Brief 1 条、候选资料 3 条、Outline 0 条、Example Plan 0 条、Fact Check 1 条，均通过。局部 `git diff --check` 退出码 0、无输出；其对未跟踪文件的覆盖有限，因此 Markdown 结构与空白主要由 lint 负责。

`SHORTCUT:` 检索在本章 Markdown、示例和 Mermaid 源中无输出；没有新增待收集的刻意简化标记。

## 未验证范围与主线程整合项

- 本子任务没有运行 `npm run validate`，也没有修改 `.ai/references.md`、术语表、进度、状态、目录、README、package scripts 或总校验，以避免与并行章节冲突。
- 主线程需要将 CH18-REF-01 至 CH18-REF-03 注册为全局 `REF-*`，替换正文局部键，并审查是否登记新增术语。
- 主线程需要更新出版目录、示例索引、npm 入口、进度与项目状态，并以真实结果运行全仓校验。
- 本章没有验证真实 HTTP、下载、重试延迟、负载、队列、数据库、补偿、回滚、熔断、权限、人工审批、来源内容、成本、性能或生产恢复。
