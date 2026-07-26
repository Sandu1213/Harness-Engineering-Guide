# Pi Agent 借鉴点实施说明（供 Codex 执行，Claude Code 复查）

创建：2026-07-26（Claude Code 会话）。
状态：**已完成，Claude Code 二次复查 PASS** —— 11 章正文、章节引用工件、全局分配行与项目状态已同步；首轮 4 项 must_fix、6 项 should_fix 与 3 项 suggestion 均已修正。工作区仍未提交。

## 0. 执行前背景与现状（历史快照）

pi 是 Mario Zechner（GitHub：badlogic）开发的极简编码代理（仓库现迁移至 earendil-works/pi，MIT）。本项目已将其五组来源登记为 REF-148 至 REF-152（见 `.ai/references.md` 主表，访问日期 2026-07-26），并计划把 11 个借鉴点分别补进 11 个章节。

2026-07-26 当天有两轮工作落在工作区（均未提交）：

1. 一批并行编辑代理写入了 9 个章节的正文小节后被会话额度中断，留下部分完成的工件。
2. 另一会话在此之上完成了第 36 章"Pi 借鉴矩阵"、部分引用同步，并运行了 `npm run validate`（退出码 0）与站点验证，随后在 `.context/CURRENT_STATE.md`、`.ai/progress.md`、`.context/NEXT_TASK.md` 写入了"专项增补已完成"的结论。

**该结论过度声明**。validate 不检查 front matter 引用与正文的一致性，以下缺口真实存在：

- 第 10、12 章：**只有 front matter 改动（references 数组 + updated_at），正文零增补** —— front matter 声明了正文中不存在的 REF，属于必须修复的一致性缺陷。
- 第 05、10、12、19、42 章：`.references.md` 与 `.fact-check.md` 完全未同步。
- 第 24、26、40 章：`.references.md` 已更新，`.fact-check.md` 未同步。
- `.ai/references.md`：主表已有 REF-148…152 定义（勿重复添加），但 11 个章节的"第 N 章已分配引用"小节**均未**追加分配行。
- 状态文件（CURRENT_STATE / progress / NEXT_TASK）需在全部完成后改写为如实描述。

## 1. 每章完成清单

| 章 | 文件（docs/ 下） | 正文小节 | .references.md | .fact-check.md | 当前结论 |
| --- | --- | --- | --- | --- | --- |
| 05 | part-02-components/05-instructions-and-prompt | ✅ | ✅ | ✅ | 完成 |
| 10 | part-02-components/10-workflow-and-state-management | ✅ 新增“会话即树” | ✅ | ✅ | 完成 |
| 11 | part-02-components/11-tool-use-and-tool-protocols | ✅ | ✅ | ✅ | 完成 |
| 12 | part-02-components/12-environment-sandbox-and-permissions | ✅ 新增“三种安全架构对照” | ✅ | ✅ | 完成 |
| 19 | part-03-intelligence-loop/19-context-compaction-and-long-running-tasks | ✅ | ✅ | ✅ | 完成 |
| 23 | part-04-engineering-practice/23-skills-hooks-and-automation-workflows | ✅ | ✅ | ✅ | 完成 |
| 24 | part-04-engineering-practice/24-mcp-and-external-tool-integration | ✅ | ✅ | ✅ | 完成 |
| 26 | part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation | ✅ | ✅ | ✅ | 完成 |
| 36 | part-06-design-and-evaluation/36-harness-design-patterns | ✅（含借鉴矩阵） | ✅ | ✅ | 完成 |
| 40 | part-06-design-and-evaluation/40-cost-latency-and-token-management | ✅ | ✅ | ✅ | 完成 |
| 42 | part-06-design-and-evaluation/42-harness-versioning-rollback-and-ab-testing | ✅ | ✅ | ✅ | 完成 |

跨章任务：

1. `.ai/references.md`：为上述 11 章在各自"第 N 章已分配引用"小节追加分配行（列结构照抄现有行：ID / 章节 / 支持的陈述 / 访问日期 2026-07-26 / 核验状态）。
2. 全部完成后运行 `npm run validate`，退出码 0。
3. 改写状态文件为如实版本：`.context/CURRENT_STATE.md` 的"Pi Agent 借鉴点专项增补"条目、`.ai/progress.md` 的 2026-07-26 行、`.context/NEXT_TASK.md`——写明实际覆盖的章节数（11 章）与完成的验证证据；删除或修正"已完成"与实际不符的部分。
4. 不执行任何 git 提交（提交由用户授权后进行）。

