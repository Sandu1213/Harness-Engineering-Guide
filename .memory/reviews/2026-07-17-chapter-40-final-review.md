---
title: "第 40 章 Final Review：成本、延迟与 Token 管理"
chapter: "40"
stage: "Final Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 40 章 Final Review：成本、延迟与 Token 管理

## 完成范围

- 复核正文、Research Brief、Outline、参考资料、示例计划、Fact Check 与 Technical／Example／Diagram／Language 各阶段审查记录。
- 复核 front matter、7 项正式引用、7 个全局术语、示例与图示路径、8 条测试路径、状态码解释、相邻章节边界和完成检查表。
- 重新执行专用 Node 测试、无副作用演示、Mermaid 11.16.0 SVG／PNG 导出、PNG 视觉检查、正文图源逐字比较与定向链接检查。

## 实际验证

| 检查 | 实际结果 | 支持的有限结论 |
| --- | --- | --- |
| 专用测试 | `node --test examples/agent/resource-optimization-assessment.test.mjs` 退出码 0；8 项通过、0 项失败。 | `assessResourceOptimization` 只在测试构造的纯内存对象上返回保守路由。 |
| 演示 | `node examples/agent/resource-optimization-assessment.mjs` 退出码 0；输出 `ready_for_comparison`、`comparable_evidence_ready`、`compare_without_deployment` 与 `executionPerformed: false`。 | 演示对象最多进入教学比较，不表示候选更优、获批或已部署。 |
| Mermaid SVG | `npx --yes @mermaid-js/mermaid-cli@11.16.0` 以白色背景重新导出，退出码 0。 | SVG 已从当前独立图源重建。 |
| Mermaid PNG | 同版本 CLI 以白色背景、两倍缩放重新导出，退出码 0；尺寸 1568×2920。 | PNG 已从当前独立图源重建。 |
| 视觉检查 | Task Contract、Resource Budget、Resource Records、Latency Path、金额可选分支、Rate Snapshot、Optimization Candidate、Quality Non-regression Gate、四个断点和 `blocked` 均完整可读，无明显文字或箭头截断。 | 图只表达教学责任链，没有把估算、缓存候选、资源减少或候选接受画成观察、命中、质量通过或部署。 |
| 图源一致性 | Node 抽取正文 Mermaid 块并与 `.mmd` 比较；两者均为 2007 个字符，逐字一致。 | 正文图块与可编辑事实来源一致。 |
| 正文链接 | `markdown-link-check` 检查 11 个正文链接，全部通过。 | front matter 工件、示例、图示、章节工件和共享引用链接均可定位。 |
| 参考资料链接 | `markdown-link-check` 检查 7 个官方链接，全部通过。 | Fact Check 使用的官方入口在本轮可访问；动态产品事实出版前仍需重读。 |

## 审查结论

- Resource Budget、Resource Record、Latency Path、Rate Snapshot、Optimization Candidate、Quality Non-regression Gate 与 Cache Identity 均与全局术语表一致，并明确为本书工程模型。
- REF-120、REF-121、REF-122、REF-123、REF-068、REF-061 与 REF-124 均已在 front matter、正文、章节参考资料和共享引用表中对齐；正文没有保存价格、模型范围、缓存阈值、批处理窗口、延迟数字或性能排行。
- 虚构研究案例、纯内存运行证据和真实外部系统保持分层；`ready_for_comparison` 不表示候选更优、缓存已命中、质量已改善、批准已取得或路由已部署。
- 第 39 章提供固定任务和评价输入，第 41 章展开安全、权限与审计，第 42 章负责版本、A/B、发布和回滚；本章没有重复其责任。
- 正文 front matter 已切换为 `complete`，Final Review 完成项已勾选。

## 未验证范围与交接

- 未运行真实模型、用量读取、账单、费率计算、缓存、摘要服务、并发、批处理、性能测量、账户、凭证、批准、发布或外部效果。
- 纯内存测试、文档和图示不能证明真实成本、延迟、Token、缓存命中、并行安全、批处理适用性、质量改善或业务效果。
- 按主线程安排，本轮不运行全仓 `npm run validate`，也不修改 `.ai/progress.md`、`.context/`、npm 入口或共享交接；这些共享收口项由主线程统一完成。
