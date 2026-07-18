---
title: "第 44 章 Research Brief：AI Technical Book Factory"
chapter: "44"
status: "completed"
updated_at: "2026-07-17"
---

# 第 44 章 Research Brief：AI Technical Book Factory

## 要解决的读者问题

把 Research、Writing、Review 和 Fact Check 分给不同 Agent，不能自动得到更可靠的技术书。分工可能只把一次生成拆成更多次生成：研究结论在交接时失去来源，写作者补齐未知事实，审查者重写作者观点，事实核验者只检查链接存在，最终没有人能回答“这句内容为什么可以进入书稿、谁决定接受它、哪个版本被审过”。

本章研究的核心不是怎样让更多 Agent 同时产字，而是怎样为每个角色限定输入、输出、禁止动作和停止条件，并让每次返工都携带可追溯证据。最终交付仍由具名人类作者或编辑承担责任；Agent 产物只是候选工件、发现或建议。

## 研究范围与非范围

| 读者问题 | 本章研究的回答 | 本章不回答 |
| --- | --- | --- |
| 多角色为什么值得拆分？ | 当任务职责和评价标准确实不同，可用角色契约隔离资料搜集、结构规划、原创表达、技术审查和事实核验。 | 多 Agent 必然比单 Agent 更快、更准或更省成本。 |
| 角色之间传递什么？ | 传递带输入版本、来源映射、允许用途、产物摘要、验证结果、未决项和下一责任人的 Content Evidence Package。 | 把聊天历史、整段网页或一句“已完成”当作交接。 |
| 审查发现问题后如何返工？ | 用具名 finding、责任角色、受影响工件、重开条件和最大循环形成有界回流。 | 允许角色无限互评，或让写作者自行关闭所有异议。 |
| 来源冲突或审查意见冲突怎么办？ | 先冻结争议陈述，区分事实冲突、范围冲突、结构冲突和偏好冲突，再由相应角色补证；无法消解时升级具名人类。 | 用投票数、模型自信或更流畅的措辞代替证据和责任决定。 |
| 怎样判断工厂输出可进入书稿？ | 硬性门检查来源、派生关系、角色独立性、返工关闭证据和人工接受记录；质量指标只辅助诊断。 | 自动出版、版权判断、事实永久正确、读者效果或法律合规保证。 |

## 已核验的一手资料与受限用途

| 本地键 | 来源明确表达的内容 | 允许用于本章的范围 | 不可外推 |
| --- | --- | --- | --- |
| CH44-REF-01 | Anthropic 区分预定义代码路径的 workflow 与动态决定过程的 agent，并讨论 prompt chaining、parallelization、orchestrator-workers 和 evaluator-optimizer；其 evaluator-optimizer 适用于评价标准清晰且迭代改进可测的场景。 | 支持“先选择最简单编排、固定阶段可用 workflow、生成与评价可分开并形成反馈循环”的工程背景。 | 本章角色、状态机、模型数量、循环次数、并行安全、性能或质量保证。 |
| CH44-REF-02 | NISO CRediT 列出 Investigation、Validation、Writing – original draft、Writing – review & editing、Supervision 等贡献角色，并明确 CRediT 用于描述贡献，不用于决定 authorship。 | 支持研究、验证、初稿、审阅和监督可作为不同贡献责任描述的背景。 | CRediT 是 Agent 协议、出版审批规则，或把某角色标签赋给 Agent 就产生作者身份与责任。 |
| CH44-REF-03 | Anthropic 的 Agent eval 文章区分 task、trial、grader、transcript 和 outcome，并把 evaluation harness 与 agent harness 分开。 | 支持记录“任务、一次尝试的完整轨迹、最终工件状态和评价”不能互相替代；为工厂质量证据设计提供受限类比。 | 文章术语是内容工厂标准，评分器可靠，或一次高分能证明正文正确。 |
| CH44-REF-04 | W3C PROV-DM 用 Entity、Activity、Agent 及 generation、usage、derivation、attribution、association 等关系表达 provenance。 | 支持证据包记录“哪个活动使用了哪个输入、生成了哪个版本、由谁关联或负责”的通用溯源背景。 | 保存 provenance 就证明来源真实、事实正确、授权充分、审查独立或内容可发布。 |
| CH44-REF-05 | WAME 在学术出版语境中建议只有人类能作为作者，作者应说明生成式 AI 的使用并对相关内容、准确性和来源归属负责。 | 支持本章将最终作者责任、透明披露和出版决定保留给具名人类的出版伦理背景。 | WAME 建议适用于所有图书、司法辖区或合同；也不提供本章的工作流、权限或法律意见。 |

