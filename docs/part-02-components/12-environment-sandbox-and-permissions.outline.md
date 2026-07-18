---
title: "第 12 章 Chapter Outline：Environment、Sandbox 与权限"
chapter: "12"
status: "outline-complete"
updated_at: "2026-07-16"
---

# 第 12 章 Chapter Outline：Environment、Sandbox 与权限

## 章节目标与核心问题

- **目标：** 让读者能把动作效果类别与环境边界、凭证 scope、目标范围、批准证据和观察要求对应起来。
- **核心问题：** 为什么一个 Agent 看得见工具、生成得出命令，仍不应默认获得写入、联网、部署或敏感数据读取能力？
- **不解决：** 本章不实现真实 Sandbox、云 IAM、密钥管理、Tool 调用、审批 UI、审计平台或发布系统。

## 读者路径与小节蓝图

### 1. 环境是可执行边界，而不是目录名

- 从“部署到生产”这一句遗漏的文件、网络、凭证、目标与副作用约束切入。
- 区分任务意图、Tool Contract、Environment Contract、源系统权限、批准与结果验证。
- 用 C12-REF-001 说明一个产品中的 Sandbox 与批准分工，明确不外推为通用实现。

### 2. 最小权限的五维矩阵

- 逐项说明文件系统、网络、凭证、目标范围和效果类别。
- 将“只读”“受限写入”“外部动作”视为风险分类，不把它们当成操作系统权限位。
- 用 Docker capability、Kubernetes scope 与 GitHub Actions job permission 作为三个不同层次的限定例子。

### 3. Sandbox、凭证、源系统权限与批准不能互相替代

- 沙箱限制进程可达范围；凭证是身份材料；源系统负责最终授权；批准记录责任决定；验收判断任务结果。
- 用反例说明“有 token”“批准过”“测试环境”为什么都不足以单独推出目标已经改变。
- 将第 11、14、17 章保留为独立责任。

### 4. 环境阶梯：dry-run、测试与生产

- 比较每层的允许效果、网络范围、凭证、目标、观察与停止条件。
- 解释 dry-run 是预检查而不是写入成功证据；测试允许也不是生产允许。
- 以虚构部署意图串起准入矩阵。

### 5. 环境准入记录与拒绝路径

- 定义环境准入记录的最小字段：任务、环境 profile、所需 effect、边界匹配、凭证引用、批准引用、观察要求、判断与理由。
- 给出 `blocked` 与 `requires_approval` 的保守出口。
- 不将记录设计写成真实审计或访问控制系统。

### 6. 最小示例与工程案例

- `assessEnvironmentAccess` 只判断注入对象；测试覆盖环境允许、目标范围与边界不满足、凭证 scope 缺失与批准缺失。
- 原创部署案例只说明教学判断，不产生文件、网络、CI、容器或生产副作用。

### 7. 工程实践、错误、安全边界与下一章

- 给出准入前检查、默认拒绝、短生命周期凭证、效果后再观察、环境记录最小字段。
- 指出“环境名等于权限”“把 secret 写入 Prompt”“把测试通过当生产批准”等错误。
- 以第 14 章的人类责任与批准矩阵收束。

## 计划图示

- **问题：** 同一部署意图如何在 dry-run、测试和生产环境中走向不同的准入结论？
- **图源：** `diagrams/mermaid/chapter-12-environment-permission-ladder.mmd`。
- **节点：** Action Candidate、Environment Contract、dry-run、测试、生产、target scope、boundary check、credential scope、approval、observation requirement、blocked。
- **读图结论：** 环境判断只决定候选是否可进入某个边界；它不表示 Tool 已调用、变更已发生或结果已验收。

## 计划示例

- **模块：** `examples/agent/environment-sandbox-assessment.mjs`。
- **测试：** `examples/agent/environment-sandbox-assessment.test.mjs`。
- **函数：** `assessEnvironmentAccess({ task, environment, policy, approval })`。
- **输入：** 只使用显式注入的教学对象，不读取环境变量、文件、时钟、网络、身份、secret 或外部系统。
- **输出：** `allowed`、`blocked` 或 `requires_approval`，附带稳定代码与任务标识。
- **成功标准：** 针对不同注入对象得到可重复判断；不声称真实权限、Sandbox、部署或审计得到验证。

## 阶段工件状态

- [x] Research Brief 与候选资料。
- [x] Detailed Chapter Outline。
- [x] First Draft。
- [x] Technical Review。
- [x] Example Implementation：已记录模块缺失红灯；补齐目标范围准入后，8 项 Node 内置测试与演示实际通过。
- [x] Diagram Review：Mermaid CLI 11.16.0 已导出 SVG/PNG，PNG 已查看。
- [x] Fact Check、Language Editing、Final Review：本地工件已完成，等待主线程的共享登记和全仓校验。

## 交叉章节边界

| 章节 | 第 12 章保留的责任 | 不提前解决的责任 |
| --- | --- | --- |
| 第 10 章 Workflow | 环境判断可被状态记录引用。 | 状态迁移、重试、恢复、交接。 |
| 第 11 章 Tool Use | 环境准入限制工具调用候选。 | 参数 Schema、调用结果、效果不确定性。 |
| 第 14 章 Human-in-the-loop | 环境契约可引用批准 snapshot。 | 谁批准、何时升级、责任归属。 |
| 第 17 章 Evaluation | 环境契约要求后续观察。 | 是否达到业务验收。 |
| 第 41 章 安全、权限与审计 | 本章提供基础边界模型。 | 企业级策略、审计保存和治理。 |
