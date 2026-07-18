---
title: "第 29 章事实核验清单"
chapter: "29-ai-software-engineer-workflow"
status: "complete"
updated_at: "2026-07-16"
---

# 第 29 章事实核验清单

## 外部事实逐项核验

| 编号 | 正文中的限定陈述 | 来源 | 2026-07-16 核验结果 | 禁止外推 |
| --- | --- | --- | --- | --- |
| CH29-F01 | Anthropic 的文章区分预定义代码路径的 workflow 与动态决定过程和 Tool 使用的 Agent。 | CH29-REF-01 | 已重读。该表述限定为该文的架构分类。 | 不说所有厂商或所有团队的术语相同。 |
| CH29-F02 | 该文讨论环境反馈、停止条件、测试与人类审查在 Agent 工程中的作用。 | CH29-REF-01 | 已重读。正文不引用未给出的性能数据。 | 不把建议写成合规要求或成功保证。 |
| CH29-F03 | Git 文档说明 `git diff` 可比较多种对象之间的变化。 | CH29-REF-02 | 已重读。正文仅以此说明 diff 的比较语义。 | 不说本章已生成真实 diff。 |
| CH29-F04 | GitHub 文档列出 Comment、Approve、Request changes 三种 PR review 提交状态。 | CH29-REF-03 | 已重读。正文限定在 GitHub PR review。 | 不说存在真实 PR、审查者或批准。 |
| CH29-F05 | Node 文档说明 `node:test` 与 `node --test` 的测试运行语境。 | CH29-REF-04 | 已重读。实际示例命令也已执行。 | 不把示例命令推广为其他项目的测试策略。 |

## 正式引用映射

| 本地键 | 正式键 | 核验结果 |
| --- | --- | --- |
| CH29-REF-01 | REF-029 | Anthropic 的 workflow/Agent 区分、环境反馈、停止条件、测试与人工审查只在该工程文章的范围内使用。 |
| CH29-REF-02 | REF-088 | Git 的变化比较语义只用于说明真实 diff 是独立工件，不表示本章执行过 Git。 |
| CH29-REF-03 | REF-089 | GitHub PR review 的 Comment、Approve、Request changes 只作为平台特定状态使用。 |
| CH29-REF-04 | REF-090 | Node `node:test` 模块与 `node --test` 命令行测试运行器只用于解释本章的 Node 示例入口。 |

## 本书工程模型核验

| 名称 | 状态 | 说明 |
| --- | --- | --- |
| 软件变更交付包 | 本书工程模型。 | 六类工件和字段不是外部产品 schema。 |
| `ready_for_review` | 本书示例状态。 | 只表示纯函数已接受输入，不能推出真实操作发生。 |
| `allowedPaths` | 本书教学范围字段。 | 不是文件系统 ACL、Git pathspec 或环境隔离。 |
| `diffSummary` | 本书审查包字段。 | 不是 `git diff` 的输出或真实 diff 证据。 |

## 实际运行核验

| 项目 | 命令或方法 | 实际结果 | 证明范围 |
| --- | --- | --- | --- |
| 红灯 | `node --test examples/agent/software-change-delivery-assessment.test.mjs`（实现创建前） | 2026-07-16：`ERR_MODULE_NOT_FOUND`；目前仅核验 Example Plan 与示例审查中的原始记录，不为重现红灯删除现有实现。 | 测试确实先于实现引用了模块。 |
| 单元测试 | `npm run test:software-change-delivery-assessment` | 2026-07-16：当前实际运行，10 项通过、0 项失败。 | 纯内存函数对固定对象的分类规则。 |
| 演示 | `npm run example:software-change-delivery-assessment` | 2026-07-16：当前实际输出 `ready_for_review`、`software_change_package_ready`、`request_review`、`executionPerformed: false`。 | 默认虚构交付包能进入请求审查状态。 |
| Mermaid | Mermaid CLI 11.16.0 导出 SVG/PNG，并比较正文图块与 `.mmd`。 | 2026-07-16：两条导出命令退出码 0；PNG 已查看，正文图块与图源比较退出码 0、无输出。 | 图源的语法、可读性与正文一致性。 |

## 未运行与未证实项

- 未读取或修改任何真实代码仓库、工作树、分支、worktree、Issue、PR 或 CI。
- 未执行示例中字符串形式的 `verificationPlan.command`。
- 未运行 Git 或 GitHub API；对 Git/GitHub 的陈述仅来自上述官方资料。
- 未运行浏览器自动化、移动设备测试、网络请求、模型调用、MCP、权限或外部 Tool。
- 本次 Fact Check 的状态同步后，仍需由主线程重新运行全仓 `npm run validate`；全局引用登记已由主线程完成。