访问日期均为 2026-07-17。CH44-REF-01 至 CH44-REF-05 已分别映射 REF-029、REF-134、REF-061、REF-135 与 REF-136。完整 URL 和外推禁区见[本章参考资料](44-ai-technical-book-factory-research-writing-and-review-agent.references.md)。

## 本仓库作为案例的事实边界

当前仓库已经分别保存 `.ai/prompts/research.prompt.md`、`writing.prompt.md`、`review.prompt.md`、`fact-check.prompt.md` 与 `handoff.prompt.md`。这些文件可证明项目把研究、写作、技术审查、事实核验和交接写成了不同提示入口；它们不能证明：

- 每个阶段由独立 Agent 实际执行；
- 角色之间存在进程隔离、文件锁、队列或权限系统；
- 任一提示已被完整遵守，或其输出已通过人工接受；
- 第 1 章曾由本章描述的工厂重新生产；
- 本章所设计的 Evidence Package、冲突记录或状态机已在仓库中实现。

因此计划案例只能使用仓库中已经存在的第 1 章阶段工件构造“可检查的教学交接”。若后续正文要声称某个 Agent、队列、审查门或自动化实际运行，必须在对应阶段生成新的执行证据。

## 角色契约的最小模型

角色契约至少包含 `roleId`、`objective`、`inputVersion`、`allowedInputs`、`ownedOutputs`、`forbiddenActions`、`acceptanceChecks`、`stopConditions` 和 `handoffTarget`。同一个模型可以在不同时间承担多个角色，但角色状态、输入和输出必须分开；“换了 Prompt”不等同于独立审查。

| 角色 | 允许输入 | 专属输出 | 禁止冒充的责任 | 保守停止条件 |
| --- | --- | --- | --- | --- |
| **Research Agent** | Chapter Contract、研究问题、来源政策和允许检索范围。 | Research Brief、Source Card、Claim Candidate、来源冲突与未知项。 | 不写完整正文，不把搜索摘要当最终来源，不批准陈述进入书稿。 | 找不到一手来源、来源互相冲突、动态事实无法确认或访问受限。 |
| **Outline Agent** | 已接受的 Research Brief、Chapter Contract 和相邻章节边界。 | 逐节问题、论证顺序、来源路由、计划示例/图示和非范围。 | 不新增事实，不把结构完整写成内容完成。 | 关键学习目标无证据路径、章节重叠或输入研究版本漂移。 |
| **Writing Agent** | 已接受的 Outline、允许使用的 Claim Candidate、术语与风格规则。 | 原创草稿、逐项 claim 引用、明确的 `TODO(verify)：` 和需审查位置。 | 不自行扩大来源结论，不关闭自己的审查问题，不声称未执行的示例或工具结果。 | 需要的事实不在允许清单、示例结果未知或结构必须重做。 |
| **Review Agent** | 固定草稿版本、Chapter Contract、Review Checklist 和证据包。 | 按 must-fix/should-fix/suggestion 分类的 finding，包含位置、理由、最小修复和责任角色。 | 不把个人风格偏好冒充事实错误，不静默改写来源，不批准出版。 | 无法确认审查范围、输入版本变化、证据缺失或发现跨章架构冲突。 |
| **Fact Check Agent** | 固定草稿、claim ledger、一手来源、访问日期和运行证据。 | 每条可归因陈述的 supported/narrow/reject/unknown 判定及来源范围。 | 不以链接可访问代替直接支持，不优化文风，不用模型自信补足证据。 | 来源不直接支持、动态资料过期、运行结果不可回放或陈述不可判定。 |
| **Human Author/Editor** | 所有版本、findings、事实判定、未决项和披露要求。 | 接受、退回、删减、延期或出版候选决定及其责任记录。 | 不把 Agent 的“通过”写成责任转移，不删除未解决异议的痕迹。 | 关键事实未知、版权/伦理问题未处理、职责冲突无法消解或证据包不完整。 |

Outline Agent 是本章生产图中的阶段角色，但不要求额外常驻 Agent。固定、可预测的步骤优先采用 workflow；只有子任务无法预先列出且收益可验证时，才考虑更动态的调度。这是本书对 CH44-REF-01 的工程扩展。

## Content Evidence Package

Content Evidence Package 是本书设计的内容生产交接包，不是 W3C PROV 实现，也不是出版批准。最小字段如下：

