# 第 15 章交叉审查：Observation 与状态感知

## 审查范围与方法

- 只读审查第 15 章正文、Research Brief、Outline、局部参考资料、事实核验、Example Plan、示例实现/测试与 Mermaid 源/导出图。
- 独立执行 `node --test examples/agent/observation-snapshot-assessment.test.mjs`、演示入口，以及正文 Mermaid 块与 `.mmd` 的 `diff -u` 比较；PNG 已视觉检查。
- 对来源登记与共享引用表执行精确文本核对。未修改第 15 章或任何共享文件。

## 结论

第 15 章将动作请求、动作层返回、状态观察、评估接受和业务完成分开，来源主语与教学边界总体清楚。专用测试本次独立运行得到 10 项通过、0 项失败；演示输出受限的 `observed` / `expected_state_observed`；正文 Mermaid 块与源文件一致，导出 PNG 可读。

不过，章节目前仍有一项项目级引用阻塞，以及两项会让纯内存示例产生保守但错误解释的边界缺口。以下分级供主线程收口。

## Must fix

### M1. 正文仍以局部 `CH15-REF-*` 引用发布，且正式引用未进入全局登记

- **证据：** 正文 Front matter 和行内来源使用 `CH15-REF-01` 至 `CH15-REF-04`；局部参考资料称它们应映射为 `REF-053` 至 `REF-056`。本次运行 `rg 'REF-05[3-6]' .ai/references.md .ai/progress.md docs/SUMMARY.md .context/CURRENT_STATE.md` 没有结果；终审记录也明确写着共享整合仍待完成。
- **影响：** 章节 Front matter 标记为 `complete`，但项目宪法要求可归因事实登记到 `.ai/references.md`。读者无法从全局引用表追溯 OpenTelemetry、W3C 与 Playwright 的限定来源。
- **最小修复：** 主线程将四条来源登记为正式 `REF-053` 至 `REF-056`（或实际未占用编号），保留局部映射，并把正文 Front matter、行内链接表和状态工件同步为正式编号后再将章节标为项目级完成。

## Should fix

### S1. `previousSnapshot` 未验证关联与目标，却参与推进性判断

- **证据：** `assessObservationSnapshot` 只比较 `previousSnapshot?.fingerprint === snapshot.fingerprint`。独立复现中，当前快照属于 `ui-click-1` / `submit-status`，前一快照属于 `other-action` / `other-target`，两者恰有相同指纹；函数返回 `needs_evidence` / `snapshot_not_advanced`。
- **影响：** 这是保守的假阴性，不会错误接受任务，但它把无关对象的指纹解释为本次行动没有推进，违背本章强调的关联与目标边界。
- **最小修复：** 仅在前一快照的 `correlationId` 和 `target` 都匹配当前行动时比较指纹；为无关前一快照的“应接受”路径补一条测试。若刻意要求调用者只传同一对象，则在接口与示例计划写成可检查的前置条件并测试拒绝错配输入。

### S2. 图中 `blocked` 无条件回到观察点，弱化了“停止或升级”边界

- **证据：** Mermaid 图中 `Unknown[blocked] --> Point` 是唯一出口。正文虽说这“不等于无条件重试”，但图本身没有暂停、交接或第 18 章的条件节点。
- **影响：** 读者可能把效果未知、目标错配或未知状态理解成自动循环观察；这会与第 18 章负责决定恢复、停止或升级的边界相冲突。
- **最小修复：** 把箭头标为“在已定义的观察策略内重新观察”，并增加“停止 / 升级到第 18 章”的出口；或保留当前图但删去暗示自动回环的连线，改为文本说明由恢复策略决定是否重新观察。

## Suggestions

### G1. 为不完整行动/契约输入增加显式教学出口

当前函数会在 `action` 或 `observationContract` 缺失必要字段时直接解引用或将缺失期望状态解释为不匹配。虽然现有示例只传完整输入，但增加 `needs_evidence` / `observation_contract_incomplete` 之类的保守路径，会让“契约缺失”与“观察未匹配”更容易区分。

### G2. 让图的终点更精确区分 `observed` 与 `not_observed`

当前图将二者放在同一节点，正文已作充分解释。若后续图示维护需要增强可扫描性，可拆为两个节点并注明两者都不是第 17 章的 `accepted`；这不是当前语义错误。

## 已确认无问题的部分

- OpenTelemetry、W3C Trace Context 与 Playwright 的陈述都在局部参考资料和 Fact Check 中限定为各自来源的范围，正文没有把它们写成通用 API、真实运行时或业务完成保证。
- 第 16 章只消费观察轨迹做反思、第 17 章独立评价结果、第 18 章决定恢复这一责任边界在正文、Outline 与 Example Plan 中一致。
- 纯内存示例不调用浏览器、网络、文件、模型、Tool、时钟、凭证或外部系统，且正文没有把 Node 测试描述为真实 UI 验证。
- Mermaid 源与正文块独立比较无差异，PNG 节点和箭头可读。
