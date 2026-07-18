---
title: "第 28 章参考资料：从零搭建最小 Harness"
chapter: "28"
status: "registered"
updated_at: "2026-07-16"
---

# 第 28 章参考资料：从零搭建最小 Harness

> 本章保留本地 `CH28-REF-*` 键以追溯并行写作阶段；正式映射已登记：`CH28-REF-01` → `REF-001`、`CH28-REF-02` → `REF-090`、`CH28-REF-03` → `REF-091`。

| 本地键 | 正式键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH28-REF-01 | REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | 作者文章 | 文章将 Harness 描述为围绕基础模型的系统，涉及协调执行、规划、Tool、上下文、工件与结果评估。 | 2026-07-16：已读取相关定义与引用信息。 | 本书的五个工件、JavaScript API、状态码、可靠性结论、任何产品实现。 |
| CH28-REF-02 | REF-090 | [Node.js：Test runner](https://nodejs.org/api/test.html) | 官方文档 | `node:test` 可定义测试，`node --test` 是官方文档描述的测试运行入口。 | 2026-07-16：已读取测试运行器文档；本仓本次实际使用 Node v24.16.0。 | Node v26 新能力、生产 Harness 可靠性、外部 I/O、Agent 产品能力。 |
| CH28-REF-03 | REF-091 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线框架资源 | AI RMF Core 的行动不是必须按序执行的清单，且其指导按组织与场景使用。 | 2026-07-16：已读取页面；页面注明 AI RMF 1.0 正在修订。 | 本章字段是 NIST 规范、任何合规认证、法律意见或特定风险等级。 |

## 写作时的引用规则

- 仅在说明 Harness 的工作性背景时引用 CH28-REF-01；本章的数据结构和案例均写为“本书工程模型”。
- 仅在说明示例测试命令所用的 Node 机制时引用 CH28-REF-02；实际 7 项测试结果以本地命令记录为准，不由文档替代。
- 仅用 CH28-REF-03 提醒“不要把字段表当完整风险框架”；不把它包装成生产授权或安全结论。
- 任何新增产品、SDK、模型、基准、性能或安全事实必须重新研究并单列本地键；未经核验的信息标记 `TODO(verify)`。

## 主线程登记提示

建议全局引用登记时保留以下语义：

1. CH28-REF-01 可复用既有 Weng Harness 文章的正式引用，前提是全局 URL 与访问日期一致。
2. CH28-REF-02 应登记为 Node.js Test Runner 官方资料；不要把写作日 Node v26 文档与本机 Node v24.16.0 混为一谈。
3. CH28-REF-03 可复用既有 NIST AI RMF Core 的正式引用，必须保留“自愿、非固定顺序、正在修订”的限定。