| 字段 | 最小内容 | 防止的错误 |
| --- | --- | --- |
| `packageId` / `taskContractVersion` | 唯一包标识、章节、阶段、输入契约摘要和创建时间。 | 不知道当前审的是哪个任务或哪个版本。 |
| `inputArtifacts` | 输入路径、版本/摘要、提供者和允许用途。 | 用更新后的输入解释旧输出。 |
| `outputArtifacts` | 输出路径、版本/摘要、生成活动与角色。 | 文件存在却无法说明由什么输入产生。 |
| `claimLedger` | claim ID、原句/意图、来源键、允许范围、派生说明和访问日期。 | 引用挂在段尾但不知道支持哪一句。 |
| `executionEvidence` | 实际执行的命令/检查、退出状态、结果与未覆盖范围。 | 把计划、历史结果或 mock 当成当前验证。 |
| `reviewFindings` | finding ID、严重度、位置、责任角色、状态和关闭证据。 | “已修改”却无法证明修复了哪个问题。 |
| `factVerdicts` | claim ID、直接支持程度、结论、来源版本和复核者。 | 链接存在被误写为陈述成立。 |
| `conflictsAndUnknowns` | 冲突类型、双方证据、冻结范围、升级对象和截止条件。 | 争议在重写中被悄悄消失。 |
| `humanDecision` | 决定人、接受范围、保留问题、披露和刷新条件。 | Agent 评分被误当成作者/编辑责任。 |

派生链至少能回答：Research Source Card 被哪个 Outline 使用；哪个 Outline 版本生成当前 Draft；Review 与 Fact Check 检查的是哪个 Draft；修订后哪些 finding 需要重开。CH44-REF-04 支持 provenance 关系的通用语义，但包字段、摘要策略和质量门均为本书模型。

## 审查门、冲突与有界回流

### 硬性门

以下任一情况都不能被平均分、写作流畅度或多数票抵消：来源缺失或越界、引用与 claim 无法对应、输入版本漂移、must-fix 未关闭、事实判定为 `reject`/`unknown`、运行结果未经实际执行、最终责任人缺失。

### 冲突分类与路由

| 冲突 | 先冻结什么 | 首要回流 | 人工介入条件 |
| --- | --- | --- | --- |
| 两个来源对同一动态事实不一致 | 争议 claim，不冻结无关章节。 | Research Agent 补充时间、版本、适用范围与一手来源。 | 仍无法判断权威性或必须选择解释。 |
| Writing 超出 Research 的允许结论 | 相关句及其派生段落。 | Fact Check 判定；Writing 删除、缩小或标 `TODO(verify)：`。 | 作者决定未知项是否值得保留。 |
| Review 与 Fact Check 结论不同 | finding 和对应 claim。 | 两者分别提交“标准/来源/推理”，禁止互相覆盖记录。 | 涉及事实解释、伦理、版权或章节方向。 |
| 两位 reviewer 给出互斥结构建议 | 受影响小节，不冻结已核验事实。 | Human Author 按学习目标和非范围选择，并记录理由。 | 默认需要；这是编辑判断，不适合多数票自动关闭。 |
| 修订改变已审内容的语义 | 旧批准或旧事实判定。 | 只重开受影响 claim、finding 和下游工件。 | 影响面无法可靠界定时重审整个章节。 |
| 达到最大返工次数仍未收敛 | 争议内容和自动队列。 | 输出 `needs_human_decision`，停止 Agent 循环。 | 必须介入；不得继续消耗以制造“共识”。 |

每次回流必须携带 finding ID、目标角色、允许修改范围、预期关闭证据和输入版本。Reviewer 只在看到修订 diff 与关闭证据后改变 finding 状态；Fact Check 只在重新读取来源后改变 claim 判定。CH44-REF-01 的 evaluator-optimizer 仅支持“生成—反馈—改进”的模式背景，不提供本表的状态或停止策略。

## 队列与并行边界

可并行的任务必须拥有不重叠输出或只读共享输入。例如不同来源的 Research Source Card、对固定草稿的技术审查与语言审查可以并行；同一正文段落的写入、共享引用编号、术语表、目录和进度状态应由唯一集成者处理。

队列项至少包含输入版本和失效条件。上游 Research 或 Outline 改变后，仍在排队的 Writing/Review 项不得继续沿用旧输入；已产生的结果标记 `stale_input`，而不是自动合并。并行只缩短独立工作的等待时间，不证明结果可组合、共享状态无冲突或审查具有独立性。

## 质量指标与不可替代的门

