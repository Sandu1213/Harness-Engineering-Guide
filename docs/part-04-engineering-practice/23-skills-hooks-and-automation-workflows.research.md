---
title: "第 23 章 Research Brief：Skills、Hooks 与自动化工作流"
chapter: 23
status: "complete"
updated_at: "2026-07-16"
candidate_references:
  - "REF-077"
  - "REF-078"
  - "REF-079"
---

# 第 23 章 Research Brief：Skills、Hooks 与自动化工作流

## 要解决的工程问题

团队把重复任务、工具生命周期约束、长程任务编排和 CI 检查都称为“自动化”时，往往会产生三类错误：让 Hook 维护长期状态、让 Skill 获得不存在的强制权力、让一次绿色检查代表事实或发布正确。本章要给出一个可审查的选择框架，而不是一套产品配置教程。

## 读者完成后的可观察结果

- 能给出一个自动化需求的主要责任类别，并说明为什么不是其他类别。
- 能为 Hook 与事件驱动检查列出触发、输入范围、失败策略、退出条件和所有者。
- 能指出一个跨步骤任务缺少状态记录或检查点时，为什么不能仅由 Hook 或 CI 补齐。
- 能使用本章纯内存示例将边界不清的提案路由到 `blocked`、`requires_approval` 或 `not_applicable`。

## 章节范围

**纳入：** 可复用 Skill、Codex Hook 的产品特有边界、Workflow 的状态责任、事件驱动自动化检查、Plugin 的分发边界、失败可见性、当前仓库的 Markdown 检查配置。

**排除：** Hook 的实际安装、任何 Plugin 创建或安装、真实 CI 运行、自动修复、云端调度、Git 写入、生产发布、MCP 连接、权限授予和外部系统验证。

## 相邻章节与去重策略

| 章节 | 已有责任 | 第 23 章只承接的部分 | 本章不得重复或声称实现的部分 |
| --- | --- | --- | --- |
| 第 8 章 | Skill Contract、发现、选择、权限分离。 | Skill 与 Hook、Workflow、Automation 的工程选择。 | 不重写 Skill 的完整契约或产品发现算法。 |
| 第 10 章 | Workflow Contract、State Record、Checkpoint、恢复。 | 说明为什么 Hook 不能替代状态编排。 | 不定义真实运行时、重放或幂等性机制。 |
| 第 12、14 章 | 环境权限与人工批准。 | 强调自动化不能自行授权。 | 不设计权限、Sandbox 或批准实现。 |
| 第 21、22 章 | 项目 Harness 与仓库级规则（规划中）。 | 为规则、项目入口的后续使用提供术语。 | 不假装这些未完成章节已经给出实现。 |

## 可核验来源与允许陈述

| 正式 ID | 一手来源 | 可用于的限定陈述 | 不可外推的内容 |
| --- | --- | --- | --- |
| REF-077 | [OpenAI Codex：Build skills](https://learn.chatgpt.com/docs/build-skills.md) | Codex Skill 的 `SKILL.md`、`name`/`description`、显式或描述匹配激活、渐进加载和作者位置。 | 所有 Agent 的加载规则、权限或任务成功。 |
| REF-078 | [OpenAI Codex：Hooks](https://learn.chatgpt.com/docs/hooks.md) | Codex Hook 的事件、匹配 Hook 的并发、命令 Hook 信任和项目层信任边界。 | Hook 顺序保证、脚本安全、源系统权限、跨产品行为。 |
| REF-079 | [OpenAI Codex：Build plugins](https://learn.chatgpt.com/docs/build-plugins) | Codex Plugin 的 manifest 与可打包 Skill、Hook、MCP 配置等组件。 | 安装后的权限、任何组件自动启用或跨平台兼容。 |

2026-07-16 通过当前官方 Codex Manual 缓存重新读取以上来源对应章节。正式发布或改写时必须重新访问官方页面；产品行为属于动态信息。

## 本书工程扩展

以下内容是本书模型，不是来源声明：

- 将需求分为 Skill、Hook、Workflow、Automation 四类主要责任。
- 使用 `fail_visible`、`blocked`、`requires_approval`、`not_applicable` 作为教学判断状态。
- 将 Plugin 视为分发单元，而不定义为第五种执行语义。
- 以当前仓库的 Markdown lint、链接检查工作流作为“事件驱动检查”的本地案例。

## 需要事实核验的清单

1. Codex Skill 的最小 `SKILL.md` 结构、显式/隐式激活和渐进加载是否仍由官方页面如此描述。
2. Hook 的事件名单、多个匹配命令 Hook 的并发行为、信任要求与项目层信任限定是否仍有效。
3. Plugin manifest 是否仍以 `.codex-plugin/plugin.json` 为入口，并可引用 Skills、Hooks 与 MCP 配置。
4. 当前仓库 `.github/workflows/markdown-lint.yml` 和 `link-check.yml` 的触发器、Node 版本和命令是否与正文一致。
5. 纯内存示例是否不会执行真实 Hook、CI、调度、权限、文件、网络或外部动作。

## 计划图示

图示从“任务请求或仓库事件”开始，根据主要责任分支到 Skill、Hook、Workflow 或 Automation；四者的输出都不能直接视为授权或验证，应经过独立权限/批准边界以及观察/验收。图必须标注为本书教学模型。

## 计划示例

`assessAutomationWorkflowAdmission` 接收一个注入提案与允许效果类别，判断：

- Skill 是否有任务触发、任务和输出；
- Hook 是否有生命周期事件，是否被错误地要求承担状态编排；
- Workflow 是否具有状态记录与检查点；
- Automation 是否声明触发与失败策略；
- Tool 是否被正确地排除到第 11 章的协议边界；
- 未获批准效果是否进入 `requires_approval`。

示例仅判断 JavaScript 对象，不加载或运行真实配置。

## 风险与停止条件

- 官方文档无法访问或与当前 Manual 不一致时，正文应将对应产品事实降为 `TODO(verify)`，不得依赖记忆补写。
- 若示例需要真实 Hook、CI、网络、Git 或权限才能解释，则缩小为纯内存判断，并把真实集成留给后续章节。
- 若一个概念与第 8 或 10 章重叠，采用交叉引用，不重复制产品说明。

## 完成标准

- 正文能明确区分任务能力、生命周期约束、状态编排、事件驱动检查与分发包。
- 每项 Codex 产品事实有登记的 REF-077 至 REF-079 来源和外推禁区。
- 示例、图示、评审记录都明确其纯教学与未验证范围。
- 主线程已将 REF-077 至 REF-079 登记到 `.ai/references.md`；本章仍须随共享目录、状态和 npm 校验统一收口。
