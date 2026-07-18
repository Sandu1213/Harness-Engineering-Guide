---
title: "第 26 章 Research Brief：多 Agent 协作与任务隔离"
chapter: "26"
status: "completed"
updated_at: "2026-07-16"
references:
  - "CH26-REF-01"
  - "CH26-REF-02"
  - "CH26-REF-03"
---

# 第 26 章 Research Brief：多 Agent 协作与任务隔离

## 要解决的工程问题

增加 Agent 数量并不会自动增加吞吐量或可靠性。两个执行者若同时修改同一输出、依据不同版本的输入、共享一个未声明的外部目标，或都以为自己负责回写进度，就会把并行变成不可解释的竞争。本章要解决的是：**怎样把一次协作拆成边界明确、可独立验收、可由单一集成者收口的任务，而不是让多个 Agent 同时“继续做”。**

读者完成本章后应能写出任务契约（Task Contract），明确所有者、专属输出、输入快照、验收条件、停止条件和共享工件的集成责任；并能在重叠、输入漂移、共享写入或效果未知时停止局部推进。

## 研究问题

1. 哪些多 Agent 编排陈述属于可归因的产品事实，哪些只是本书的协作设计？
2. 为何“可并行”必须同时满足独立输入、互不重叠的写入面和独立验收，而不能只看任务标题不同？
3. 交接、委派与最终汇总分别应该由谁负责，怎样避免把摘要、批准、写入和验证混成一次消息？
4. 发现冲突时，为什么先冻结局部写入、保存证据并路由给集成者，比“最后写入者获胜”更可审查？
5. 一个纯内存示例怎样展示任务隔离预检，而不伪称创建了 Agent、并发执行、worktree、文件锁、消息队列或浏览器会话？

## 已核验的来源事实

| 本地键 | 写作日实际读取的来源 | 允许写入正文的限定陈述 | 不可写入正文的扩展 |
| --- | --- | --- | --- |
| CH26-REF-01 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 该 Python SDK 文档区分由 LLM 决策与由代码编排；其常见模式包括 manager（agents as tools）和 handoff；互不依赖的任务可用并行方式缩短时间。 | SDK 的模式不证明任意任务已独立、并发安全、已隔离、已恢复或已验证。 |
| CH26-REF-02 | [OpenAI Agents SDK：Handoffs](https://openai.github.io/openai-agents-python/handoffs/) | 该 SDK 的 handoff 可把任务交给指定 Agent；文档说明 handoff 可有输入 schema、input filter，且属于一次 run 内的机制。 | 不能把该行为写成跨产品、跨会话或仓库级交接格式，也不能推导真实消息传递或权限控制。 |
| CH26-REF-03 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | 作者将 Harness 概括为组织 prompts、tool calls、subagents、control flow、memory 与 workflow logic 的代码，并讨论将可编辑面与外部权限分层的重要性。 | 不使用其中实验、性能或研究系统细节来证明本书模型或真实 Agent 行为。 |

## 本书工程模型

以下对象是本书为了协作审查而定义的模型，不是产品 API 或行业标准：

| 工件 | 作用 | 最小字段 | 不代表 |
| --- | --- | --- | --- |
| 任务契约（Task Contract） | 让任务在开始前可被分配和验收。 | 标识、所有者、输入、专属路径、验收、停止条件。 | Agent 已启动、文件已锁定或任务已完成。 |
| 所有权声明（Ownership Claim） | 说明谁在当前窗口负责哪一组专属输出。 | task ID、owner、专属路径、期限/状态。 | 对共享文件或外部系统的永久权限。 |
| 交付包（Delivery Package） | 交给集成者的局部结果与证据。 | 工件位置、命令、结果、未覆盖范围、冲突。 | 集成已接受、共享状态已更新。 |
| 集成门（Integration Gate） | 将局部交付合并前逐项检查冲突、依赖和验证。 | 交付包、共享写入计划、全局校验、决策者。 | 自动解决语义冲突或外部效果正确。 |

## 章节范围与相邻边界

| 章节 | 本章借用的前置 | 本章不重复或不替代的责任 |
| --- | --- | --- |
| 第 03 章 | 仓库规则、状态、历史和证据的分层。 | 不重新设计仓库上下文目录。 |
| 第 09 章 | 任务卡、依赖与停止条件。 | 不重新讨论单 Agent 的任务拆解。 |
| 第 10 章 | Workflow Contract、State Record、恢复与效果未知。 | 不实现工作流引擎或检查点。 |
| 第 12、14 章 | 环境权限、批准与独立验证。 | 不把任务所有权写成技术授权。 |
| 第 21、22、23 章 | 跨工具共享契约、规则包和自动化边界。 | 不比较产品加载模型，不实现 Hook 或 CI。 |
| 第 27 章 | 版本控制、worktree 和代码审查。 | 不使用或验证真实 Git/worktree 隔离。 |

## 计划图示与示例

- **图示：** `chapter-26-multi-agent-ownership-swimlane.mmd`。用协调者、两个专属任务和集成门展示“只写专属路径，所有共享写入统一交给集成者”的本书流程。图必须包含输入快照、局部验证、冲突出口、交付包和停止条件。
- **示例：** `assessTaskIsolation`。它只检查注入任务的 owner、exclusive paths、acceptance、stop conditions、现有 claim 和 shared artifact 请求，返回 `ready`、`blocked`、`requires_integration` 或 `not_applicable`。先用 `ERR_MODULE_NOT_FOUND` 记录测试先于模块存在，再实现并运行 Node 内置测试。

## 风险、停止条件与事实核验

- 若两个任务需写同一专属路径，或一个任务把共享文件声明为专属输出，停止局部写入并转入集成者裁决。
- 若输入快照、依赖状态或验收规则在执行中变化，交付包必须标记漂移；不得把旧测试结果复制为新输入的验证。
- 若任务会访问共享环境、网络、凭证、真实工作区或外部目标，停止把它称为“仅任务隔离”；需回到第 11、12、14、17、18、27 章的相应边界。
- 若需要增加 OpenAI Agents SDK 的具体参数、版本或运行行为，必须在修订日重新读取 CH26-REF-01 和 CH26-REF-02，不能使用本 Brief 代替事实核验。

## 阶段门

| 阶段 | 可验收输出 | 进入下一阶段的条件 |
| --- | --- | --- |
| Research | 本 Brief、候选来源与外推禁区。 | 来源事实和本书模型分开。 |
| Outline | 小节、图示、示例、案例与前后章节边界。 | 每一节只承担一个协作责任。 |
| Draft | 原创正文、图文和代码链接。 | 没有把计划、所有权或摘要写成执行事实。 |
| Example | 红灯、纯内存实现、测试和演示。 | 实际命令结果可追溯。 |
| Review | 技术、事实、图示、语言和终审记录。 | 术语、来源和交付证据一致。 |
