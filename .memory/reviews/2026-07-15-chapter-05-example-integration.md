---
title: "第 5 章示例实现记录：指令装配预检"
chapter: "05"
review_type: "example-integration"
status: "implemented-and-verified"
reviewed_at: "2026-07-15"
---

# 第 5 章示例实现记录：指令装配预检

## 实现范围

- 实现：`examples/agent/instruction-packet.mjs` 中的 `assembleInstructionPacket(packet)`。
- 测试：`examples/agent/instruction-packet.test.mjs` 的五条 Node 内置测试。
- 入口：`npm run test:instruction-packet` 与 `npm run example:instruction-packet`；总校验已接入该测试。
- 边界：仅处理测试注入的内存对象；不调用模型、文件系统、网络、进程、环境变量、账户、凭证、工具、Sandbox 或真实项目指令文件。

## 红灯与绿灯

1. 2026-07-15：先运行 `node --test examples/agent/instruction-packet.test.mjs`。由于 `instruction-packet.mjs` 尚不存在，测试以 `ERR_MODULE_NOT_FOUND` 失败；该失败是预期的红灯基线。
2. 实现最小纯函数后，运行 `npm run test:instruction-packet`，5 项测试全部通过：正常装配、数据保持数据身份、范围冲突、输出契约缺失、未知冲突策略。
3. 运行 `npm run example:instruction-packet`，接受路径输出 `state: "ready"`、`phase: "assembled"`、四类组件、四项来源记录、空冲突列表与三项证据。

## 已验证的行为

- 数据文本无论包含何种指令样式内容，都保留在 `contextData`，不会被函数移动为项目规则。
- 范围不匹配、输出契约缺失和未知冲突都返回 `blocked`，并包含冲突、证据或未决项；函数不会生成待执行请求。
- 示例不实现任何模型指令权威、产品消息角色、Prompt injection 防护、权限决策或真实业务验证。它只验证本书教学模型的确定性对象转换。

## 未验证范围

- 本记录不证明 Codex、Claude Code、OpenAI、Gemini 或 Anthropic 的实际指令加载、消息优先级、结构化输出或安全行为。
- 本记录不替代第 5 章 Diagram Review、Language Editing、Final Review 或本书的真实工具协议、安全与评估章节。
