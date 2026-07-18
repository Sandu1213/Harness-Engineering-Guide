---
chapter: "12-environment-sandbox-and-permissions"
stage: "Final Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 12 章 Final Review：Environment、Sandbox 与权限

## 本地完成结论

第 12 章已具备可审查的 Research Brief、候选资料、详细 Outline、原创正文、纯内存 Example Plan/实现/测试、Mermaid 源与 SVG/PNG、Technical Review、Diagram Review、Fact Check 和 Language Editing。内容坚持“准入候选不等于执行、授权或验收”的边界，且没有逐句翻译任何来源或伪称真实环境行为。

## 已完成的专用验证

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
node examples/agent/environment-sandbox-assessment.mjs
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-12-environment-permission-ladder.mmd -o diagrams/exported/chapter-12-environment-permission-ladder.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-12-environment-permission-ladder.mmd -o diagrams/exported/chapter-12-environment-permission-ladder.png -b transparent
diff -u <(awk '/^```mermaid/{capture=1; next} capture && /^```/{exit} capture {print}' docs/part-02-components/12-environment-sandbox-and-permissions.md) diagrams/mermaid/chapter-12-environment-permission-ladder.mmd
```

- 红灯：实现模块缺失时，专用测试实际以 `ERR_MODULE_NOT_FOUND`、退出码 `1` 结束。
- 绿灯：交叉审查补齐目标范围准入后，专用测试实际为 8 项通过、0 项失败；演示实际输出 `allowed / environment_admission_allowed / inspect-preview`。
- 图示：Mermaid CLI 11.16.0 的 SVG、PNG 导出均以退出码 `0` 结束；PNG 已查看，且正文 Mermaid 块与图源的 `diff -u` 退出码为 `0`、无输出。
- 文档：`markdownlint-cli2` 实际检查 11 个本章 Markdown 工件、0 个错误；正文 10 个链接和候选资料 5 个链接均由 `markdown-link-check` 实际通过。
- 工件一致性：本轮 `git diff --check` 退出码为 `0`、无输出。

## 历史主线程整合清单（已完成）

1. 将 C12-REF-001 至 C12-REF-005 写入 `.ai/references.md` 并分配正式 REF 编号；必要时把 Environment Contract、环境准入记录、最小权限等术语加入 `.ai/glossary.md`。
2. 在 `package.json` 增加本章示例/测试脚本，并在 `scripts/validate.sh` 纳入专用测试；在 `examples/agent/README.md` 增加入口说明。
3. 更新 `.ai/progress.md`、`.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md`、`.context/HANDOFF.md`、`docs/SUMMARY.md`、README/CHANGELOG 中的章节进度和链接。
4. 在共享变更完成后运行 `npm run validate`、`git diff --check` 和全仓交叉引用检查；本子任务按并发隔离要求没有运行这些命令。

主线程已完成上述四项：C12-REF-001 至 C12-REF-005 已映射为 REF-040 至 REF-044，术语、npm 入口、目录和共享状态已同步；最终全仓校验的真实结果由 `CURRENT_STATE.md` 与交接文件记录。

## 交叉审查后的修正

- 已将 `task.targetScope` 纳入纯内存 Environment Contract 判断，并新增“不在环境 `targetScopes` 中则阻塞”的精确断言。测试从 7 项增加为 8 项。
- 正文首次出现已明确环境契约（Environment Contract）、沙箱（Sandbox）与凭证（Credential）；图示和替代描述也把目标范围加入所有准入检查。
- 本次修正后的 Mermaid 导出、图文一致性和全仓校验由主线程统一复跑；本记录不把它们预先写成通过。

## 未验证范围

本地通过的测试、演示与图示只证明 Markdown 工件和注入教学对象的一致性。它们不验证真实 Agent、Sandbox、文件系统、网络、Docker、Kubernetes、GitHub Actions、权限、凭证、批准、人类责任、审计、部署、目标状态或业务结果。
