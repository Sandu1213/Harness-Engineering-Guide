# 第 9 章 Diagram Review

## 范围

- 图源：`diagrams/mermaid/chapter-09-plan-to-task-graph.mmd`。
- 导出：`diagrams/exported/chapter-09-plan-to-task-graph.svg` 与 `.png`。
- 正文：`09-planning-and-task-decomposition.md` 中的 Mermaid 块、图源链接、导出链接和替代描述。

## 实际渲染与视觉检查

2026-07-15 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-09-plan-to-task-graph.mmd \
  -o diagrams/exported/chapter-09-plan-to-task-graph.svg \
  -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-09-plan-to-task-graph.mmd \
  -o diagrams/exported/chapter-09-plan-to-task-graph.png \
  -b transparent
```

两次命令均以 0 退出。已实际查看 PNG：模糊需求、Plan Brief、可判断性检查、任务卡、认证契约研究、测试目标、断言、计划中的写入请求、批准检查、验证候选、文档并行候选、两类 `blocked`、`requires_approval`、观察、修订记录和局部重排分支均可辨识。为减少交叉线，最终图采用单一纵向主链与局部支路；图中的回路只回到“任务卡”重审，不将旧观察或计划文本写成完成状态。

## 图文一致性

- 正文 Mermaid 块与 `.mmd` 图源通过 `cmp` 一致性检查。
- “仅当输出、资源与验收独立”标记限定了文档草稿的并行候选；它不是调度或性能承诺。
- `requires_approval` 仅通向“交给环境与人工批准”；图中没有外部 Tool 调用、认证请求、文件写入或运行成功节点。
- “运行验证候选”明确仍须经过后续 Tool 与 Workflow 设计；它不是已运行测试或结果验证。
- 正文提供 SVG、PNG 与完整替代描述。图示只代表本书工程模型，不表示供应商产品实现、真实权限链路或 API 测试行为。

## 未验证范围

本次只验证 Mermaid 渲染、视觉可读性和本书图文一致性；不验证 Planner、并行调度、OpenAI Agents SDK、Anthropic 工作流、认证协议、API、测试环境、Tool、Sandbox、身份、批准、权限、模型调用或任何外部动作的真实行为。
