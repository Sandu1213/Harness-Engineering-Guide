# 第 21 章 Final Review

## 复核结论

第 21 章以共享仓库契约和产品适配声明解释 Claude Code 与 Codex 的项目 Harness。正文保留产品资料的来源日和外推禁区，并将共享工件、产品差异、环境/权限和验证证据分开。

## 已执行专用验证

```bash
node --test examples/agent/project-harness-portability-assessment.test.mjs
node examples/agent/project-harness-portability-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-21-project-harness-portability.mmd -o diagrams/exported/chapter-21-project-harness-portability.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-21-project-harness-portability.mmd -o diagrams/exported/chapter-21-project-harness-portability.png -b transparent
```

实际结果：初始测试因目标模块不存在以 `ERR_MODULE_NOT_FOUND` 退出；实现后 6 项测试通过、0 项失败，演示输出 `portable` / `shared_contract_and_adapter_boundary_present`；两条 Mermaid 导出命令均成功完成，PNG 已视觉检查。

## 局部文档校验

本终审创建后实际执行以下命令：

```bash
npx markdownlint-cli2 "docs/part-04-engineering-practice/21-claude-code-and-codex-project-harness*.md" ".memory/reviews/2026-07-16-chapter-21-*.md"
find docs/part-04-engineering-practice -maxdepth 1 -name '21-claude-code-and-codex-project-harness*.md' -print0 | xargs -0 -n 1 npx markdown-link-check -c .markdown-link-check.json
awk '/^```mermaid$/{in_block=1; next} in_block && /^```$/{exit} in_block{print}' docs/part-04-engineering-practice/21-claude-code-and-codex-project-harness.md > /tmp/chapter-21-body.mmd
diff -u diagrams/mermaid/chapter-21-project-harness-portability.mmd /tmp/chapter-21-body.mmd
git diff --check -- <chapter-21-local-paths>
```

实际结果：Markdown lint 覆盖 11 个本章 Markdown 工件、0 个错误；本章本地链接均通过，Anthropic 官方链接按仓库既有忽略规则显示 `[/]`；正文 Mermaid 块与图源比较无输出；本章局部 `git diff --check` 无输出、退出码 0。

## 未验证范围与交接

本子任务不修改全书引用、术语、目录、README、npm scripts、项目状态或总校验脚本，避免并行冲突。主线程需登记 `CH21-REF-*`，同步共享文档并运行完整校验。本章没有验证真实 Codex/Claude Code 会话、指令加载、配置、自动记忆、环境、权限、网络、hooks、MCP、Tool 或跨产品接力。
