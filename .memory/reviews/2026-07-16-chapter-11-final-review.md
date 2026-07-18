---
chapter: "11-tool-use-and-tool-protocols"
stage: "Final Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 11 章 Final Review：Tool Use 与工具协议

## 复核范围

- 正文、Research Brief、候选资料、Outline、Fact Check、Example Plan 与技术、图示、语言审查记录。
- 纯内存 `assessToolInvocation` 实现、7 项 Node 内置测试和演示。
- Mermaid 源、正文图块与已导出的 SVG/PNG。

## 复核结论

- MCP Tools 草案、版本化 Schema、OpenAI Function Calling、Anthropic 工具定义与 JSON Schema 只在各自可追溯范围内引用；Tool Contract、调用记录、结果信封与效果不确定性是本书工程模型。
- `assessToolInvocation` 只判断注入的教学对象，不调用真实 Tool、MCP、SDK、文件、网络、权限或外部目标；测试与演示不能证明真实调用、批准、回读、验收或效果。
- 正文 Mermaid 块、图源和导出图保持一致；图只表达本书的候选、请求、结果、观察与验收判断链。

## 已执行的专用验证

```bash
npm run test:tool-invocation-assessment
npm run example:tool-invocation-assessment
```

实际结果：专用测试为 7 项通过、0 项失败；演示以退出码 `0` 输出受限的教学判断。此前 Mermaid CLI 11.16.0 已实际导出 SVG/PNG 并完成 PNG 视觉检查，正文图块与 `.mmd` 图源的 `diff -u` 无输出。

## 完成边界

本轮 Final Review 只确认仓库工件、引用边界、纯内存教学函数和图文一致性。它不实现或验证真实 Tool、MCP、SDK、权限、批准、人类决策、目标状态、外部副作用、审计或业务结果。全仓校验与空白差异检查的最新结果由 `CURRENT_STATE.md` 和交接文件统一记录。
