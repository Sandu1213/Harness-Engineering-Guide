# 第 17 章 Peer Review

## 审查范围

- 工件：第 17 章正文、Research Brief、候选资料、Fact Check、Example Plan、`evaluation-spec-assessment` 纯内存示例、测试与 Mermaid 图源/导出图。
- 审查类型：独立技术、事实边界、相邻章节职责、示例分支与图文一致性审查。
- 使用的规则与来源：`BOOK_RULES.md`、`.ai/review-checklist.md`、第 15/16/18 章既有职责边界、正文中的 C17-REF-01 至 C17-REF-04 限定陈述。

## 结论

**需修复。** 来源归因、相邻章节划分、纯内存边界和 Mermaid 图文一致性总体合格；但质量门对“未知 / 缺状态”的必需证据作出 `rejected`，与正文的保守规则冲突，且示例缺少正文承诺的证据范围与新鲜度准入。修复后应重新运行专用测试、演示和局部文档校验。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `examples/agent/evaluation-spec-assessment.mjs`，`record.status !== 'passed'` 分支；正文“证据矩阵与质量门”与 Example Plan 的判定顺序 | `unknown` 或缺失 `status` 的必需证据被返回为 `rejected` / `criterion_not_passed`，把“未知”误写成已经失败。 | 实际只读探针输入一个 `human_review`、`status: 'unknown'` 的必需标准，输出为 `rejected` / `criterion_not_passed`；缺 `status` 也相同。正文明确列出 `unknown` 的来源复核为 `needs_evidence`，并规定只有“适用但失败”的必需证据才进入 `rejected`。 | 增加 `unknown` 与缺/非法状态的精确测试；将它们路由为 `needs_evidence`（可使用独立代码），仅显式 `failed` 进入 `rejected`。同步 Example Plan 和正文的状态说明。 |
| `examples/agent/evaluation-spec-assessment.mjs` 的 Evidence Record 处理；正文第 17 章工作流程第 3 步、案例“当前范围内的通过记录”与实现说明 | 实现只要求 `criterionId`、`kind`、`status`，因此缺关联对象、采集/观察时间和刷新条件的 `state_observation: passed` 可直接 `accepted`，与正文“固定证据形状、缺字段时不能进入接受路径”和“当前范围内”不一致。 | 正文列出关联对象、采集方式和刷新条件，并说明缺字段不得进入接受；当前主示例本身没有这些字段，而实现也没有对应守卫。第 15 章负责观察新鲜度，不能由第 17 章静默省略后仍声称验证了当前状态。 | 二选一且保持一致：要么为教学 Quality Gate 增加最小 `subject` / `observedAt` 或 freshness 字段、相应 policy 与测试；要么明确缩小正文和 Example Plan 的承诺，说明本函数只演示标准/种类/状态，不验证范围或新鲜度，真实 Evidence Record 的该部分由第 15 章及后续实现提供。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| `examples/agent/evaluation-spec-assessment.mjs` 的 `if (!record) { continue; }` 可选标准路径；正文“可选项进入 needs_review” | 一个可选标准完全没有记录时函数返回 `accepted`，但正文把可选项描述为不应被悄悄忽略，并用 `needs_review` 表示未满足的可选质量项。 | 当前测试只覆盖“可选项存在且失败”，没有定义“可选项缺证”的契约，读者无法判断这种接受是否有意。 | 明确定义可选标准缺证的语义并测试：若应进入复核，返回 `needs_review`；若允许忽略，正文改为“未启用的可选标准不阻塞接受”，避免“不能被忽略”的表述。 |
| `.memory/reviews/2026-07-16-chapter-17-technical-review.md` 的相邻章节说明 | 写作“第 16 章负责反思和经验写入”，但第 16 章的边界是候选、可证伪检查与准入审查，不自动写入经验。 | 虽不改变正文功能，却会误导后续接手者把第 16 章当成持久化或策略修改层。 | 改为“第 16 章负责反思和经验候选 / 准入入口；跨任务写入仍需审查”。 |

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| `assessEvaluationSpec` 的 `successCriteria` 解析 | 若 `criterion.id` 是证据关联键，拒绝重复 ID 或在 Evaluation Spec 中声明重复 ID 的聚合语义。 | 避免同一条证据无意满足两个同名标准，保持 Evidence Matrix 的一一关联。 |
| 图示 | 在下一次图示迭代中，可将“规格不完整”与“证据缺失 / 不适用”分开标注，或在读图说明中明确它们都归入 `More`。 | 图能更直接映射 `needs_spec`、`needs_evidence` 与 `needs_review` 三种输出，同时保持图的简洁。 |

## 已确认事项

- C17-REF-01 的 Anthropic 文章、C17-REF-02/03 的 NIST 风险管理背景和 C17-REF-04 的 LLM-as-a-judge 偏差研究均只用于各自限定陈述；Evaluation Spec、Evidence Matrix、Quality Gate、四类标准和教学案例明确是本书模型。
- 第 15 章提供观察与新鲜度输入；第 16 章处理失败后的候选反思；第 17 章给出评估结论；第 18 章消费结论设计恢复。正文没有把评估门写成执行、权限授予或重试命令。
- Mermaid 源与正文图块经 `diff -u` 比较无差异；PNG 实际查看可读。模型评判只通向 Evidence Record，接受与拒绝都反馈给第 18 章，图没有宣称外部任务已完成。
- 示例明确为无 I/O 的注入对象判断；没有把 `accepted` 描述成真实 Markdown、链接、模型、CI、权限或用户体验验证。

## 已执行验证与未验证范围

实际只读执行：

```bash
node --input-type=module -e "...assessEvaluationSpec(...status: 'unknown'...)..."
awk '...' docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md > /tmp/chapter-17-mermaid-from-doc.mmd
diff -u diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd /tmp/chapter-17-mermaid-from-doc.mmd
```

第一条探针证实必需标准的 `unknown` 与缺 `status` 都错误返回 `rejected`；同时显示缺证据的可选标准目前返回 `accepted`。图源比较退出码 0、无输出；导出 PNG 已实际查看。未重新运行第 17 章测试、lint、链接检查或来源网页，避免与原作者的完成记录重复；本审查不修改第 17 章工件或共享状态。

## 修复核对

已核对第 17 章作者在本审查后提交的局部修复：

- 必需证据的 `unknown` 与缺失 `status` 均返回 `needs_evidence` / `criterion_evidence_status_not_confirmed`；只有显式 `failed` 才返回 `rejected` / `criterion_not_passed`。
- `task.scope`、`record.scope`、`record.freshness` 与 `policy.requiredFreshness` 成为接受路径的最小契约；范围不匹配和不新鲜记录均返回 `needs_evidence`。
- 可选标准缺记录返回 `needs_review` / `optional_criterion_evidence_missing`；可选标准显式失败仍返回 `needs_review`。
- 第 16 章的说明已改为反思/经验候选与准入审查，不再暗示自动经验写入。

作者实际重新运行 `node --test examples/agent/evaluation-spec-assessment.test.mjs` 与演示，结果为 14 项通过、0 项失败，演示退出 0 并输出 `accepted` / `evaluation_accepted` / `docs-update-evaluation`。上述四项必须/应该修复已关闭；“重复标准 ID 的聚合语义”和图示出口标注仍为非阻塞建议，未在本轮改变接口或图示。
