---
title: "第 11 章示例计划：工具调用准入判断"
chapter: "11-tool-use-and-tool-protocols"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 11 章示例计划：工具调用准入判断

## 读者问题

模型已经给出工具名称和参数后，Harness 应如何在**不执行工具**的前提下，区分未知工具、参数形状不合格、缺少批准、关联冲突、效果未知和可进入下一步的候选？

## 目标与非目标

本示例计划实现纯内存函数 `assessToolInvocation`。它只对测试注入的 Tool Contract、Invocation Request、环境摘要、批准摘要和可选 Invocation Record 返回教学判断。

它不：

- 调用 MCP、SDK、模型、网络、文件、Git、浏览器、数据库、队列、环境变量、凭证或真实权限系统；
- 解析或执行 JSON Schema，也不发现或注册真实工具；
- 授予权限、创建批准、发送请求、写入目标、重新观察或验证真实外部状态；
- 把 `allowed`、`succeeded` 或 `effect_unknown` 写成任务验收、授权或外部效果事实。

## 环境与运行命令

- 环境：仓库根目录、已安装依赖的 Node.js；只使用 Node 内置的 `node:test` 和 `node:assert/strict`。
- 实现：`examples/agent/tool-invocation-assessment.mjs`。
- 测试：`examples/agent/tool-invocation-assessment.test.mjs`。
- 运行：`npm run test:tool-invocation-assessment` 与 `npm run example:tool-invocation-assessment`。
- 全仓验证：`npm run validate`。

## 教学接口

```js
assessToolInvocation({
  contract: {
    version: 'chapter-11-v1',
    tools: [
      {
        name: 'document_read_metadata',
        version: 'v1',
        effectClass: 'read_only',
        requiredArguments: ['documentId'],
      },
    ],
  },
  request: {
    correlationId: 'request-1',
    tool: { name: 'document_read_metadata', version: 'v1' },
    arguments: { documentId: 'chapter-11' },
  },
  environment: { status: 'ready' },
  approval: { status: 'active', scope: 'metadata_write' },
  invocationRecord: {
    correlationId: 'request-1',
    status: 'succeeded',
    verificationStatus: 'accepted',
  },
})
```

`requiredArguments` 只是教学用的最小字段清单，不是 JSON Schema 实现。`environment`、`approval` 与 `invocationRecord` 都是调用方注入的快照；函数不检查真实时间、权限、系统状态或工具输出。

返回值固定包含 `status`、`code` 与 `correlationId`。当参数形状不合格时，额外返回 `missingArguments`；当效果未知时，额外返回 `effectStatus`。这些字段是本书模型，不是 MCP、OpenAI、Anthropic 或 JSON Schema 的字段定义。

## 判断顺序

| 顺序 | 条件 | 教学输出 | 不能推导 |
| --- | --- | --- | --- |
| 1 | Contract 中没有同名工具或版本不匹配 | `rejected` / `unknown_tool` 或 `tool_version_mismatch` | 真实注册表已查询 |
| 2 | Invocation Record 的关联标识与请求不同 | `blocked` / `correlation_conflict` | 外部系统未收到任何请求 |
| 3 | 必填参数缺失、为空或非字符串 | `rejected` / `invalid_arguments` | 某个 Schema 校验器已运行 |
| 4 | 环境摘要不是 `ready` | `blocked` / `environment_not_ready` | 真实环境或权限状态 |
| 5 | 已有记录为超时且效果仍未知 | `effect_unknown` / `timed_out_without_readback` | 可以安全重试，或目标一定未变 |
| 6 | 已有成功类记录但未有接受的验证状态 | `needs_evidence` / `tool_result_not_verified` | 任务已完成 |
| 7 | 写入类工具没有有效的范围匹配批准快照 | `requires_approval` / 对应批准代码 | 批准已获授或写入已发生 |
| 8 | 其余已知、参数齐备、环境可用的候选 | `allowed` / `admission_allowed` | 工具已执行、效果已发生或任务已验收 |

## 测试矩阵

| 路径 | 注入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 未知工具 | Contract 不含请求的名称 | `rejected` / `unknown_tool` | 真实工具发现 |
| 参数形状不合格 | 缺少 `documentId` | `rejected` / `invalid_arguments` | Schema 引擎运行 |
| 已知只读候选 | 已知工具、完整参数、`ready` 环境 | `allowed` / `admission_allowed` | 真实读取已获准或执行 |
| 写入缺批准 | 可逆写入、缺批准快照 | `requires_approval` / `approval_missing` | 真实批准流程 |
| 关联冲突 | 请求与记录的关联标识不同 | `blocked` / `correlation_conflict` | 外部状态未变化 |
| 超时且无回读 | `timed_out` 与 `effectStatus: 'unknown'` | `effect_unknown` / `timed_out_without_readback` | 安全重试 |
| 工具成功但未验证 | 成功类记录、`verificationStatus: 'not_run'` | `needs_evidence` / `tool_result_not_verified` | 任务或外部效果已接受 |

## 红绿步骤与完成条件

1. 已先创建测试文件并导入尚不存在的模块；`node --test examples/agent/tool-invocation-assessment.test.mjs` 实际以退出码 `1` 和 `ERR_MODULE_NOT_FOUND` 结束，证明测试先于实现模块存在。
2. 已实现最小纯函数、npm 脚本与演示入口，且没有新增依赖。
3. 已实际运行专用测试与演示：7 项 Node 内置测试通过、0 项失败；演示输出 `allowed` / `admission_allowed`。
4. 已更新正文、`examples/agent/README.md`、状态文件、进度表和示例整合记录。
5. `npm run validate` 与 `git diff --check` 的真实结果记录在示例整合审查中；其通过只证明仓库工件和教学函数，不证明真实 Tool、权限、批准、外部效果或验收。

## 可选增强与触发条件

- 只有需要明确版本的 JSON Schema 校验时，才接入已声明的校验器；届时必须记录版本和实际命令。
- 只有需要审查真实工具调用时，才由第 12、14、15、17、18、24、25 章分别补充环境、批准、观察、验收、恢复和集成证据。
