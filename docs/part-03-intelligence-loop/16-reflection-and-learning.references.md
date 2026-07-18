---
title: "第 16 章候选参考资料：Reflection 与经验提炼"
chapter: "16"
status: "registered"
updated_at: "2026-07-16"
---

# 第 16 章候选参考资料：Reflection 与经验提炼

> 本文件保留 `C16-REF-*` 作为局部追溯键；它们已登记为正式 REF-057 至 REF-060，正文和全局引用表使用正式编号。

| 本地键 | 来源 | 来源类型 | 支持的具体陈述 | 访问日期 | 外推禁区 |
| --- | --- | --- | --- | --- | --- |
| C16-REF-01 | [Shinn et al., Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366v4) | 原始论文 / arXiv v4 | 语言 Agent 可从任务反馈生成语言反思，并以情景记忆影响后续尝试的研究方法。 | 2026-07-16 | 不引用性能数字；不把论文方法、记忆结构或任务结果写成本书实现。 |
| C16-REF-02 | [Madaan et al., Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651v2) | 原始论文 / arXiv v2 | 初始输出可进入由反馈和精炼构成的迭代过程；论文描述单 LLM 可承担多个角色。 | 2026-07-16 | 不使用人类偏好、平均改善或跨任务有效性数字；自反馈不等于外部验证。 |
| C16-REF-03 | [Google SRE Book: Postmortem Culture: Learning from Failure](https://sre.google/sre-book/postmortem-culture/) | 官方工程实践 | 事后分析可记录事件、影响、处置、成因与预防行动；无责、建设性复盘有助于让问题显性化。 | 2026-07-16 | 不把组织流程、阈值、文化或效果声明外推为 Agent 自动根因分析。 |
| C16-REF-04 | [Anthropic: Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方工程文章 | evaluator-optimizer 是生成与评价反馈循环；它更适合评估标准清晰、迭代精炼具有可测价值的情形。 | 2026-07-16 | 不作为跨产品标准；不把模型自评、工作流或安全结论外推到未验证系统。 |

## 正式映射（已完成）

- `C16-REF-01` → `REF-057`，`C16-REF-02` → `REF-058`，`C16-REF-03` → `REF-059`，`C16-REF-04` → `REF-060`；全局条目已登记到 `.ai/references.md`，正文已使用正式编号。
- Anthropic 页面为动态工程文章；正式写作或发布前需在当日重读。
- 两篇论文应保留明确版本 URL；若更新版本改变摘要或方法描述，重新核验允许陈述。
- 不复制论文长段落、图表、性能数值或 SRE 页面案例；本章只使用最小可归因背景。
