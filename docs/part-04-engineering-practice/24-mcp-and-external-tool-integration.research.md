---
title: "第 24 章 Research Brief：MCP 与外部工具集成"
chapter: "24"
status: "research-complete"
updated_at: "2026-07-16"
references:
  - "CH24-REF-01"
  - "CH24-REF-02"
---

# 第 24 章 Research Brief：MCP 与外部工具集成

## 要解决的读者问题

读者已经理解工具调用、环境和权限，却仍可能把“已经连上 MCP Server”“工具列在列表里”“工具返回 JSON”误写成“可以安全执行”“效果已经发生”。本章要给出接入外部工具时的工程分层：发现到的是能力描述，准入决定的是本次任务能否请求，调用结果只是观察，业务效果还需要独立验证。

## 可归因资料与边界

| 本地键 | 来源 | 可使用的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- |
| CH24-REF-01 | [MCP Tools（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) | MCP Tools 规范描述 `tools/list`、`tools/call`、工具定义、输入 schema、工具结果、错误与 annotations 的协议面；工具 annotations 默认不应被视为可信。 | 不把任何字段、传输、实现、权限或结果语义写成所有 MCP Server 的默认行为。 |
| CH24-REF-02 | [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | MCP 安全资料讨论本地 Server、OAuth URL、SSRF、scope 最小化与用户同意等风险；具体要求依赖实现和部署角色。 | 不把风险清单写成已实施防护、合规结论或本章示例已连接外部系统的证据。 |

正式映射由主线程登记：`CH24-REF-01` → `REF-036`，`CH24-REF-02` → `REF-086`。

## 本章原创工程模型

- **Server Profile**：记录候选 Server 的来源、传输、所有者、允许目标、刷新条件和未确认事项；不是连接配置或信任授予。
- **Tool Admission Record**：把某个工具在某个任务、环境和批准范围内的请求条件写清；不是调用请求或权限令牌。
- **Invocation Envelope**：关联工具名、输入摘要、效果类别、批准引用和观察计划；不表示已发送。
- **Result Observation**：把结果、错误、来源、时间和效果未知项绑定到本次调用；不等同于业务验收。

## 写作与验证边界

- 正文不提供可复制的凭证、远程端点、账户、scope、客户端 ID 或真实 Server 配置。
- 纯内存示例只评估注入对象是否满足接入门；不会连接 MCP、运行进程、打开 URL、读取文件、发出网络请求或调用模型。
- “工具 annotations 不可信”只能作为协议资料的限定提醒；本书的准入字段和人工审核规则均为原创工程模型。
- 未来如需写入某个 Client 或 Server 的实际安装、授权或传输行为，必须在写作当天重新读取其官方资料并完成对应环境验证。

## 计划交付

1. 原创章节正文：能力、信任、批准、调用、观察和业务验收的分层。
2. Mermaid 图：从候选 Server 到独立效果验证的保守路径。
3. 纯内存 `assessMcpIntegrationAdmission` 示例与 Node 内置测试。
4. Fact Check、审查记录和可回溯候选资料。
