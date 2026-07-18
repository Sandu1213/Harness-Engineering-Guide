# 第 3 章 Example Implementation（2026-07-15）

## 范围

- **实现：** `examples/agent/context-recovery.mjs`
- **测试：** `examples/agent/context-recovery.test.mjs`
- **运行入口：** `npm run test:context-recovery`、`npm run example:context-recovery`
- **边界：** 纯内存快照；没有模型、网络、文件系统、进程、环境变量、Git、凭证、账户或密钥 I/O。

## 红灯基线

实现前运行 `node --test examples/agent/context-recovery.test.mjs`，退出失败。原因是 `context-recovery.mjs` 不存在，Node 报告 `ERR_MODULE_NOT_FOUND`。这是预期的功能缺失红灯，不是将语法错误当作测试失败。

## 绿灯结果

实现最小 `recoverTask` 后运行：

```bash
npm run test:context-recovery
npm run example:context-recovery
```

两条命令均退出 0。5 项 Node 内置测试覆盖：

1. Research 工件存在且状态/阶段表一致时，任务可领取。
2. Research 工件缺失时，返回 `blocked` / `missing_prerequisite`。
3. 当前状态不把 Outline 标为下一阶段时，返回 `blocked` / `state_conflict`。
4. 当前状态与阶段表对 Outline 阶段不一致时，返回 `blocked` / `state_conflict`。
5. 历史摘要声称完成但当前状态未完成时，返回 `blocked` / `state_conflict`。

演示入口输出 `state: "ready"`、`phase: "task_claimable"`、`task: "outline"`，以及 Research 工件存在、状态与阶段表一致的两项证据。

## 验收边界

测试和演示只证明注入对象的确定性预检规则。它们不证明真实仓库文件存在或一致，不调用或模拟 Codex / Claude Code 的指令发现，不提供权限、Sandbox、审计、并发、Git 历史、外部状态或人类审批保证。
