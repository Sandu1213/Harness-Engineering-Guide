---
title: "第 1 章示例整合记录"
chapter: "01"
review_type: "example-implementation"
status: "completed"
updated_at: "2026-07-15"
---

# 第 1 章示例整合记录

## 范围

- 实现：`examples/agent/minimal-harness.mjs`
- 测试：`examples/agent/minimal-harness.test.mjs`
- 说明：`examples/agent/README.md`、`01-prompt-to-harness.example-plan.md` 与第 1 章正文。

该示例在内存中执行确定性的字符串转换，不访问模型、网络、文件系统、环境变量、账户或真实密钥。

## 概念映射

| 章节责任 | 实现证据 | 验收边界 |
| --- | --- | --- |
| 指令 | `instruction` 作为非空输入被保留在结果中。 | 只检查最小输入合法性，不解释复杂自然语言。 |
| 工具 | `tool(task)` 返回结构化成功或失败结果。 | 不调用真实工具，不代表权限设计。 |
| 状态 | `state` 与 `events` 区分接受、工具失败、验证失败。 | 不支持持久化、恢复或并发。 |
| 验证 | `validate(result) === true` 是唯一成功入口。 | 不证明验证条件在真实业务中充分。 |
| 证据 | `evidence` 与 `failure` 解释终态。 | 不是审计日志或合规记录。 |

## 要求的运行

```bash
npm run test:harness
npm run example:harness
```

成功条件：四项测试通过；演示输出为 `state: "succeeded"`、`validator accepted tool output` 和 `planned`、`tool_called`、`validated` 三项事件。

## 执行结果

2026-07-15 在仓库根目录实际执行：

- `npm run test:harness`：4 项 Node 内置测试全部通过；覆盖验证接受、工具失败、验证拒绝与空指令不触发工具。
- `npm run example:harness`：输出 `state: "succeeded"`、`output: "VERIFY STATE"`、`evidence: "validator accepted tool output"` 和 `planned`、`tool_called`、`validated` 事件。

这些结果只证明本示例的确定性控制流；不扩大到本文件“不覆盖的能力”所列的任何结论。

## 不覆盖的能力

- 模型调用、模型质量与 Prompt 服从性。
- 文件、网络、浏览器、数据库或其他外部 I/O。
- 权限、Sandbox、持久化、重试、并发和人工审批。
- 生产级错误恢复、审计或合规。
