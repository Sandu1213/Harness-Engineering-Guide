---
title: "第 24 章候选参考资料：MCP 与外部工具集成"
chapter: "24"
status: "registered"
updated_at: "2026-07-16"
---

# 第 24 章候选参考资料：MCP 与外部工具集成

| 本地键 | 正式键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| CH24-REF-01 | REF-036 | [MCP Tools（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) | 官方协议规范 | 2026-07-16 | `tools/list`、`tools/call`、工具定义、输入 schema、结果/错误和 annotations 的协议资料。 | 不把协议字段、工具 annotations、传输、Client/Server 行为或权限写成通用安全保证。 |
| CH24-REF-02 | REF-086 | [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | 官方安全资料 | 2026-07-16 | 本地 Server、OAuth URL、SSRF、scope 最小化、同意和传输边界的风险与缓解方向。 | 不把资料写成本章已落实的控制、真实部署、合规结论或完整威胁模型。 |

## 使用规则

- 通过 CH24-REF-01 说明协议能力时，必须紧接着写明“发现或描述工具不等于授权、调用和效果验证”。
- 通过 CH24-REF-02 说明风险时，必须写明具体部署、Client、Server 和源系统仍需要独立设计与验证。
- Server Profile、Tool Admission Record、Invocation Envelope、Result Observation 和本章示例均为本书原创工程模型。
