---
title: "附录 E–H Final Review"
scope: "appendices-e-h"
stage: "Final Review"
status: "completed"
updated_at: "2026-07-17"
---

# 附录 E–H Final Review

## 审查范围

- `docs/appendices/e-evaluation-checklists.md`
- `docs/appendices/f-reflection-checklists.md`
- `docs/appendices/g-mermaid-guide.md`
- `docs/appendices/h-research-and-citation-guide.md`
- `.ai/outline.md`、`.ai/review-checklist.md`、`.ai/research-policy.md` 与 `diagrams/README.md`。
- 第 16、17、39、43、44 章的当前工程模型与责任边界。

## 结论

`可进入集中集成与全仓 Validation`。E 已把结果、过程、示例、图示和发布门槛映射到证据；F 已保持症状、可证伪根因假设、候选经验、准入决定与独立评估的分层；G 已覆盖 Mermaid 权威源码、正文逐字符一致性、实际渲染、导出图视觉审查与可访问性；H 已覆盖来源路由、Evidence Card、Claim Ledger、引用、版权、动态刷新和 Fact Check。

本结论只覆盖四个附录及本记录。它不表示共享 README、SUMMARY、进度或上下文已经同步，不表示全仓 Validation、外部动态来源刷新、全部 Mermaid 重新渲染、真实任务评估或发布批准已经完成。

## Finding 与处置

| ID | 严重度 | 发现 | 最小处置 | 状态 |
| --- | --- | --- | --- | --- |
| EH-FR-01 | must_fix | E 把具名人工决定与外部状态并列为结果证据，读者可能把“有人批准”外推为“事实正确或外部效果已发生”。 | 明确人工决定只证明决定发生及其适用范围，不能替代外部结果证据。 | closed |
| EH-FR-02 | must_fix | F 使用未定义的“复盘函数”能力表述，且 `accepted` 与第 16 章自动化最高状态 `eligible_for_review` 的边界不够显式。 | 改为流程或辅助工具，并明确工具输出不证明根因；`accepted` 只由具名责任者在声明范围内作出。 | closed |
| EH-FR-03 | should_fix | G 未明确资产规则的唯一权威位置，示例 `npx --yes` 也可能让验证隐式触发下载或联网。 | 声明 `diagrams/README.md` 为资产规则权威位置；优先用锁定依赖，下载或联网需授权并记录。 | closed |
| EH-FR-04 | should_fix | G 的命令只展示 PNG，未体现发布契约可能同时要求 SVG 与 PNG。 | 补充 SVG/PNG 渲染示例，并要求记录发布契约规定的全部输出路径。 | closed |
| EH-FR-05 | must_fix | H 将一般“问题记录”整体列为 B 级，可能把普通用户内容误作维护者证据；A–D 也可能被误读为通用标准。 | B 级收窄到维护者公开说明、确认记录和可复现技术报告，并声明 A–D 只是本书的核验路由模型。 | closed |
| EH-FR-06 | should_fix | H 在许可未知时使用“原创解释或自制图示”的出口，但未明确不得重建受保护的表达结构。 | 要求只基于独立核验事实重新表达，不复刻受保护结构。 | closed |

## Evaluation 与 Reflection 分层复核

- E 的 Evaluation Spec 在执行前冻结对象、输入、范围、成功标准、证据、硬门槛、判定者和失败出口；结果、过程、安全与资源不会被一个平均分互相抵消。
- E 区分确定性检查、外部状态、浏览器交互、人工决定和模型判断；模型评分与自我报告不能成为唯一事实来源。
- F 先记录可观察症状，再提出带预测、反证、最小验证和反事实的根因假设；候选经验不能从一次事件直接升级为全局规则。
- Reflection 只生成候选解释和改变；Improvement Evaluation 必须使用冻结的 Evaluation Spec、可比较基线和独立证据。同一套自我解释不能同时充当候选生成依据和独立验证证据。
- `eligible_for_review` 是自动化流程上限；长期记忆、规则、Skill、权限或跨项目经验仍需要具名责任者完成范围审查和写入决定。

## Mermaid 源码、正文与渲染复核

- `.mmd` 是权威源码，正文 Mermaid 代码块必须与对应源文件逐字符一致；多图章节按图名分别提取比较。
- 语法退出码只证明渲染器可处理源码，不证明语义或视觉正确。完成状态还需要打开真实 SVG/PNG，在目标尺寸检查裁切、重叠、字号、连线歧义、对比度和颜色依赖。
- Diagram Review Record 同时记录源码、正文位置、渲染器版本、完整命令、退出状态、发布契约要求的导出路径、视觉结论、替代文本、许可和未验证范围。
- 版本占位符不能直接执行；固定版本也不证明包已安装、来源可信或下载已获授权。

## 来源、版权与 Fact Check 复核

- H 的 A–D 分级只决定核验动作，不自动决定可信度；版本、时间、上下文和主张范围仍需逐项检查。
- Evidence Card 限定单项证据能支持与不能外推的结论；Claim Ledger 再把事实、推论、建议和实验结果映射到正文动作。
- Fact Check 冻结正文版本并回到原始来源或实际运行记录，逐项核对主体、谓词、数字、版本、时态和限定词；`unknown` 不会被搜索摘要或模型输出填平。
- 版权与事实核验保持两个独立硬门槛。可访问不等于可再发布，真实不等于可复制，获许可也不等于事实正确。
- 动态产品、版本、价格、规则、排行榜与组织角色仍需在终审窗口内刷新；本轮没有代替该刷新动作。

## 最小变更边界

- 仅对附录 E–H 的责任边界、权威位置、渲染契约、来源路由和版权出口做局部补齐。
- 未修改 README、SUMMARY、`.ai/*`、`.context/*`、章节正文或共享状态，也未执行 Git 写操作。

## 定向验证

- `rtk npx markdownlint-cli2 <E–H 与本记录>`：退出码 0，5 个文件、0 个错误。
- `rtk npx markdown-link-check -c .markdown-link-check.json <逐文件>`：退出码均为 0；E 为 5/5、F 为 3/3、G 为 1/1、H 为 3/3，本记录无超链接。
- `rtk rg -n '[[:blank:]]+$' <E–H 与本记录>`：退出码 1、无匹配，即未发现尾随空白；5 个文件的末尾换行检查通过。
- `rtk git diff --check -- <E–H 与本记录>`：退出码 0、无输出。五个文件当前均为未跟踪文件，另逐文件执行 `git diff --no-index --check /dev/null <文件>`；退出码 1 表示与空文件有差异，且无空白错误输出。
- `rtk git status --short -- <E–H 与本记录>`：五个目标文件均为 `??`；该检查只确认本轮终审范围，不代表共享工作树没有其他协作者产物。

## 未验证范围

- 未运行全仓 `npm run validate`，未同步 `.ai/progress.md`、`.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md` 或 `.context/HANDOFF.md`。
- 未重新访问外部动态来源，也未把 A–D 来源路由应用到全书全部 Claim Ledger。
- 未重新渲染全书 Mermaid，未逐张打开全部 SVG/PNG；本轮只审查附录 G 的流程契约。
- 未运行真实 Reflection、Evaluation、经验准入、外部批准、发布或长期记忆写入。
