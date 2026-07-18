---
title: "第 2 章示例整合记录"
chapter: "02"
review_type: "example-implementation"
status: "completed"
updated_at: "2026-07-15"
---

# 第 2 章示例整合记录

## 范围

- 实现：`examples/agent/runtime-boundaries.mjs`
- 测试：`examples/agent/runtime-boundaries.test.mjs`
- 说明：`examples/agent/README.md`、`02-agent-harness-runtime.example-plan.md` 与第 2 章正文。

示例仅在内存中处理输入并调用由测试或演示注入的函数。它不访问模型、网络、文件系统、进程、环境变量、账户或真实密钥；因此不表示任何真实 Sandbox 或权限系统的行为。

## 红灯基线

2026-07-15 在实现前执行：

```bash
node --test examples/agent/runtime-boundaries.test.mjs
```

命令以退出码 1 失败，原因是 `ERR_MODULE_NOT_FOUND`：测试所导入的 `examples/agent/runtime-boundaries.mjs` 尚不存在。这证明新测试在实现前不能通过，并非因断言或测试工具配置失效。

## 概念映射

| 章节责任 | 实现证据 | 验收边界 |
| --- | --- | --- |
| Harness 约束 | `allowedPaths` 在 Runtime 前检查。 | 前缀规则只是教学约束，不是完整路径安全模型。 |
| 执行请求 | `runtime.write(candidate)` 只在候选通过后运行。 | Runtime 是注入函数，不执行真实副作用。 |
| 环境结果 | `ok`、`observedContent` 与 `error`。 | `permission denied` 是模拟错误，不代表真实授权结果。 |
| 验证 | `validate({ path, observedContent })`。 | 只检查测试给定的验收条件，不代表业务验证充分。 |
| 证据 | `state`、`phase`、`events`、`evidence` 和 `failure`。 | 不是持久化审计日志。 |

## 要求的运行

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
```

成功条件：四项测试覆盖候选拒绝、Runtime 拒绝、验证拒绝和验证接受；演示入口输出 `succeeded` / `validated`、`boundary verified`、接受证据和完整事件序列。

## 执行结果

2026-07-15 在仓库根目录实际执行：

- `node --test examples/agent/runtime-boundaries.test.mjs`：4 项 Node 内置测试全部通过。候选越界时 Runtime 未被调用；Runtime 拒绝时验证器未被调用；验证拒绝和接受各自保留独立终态。
- `npm run example:runtime-boundaries`：输出 `state: "succeeded"`、`phase: "validated"`、`observation: "boundary verified"`、`evidence: "validator accepted runtime observation"`，事件为 `candidate_received`、`execution_requested`、`observation_received`、`validated`。

全仓 `npm run validate` 同日实际通过：85 个 Markdown 文件 lint 为 0 错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查均通过；`git diff --check` 无输出。只有这些实际命令输出支撑本阶段的运行结论。

## 不覆盖的能力

- 模型调用、Agent 规划、模型质量与 Prompt 服从性。
- 真实文件、网络、浏览器、数据库、进程或其他外部 I/O。
- 实际权限、Sandbox、凭证、审计、人工审批、持久化、重试或并发。
- 生产级错误恢复、路径安全策略或合规保证。
