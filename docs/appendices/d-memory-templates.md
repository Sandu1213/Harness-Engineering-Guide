# 附录 D：Memory Templates

本附录在项目记忆层（Project Memory Layer）中讨论可跨任务记录：它们以可审查工件表达，不等于聊天全文、隐藏推理或“模型记住了”的承诺。本附录提供项目事实、决策、经验、研究摘要和交接记录模板，并规定准入、更新与失效条件。

概念边界见[第 7 章](../part-02-components/07-working-memory-and-long-term-memory.md)和[第 16 章](../part-03-intelligence-loop/16-reflection-and-learning.md)；仓库模板源见 [`templates/memory-template.md`](../../templates/memory-template.md)，决定记录另见 [`templates/decision-template.md`](../../templates/decision-template.md)。本附录是读者适配层；项目内记录应从对应源模板创建，字段变化时先更新源模板与既有责任边界，再刷新本页。

## 共同头部

每条持久记忆至少包含：

```yaml
kind: project_fact | decision | lesson_candidate | research_summary | handoff
scope: <适用项目、模块或任务>
subject: <记录属于哪个对象、版本或责任范围>
status: candidate | active | superseded | expired | revoked | archived
created_at: YYYY-MM-DD
observed_at: YYYY-MM-DD | null
verified_at: YYYY-MM-DD | null
owner: <具名角色或团队>
source:
  - <文件、命令记录或一手来源>
write_reason: <未来哪个任务会使用；减少什么不确定性>
read_trigger:
  - <满足什么条件才读取>
validity:
  - <版本、日期或状态触发条件>
revision_or_revocation:
  - <新证据到来时如何修订、过期或撤销>
supersedes: <旧记录路径或 null>
```

日期、ID、路径和责任者必须来自当前项目，不要照抄示例占位值。

## D1：Project Fact

用于保存项目内相对稳定、能由当前工件证明的事实。

```markdown
# Project Fact：<标题>

## 陈述

用一句可证伪的话说明当前事实。

## 适用范围

- 适用目录/版本：
- 不适用范围：

## 证据

- 权威文件：
- 验证命令及退出状态：
- 最近核验日期：

## 失效与刷新

- 哪个变化会使事实过期：
- 由谁重新核验：
```

不要把“团队希望”“模型建议”或一次未复现观察登记为 Project Fact。

## D2：Decision Record

用于保存经过责任者采纳、会影响后续工作的选择。

```markdown
# Decision：<标题>

## 背景

当前问题、约束和必须作决定的原因。

## 候选方案

| 方案 | 收益 | 成本/风险 | 证据 |
| --- | --- | --- | --- |

## 决策

明确选择、适用范围和生效条件。

## 理由

连接采用方案与当前证据、约束和权衡；不要只写“更好”或删除被拒方案的理由。

## 后果

- 需要更新的工件：
- 迁移或兼容要求：
- 回滚/重开条件：

## 责任与状态

- 决定者：
- 日期：
- 状态：proposed / accepted / superseded
```

Decision 不应删除被否决方案及理由，否则后来者无法判断旧约束是否已经消失。

## D3：Lesson Candidate

用于把一次失败或成功轨迹转为待审查经验，而不是自动规则。

```markdown
# Lesson Candidate：<标题>

## 触发轨迹

- 任务和输入版本：
- 可观察症状：
- 原始证据：

## 假设与反事实

- 候选机制：
- 什么观察会推翻它：
- 假设不成立时先检查什么：

## 候选改变

- 最小改变：
- 适用范围：
- 禁止扩大到：

## 验证与准入

- 可证伪检查：
- 实际结果：not_run / passed / failed
- 冲突、权限和回滚审查：
- 决定：reject / eligible_for_review / accepted
```

一次测试通过最多让候选进入审查。跨任务写入共享规则还需要冲突、版本、责任和撤销检查。

## D4：Research Summary

用于保存可复用的研究结论，不复制来源全文。

```markdown
# Research Summary：<主题>

## 研究问题与非范围

- 要回答：
- 不回答：

## 来源卡

| 来源 | 发布/版本 | 访问日期 | 直接支持 | 禁止外推 |
| --- | --- | --- | --- | --- |

## 当前结论

- 来源明确表达：
- 本项目工程推论：
- 仍未知或需刷新：

## 使用位置与失效条件

- 被哪些章节/任务使用：
- 产品、版本或日期变化时如何刷新：
```

Research Summary 应链接一手来源和局部引用，不保存受版权保护的长段复制文本。

## D5：Handoff Record

用于跨会话或跨工具继续一个明确任务。

本仓库的交接字段入口见 [Handoff Prompt](../../.ai/prompts/handoff.prompt.md)；下方模板用于读者理解通用结构，不覆盖项目当前交接要求。

```markdown
# Handoff：<任务>

## 目标与范围

- 原始目标：
- 已完成交付物：
- 未完成或非范围：

## 变更和证据

| 文件/系统 | 职责 | 实际验证 | 结果 |
| --- | --- | --- | --- |

## 当前状态

- 权威状态文件：
- 输入版本/时间窗口：
- 冲突或陈旧项：

## 风险与下一步

- 未验证范围：
- 需要的新权限或人工决定：
- 下一位先读：
- 唯一下一步：
```

交接不保存聊天推理、密钥、完整日志或未经核验的猜测。下一位必须重新读取权威状态，而不是把交接当作永不失效的快照。

## 准入与清理清单

写入长期记忆前检查：

- 内容是否是可验证事实、已采纳决定或经过验证的候选经验？
- 来源、范围、版本、责任者和失效条件是否齐全？
- 是否包含个人数据、密钥、内部 URL、完整用户输入或不必要日志？
- 是否与现有规则、决定或更新记录冲突？
- 是否已有同一事实的权威位置，可以只保存链接而不复制？

定期清理时，不直接覆盖历史。将旧记录标为 `superseded` 或 `archived`，链接替代记录，并保留为何失效。这样既避免陈旧信息被继续加载，也保留决策和故障的可追溯性。
