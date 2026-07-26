---
title: "第 24 章候选参考资料：MCP 与外部工具集成"
chapter: "24"
status: "registered"
updated_at: "2026-07-26"
---

# 第 24 章候选参考资料：MCP 与外部工具集成

| 本地键 | 正式键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| CH24-REF-01 | REF-036 | [MCP Tools（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) | 官方协议规范 | 2026-07-16 | `tools/list`、`tools/call`、工具定义、输入 schema、结果/错误和 annotations 的协议资料。 | 不把协议字段、工具 annotations、传输、Client/Server 行为或权限写成通用安全保证。 |
| CH24-REF-02 | REF-086 | [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | 官方安全资料 | 2026-07-16 | 本地 Server、OAuth URL、SSRF、scope 最小化、同意和传输边界的风险与缓解方向。 | 不把资料写成本章已落实的控制、真实部署、合规结论或完整威胁模型。 |
| CH24-REF-03 | REF-149 | [Zechner：What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) | 作者构建札记 | 2026-07-26 | 作者明确不在 pi 内置 MCP，并把 MCP Server 包装为 CLI 作为逃生路径的个人设计选择。 | 不外推为所有 MCP 集成都低效、长期产品保证、行业标准或本章实测行为。 |
| CH24-REF-04 | REF-150 | [Zechner：What if you don't need MCP at all?](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/) | 作者实测与观点文章 | 2026-07-26 | 作者当日环境中 MCP 工具定义与 CLI README 的 token 占用对比，以及 CLI 文档渐进披露、输出可落盘和可经管道传递。 | 不把特定工具数量和 token 数外推为其他 Server、版本、模型或长期结果。 |
| CH24-REF-05 | REF-151 | [Ronacher：Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/) | 作者观察文章 | 2026-07-26 | MCP 工具定义随会话上下文固化并与 prompt cache 热更新冲突的结构性批评。 | 不写成协议保证、所有 Client 的缓存行为、性能结论或 OpenClaw 实现细节。 |

## 使用规则

- 通过 CH24-REF-01 说明协议能力时，必须紧接着写明“发现或描述工具不等于授权、调用和效果验证”。
- 通过 CH24-REF-02 说明风险时，必须写明具体部署、Client、Server 和源系统仍需要独立设计与验证。
- Server Profile、Tool Admission Record、Invocation Envelope、Result Observation 和本章示例均为本书原创工程模型。
- 已于 2026-07-26 通读 REF-149、REF-150、REF-151；新增小节保留作者主语、特定环境数字与动态版本边界。
