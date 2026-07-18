---
title: "第 24 章示例计划：MCP 接入准入评估"
chapter: "24"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 24 章示例计划：MCP 接入准入评估

## 目的

`assessMcpIntegrationAdmission` 是一个纯内存教学函数。它回答“给定的接入描述是否足以进入下一步人工审核或受控调用准备”，并不连接、发现、安装、启动、认证或调用 MCP Server。

## 输入与输出

| 输入字段 | 用途 | 不代表 |
| --- | --- | --- |
| `serverProfile` | Server 来源、所有者、传输和允许目标的声明。 | 已安装、可信或可达的 Server。 |
| `toolRequest` | 工具、效果类别、任务范围和输入摘要。 | 已调用、已授权或参数正确。 |
| `environment` | 允许目标和可请求 scope 的教学快照。 | 实际 sandbox 或源系统权限。 |
| `approval` | 写入或高风险效果的人工决定。 | 数字签名、token 或真实授权。 |
| `observationPlan` | 调用后要读取的证据和独立验证条件。 | 已经观察到外部效果。 |

输出为 `ready`、`requires_human_review` 或 `blocked`，并包含结构化原因与 `executionPerformed: false`。

## 测试矩阵

| 路径 | 输入特征 | 预期 |
| --- | --- | --- |
| 只读完整接入 | 明确来源、允许目标、scope 与观察计划。 | `ready`。 |
| 写入缺批准 | `effectClass: write`，没有匹配决定。 | `requires_human_review`。 |
| 未知来源 | `sourceVerified: false`。 | `blocked`。 |
| 缺观察计划 | 没有后续验证要求。 | `blocked`。 |
| scope 超出环境 | 请求 scope 不在教学 allowlist。 | `blocked`。 |
| annotations 不可信 | 标记 untrusted annotation。 | `requires_human_review`。 |
| 效果未知 | 计划无法说明如何验证效果。 | `blocked`。 |
| 未知效果类别 | 不在只读/写入/高风险范围内。 | `blocked`。 |

## 执行记录

- 红灯：在模块不存在时运行 Node 内置测试，预期得到 `ERR_MODULE_NOT_FOUND`。
- 绿灯：实现后运行 `node --test examples/agent/mcp-integration-admission-assessment.test.mjs`。
- 演示：运行 `node examples/agent/mcp-integration-admission-assessment.mjs`。

## 边界

示例没有访问真实 MCP、JSON-RPC、Server、网络、文件、进程、凭证、浏览器或模型；它也不验证输入 schema、授权、远端返回值或业务效果。
