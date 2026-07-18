---
title: "第 26 章 Example Integration：任务隔离预检"
chapter: "26"
review: "example-integration"
status: "completed"
updated_at: "2026-07-16"
---

# 第 26 章 Example Integration：任务隔离预检

## 红灯

先创建 `examples/agent/task-isolation-assessment.test.mjs`，不创建目标模块；随后实际运行：

```bash
node --test examples/agent/task-isolation-assessment.test.mjs
```

退出码为 `1`，Node 报告 `ERR_MODULE_NOT_FOUND`，缺失模块为 `examples/agent/task-isolation-assessment.mjs`。该结果只证明测试先于模块存在。

## 实现与绿灯

实现 `assessTaskIsolation` 后，使用相同命令实际运行：

```text
tests 10
pass 10
fail 0
```

覆盖完整专属任务、owner/验收/停止条件缺失、异 owner 路径重叠、同 owner 续接、共享写入路由、integration owner 缺失、共享路径误称专属和非契约输入。

## 演示

实际运行：

```bash
node examples/agent/task-isolation-assessment.mjs
```

实际输出：

```json
{"status":"ready","route":"isolated_task","reasons":[],"isolatedPaths":["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"]}
```

## 边界

函数只处理调用者注入对象。它没有创建或验证真实 Agent、并发进程、worktree、文件锁、浏览器会话、消息、Git、文件、网络、凭证、共享状态写入或外部效果。
