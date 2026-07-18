---
title: "第 19 章参考资料：Context Compaction 与长任务"
chapter: "19-context-compaction-and-long-running-tasks"
status: "global-reference-register"
updated_at: "2026-07-16"
---

# 第 19 章参考资料：Context Compaction 与长任务

本文件是本章的局部引用登记。全书引用已登记到 `.ai/references.md`；原局部键映射为 `CH19-001 → REF-068`、`CH19-002 → REF-023`、`CH19-003 → REF-069`。每条仅支持表中所写的限定陈述。

| 临时键 | 来源 | 用于支持 | 访问/版本 | 外推禁区 |
| --- | --- | --- | --- | --- |
| REF-068 | [Anthropic, *Effective context engineering for AI agents*](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Context Engineering 是管理模型推理时 token 集合的策略；文章讨论长时程任务的 compaction、结构化笔记、按需恢复与取舍。 | 2026-07-16；页面未见稳定发布日期。 | 不将文中的 Claude Code 或平台能力、默认压缩内容、性能结论外推为通用行为。 |
| REF-023 | [Packer 等，*MemGPT: Towards LLMs as Operating Systems*，arXiv:2310.08560v2](https://arxiv.org/abs/2310.08560v2) | 论文摘要中以分层记忆类比管理有限上下文中的数据移动。 | 版本 v2，2024-02-12；2026-07-16 读取。 | 不引用性能数字，不将研究原型的存储、控制流或安全属性写成本书实现。 |
| REF-069 | [Liu 等，*Lost in the Middle: How Language Models Use Long Contexts*，arXiv:2307.03172v3](https://arxiv.org/abs/2307.03172v3) | 论文在两类实验中报告相关信息位置会影响所测模型的表现，长输入中间位置尤为值得纳入评估。 | 版本 v3，2023-11-20；2026-07-16 读取。 | 不泛化为所有模型、任务、上下文长度或固定下降幅度。 |

## 正文引用约定

- 本章正文使用 `[REF-068](19-context-compaction-and-long-running-tasks.references.md)` 等正式链接；详细登记见 `.ai/references.md`。
- “压缩记录（Compaction Record）”“稳定事实锚点”“损失检测”和示例函数均为本书工程模型，不归因给上述来源。
- 产品的会话、自动压缩、文件记忆、上下文窗口、模型和价格均属于动态信息；正式发布时必须重新查询官方资料。
