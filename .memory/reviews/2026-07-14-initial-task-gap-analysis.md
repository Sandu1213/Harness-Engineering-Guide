# 初始任务 P0 差距分析与补齐记录

## 审查范围

- 工件：最初的项目骨架、上下文、规则、模板、全书大纲、任务系统、Markdown 校验与 GitHub 协作配置。
- 审查类型：P0 验收、状态一致性与第 1 章准备工件审查。
- 使用的规则：`AGENTS.md`、`AI_BOOTSTRAP.md`、`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`。

## 已完成项

1. 所有最初明确列出的根文件、`.context/`、`.memory/`、`.ai/`、`docs/`、`diagrams/`、`examples/`、`templates/`、`scripts/` 和 `.github/` 路径均存在；空目录以 `README.md` 或 `.gitkeep` 保留。
2. Codex 与 Claude Code 入口均指向同一启动顺序、规则、状态文件和 Definition of Done。
3. 写作规则、风格规范、完整章节模板、研究/写作/审查提示词、Issue 模板和 Pull Request 模板已建立。
4. `.ai/outline.md` 与 `docs/SUMMARY.md` 各有 47 个章节；每章都有目标、核心问题、主要小节、计划图示、计划案例、前后关系和预计交付物。原 58 个主题的合并映射与决策已记录。
5. `.ai/progress.md`、`CURRENT_STATE.md`、`NEXT_TASK.md` 和 `HANDOFF.md` 已构成可继续的任务与交接系统。
6. `markdownlint-cli2`、`markdown-link-check`、本地脚本和两项 GitHub Actions 工作流已配置；最小 Harness 示例与 Node 内置测试已存在。
7. 第 1 章已完成 Research Brief、详细 Outline、事实核验清单、计划图示、计划示例与候选参考资料；没有写入正式正文。

## 发现并补齐的 P0 差距

| 项目 | 发现 | 补齐方式 | 状态 |
| --- | --- | --- | --- |
| README 当前状态 | 仍把 Chapter Outline 写为下一步，且示例命令使用不被脚本接受的中文 slug。 | 更新为第 1 章准备包现状，并替换为有效的英文 kebab-case 命令。 | 已修复 |
| AI 路线图 | 仍列出已经完成的 P0、Research 和最小示例任务。 | 更新近期路线图为 P0 已完成与后续正文阶段。 | 已修复 |
| 进度状态语义 | 46 个单元格使用 `已审查` 或 `已规划`，与文件声明的状态集合不一致；P0 共享示例也被错误当作第 28 章阶段完成。 | 统一为 `未开始`、`进行中`、`完成`、`不适用` 或 `阻塞`；仅保留第 1 章已完成的 Research 与 Outline。 | 已修复 |
| 总校验覆盖 | `validate.sh` 未执行已有的章节进度检查。 | `validate.sh` 现在调用 `check-progress.sh`；脚本会拒绝非法阶段值。 | 已修复 |
| P0 审查证据 | 第 1 章准备包没有独立审查记录。 | 本记录同时保存 P0 验收和第 1 章准备工件审查结论。 | 已修复 |

## 第 1 章准备工件审查

**结论：** 可进入正文阶段，但仅在用户明确授权后。没有正文，因此不能把技术审查、图示审查或正文级事实核验标记为完成。

| 审查点 | 证据 | 结论 |
| --- | --- | --- |
| 原创性与边界 | Research Brief 和 Outline 明确禁止逐句翻译、产品能力比较和行业标准化主张。 | 通过 |
| 来源与事实 | `FC-01` 至 `FC-04` 限定到 `REF-001` 至 `REF-004`；工程扩展以本书判断标识。 | 通过 |
| 提纲完整性 | 六个小节都有读者问题、证据边界、工件、验证和过渡。 | 通过 |
| 示例边界 | 示例计划明确其为内存中的确定性控制流，不声称模型或生产可靠性。 | 通过 |
| 图示边界 | Mermaid 源文件与提纲术语一致，图中未出现产品能力声明。 | 通过，但未渲染 |
| 阶段状态 | 只有 Research 与 Outline 属于已完成章节阶段；其余内容只是准备工件。 | 已纠正 |

## 未完成但不属于 P0 缺口

- 第 1 章正式正文、技术审查、示例整合、图示渲染审查、正文级事实核验和语言编辑均未开始，必须遵循章节工作流。
- 本机未检测到 `mmdc`，因此 Mermaid 计划图尚未执行渲染验证；该限制已记录，不能声称图已渲染通过。
- VitePress 站点、PDF 与 EPUB 构建属于后续发布阶段；当前 Markdown 源与目录结构为兼容这些渠道的基础，不伪称已经生成发布物。

## 已执行验证与未验证范围

- 静态路径盘点：所有最初列出的文件存在；目录均非 Git 空目录。
- 大纲字段检查：`.ai/outline.md` 与 `docs/SUMMARY.md` 均为 47 章，字段完整性检查无缺项。
- 脚本语法：`bash -n scripts/validate.sh scripts/create-chapter.sh scripts/check-progress.sh` 通过。
- `create-chapter.sh` 无参数退出码为 `1` 并输出用法，符合拒绝无效输入的预期。
- `npm run validate` 通过：74 个 Markdown 文件 lint 为 0 错误，链接检查、4 项最小 Harness 测试和章节状态检查通过。
- `npm run example:harness` 输出 `succeeded`；`git diff --check` 无输出。
