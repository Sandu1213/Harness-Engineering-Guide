---
title: "附录 A–D Final Review"
scope: "docs/appendices/a-prompt-library.md through d-memory-templates.md"
status: "completed"
updated_at: "2026-07-17"
---

# 附录 A–D Final Review

## 审查范围

本轮独立审查以下读者附录：

- `docs/appendices/a-prompt-library.md`
- `docs/appendices/b-skill-library.md`
- `docs/appendices/c-workflow-library.md`
- `docs/appendices/d-memory-templates.md`

依据包括 `.ai/outline.md` 的目标交付物、`.ai/prompts/`、`templates/skill-template.md`、`templates/workflow-template.md`、`templates/memory-template.md`、`templates/decision-template.md`，以及第 7、8、10、16、34 章的术语和责任边界。

## 结论

四个附录在最小修正后可以直接供读者复制和裁剪。Prompt、Skill、Workflow 与 Memory 的示例均保留输入、输出、权限、副作用、证据、失败或停止条件，没有把文本工件写成产品能力、运行时授权或实际执行结果。

附录继续作为读者适配层：项目 Prompt 和模板仍由 `.ai/prompts/` 与 `templates/` 维护。A–D 没有复制共享项目状态，也没有成为 Skill 登记、Workflow 状态或 Memory 事实的第二权威来源。

## Must Fix 与处理

| 附录 | 问题 | 最小修正 | 状态 |
| --- | --- | --- | --- |
| B | Skill Contract 缺触发条件、非触发条件、工具/副作用边界和按状态验证；注册表样例混合契约全文与登记责任，并含看似真实的路径、owner 和版本。 | 补齐契约责任字段；注册表改为稳定 ID、触发范围、契约指针、依赖、评估证据、质量等级和生命周期；未核验值改为占位符。 | 已修复 |
| C | 技术章节工作流从 Language Editing 直接进入 Validation，遗漏当前项目使用的 Final Review；失败恢复写死“幂等键重试一次”，与第 10 章拒绝固定重试次数和效果未知先补证的边界冲突。 | 增加 `final_reviewed`；改为先核对效果身份、观察和声明的重试预算，再选择预算内重试、补证、恢复、回滚或升级。 | 已修复 |
| D | 共同头部使用 `type`、`sources` 和 `expires_when`，缺第 7 章 Memory Record 的 `subject`、`write_reason`、`read_trigger`、`validity` 与修订/撤销路径；Decision 模板缺明确理由字段。 | 对齐为 `kind`、`source` 和完整 Memory Record 责任字段；补充失效状态、决定理由及正式 Decision 模板入口。 | 已修复 |

## Should Fix 与处理

| 附录 | 问题 | 最小修正 | 状态 |
| --- | --- | --- | --- |
| A | Prompt Card 契约要求边界和验证，但各卡没有统一列出副作用/权限与停止条件；读者示例和项目 Prompt 的权威关系还可更明确。 | 为八张卡补充副作用/权限与停止条件；明确代码块是可裁剪读者示例，项目语义先更新 `.ai/prompts/`。 | 已修复 |
| A | Example 卡把 RED 写成所有示例的统一要求。 | 收窄为行为代码或缺陷；文档、配置和只读样例使用对应检查并记录理由。 | 已修复 |
| B | `active` 生命周期容易被误读为达到 `maintained` 质量或已授权。 | 明确质量等级与生命周期是两条轴，教学状态不是产品枚举或执行证据。 | 已修复 |
| C | 软件变更样例可能把 `red` 状态机械套用到文档和配置任务。 | 将 C2 限定为行为变化或缺陷；其他任务复用既有检查，不伪造失败。 | 已修复 |
| C、D | 读者样例与项目源模板可能随时间漂移。 | 明确先更新权威模板和实际工件，再刷新附录；D 另补 Handoff Prompt 入口。 | 已修复 |

## 分册复核

- **附录 A：** 八张 Prompt Card 可按研究、提纲、正文、审查、示例、图示、事实核验和交接检索；每张卡均有必需输入、输出、权限边界、禁止外推、停止条件和验证。
- **附录 B：** Skill Contract、注册表样例、两张 Skill Card、选择/执行/批准分层、测试矩阵和生命周期可以独立使用；登记、契约、质量和权限没有混为一体。
- **附录 C：** 通用契约、章节生产、软件变更、内容队列、失败恢复和并行清单均保留状态、迁移、证据和责任；固定重试与效果未知的危险捷径已移除。
- **附录 D：** Project Fact、Decision、Lesson Candidate、Research Summary 与 Handoff 模板共享来源、主体、范围、读取触发、失效和修订责任；候选经验不会因一次测试通过自动写入长期记忆。

## 定向验证

- `markdownlint-cli2` 检查 A–D：4 个文件，0 个错误。
- `markdown-link-check` 检查 A–D：9、3、2、5 个链接，共 19 个链接全部通过。
- 四个附录的表格、代码围栏和相对路径均可由当前 Markdown 工具解析。
- 纳入本记录后的最终定向 Markdown lint：5 个文件、0 个错误；本记录不含链接。
- 五个文本文件的尾随空白扫描无匹配，均以换行结尾；`rtk git diff --check` 退出码 0。逐文件 `--no-index --check` 仅以退出码 1 表示未跟踪内容差异，没有空白诊断。

## 未运行与修改边界

- 未执行任何 Prompt、Skill、Workflow、Memory 写入、产品能力、网络、账户、权限或外部系统动作。
- 未运行全仓 `npm run validate`；定向检查不证明其他附录、章节或共享状态通过。
- 未修改 README、SUMMARY、`.ai/*`、`.context/*`、项目模板或正文章节。
- 未执行 Git 写操作。
