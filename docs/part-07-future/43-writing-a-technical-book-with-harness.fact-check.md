---
title: "第 43 章事实核验：用 Harness 写一本技术书"
chapter: "43"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章事实核验：用 Harness 写一本技术书

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与访问日期 | 直接支持与限定结论 |
| --- | --- | --- | --- |
| FC-43-01 | Write the Docs 将 Docs as Code 描述为使用问题跟踪、版本控制、纯文本标记、代码审查和自动化测试等代码工具处理文档。 | CH43-REF-01／REF-131；2026-07-17 重读 [Write the Docs：Docs as Code](https://www.writethedocs.org/guide/docs-as-code/)。 | 页面直接列出上述五类工具。只支持社区工程背景；不保证内容正确、流程充分、适合所有团队或书籍可发布。 |
| FC-43-02 | Diátaxis 区分教程、操作指南、技术参考和解释，强调它们对应不同的文档用户需求。 | CH43-REF-02／REF-132；2026-07-17 重读 [Diátaxis](https://diataxis.fr/)。 | 页面直接说明四种需求和四种对应文档形式。正文只借用“先识别读者需求”的背景，不把它写成本书固定目录、唯一分类或完整质量标准。 |
| FC-43-03 | OpenAI 的评估指南建议任务特定、贴近真实分布、持续评估，并以人工反馈校准自动评分。 | CH43-REF-03／REF-117；2026-07-17 重读 [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices)。 | 当前页面直接包含 task-specific、real-world distributions、continuous process 和 human feedback calibration。正文只作书籍质量门的受限类比；不让自动评分替代技术、事实、语言、读者或出版判断。 |
| FC-43-04 | Reproducible Builds 将可复现构建限定为相同来源、构建环境和构建指令能由任何一方重建逐位一致的指定工件。 | CH43-REF-04／REF-133；2026-07-17 重读 [Reproducible Builds：Definitions](https://reproducible-builds.org/docs/definition/)。 | 定义页面直接支持该陈述。正文未声称当前 PDF/EPUB 已可复现、跨平台一致或供应链安全。 |
| FC-43-05 | Semantic Versioning 2.0.0 要求先声明 public API，并规定已发布版本的内容不得原地修改。 | CH43-REF-05／REF-109；2026-07-17 重读 [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)。 | 规范第 1、3 条直接支持该陈述。正文只借用“先声明读者可见契约”和“发布身份不静默覆盖”；不为自然语言章节套用主、次、补丁语义。 |

五项来源均保持 Research Brief 与 references 文件中记录的允许用途。当前 OpenAI 页面还包含产品状态、模型和 API 示例；这些动态信息不属于本章 claim，未带入正文。

## 本书工程模型与虚构输入

| 编号 | 工程模型或教学输入 | 事实边界 |
| --- | --- | --- |
| EM-43-01 | Book Contract、Chapter Contract、Stage Record、Chapter Evidence Package、Chapter DoD、Production Board 与 Publication Candidate Manifest。 | 均为本书从当前项目抽象的工件，不称为五项来源的产品、标准实现、权限系统或出版合同。 |
| EM-43-02 | `needs_evidence`、`validation_failed`、`state_drift`、`ready_for_completion_review`、`chapter_complete` 与 `publication_approval_required`。 | 是纯内存教学状态，不表示真实文件已修改、全仓命令已运行、批准已发送或发布已发生。 |
| EM-43-03 | 场景中的进度漂移、测试对象中的十个完整阶段和 Mermaid 图中的书籍生产链。 | 均为虚构或本书模型；不描述第 43 章当前真实 Completion、外部系统或参与者行为。 |

## 当前仓库与运行证据

| 编号 | 检查 | 当前结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-43-06 | 正文列出的项目规则、路线/目录、状态、术语/来源、模板/提示、示例/图示、验证/交接路径。 | 2026-07-17 逐项检查，路径均存在。 | 只证明仓库有可定位入口；不证明内容正确、状态同步、规则执行或全仓通过。 |
| FC-43-07 | `node --test examples/agent/book-chapter-completion-assessment.test.mjs` | 退出码 0；19 项通过、0 项失败。 | 纯函数对虚构注入对象按声明的阶段与硬性门路由；不读取真实章节状态。 |
| FC-43-08 | `node examples/agent/book-chapter-completion-assessment.mjs` | 退出码 0；输出 `ready_for_completion_review`、`chapter_evidence_ready`、`review_completion_record` 与 `executionPerformed: false`。 | 演示没有执行写作、Validation、构建、批准或发布。 |
| FC-43-09 | Mermaid 图源、正文图块、SVG/PNG 与视觉审查记录。 | PNG 为 1514×7196；正文图块与 `.mmd` 均为 2002 个字符且逐字一致。 | 只证明当前图示工件一致、导出物存在；不证明图中阶段或外部动作真实发生。 |

## 最小事实修订

- 五项来源陈述均获得直接支持，不需要扩大或删除 claim。
- 正文案例曾保留“图示仍只写计划契约”和“Fact Check 尚未完成”的阶段时态；本轮已按当前工件修正。
- 正文继续将来源观点、仓库路径、本书工程模型、虚构输入和真实运行证据分开。

## 明确未核验或不覆盖的范围

- 未运行全仓 `npm run validate`，未证明共享进度、Current State、Next Task 或 Handoff 当前一致。
- 未构建 PDF/EPUB，未验证可复现构建、版权许可、编辑批准、签名、上传、销售、分发或出版。
- 未执行真实写作 Agent、模型、网络写入、文件修改器、队列、审批或发布系统。
- 本轮动态来源复读只支持表中五项 claim；没有核验或引用页面中的模型、API、价格、产品弃用、客户案例或数值示例。
