# 第 23 章 Language Editing

## 实际执行

```bash
rg -n "本书(用|建议|模型)|Codex 的官方|不(会|等同于|代表|证明|承诺)|TODO\(verify\)" docs/part-04-engineering-practice/23-skills-hooks-and-automation-workflows*.md
rg -n "CH23-00[1-3]|REF-" docs/part-04-engineering-practice/23-skills-hooks-and-automation-workflows*.md
rg -n "node:fs|node:child_process|fetch\(|https?://|exec\(|spawn\(" examples/agent/automation-workflow-admission-assessment.mjs
```

实际结果：正文在产品事实处使用“Codex 的官方文档”“当前产品行为”和 CH23 局部引用，在工程建议处使用“本书模型”或“本书建议”。示例实现没有匹配到文件、子进程、网络、命令或 URL 调用模式。

## 编辑结论

- 统一首次出现的中文与英文：技能（Skill）、钩子（Hook）、工作流（Workflow）、自动化检查（Automation）、插件（Plugin）。
- 将“自动化”始终落回触发、范围、报告、失败策略、退出与责任人，避免抽象口号。
- 保留“不会、不能、不代表”的边界语句，但把它们放在相应事实、图示或示例旁，避免形成脱离上下文的免责声明。
- 未改写来源段落，没有增加性能、权限、执行或产品可用性断言。
