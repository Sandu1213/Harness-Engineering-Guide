---
title: "第 26 章 Example Plan：任务隔离预检"
chapter: "26"
status: "implemented-and-verified"
updated_at: "2026-07-16"
---

# 第 26 章 Example Plan：任务隔离预检

## 目的与边界

`assessTaskIsolation` 是一个纯内存教学函数。它以调用者传入的 Task Contract、现有 Ownership Claim 和 Integration Contract 判断局部任务是否可进入隔离工作，或是否必须停止、转给集成者。

它**不会**创建或观察真实 Agent、子进程、并行调度、worktree、文件锁、消息队列、浏览器会话、文件、网络、凭证、Git、CI 或外部效果。

## 输入契约

| 输入 | 最小字段 | 判断用途 |
| --- | --- | --- |
| `task` | `id`、`owner`、`exclusivePaths`、`acceptance`、`stopConditions`。 | 定义一个可领取的局部工作单元。 |
| `claims` | 每项有 `owner` 与 `exclusivePaths`。 | 查找其他 owner 的重叠输出面。 |
| `integration` | `owner`、`sharedArtifacts`。 | 指出共享写入由谁集中收口。 |

`requestedSharedWrites` 可选；存在时不会进入局部写入，而是返回 `requires_integration`。路径只是字符串，不会被读取、规范化为真实文件系统位置或建立锁。

## 输出契约

| 状态 | 路由 | 含义 | 不能说明 |
| --- | --- | --- | --- |
| `ready` | `isolated_task` | 教学输入具备 owner、专属输出、验收、停止条件且未发现异 owner 重叠。 | 真实任务已经启动或路径已隔离。 |
| `blocked` | `null` | 输入缺失、路径重叠、共享路径误称专属或集成者缺失。 | 人已裁决、冲突已修复或执行失败。 |
| `requires_integration` | `integration_owner` | 当前输入请求写共享工件，应交由集成者统一处理。 | 集成者已经写入或全仓校验已通过。 |
| `not_applicable` | `null` | 输入不是教学 Task Contract。 | 真实请求不重要或被拒绝。 |

## 红绿记录

先创建测试，再创建模块。2026-07-16 实际运行：

```bash
node --test examples/agent/task-isolation-assessment.test.mjs
```

模块尚不存在时，Node 以退出码 `1` 结束，错误为 `ERR_MODULE_NOT_FOUND`，缺失目标为 `examples/agent/task-isolation-assessment.mjs`。该红灯只证明测试文件先于模块存在。

实现后，使用相同命令实际运行：10 项 Node 内置测试通过、0 项失败。演示命令：

```bash
node examples/agent/task-isolation-assessment.mjs
```

实际输出为：

```json
{"status":"ready","route":"isolated_task","reasons":[],"isolatedPaths":["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"]}
```

这只证明函数在该注入对象上返回确定结构，不证明当前仓库、真实协作者或外部系统使用了同一契约。

## 测试矩阵

| 路径 | 输入变化 | 预期状态 | 预期原因或路由 |
| --- | --- | --- | --- |
| 受限局部工作 | 完整 owner、专属路径、验收、停止条件。 | `ready` | `isolated_task`。 |
| owner 缺失 | `owner` 为空。 | `blocked` | `task_owner_missing`。 |
| 验收缺失 | `acceptance` 为空。 | `blocked` | `acceptance_contract_missing`。 |
| 停止条件缺失 | `stopConditions` 为空。 | `blocked` | `stop_condition_missing`。 |
| 异 owner 重叠 | 已有 Claim 触及相同路径。 | `blocked` | `exclusive_path_already_claimed`。 |
| 同 owner 续接 | Claim 与 task owner 相同。 | `ready` | `isolated_task`。 |
| 共享写入请求 | 请求写已声明 shared artifact。 | `requires_integration` | `integration_owner`。 |
| 集成者缺失 | 共享写入但没有 integration owner。 | `blocked` | `integration_owner_missing`。 |
| 共享误称专属 | shared artifact 出现在 `exclusivePaths`。 | `blocked` | `shared_artifact_cannot_be_exclusive`。 |
| 非契约输入 | 传入 `kind: conversation`。 | `not_applicable` | `task_contract_not_provided`。 |

## 不覆盖范围

- 真正的并行安全还需要执行器、文件系统、版本控制、环境、身份、外部资源、重试与观察的独立设计。
- 字符串路径重叠不等价于语义冲突；两个不同文件仍可能共享术语、接口或同一外部目标。
- 交给集成者不等于该集成者拥有权限、已经批准写入或已接受结果。
