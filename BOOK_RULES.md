# Book Rules

## Mission

将《Harness Engineering：构建可持续进化的 AI Agent》建设为可发布、可验证、可持续演进的简体中文技术书，并把其生产过程沉淀为可复用的 AI Technical Book Factory。

## Core Philosophy

> A book is a product.  
> A chapter is a feature.  
> A section is a module.  
> A diagram is an interface.  
> An example is a test case.  
> A revision is a refactor.

因此，内容必须有明确用户价值、边界、验收方式、可追溯依据和维护者。没有验证的断言不能因为文字流畅而进入正式书稿。

## Audience

读者是软件工程师、测试工程师、AI 工程师、技术管理者，以及有基础编程经验但不熟悉 Agent Engineering 的读者。默认读者会读代码，但不假设其已经使用过特定 Agent 产品。

## Writing Principles

- 使用简体中文；英文术语首次出现采用“中文（English）”形式。
- 从问题、约束和可观察结果出发，而非从产品宣传或抽象定义出发。
- 解释概念时给出边界：它解决什么、不解决什么、何时不该使用。
- 区分事实、来源观点、作者推论与示例假设。
- 一个章节只完成一个可验收的学习目标；避免用重复定义填充篇幅。
- 章节不得逐句翻译或大段复刻任何来源文章。思想可以研究，结构、论证、案例和表达必须原创。

## Chapter Structure

每章从 [CHAPTER_TEMPLATE.md](CHAPTER_TEMPLATE.md) 派生，按需裁剪但不得省略：学习目标、场景、核心概念、最小示例、验证、边界、总结、练习、参考资料和完成检查。章节元数据必须表明状态、依赖、相关图示和引用。

## Diagram Rules

- 优先使用 `diagrams/mermaid/` 中可审查、可 diff 的 Mermaid 源码。
- 图是接口说明：必须有标题、读图说明、明确边界和与正文一致的命名。
- 不使用装饰性流程图替代因果关系；图中每条关键箭头都应能被正文解释。
- 导出图片放在 `diagrams/exported/`，但 Mermaid 源码是事实来源。

## Example Rules

- 示例应尽量可运行；不可运行时必须标注原因、假设和预期输出。
- 示例先给最小闭环，再逐步增强；不要用半页伪代码掩盖关键接口。
- 示例中的密钥、用户、URL、性能数据和工具输出均不得伪造为真实事实。
- 每个示例应说明运行环境、验证命令、成功条件和失败边界。

## Code Rules

- 代码遵循其语言惯例，最小化依赖，使用可复制的目录和命令。
- 不展示未经运行的命令为“已验证”；如受环境限制，准确标注未执行。
- 为外部 I/O、权限、成本、并发和错误处理给出显式边界。
- 代码变更必须同步更新受影响的正文、示例和引用。

## Citation Rules

- 所有可归因技术事实、数据、产品行为和直接观点都必须有可追溯来源，记录到 `.ai/references.md`。
- 引文应定位到具体 URL、文档章节、论文或版本；禁止“据报道”“业内认为”式无来源断言。
- 明确标识“来源明确表达”“本书工程扩展”和“待核验”三种内容。
- 未验证信息以 `TODO(verify):` 标记，不得包装为事实。
- 不伪造作者观点、引用文本、测试结果或工具行为。

## Research Rules

- 每章先写 Research Brief，再写 Outline；研究材料与最终论证之间保留可追溯链接。
- 对持续变化的产品能力、API、价格、版本和安全策略，写作当日重新查询官方资料。
- 优先官方文档、原始论文和可复现仓库；二手资料仅用于导航或补充。
- 研究的目标是形成自己的问题框架，不是收集可改写的段落。

## Consistency Rules

- 术语以 `.ai/glossary.md` 为准；修改术语需同步检查全书。
- 章节状态只在 `.ai/progress.md` 中汇总；细节状态写入 `.context/CURRENT_STATE.md`。
- 交叉引用使用稳定标题或相对链接；重命名后运行链接检查。
- 架构、图示、示例和正文对同一概念必须使用相同边界与名称。

## AI Workflow

每章按固定顺序完成：

1. Research Brief
2. Chapter Outline
3. First Draft
4. Technical Review
5. Example Implementation
6. Diagram Review
7. Fact Check
8. Language Editing
9. Validation
10. Completion

一次只推进一个可验收任务。开始前读取 `AGENTS.md` 或 `CLAUDE.md` 指定的上下文顺序；结束后更新状态、进度、决策和交接信息。

## Review Checklist

- 是否原创地解释了问题，而非改写来源段落？
- 学习目标、前置知识、术语和章节依赖是否清晰？
- 图示、示例、命令和结果是否相互一致、可验证？
- 每个事实和外部能力是否有适当引用或 `TODO(verify):`？
- 是否解释失败模式、安全边界和不适用条件？
- 是否满足 [STYLE_GUIDE.md](STYLE_GUIDE.md) 和 Markdown 校验？

完整的逐项表见 [.ai/review-checklist.md](.ai/review-checklist.md)。

## Definition of Done

一个章节或项目任务只有在以下全部满足时完成：

1. 交付物与任务目标和模板一致。
2. 原创性、术语、引用、事实和版权边界已审查。
3. 示例和图示具有可检查的说明；能运行的已实际运行并记录结果。
4. `npm run validate` 已执行且通过；若环境阻塞，记录命令、原因和未验证范围。
5. `.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md`、`.ai/progress.md` 与必要的决策或交接已更新。
6. 未自动执行 Git 提交；提交只在用户明确授权时进行。

## Git and Commit Convention

- Git 是内容演进记录，不是临时草稿箱；一个提交只承载一个可审查意图。
- 建议 Conventional Commit 风格：`docs:`, `book:`, `examples:`, `ci:`, `chore:`。
- 提交信息说明范围和读者可见变化，例如 `book: add chapter 01 research brief`。
- 不提交密钥、个人数据、生成物噪声或未经核验的“完成”标记。

## Project State Update Rules

- `CURRENT_STATE.md` 记录当前真实状态、最近验证和阻塞项。
- `NEXT_TASK.md` 只保留按优先级排序、可验收且可独立开始的下一步。
- `.ai/progress.md` 是章节阶段表；每次推进一格都更新日期与状态。
- 架构性或可复用的经验写入 `DECISIONS.md` 与 `.memory/`；交接内容写入 `HANDOFF.md`。

## Long-term Goal

将本书生产为一个经得起版本变化、多人协作和 Agent 接力的长期项目，并使其目录、模板、提示词、校验和案例可以复制到 Tau、Claude Code、Codex、自动化测试等其他技术书。
