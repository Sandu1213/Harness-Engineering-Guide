---
title: "第 1 章事实核验记录"
chapter: "01"
review_type: "fact-check"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 1 章事实核验记录

## 范围

- 正文：`docs/part-01-foundations/01-prompt-to-harness.md`
- 陈述清单：`01-prompt-to-harness.fact-check.md`
- 候选资料与全局登记：`01-prompt-to-harness.references.md`、`.ai/references.md`
- 本仓库执行事实：`npm run test:harness`、`npm run example:harness`

## 结论

**通过。** 本次重新访问 REF-001 至 REF-004 的原始 URL，并逐项限制正文归因范围。五组件模型、图示、案例和“Prompt 不保证外部任务完成”的判断继续标注为本书工程模型或推论，不被写成来源或产品标准。

## 来源核验结果

| ID | 本次直接核验的内容 | 正文使用范围 | 结论 |
| --- | --- | --- | --- |
| REF-001 | 原始页面标题、2026-07-04 日期及 Harness 对执行、规划、工具、上下文、工件与评估的工作性描述。 | 仅归因 Harness 的来源背景。 | 通过。 |
| REF-002 | 原始页面标题、2023-03-15 日期及不更新模型权重时用输入引导行为的定义。 | 仅归因 Prompt Engineering 的背景定义。 | 通过。 |
| REF-003 | 原始页面标题、2023-06-23 日期及 Planning、Memory、Tool use 的系统概览。 | 仅作一种历史性组织方式。 | 通过。 |
| REF-004 | arXiv 摘要中交错推理轨迹与任务动作、动作连接外部来源；版本历史中的 v3 日期 2023-03-10。 | 仅说明论文研究对象，不使用性能数字。 | 通过；修正参考资料日期。 |

## 本仓库执行事实

2026-07-15 在仓库根目录实际执行：

```bash
npm run test:harness
npm run example:harness
```

- 前者的 4 项 Node 内置测试全部通过。
- 后者输出 `state: "succeeded"`、`output: "VERIFY STATE"`、`evidence: "validator accepted tool output"` 与 `planned`、`tool_called`、`validated` 事件。

这些结果只证明示例的确定性控制流，不证明模型能力、真实权限、安全性或生产可靠性。

## 修正

- 将正文 ReAct 参考资料从 `2023-03-13` 改为本次 arXiv 摘要页版本历史可直接追溯的 `v3（2023-03-10）`。
- 更新候选资料状态，使其反映本次正文级 Fact Check，而不是较早的准备阶段核验。

## 未覆盖阶段

- Language Editing：尚未逐段按风格指南编辑。
- Final Review：尚未执行跨工件完成定义审查。