完成证据（2026-07-26）：

- 11 章分别运行 `npx markdownlint-cli2`，每章正文、`.references.md`、`.fact-check.md` 共 3 个文件，全部 0 error。
- `npm run validate` 退出码 0：630 个 Markdown 文件 lint 0 错误，链接、章节示例测试与 47/47 章节状态检查通过。
- `npm run site:build && npm run site:check` 退出码 0：构建完成，308 个 HTML 页面无缺失本地链接。
- 浏览器交互验证第 10、12 章：分别快照、点击新增小节永久链接、重新快照；两个新增标题可见，URL 锚点正确，控制台 0 错误。
- `impeccable detect` 在两页各报告既有全章文本中的破折号 warning 与编号 advisory；新增 diff 未引入对应模式。
- `git diff --check` 退出码 0；未执行 Git 提交。

## 2. REF 来源表（已登记，直接引用）

| REF | 来源 | 正文内联链接 URL |
| --- | --- | --- |
| REF-148 | pi 仓库 README（badlogic/pi-mono，现迁移至 earendil-works/pi） | [GitHub 仓库](https://github.com/earendil-works/pi) |
| REF-149 | Zechner, Mario. What I learned building an opinionated and minimal coding agent (2025-11-30) | [作者原文](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) |
| REF-150 | Zechner, Mario. What if you don't need MCP at all? (2025-11-02) | [作者原文](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/) |
| REF-151 | Ronacher, Armin. Pi: The Minimal Agent Within OpenClaw (2026-01-31) | [作者原文](https://lucumr.pocoo.org/2026/1/31/pi/) |
| REF-152 | pi 官方文档：extensions / sessions / compaction（packages/coding-agent/docs） | [GitHub 文档目录](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs) |

正文引用格式与全书一致：断言后内联 `[REF-149](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)`。

## 3. 公共事实（任何章节可用，访问日期均为 2026-07-26）

- pi 是 Mario Zechner（GitHub 用户名 badlogic）开发的开源极简编码代理，2025 年 8 月创建，MIT 协议；2026 年 4 月起仓库迁移至 earendil-works/pi，作者保留项目主导。（REF-148、REF-149）
- 默认工具只有四个：read（支持文本与图片、offset/limit）、bash（同步执行、可选超时）、edit（精确文本替换）、write（创建/覆写）；另有默认关闭的只读工具 grep/find/ls，可通过 `--tools` 参数组合出只读模式。（REF-148、REF-149）
- 作者自述其系统提示词加工具定义合计低于 1000 token，博文附完整系统提示词全文（仅十几行）。（REF-149）
- 设计总纲原话："My philosophy in all of this was: if I don't need it, it won't be built."（REF-149）
- 代理循环不设 max-steps 等旋钮，作者原话："The loop just loops until the agent says it's done."（REF-149）

## 4. 分章事实包

已完成正文的章节（05/11/19/23/24/26/36/40/42）此节仍是复查基准：正文断言不得超出对应事实包。

### Ch10 —— 会话即树（**待写正文**，落点建议：核心概念或工程实践相关节下新增 `###` 小节）

- pi 会话存储为 JSONL 追加式文件，每个条目有 id/parentId 字段——会话本身是一棵树，当前位置是活动叶节点。（REF-152）
- 条目类型包括：消息、模型切换、思维等级切换、标签、compaction 记录、分支摘要、扩展自定义条目。（REF-152）
- 树内导航：/tree 命令跳到任意历史节点继续（产生新分支）；/fork 从早期用户消息开新文件；/clone 复制当前活动分支。离开分支时可生成分支摘要（找共同祖先、汇总被放弃的分支）注入新位置。（REF-152）
- 扩展状态通过 appendEntry 写入会话文件，随会话恢复。（REF-152）
- 会话格式有公开文档、可程序化后处理，作者将其当作承诺性接口维护。（REF-149、REF-152）
- Armin Ronacher 的观察（归属作者）：会话树让"开支线修工具、回卷主线并注入摘要"成为日常工作流。（REF-151）
- 工程扩展方向（标注为本书延伸）：线性日志与树的差别在于"被放弃的路径仍是可回收的状态"；追加式条目流+父指针即可同时实现分支、回卷、fork 与审计。
- front matter 已声明 REF-149/151/152，正文写完后无需再改 references 数组。

### Ch12 —— 三种安全架构对照（**待写正文**，落点建议：与本章 Sandbox/权限概念节并列或其下新增 `###` 小节）

- pi 没有内置权限系统，默认全权执行。作者立场原话："If you look at the security measures in other coding agents, they're mostly security theater. As soon as your agent can write code and run code, it's pretty much game over."，并援引 Simon Willison 的 lethal trifecta（致命三要素）论证。（REF-149）
- pi 把隔离责任外置到 OS 层：README 给出容器/micro-VM 等多种外部隔离运行模式。（REF-148）
- 对照面（本书工程扩展，可复用本章已有的 Codex 云端容器事实 REF-040）：三种代表性安全架构——应用层审批（细粒度权限提示+允许清单）、OS 级沙箱内置、边界完全外置到容器/VM。
- 写作要求：如实呈现 pi 的论证，但本书不必认同"安全剧场"判断——可指出应用层审批的价值还包括可审计的决策记录与分级升级路径，这与外置隔离并不互斥（标注为本书立场）。
- front matter 已声明 REF-148/149，正文写完后无需再改 references 数组。

### Ch05 —— "harness 税"与最小系统提示词（正文已写，复查基准）

- 作者论点：前沿模型已在训练中内化了编码代理惯例，原话："Models know how to use bash and have been trained on the read, write, and edit tools with similar input schemas"。（REF-149）
- pi 系统提示词加工具定义低于 1000 token（公共事实）。
- 作者用 Terminal-Bench 2.0 对 pi 做可复现跑分（每任务 5 次试验、公开 runner 与结果）。**具体名次未核实，正文严禁写名次或分数。**（REF-149）
- 作者观察（主语必须归属作者）：Claude Code 的系统提示词达数千至上万 token 且随版本频繁变更，他为此建立 cchistory 工具逐版追踪；本书未独立核验这些数字。（REF-149）
- 工程扩展：系统提示词长度是每次会话都要支付的固定 token 税；"搭训练分布的便车"与"在提示词里重建行为"两条路线的权衡。

### Ch11 —— 工具结果双视图（正文已写，复查基准）

- pi 的统一 LLM 层把工具结果拆成两份：给模型的 output（文本）与给 UI 的 details（结构化数据），另支持附件（如原生格式图片）；作者自述未在其他统一 LLM API 中见过这个抽象。（REF-149）
- 工具调用参数在流式输出中做渐进 JSON 解析，UI 可实时渲染。（REF-149）
- 工程扩展：本章 Result Envelope 可延伸出"模型观察投影"与"人类证据投影"两个视图。

### Ch19 —— 公开的 compaction 参考实现（正文已写，复查基准；全部来自 REF-152，另 REF-149 可作背景）

- 自动与手动并存：自动触发条件 contextTokens > contextWindow − reserveTokens（默认 reserve 16384、keepRecentTokens 20000，可配置、可关闭）；手动 /compact 可附自定义指令。
- 在 turn 边界切割，绝不把 tool call 与其 tool result 拆开；单 turn 超预算时 split-turn 拆两段分别摘要再合并。
- 结构化摘要模板：Goal / Constraints / Progress / Key Decisions / Next Steps / Critical Context，外加 read-files 与 modified-files 清单。
- 多次压缩时文件操作记录跨压缩累积；扩展可经 session_before_compact 钩子取消或完全接管压缩（含溢出恢复重试语义）。
- 措辞要求："以访问日（2026-07-26）文档为准"，归属 pi。

### Ch23 —— 自我扩展的 harness（正文已写，复查基准）

- 扩展是进程内 TypeScript 模块，jiti 加载免编译；全局或项目级目录自动发现；/reload 热重载。（REF-152）
- 扩展 API：生命周期事件订阅（含拦截 tool_call 并阻止、session_before_compact 接管压缩）；注册工具/命令/快捷键/标志/provider；确认、选择、输入、状态栏、自绘组件等 UI 面。（REF-152）
- 扩展状态经 appendEntry 持久化进会话文件。（REF-152）
- 官方文档第一行原话："pi can create extensions. Ask it to build one for your use case."（REF-152）；Armin Ronacher 定性（归属作者）："你不下载扩展……你让代理给自己写一个"。（REF-151）
- pi packages 机制打包分发 extensions/skills/提示词模板/主题（npm: 或 git: 来源）。（REF-148、REF-152）
- 工程扩展：自我扩展闭环的三个使能条件——进程内加载、热重载、扩展状态随会话持久化。

### Ch24 —— 工具交付形态的 token 经济学（正文已写，复查基准）

- 作者实测（2025-11 博文当日环境，数字保持作者归属）：Playwright MCP 21 个工具定义约 13.7k token（约占其所用 Claude 模型上下文 6.8%）；Chrome DevTools MCP 26 工具约 18k token（约 9%）。（REF-150）
- 等价浏览器能力改为 CLI + README 后，README 仅约 225 token，按需读取（渐进披露）；CLI 输出可落盘、可管道。（REF-150）
- pi 明确不支持 MCP（作者原话 "pi does not and will not support MCP"）；逃生舱是把 MCP server 包装成 CLI。（REF-149）
- Armin Ronacher 观察（归属作者）：MCP 工具定义随会话装入并被 prompt cache 固化，热更新工具能力而不毁缓存"极难以至不可能"。（REF-151）
- 工程扩展：三种交付形态（原生 tool schema / MCP / CLI+文档）的权衡表；本书不采纳"永不 MCP"立场，本章准入模型对 CLI 形态同样适用。

### Ch26 —— 子代理怀疑论（正文已写，复查基准）

- pi 无内置子代理工具。作者批评子代理是"a black box within a black box"。（REF-149）
- 核心论点：会话中途 spawn 子代理收集上下文说明任务没有提前规划；替代工作流是独立会话收集上下文、固化为工件、新会话冷启动实现。原话："Spawning multiple sub-agents to implement various features in parallel is an anti-pattern"（作者立场）。（REF-149）
- 需要子代理时用 bash 自我生成（`pi --print`），可放 tmux 获得完全可观测性。（REF-149）
- 工程扩展：拆成上下文隔离与并行执行两个正交问题；本章 Task Contract / Integration Gate 是对该批评的结构化回应。写成正反对照，不裁定唯一正确。

### Ch36 —— Pi 借鉴矩阵（正文已写，复查基准）

- 矩阵固定使用“Pi 暴露的设计选择 / 可直接借鉴 / 需加的护栏 / 不应照搬 / 本书落点”五列；各列是本书的工程延伸，不得写成 pi 的结论。
- 八行基准：极小 Prompt 与默认工具面 → Ch05；工具结果双输出 → Ch11；会话树与结构化 compaction → Ch10 / Ch19；最小内核加进程内扩展 → Ch23；CLI 加文档渐进披露 → Ch24；独立会话与工件隔离复杂任务 → Ch26；显式吸收 provider 差异 → Ch40；Prompt 与工具描述作为行为接口 → Ch42。
- 每行必须同时说明可直接借鉴的约束、需要补充的审计或恢复护栏，以及不应照搬的外推；矩阵是章节落点导航，不表示本仓库移植、运行或基准测试过 pi。

### Ch40 —— provider 抽象层的现实（正文已写，复查基准）

- 作者归纳原话："There's really only four APIs"：OpenAI Completions、OpenAI Responses、Anthropic Messages、Google Generative AI。（REF-149）
- Completions 兼容层碎片化实例（作者当时实测，保持归属）：store 字段接受度不一；max_tokens 与 max_completion_tokens 不统一；developer 角色支持不一；推理内容字段名 reasoning_content 与 reasoning 不统一。（REF-149）
- 跨 provider 上下文交接：思维块降级为标签文本块；签名 blob 由转换管线原样回放；上下文对象可序列化后换模型继续。（REF-149）
- 作者点名：全管线 AbortSignal 与"中止后返回部分结果"是统一 API 层最常缺失的生产必需品；token/缓存计费只能 best-effort。（REF-149）
- 模型注册表从 OpenRouter 与 models.dev 生成（含价格与能力元数据）——与本章 Rate Snapshot 同一思想的真实实现。（REF-148、REF-149）

### Ch42 —— 系统提示词是有版本语义的接口（正文已写，复查基准）

- 作者批评（主语归属作者）：Claude Code 每版更换系统提示词与工具描述，原话 "breaks my workflows and changes model behavior. I hate that."；他建立 cchistory 逐版追踪。（REF-149）
- pi 把"提示词稳定、行为可复现"列为设计目标；系统提示词全文可见、可整体替换。（REF-149）
- Terminal-Bench 2.0 可复现评测（每任务 5 次试验、公开 runner 与结果）作为设计变更的回归证据。**具体名次未核实，不得写。**（REF-149）
- 工程扩展：提示词 diff 应进入变更审查，行为差异应有评测回归兜底。

## 5. 禁止事项（全部执行者适用）

- **禁止**写 Terminal-Bench 具体名次或分数（未核实）。
- **禁止**写 GitHub stars、npm 下载量等具体数字（动态且归因不明）。
- **禁止**展开 OpenClaw 细节（最多一句定性："社区项目 OpenClaw 构建在 pi 之上"，归 REF-151）。
- **禁止**使用本文档之外的任何 pi 引语、数字、包名、命令、URL——需要新事实时先按 `.ai/research-policy.md` 重新核验并登记来源，不得凭记忆补充。
- 英文原话可少量直引（保持英文原文+出处）；转述不得加引号冒充原话。
- 所有作者观点保持主语归属（"作者认为/作者自述/Armin Ronacher 观察到"），不写成无主语行业事实。
- 动态产品细节（默认值、命令名、包结构）措辞加"以访问日（2026-07-26）文档为准"或等价限定。

## 6. 写作与工件规范

1. 正文：在最贴合的现有 `##` 节下新增一个 `###` 小节，40–90 行（含表格）；允许在章内其他位置加 1–3 句交叉引用；不删除、不重写既有内容。简体中文；英文术语首次出现用"中文（English）"形式；区分"来源明确表达"（内联 REF 链接+主语归属）与"本书工程扩展"（明确说"本书由此延伸"）。
2. 章节 .md front matter：`references:` 数组含所用 REF；`updated_at: "2026-07-26"`。（第 10、12 章已改好，勿重复。）
3. `.references.md`：候选表追加所用 REF 行（列结构照抄现有表：ID/来源/类型/可支持的限定陈述/不能支持的陈述/访问日期 2026-07-26）；"写作前复核事项"追加"已于 2026-07-26 通读 REF-1XX……"；front matter `updated_at` 同步。
4. `.fact-check.md`：front matter `sources:` 追加 REF、`updated_at` 同步；"来源级核验"表追加行（写作日复核的来源陈述/正文允许用途/禁止外推/状态）；如有"事实陈述核对"表，为新增正文主题补行。
5. **勿动**：docs/SUMMARY.md、.ai/glossary.md、examples/、diagrams/、模板文件；`.ai/references.md` 只允许在"第 N 章已分配引用"小节追加行（主表 REF-148…152 已存在）。
6. 每改完一章运行 `npx markdownlint-cli2 "<改动文件>"`；全部完成后运行 `npm run validate`，退出码 0。

## 7. 验收标准（Definition of Done）

1. 11 章正文小节齐全（含第 10、12 章），每章断言可追溯到第 4 节对应事实包。
2. 11 章的 front matter references / `.references.md` / `.fact-check.md` 三处一致；无"front matter 声明了正文不存在的 REF"情况。
3. `.ai/references.md` 的 11 个章节分配小节各有对应行。
4. `npm run validate` 退出码 0（当前基线已为 0，不得回退）。
5. 状态文件如实：修正 `.context/CURRENT_STATE.md`、`.ai/progress.md`、`.context/NEXT_TASK.md` 中"专项增补已完成"的过度声明，改为完成后的真实描述与证据。
6. 无 git 提交。

## 8. 复查计划（Claude Code 在 Codex 完成后执行）

1. 逐章 diff 对照第 4 节事实包：查无来源断言、主语归属、禁止事项（名次/星数/额外引语）。
2. 抽查三处一致性：front matter ↔ 正文 REF 内联 ↔ `.references.md` ↔ `.fact-check.md` ↔ `.ai/references.md` 分配行。
3. 复跑 `npm run validate` 与 `npx markdownlint-cli2` 全量。
4. 核对状态文件与实际 diff 一致（不含过度声明）。
5. 抽读第 10、12 章新小节的行文质量与边界声明（是否符合本书"不能推出什么"的纪律）。

## 9. 复查结果

- Claude Code 首轮结论为 `NEEDS_CHANGES`：4 项 must_fix、6 项 should_fix、3 项 suggestion。
- Codex 已修正来源外推、引用范围、尾部导航、全局章节清单、Ch36 计划基准与局部编号等问题。
- Claude Code 二次只读复查结论为 `PASS`；11 章的 front matter、正文 REF、`.references.md`、`.fact-check.md` 与 `.ai/references.md` 分配行一致，禁止事项、作者主语和访问日边界均符合本计划。
