---
title: "第 2 章增补修订记录"
chapter: "02"
review_type: "supplemental-revision"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 2 章增补修订记录

## 修订目标

在不改变第 2 章四层工作模型、可运行示例或 Mermaid 图示接口的前提下，将“区分责任”补成读者可实际使用的诊断框架。此次修订只处理第 2 章，不推进第 5 章或其他章节阶段。

## 已补充内容

- 在正文加入“问题—工件—判定”表，将候选、决策、执行请求、观察和验证分别对应到可反驳的问题与最小记录。
- 在工作流程后加入“假设—证据—行动”诊断卡，明确不同证据下应做的下一步和不应做的动作。
- 在最小示例后加入从纯内存边界到受控真实适配器、持久化和审批的渐进增强边界，并把具体机制保留给第 10、11、12、14、17、18 与 41 章。
- 同步 Chapter Outline、Research Brief、事实核验清单、候选参考资料、全局参考资料与出版目录。

## 来源与原创性复核

- 2026-07-15 重新读取 REF-001、REF-003 原文和 REF-004 的 arXiv 摘要。
- 新增的来源陈述仅使用 REF-004 对交错推理与动作、推理轨迹跟踪和更新行动计划、处理例外，以及动作接触外部来源或环境的摘要范围。
- “问题—工件—判定”、诊断卡和渐进增强顺序均明确为本书工程扩展；没有将其写成论文、作者文章或特定产品的既有架构。
- 没有新增产品能力、性能数字、真实权限行为、真实运行日志或外部工具行为。

## 实际执行的验证

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
npm run lint:md
npm run check:links
git diff --check
```

- `npm run test:runtime-boundaries`：4 项 Node 内置测试全部通过。
- `npm run example:runtime-boundaries`：输出 `state: "succeeded"`、`phase: "validated"`、`observation: "boundary verified"`、接受证据和四项事件。
- `npm run lint:md`：检查 115 个 Markdown 文件，0 个错误。
- `npm run check:links`：退出码为 0。
- `git diff --check`：无输出。

## 状态同步后的总校验

状态、引用和本记录写入后，实际运行了 `npm run validate`。命令以退出码 0 完成：Markdown lint 检查 116 个文件、0 个错误；链接检查通过；四套 Node 示例共 18 项测试通过；状态检查结果为第 1 至 4 章完成、43 章未开始。最终仍需在任何后续编辑后重跑校验。

## 未扩大范围

- 未修改 `examples/agent/runtime-boundaries.mjs`、对应测试或 Mermaid 源码与导出物。
- 示例仍只证明确定性的纯内存控制流，不证明真实 Sandbox、文件权限、工具协议、审批、持久化或生产可靠性。
- 本轮全仓校验只证明当前仓库状态，不证明真实 Sandbox、文件权限、工具协议、审批、持久化或生产可靠性。
