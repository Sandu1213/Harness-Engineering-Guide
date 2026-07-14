# Next Task

初始工程已通过独立 lint 与链接校验。只领取一个任务；完成后重新排序本文件，避免同时推进相互依赖的章节阶段。

## P0：审查全书大纲

**目标：** 审查 47 章大纲，消除重复章节并确认章节依赖。

**交付物：** 更新 `.ai/outline.md`、`docs/SUMMARY.md`、`.context/DECISIONS.md`；如有调整，同步 `.ai/progress.md`。

**验收：** 每章能说明目标、核心问题、前后依赖、图示、案例和交付物；不存在两个章节承担相同主问题；章节合并仍覆盖原始 58 个主题。

## P1：创建第一章 Research Brief

**目标：** 为第 1 章“从 Prompt Engineering 到 Harness Engineering”创建可追溯的研究简报。

**交付物：** `docs/part-01-foundations/01-prompt-to-harness.research.md`，并更新 `.ai/references.md` 与 `.ai/progress.md`。

**验收：** 明确研究问题、关键术语、权威来源、事实与工程扩展边界、章节风险和待核验项；不写完整正文。

## P2：建立最小 Harness 示例

**目标：** 建立第一个可运行、可验证的最小 Harness 示例。

**交付物：** `examples/agent/` 下的独立示例、README、运行命令与测试或可观察验证。

**验收：** 不依赖真实密钥；展示指令、状态、工具接口和验证闭环；运行结果如实记录。
