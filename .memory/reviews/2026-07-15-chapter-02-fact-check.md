---
title: "第 2 章事实核验记录"
chapter: "02"
review_type: "fact-check"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 2 章事实核验记录

## 范围

- 正文：`docs/part-01-foundations/02-agent-harness-runtime.md`
- 陈述清单：`02-agent-harness-runtime.fact-check.md`
- 候选资料与全局登记：`02-agent-harness-runtime.references.md`、`.ai/references.md`
- 本仓库执行事实：`npm run test:runtime-boundaries`、`npm run example:runtime-boundaries`

## 结论

**通过。** 本次重新读取 REF-001、REF-003 与 REF-004 的原始 URL，并保持其在正文中的归因范围。四层责任表、图示、案例、接口字段和运行边界示例均保留为本书工程模型、教学设计或确定性仓库执行结果，不被写成来源文章或真实产品行为。

## 来源核验结果

| ID | 本次直接核验的内容 | 正文使用范围 | 结论 |
| --- | --- | --- | --- |
| REF-001 | 原始页面标题、2026-07-04 日期及 Harness 对执行、规划、工具、上下文、工件与评估的工作性描述。 | 仅归因 Harness 的来源背景。 | 通过。 |
| REF-003 | 原始页面标题、2023-06-23 日期及 Planning、Memory、Tool use 的系统概览。 | 仅作一种系统概览。 | 通过。 |
| REF-004 | arXiv 摘要中交错推理轨迹与任务动作、动作连接外部来源。 | 仅说明研究对象和交互边界，不使用性能数字。 | 通过。 |

## 本仓库执行事实

2026-07-15 在仓库根目录实际执行：

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
```

- 前者的 4 项 Node 内置测试全部通过，覆盖候选拒绝、Runtime 拒绝、验证拒绝和验证接受。
- 后者输出 `state: "succeeded"`、`phase: "validated"`、`observation: "boundary verified"`、接受证据和四项事件。
- `npm run validate`：89 个 Markdown 文件 lint 为 0 错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查均通过；`git diff --check` 无输出。

这些结果只证明纯内存示例的确定性控制流；不证明真实 Sandbox、权限、网络、文件系统、模型能力或生产可靠性。

## 未覆盖阶段

- Language Editing：尚未逐段按风格指南编辑。
- Final Review：尚未执行跨工件完成定义审查。
