---
title: "第 32 章参考资料：自动分析失败并修复 Bug"
chapter: "32"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章参考资料：自动分析失败并修复 Bug

| 本地键 | 全局引用 | 来源 | 支持的受限陈述 | 不可外推 |
| --- | --- | --- | --- | --- |
| CH32-REF-01 | REF-098 | [Zeller、Hildebrandt：Simplifying and Isolating Failure-Inducing Input](https://www.st.cs.uni-saarland.de/publications/files/zeller-tse-2002.pdf) | Delta Debugging 论文中的失败样例最小化，以及通过通过／失败样例隔离差异的研究方法。 | 自动最小化一定可用、最小样例即生产根因、论文案例成本或结果可迁移。 |
| CH32-REF-02 | REF-099 | [Google SRE Book：Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) | 观察、候选原因、支持／反证检查、受控改变、有效问题报告和调查笔记的排障语境。 | 固定 SRE 流程、严重性标准、生产权限或任意系统的根因结论。 |
| CH32-REF-03 | REF-100 | [Git：git-bisect](https://git-scm.com/docs/git-bisect) | 以 good/bad 提交为边界，在历史中点反复测试并报告第一个 bad 提交的 Git 特定行为。 | 根因证明、无提交历史时的调查法、未批准 checkout 或工作树操作。 |
| CH32-REF-04 | REF-081 | [Playwright：Auto-waiting](https://playwright.dev/docs/actionability) | 指定 locator 动作的 actionability 条件和自动重试断言的产品特定语境。 | 通用等待策略、完整用户流程、服务正确性或发布结论。 |

全部来源于 2026-07-16 访问。Google SRE、Git 与 Playwright 页面属于动态资料，First Draft、Technical Review 和 Fact Check 均应重新读取；论文仅按题名页面与原文内容的受限研究语境使用。
