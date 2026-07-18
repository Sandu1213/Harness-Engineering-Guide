---
title: "第 28 章事实核验：从零搭建最小 Harness"
chapter: "28"
status: "completed"
updated_at: "2026-07-16"
---

# 第 28 章事实核验：从零搭建最小 Harness

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | Weng 将 Harness 描述为围绕基础模型、组织执行、规划、Tool、上下文、工件与评估的系统。 | CH28-REF-01，2026-07-16 读取文章定义段。 | 可使用；不归因本书字段或示例。 |
| FC-02 | 本章测试使用 `node:test`，并以 `node --test` 执行。 | CH28-REF-02，2026-07-16 读取 Node 官方 Test runner；本机实际运行 Node v24.16.0。 | 可使用；命令执行结果另列 FC-05。 |
| FC-03 | NIST AI RMF Core 不把行动定义为固定顺序的清单。 | CH28-REF-03，2026-07-16 读取 Core 页面第 5 节；页面提示 v1.0 正在修订。 | 可作为“不要把本章字段当合规清单”的限定提醒。 |

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-01 | Task Contract、Tool Request、Evidence Plan、Stop Conditions 与 Admission Decision 是本书为教学设计的五类工件。 | 不称为行业 schema、Node 标准、NIST 控制项或任何产品 API。 |
| EM-02 | `ready` 表示可进入内存求值；`stopped` 表示拒绝继续。 | 两者都不等于 Tool 已执行、外部状态改变或任务完成。 |
| EM-03 | `effect: 'none'` 且 `target: 'in-memory'` 是本章的受限准入条件。 | 不声称真实世界能以该字段获得安全性或授权。 |
| EM-04 | 三个显式 `stop` 条件用于避免输入不足时默认继续。 | 不替代恢复策略、审批、审计、异常处理或人工责任。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-04 | `node --test examples/agent/minimal-harness-admission-assessment.test.mjs`（实现前） | 退出失败，`ERR_MODULE_NOT_FOUND`，因为被测模块尚未创建。 | 红灯确实在实现前出现；不代表任何真实 Harness 失败。 |
| FC-05 | `node --test examples/agent/minimal-harness-admission-assessment.test.mjs`（实现后） | 7 项通过、0 项失败。 | 该纯函数按测试构造的对象返回指定准入或停止分类。 |
| FC-06 | `node examples/agent/minimal-harness-admission-assessment.mjs` | 输出 `ready`、`minimal_harness_ready`、`run_in_memory_evaluator` 与 `executionPerformed: false`。 | 演示对象满足本书最小准入条件；没有 Tool 被执行。 |

## 明确未核验或不覆盖的范围

- 未创建、调用或测试真实模型、Agent、Prompt、MCP、SDK、CLI、Hook、Plugin、浏览器、文件、网络、数据库、队列、沙箱、凭证或审批系统。
- 未验证性能、并发、超时、重试、恢复、持久化、访问控制、审计、合规、成本、模型质量、分类正确性或外部副作用。
- 本地 CH28 引用尚待主线程登记为全局 `REF-NNN`；在此之前不伪造正式编号。
