---
title: "第 24 章事实核验清单：MCP 与外部工具集成"
chapter: "24"
status: "complete"
updated_at: "2026-07-16"
---

# 第 24 章事实核验清单：MCP 与外部工具集成

| 来源 | 核验的限定陈述 | 已采取的写作限制 |
| --- | --- | --- |
| CH24-REF-01 / REF-036 | MCP Tools 规范包含工具发现、调用、输入 schema、结果/错误与 annotations 等协议面，且 annotations 默认不应被视为可信。 | 正文不声称任何具体 Server、工具名、参数、客户端或 annotations 已可信、已授权或已运行。 |
| CH24-REF-02 / REF-086 | MCP 安全资料讨论本地 Server、OAuth URL、SSRF、scope 最小化、同意和传输等风险与缓解方向。 | 正文只用作风险背景；不把“应当”写成本章已实施的安全控制、合规承诺或平台默认行为。 |

## 事实与原创模型分离

| 内容 | 分类 | 写法要求 |
| --- | --- | --- |
| `tools/list`、`tools/call`、输入 schema、结果/错误 | 协议资料 | 用“规范描述”“某个实现仍需核验”限定。 |
| Server Profile、Tool Admission Record、Invocation Envelope、Result Observation | 本书工程模型 | 明确为本书模型，不引用为协议字段或配置格式。 |
| 书稿助手同步参考资料 | 教学场景 | 使用假设语气，说明没有连接任何 Server。 |
| 纯内存测试结果 | 本地可复现验证 | 仅声明 Node 函数对注入对象的判断；不代表 MCP、权限或外部效果。 |

## 动态复核与未覆盖范围

- MCP 的规范版本、传输、授权扩展、SDK 和 Client 行为会变化；未来修订必须重新访问对应官方页面。
- 本章没有创建或运行任何 MCP Server/Client、stdio/HTTP 传输、OAuth 流、浏览器、文件、网络、凭证或外部工具。
- 未验证信息必须保留为 `TODO(verify):`，不能因 schema、文档或示例存在而包装为已完成集成。

## 完成检查

- [x] 每个产品或协议事实都能回到官方原始来源。
- [x] 外部能力、授权、调用、观察和效果验证分别陈述。
- [x] 教学模型、案例与纯内存示例没有伪装成真实集成。
- [x] 动态资料的未来复核条件已记录。
