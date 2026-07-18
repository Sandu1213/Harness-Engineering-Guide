---
title: "第 2 章 Attempt Trace 增补修订记录"
chapter: "02"
review_type: "supplemental-revision"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 2 章 Attempt Trace 增补修订记录

## 修订目标

补足第 2 章中“工件各自存在但无法证明属于同一次尝试”的交接缺口。修订只完善本章的诊断框架与正文，不改变四层责任模型、纯内存示例接口、Mermaid 图源或章节工作流状态。

## 已补充内容

- 新增 Attempt Trace：以 `attempt_id` 关联候选、决策、执行请求、观察和验证，并明确每种工件缺失时可作与不可作的结论。
- 明确候选拒绝可没有执行请求，运行环境阻塞可没有验证，而验证接受或拒绝必须回溯到对应观察；记录缺失不得由相近时间或相似文本补成因果链。
- 在渐进增强与最小接口清单中加入尝试标识和最小顺序关系。
- 明确纯内存 `events` 只用于单次教学路径，不能作为跨进程持久 Trace；字符串前缀检查也不能直接迁移为真实文件授权。
- 同步更新 Chapter Outline、Research Brief、事实核验清单、候选参考资料、出版目录和全书大纲。

## 来源与原创性复核

- 2026-07-15 重新读取 REF-001、REF-003 与 REF-004 的原始页面或摘要，确认本章继续仅使用 Harness 的作者工作描述、Agent 的功能概览，以及推理—行动—外部观察的研究背景。
- Attempt Trace、关联规则、最小顺序关系与数据最小化约束均明确为本书工程模型；不归因给来源文章、ReAct、任何产品或通用追踪标准。
- 本轮没有新增产品行为、性能数据、真实权限行为、真实运行日志或外部工具行为。

## 实际验证

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
npm run validate
git diff --check
```

- `npm run test:runtime-boundaries`：4 项 Node 内置测试全部通过。
- `npm run example:runtime-boundaries`：输出 `state: "succeeded"`、`phase: "validated"`、`observation: "boundary verified"`、接受证据和四项事件。
- `npm run validate`：Markdown lint 检查 150 个文件、0 个错误；链接检查通过；七套示例共 34 项 Node 内置测试通过；状态检查为第 1 至 7 章完成、第 8 章进行中、39 章未开始。
- `git diff --check`：无输出。

## 未扩大范围

- 未改变示例与 Mermaid 图，因而本轮不将它们重新表述为新增的运行时、权限或追踪实现。
- Attempt Trace 只定义本书的最小关联关系；持久化、工具协议、Sandbox、人工审批、状态恢复与审计留给后续章节。