| 指标 | 可诊断的问题 | 不能证明 |
| --- | --- | --- |
| claim 来源覆盖率 | 哪些可归因陈述没有来源映射。 | 来源直接支持、陈述正确或引用充分。 |
| finding 重开率 | 修订是否频繁破坏已关闭问题。 | Reviewer 判断一定正确。 |
| 返工循环次数/停留时间 | 哪个角色接口或契约可能含糊。 | 越快越好、越少越高质量。 |
| stale-input 次数 | 队列与版本失效控制是否薄弱。 | 零漂移或没有遗漏的下游影响。 |
| `reject`/`unknown` claim 数 | 哪些内容必须删减、补证或人工判断。 | 章节整体价值或事实永久正确。 |
| 人工改写与退回原因 | Agent 输出在哪些类型上持续不适用。 | 人类没有偏差或最终内容已被读者验证。 |

指标用于发现系统问题，硬性门用于阻止错误状态前进，两者不能合并成一个“章节质量分”。CH44-REF-03 的 task/trial/transcript/outcome 分层有助于解释为什么评分、过程与最终工件状态应分别保存，但具体指标是本书设计。

## 计划图示

Mermaid 图将 `Chapter Contract` 连接到 Research、Outline、Writing、Review 和 Fact Check。Review 与 Fact Check 分别产生 finding/verdict，经 Conflict Router 回到 Research、Outline 或 Writing；版本漂移进入 `stale_input`，循环超限或争议未消解进入 `needs_human_decision`。只有 Human Author/Editor 接受完整 Content Evidence Package 后，才进入 `ready_for_chapter_integration`，而不是“已出版”。

图必须明确：

- `role_output_exists ≠ role_output_accepted`
- `review_passed ≠ facts_verified`
- `facts_verified ≠ publication_approved`
- `more_agents ≠ independent_evidence`

## 计划案例

案例使用第 1 章现有 Research、References、Outline、Draft、Fact Check 与 review 记录，构造一次不执行外部动作的多角色交接说明：

1. Research Agent 只把已存在的来源映射转成 Claim Candidate；
2. Outline Agent 把学习目标与 claim 路由到小节；
3. Writing Agent 针对一个受限小节生成候选修订，而非重写整章；
4. Review Agent 发现一个来源边界问题并生成 finding；
5. Fact Check Agent 对该 claim 给出 `narrow` 或 `reject`；
6. Human Author 选择改写、删除或保留 `TODO(verify)：`，并记录决定。

案例必须标明这些是基于仓库工件的教学输入，不声称 Agent、队列、模型调用、自动重写、外部审查或出版行为实际发生。

## 主要风险与后续核验

- **角色剧场：** 同一调用连续扮演作者与 reviewer，却没有固定输入版本、独立标准或证据，不能称为独立审查。
- **证据洗白：** 来源 URL、模型引用或评分存在，但没有 claim 级直接支持与外推边界。
- **无限回流：** 没有最大次数、停止条件与人类升级，Agent 可能反复改写而不增加证据。
- **共享状态冲突：** 并行角色同时修改正文、术语、引用或状态表，局部正确仍会破坏全局一致性。
- **指标替代责任：** 用覆盖率、分数或审查通过数弱化具名作者的最终判断。
- **出版语境外推：** WAME 与 CRediT 面向研究贡献/出版，本章只能借用有限责任和角色背景，不能当作一般图书法律规则。
- `TODO(verify)：` First Draft 当天重读 CH44-REF-01、CH44-REF-03 与 CH44-REF-05 的动态页面，并确认全局 REF 映射仍一致。
- `TODO(verify)：` Outline 阶段检查第 26、38、39、43、45 章，避免重复多 Agent 隔离、评价循环、评估套件、Book Harness 和跨工具接力。
- `TODO(verify)：` Example 阶段只能实现纯内存路由/准入函数；没有明确授权时不启动真实 Agent、模型调用、网络写入、队列、文件修改或发布。
- `TODO(verify)：` Final Review 重新核对所有 claim 的实际草稿版本、finding 关闭证据和人类决定，不沿用本 Brief 的历史访问结果。

## 下一阶段建议

Chapter Outline 应按“为什么拆角色 → 角色契约 → Content Evidence Package → 版本化队列 → Review/Fact Check 双门 → 冲突与有界回流 → 质量指标 → 人类最终责任 → 第 1 章交接案例”组织。正文应持续区分来源中的角色/编排/溯源背景、本仓库现有提示入口、本书设计的内容工厂模型和尚未执行的教学案例。
