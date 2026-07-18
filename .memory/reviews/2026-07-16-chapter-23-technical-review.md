# 第 23 章 Technical Review

## 审查范围

审查第 23 章正文、Research Brief、Detailed Outline、候选参考资料、事实核验清单与纯内存示例计划，并对照第 8、10、12、14 章的既有边界。

## 实际执行的核对

```bash
sed -n '79,246p' docs/part-02-components/08-skills-and-reusable-capabilities.md
sed -n '76,246p' docs/part-02-components/10-workflow-and-state-management.md
rg -n -C 3 'skills|hooks|plugins|automations|AGENTS.md' <current-codex-manual>
sed -n '8160,8370p' <current-codex-manual>
sed -n '8940,9250p' <current-codex-manual>
```

实际结果：第 8 章已经定义 Skill Contract、发现与权限分离；第 10 章已经定义 Workflow Contract、State Record、Checkpoint 与恢复。当前官方 Codex Manual 覆盖了 Skill 的任务工件、Hook 的事件/并发/信任，以及 Plugin 的打包边界。第 23 章没有重写这些章节，而是只说明四类工件应如何选择和组合。

## 发现与处理

- **必须保持：** Skill 不被写成 Hook、授权或实际执行；正文已将其限定为可复用任务能力。
- **必须保持：** Hook 不被写成状态机。正文明确将状态、检查点、恢复和交接留给 Workflow。
- **必须保持：** Codex Hook 的并发匹配只支持“不可凭直觉假设顺序”的风险提示；正文没有声称顺序、成功或脚本安全保证。
- **必须保持：** Plugin 只被定义为分发包，不被写成新的权限或执行语义。
- **处理：** 第 21、22 章仍未完成，正文仅把它们写为相关后续章节，没有引用不存在的实现。

## 结论

技术边界与相邻章节一致。CH23-001 至 CH23-003 仍为局部候选键；主线程必须在共享引用表登记正式 `REF-*` 后才能完成全仓交付。
