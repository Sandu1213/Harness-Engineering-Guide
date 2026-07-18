---
title: "第 29 章候选参考资料"
chapter: "29"
status: "registered"
updated_at: "2026-07-16"
---

# 第 29 章候选参考资料

> 本章保留本地 `CH29-REF-*` 键以追溯并行写作阶段；正式映射已登记：`CH29-REF-01` → `REF-029`、`CH29-REF-02` → `REF-088`、`CH29-REF-03` → `REF-089`、`CH29-REF-04` → `REF-090`。

| 本地键 | 正式键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH29-REF-01 | REF-029 | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方工程文章 | 文章区分预定义路径编排 LLM 与工具的 workflow，以及由 LLM 动态决定过程和工具使用的 Agent；并在其工程讨论中提及环境反馈、停止条件、测试与人类审查。 | 2026-07-16：已重读相关定义、运行边界与软件工程讨论。 | 不代表通用行业标准、产品 API、基准或所有 Agent 的实现。 |
| CH29-REF-02 | REF-088 | [Git：git-diff](https://git-scm.com/docs/git-diff) | 官方文档 | `git diff` 可比较工作树、索引、树或文件等不同对象之间的变化。 | 2026-07-16：已重读官方文档。 | 不证明本章或读者仓库运行过 Git；不替代测试或审查。 |
| CH29-REF-03 | REF-089 | [GitHub Docs：About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | 官方文档 | GitHub PR review 的 Comment、Approve、Request changes 状态与合并前协作语境。 | 2026-07-16：已重读官方文档。 | 不推广到其他托管平台，也不证明任何真实 PR 已评审。 |
| CH29-REF-04 | REF-090 | [Node.js：Test runner](https://nodejs.org/api/test.html) | 官方文档 | `node:test` 用于创建 JavaScript 测试，`node --test` 是文档描述的测试运行入口。 | 2026-07-16：已重读官方文档。 | 不代表用户项目的测试策略、测试通过或 Node 版本兼容性。 |

## 写作时的引用规则

- 仅在工作流、Agent、环境反馈、停止、测试或人类审查的工程背景中引用 CH29-REF-01；本章的六类交付工件和教学案例均是本书模型。
- CH29-REF-02 与 CH29-REF-03 仅限定 Git 和 GitHub 的具体资料语境；它们不能证明真实 diff、PR、评审、批准或合并已经发生。
- CH29-REF-04 只解释本章纯内存示例使用的 Node 测试入口；实际测试结果只能由本地命令输出证明。
- 本章不使用产品营销页、未核验博客、基准成绩或真实仓库截图。任何新增产品、SDK、模型、基准、性能或安全事实都必须重新研究并单列本地键。
