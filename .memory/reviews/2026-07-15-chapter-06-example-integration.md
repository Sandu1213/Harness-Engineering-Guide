---
title: "第 6 章 Example Implementation"
chapter: "06"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 6 章 Example Implementation

## 范围

实现 `examples/agent/context-packet.mjs` 的纯内存 `buildContextPacket`，以及 `context-packet.test.mjs`、npm scripts 和总校验入口。它只处理测试注入的对象，不读取或写入真实仓库、文件、环境变量、时钟、网络、模型、检索、缓存、向量数据库、工具、凭证或会话。

## 红灯

先运行：

```bash
node --test examples/agent/context-packet.test.mjs
```

实现模块不存在，Node 报告 `ERR_MODULE_NOT_FOUND`，1 个测试文件失败。这证明测试没有在目标模块缺失时误报通过。

## 绿灯与演示

随后实际运行：

```bash
npm run test:context-packet
npm run example:context-packet
```

5 项 Node 内置测试全部通过，分别覆盖直接证据优先、过期直接证据触发刷新、超预算引用指针化、缺少来源阻塞、历史摘要与当前直接证据冲突时刷新。演示输出 `ready` / `assembled`，其中 `failure-output` 被选中，`large-ci-log` 被记录为按需引用，抽象预算为 3 / 8。

## 边界

测试和演示只证明本书定义的确定性纯函数契约；它们不证明真实资料相关、来源可信、模型已看见输入、检索能够返回资料、缓存命中、权限有效、测试已运行、根因已找到或任务已完成。
