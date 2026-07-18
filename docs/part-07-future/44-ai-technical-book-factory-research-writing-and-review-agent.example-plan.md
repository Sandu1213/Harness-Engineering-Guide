---
title: "第 44 章示例计划：内容生产交接准入"
chapter: "44"
status: "completed"
updated_at: "2026-07-17"
---

# 第 44 章示例计划：内容生产交接准入

## 目标与边界

`assessContentProductionHandoff(input)` 只判断调用方注入的六类 Role Contract、Versioned Queue Item、artifact 版本、Content Evidence Package、Review/Fact Check 双门、冲突、Rework Envelope、循环状态和 Human Decision。它不读取仓库、文件、环境变量、模型、网络、数据库、真实队列、身份系统或出版系统，也不执行研究、写作、审查、事实核验、返工、集成或批准。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象，返回确定性状态、原因和下一责任入口；打印无副作用教学 JSON。 | 调用 Agent／模型，读写文件，启动队列，改变共享状态，执行 gate、集成、审批或出版。 |

所有返回对象固定包含 `executionPerformed: false`。`ready_for_chapter_integration` 只表示可以把注入证据提交给真实 Integration Gate，不表示文件已集成、Chapter DoD、Validation、Completion 或出版批准。

## 公开输入

```js
assessContentProductionHandoff({
  taskApplicable,
  roleContracts,
  queueItem: {
    queueItemId,
    roleId,
    taskContractVersion,
    inputPackageId,
    inputArtifactVersion,
    ownedOutputPaths,
    dependsOn,
    invalidationCondition,
    attempt,
    status,
    integrationOwner,
  },
  artifactVersions: { queueInput, current },
  evidencePackage: {
    packageId,
    taskContractVersion,
    inputArtifacts,
    outputArtifacts,
    claimLedger,
    executionEvidence,
    reviewFindings,
    factVerdicts,
    conflictsAndUnknowns,
    humanDecision,
  },
  cycleState,
  reworkEnvelope,
});
```

六类 `roleContracts` 分别为 `research`、`outline`、`writing`、`review`、`fact_check` 和 `human_author_editor`，每项都要具备正文定义的九个 Role Contract 字段。Queue Item 的 `integrationOwner` 只是责任引用，不表示锁、身份或权限。

## 公开输出与保守优先级

函数返回 `status`、`code`、`packageId`、`next`、`responsibleRole`、`integrationOwner` 和 `executionPerformed`。保守路由顺序为：

1. 任务不适用：`not_applicable`。
2. 六类角色契约不完整：`needs_role_contract`。
3. Queue Item 或 Content Evidence Package 的硬字段／claim 来源缺失：`needs_evidence`。
4. 输入变化命中 `invalidationCondition`，或影响范围未知：`stale_input`。
5. Review 有未关闭 `must_fix`／`should_fix`：`needs_revision`。
6. Fact Check 有 `reject`／`unknown`，或有带有效返工信封的 `source_conflict`：`needs_fact_resolution`。
7. 循环耗尽、冲突无法自动路由，或人工决定为延期／拒绝：`needs_human_decision`。
8. 两门无阻塞且尚无人工决定：`ready_for_human_review`。
9. 具名人类对当前 package 接受集成：`ready_for_chapter_integration`。

`source_conflict` 的下一责任顺序固定为 Research 补充时间、版本、范围与来源，再由 Fact Check 重判。缺少 Rework Envelope 时输出 `needs_evidence`，而不是凭空启动返工。

## TDD 计划

1. **RED：** 已先创建行为测试并运行 `node --test examples/agent/content-production-handoff-assessment.test.mjs`；退出码 1，唯一失败为 `ERR_MODULE_NOT_FOUND`，指向尚不存在的实现模块。
2. **GREEN：** 已创建最小纯函数并重跑同一命令；退出码 0，17 项通过、0 项失败。
3. **RED-2／GREEN-2：** 将三个 `source_conflict` 测试同时注入 Fact `unknown` 后，当前实现出现 3 项失败，证明通用事实门错误地先于冲突路由；把 source-conflict 分支移到通用 Fact Gate 之前后，17 项重新全部通过。
4. **REFACTOR：** 只提取输入完整性、双门、失效和返工信封判断，没有新增状态、依赖或外部动作。
5. **EXECUTE：** 已运行 CASE-44-A/B/C 教学演示；退出码 0，分别输出 `ready_for_human_review`、`needs_fact_resolution` 和 `stale_input`，三条结果均为 `executionPerformed: false`。

## 实际运行结果

| 阶段 | 命令 | 退出码与结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/content-production-handoff-assessment.test.mjs` | 1；1 项装配失败，`ERR_MODULE_NOT_FOUND` 指向尚未创建的实现模块。 |
| GREEN | 同一测试命令 | 0；17 项通过、0 项失败。 |
| RED-2 | source-conflict 测试同时注入 Fact `unknown` 后运行同一命令 | 1；14 项通过、3 项失败，均定位到通用 Fact Gate 抢先路由。 |
| GREEN-2 | 调整最小路由顺序后运行同一命令 | 0；17 项通过、0 项失败。 |
| EXECUTE | `rtk node examples/agent/content-production-handoff-assessment.mjs` | 0；CASE-44-A/B/C 分别返回人工终审、事实处理和输入失效路线，全部 `executionPerformed: false`。 |
| SYNTAX | `rtk node --check` 分别检查实现和测试 | 两个命令均退出码 0。 |
| SIDE-EFFECT SCAN | 定向扫描文件、网络、子进程、环境变量和写入 API | 无匹配。 |

## 测试矩阵

| 行为 | 预期状态 | 不证明 |
| --- | --- | --- |
| 任务不适用。 | `not_applicable` | 真实任务已取消。 |
| 任一必需 Role Contract 缺失或字段不完整。 | `needs_role_contract` | 系统创建了角色或权限。 |
| Queue Item 缺 `integrationOwner`，或 claim 缺来源映射。 | `needs_evidence` | 已补齐队列或来源。 |
| artifact 版本变化但失效条件未触发且影响已知。 | 继续检查下游 gate | 版本变化永远安全。 |
| 失效条件触发或影响未知。 | `stale_input` | 已执行重审或自动合并。 |
| Review 有开放阻塞 finding。 | `needs_revision` | Writing 已返工。 |
| Fact Check 为 `reject`／`unknown`。 | `needs_fact_resolution` | 来源已补齐或 claim 已删除。 |
| `source_conflict` 缺返工信封。 | `needs_evidence` | 自动循环可以开始。 |
| `source_conflict` 有有效信封和预算。 | `needs_fact_resolution`，Research → Fact Check | 两个角色或工具真实运行。 |
| 循环耗尽。 | `needs_human_decision` | 人工已收到或作出决定。 |
| 两门无阻塞且无人类决定。 | `ready_for_human_review` | 已接受集成。 |
| 人工退回。 | `needs_revision` | 修订已经发生。 |
| 人工接受当前 package。 | `ready_for_chapter_integration` | 文件已集成、章节完成或可出版。 |

## 运行前提

只需要本仓 Node.js。测试和演示使用虚构注入对象，不读取本仓真实 Agent、队列、审查、人工决定或出版状态。

## 文件与接入

- 实现：`examples/agent/content-production-handoff-assessment.mjs`。
- 测试：`examples/agent/content-production-handoff-assessment.test.mjs`。
- 正文 front matter 只登记实现路径；测试和演示通过上述直接命令运行。
- 按任务边界未修改 `package.json`、`scripts/validate.sh`、Examples README、术语表、进度或上下文文件。
