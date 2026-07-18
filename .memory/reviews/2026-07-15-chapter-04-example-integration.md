---
title: "第 4 章示例整合记录"
chapter: "04"
review_type: "example-implementation"
status: "completed"
updated_at: "2026-07-15"
---

# 第 4 章示例整合记录

## 范围

- 实现：`examples/agent/controlled-config-change.mjs`
- 测试：`examples/agent/controlled-config-change.test.mjs`
- 说明：`examples/agent/README.md`、`04-reliable-agent-engineering-principles.example-plan.md` 与第 4 章正文。

示例只检查注入的内存快照。它不读取或写入文件、不访问网络、进程、环境变量、账户、凭证或真实审批系统；`execution` 只是测试输入，不是工具调用或真实配置写入。

## 红灯基线

2026-07-15 在实现前执行：

```bash
node --test examples/agent/controlled-config-change.test.mjs
```

命令以退出码 1 失败，原因为 `ERR_MODULE_NOT_FOUND`：测试导入的 `examples/agent/controlled-config-change.mjs` 尚不存在。这证明新测试在实现前无法通过，而不是测试框架或断言失效。

## 概念映射

| 章节原则 | 实现证据 | 验收边界 |
| --- | --- | --- |
| 可观察目标与范围 | `proposal.key`、`proposal.scope`、`policy.allowedKeys` 与 `policy.allowedScopes`。 | 只检查内存 allowlist，不代表真实 RBAC 或 Sandbox。 |
| 预检 | 允许键、允许范围和变更前快照在执行结果前检查。 | 不读取真实配置或路径。 |
| 验证闭环 | `execution.observedValue` 必须与 `proposal.expectedValue` 匹配。 | 只验证测试注入的观察值，不证明业务验收完整。 |
| 恢复路径 | 验证失败返回 `restore_before_snapshot` 与变更前值。 | 返回建议，不执行回滚。 |
| 人工升级 | 不可逆动作或策略要求批准但未获批准时返回 `escalated`。 | 不发送审批请求或记录真实身份。 |

## 实际运行

2026-07-15 在仓库根目录实际执行：

```bash
npm run test:controlled-config-change
npm run example:controlled-config-change
```

- `npm run test:controlled-config-change`：5 项 Node 内置测试全部通过，分别覆盖受控成功、预检拒绝、验证失败、高风险升级和执行拒绝。
- `npm run example:controlled-config-change`：输出 `state: "succeeded"`、`phase: "verified"`、变更前值 `trial`、观察值 `standard`、两项证据和四项事件。

## 不覆盖的能力

- 真实文件解析、备份、原子写入、路径安全、权限执行、Git 回滚、远程部署或 Canary 流量。
- 真实审批、用户身份、通知、审计留存和组织责任分配。
- 模型调用、Agent 规划、并发、重试策略、生产验证或业务 SLA。

## 全仓校验

本记录创建后，2026-07-15 实际执行：

```bash
npm run validate
git diff --check
```

- `npm run validate`：Markdown lint 检查 112 个文件、0 个错误；链接检查通过；四组示例共 18 项 Node 内置测试通过；状态检查当时为第 1、2、3 章完成、第 4 章进行中、43 章未开始。
- `git diff --check`：无输出，退出码 0。

后续 Diagram Review、Language Editing 与 Final Review 仍需在实际完成时单独复验，不以本次示例结果替代。
