---
chapter: "44"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 44 章 Diagram Review：AI Technical Book Factory 交接与回流

## 审查范围

- `diagrams/mermaid/chapter-44-ai-book-factory-flow.mmd`
- `diagrams/exported/chapter-44-ai-book-factory-flow.svg`
- `diagrams/exported/chapter-44-ai-book-factory-flow.png`
- 第 44 章正文 diagrams 元数据、Mermaid 块、导出链接、替代说明、读图说明和完成检查。
- Role Contract、Versioned Queue、Review/Fact Check 双硬门、Conflict Router、Rework Envelope、bounded reflow、Human Decision、Integration Gate 与出版断点的正文一致性。

## 命名与路径决定

仓库图源统一位于 `diagrams/mermaid/`，导出物位于 `diagrams/exported/`，文件名使用 `chapter-NN-<topic>.mmd/.svg/.png`。第 44 章 Outline 已预留 `chapter-44-ai-book-factory-flow.mmd`，因此沿用该路径及同名导出物，没有在 `diagrams/` 根目录建立另一套命名。

## 图示结论

图从 Chapter Contract 与六类 Role Contract 进入 Versioned Queue Item，并把输入版本、`invalidationCondition`、`attempt` 与 `integrationOwner` 保留在同一责任入口。输入适用后形成 Research、Outline、Writing 与 Frozen Draft；Frozen Draft 同时进入 Review Gate 和 Fact Check Gate，两门必须针对同一版本且都无阻塞，才能组成 Content Evidence Package 并请求 Human Decision。

开放 finding、`reject`／`unknown` 和 `stale_input` 均进入 Conflict Router。Rework Envelope 固定输入、允许范围、关闭证据、预算与升级对象；bounded reflow 有预算时才回到 Research、Outline、Writing 或版本准入，预算耗尽或影响不明则进入 `needs_human_decision`。图中没有“再生成一次”或绕过 gate 的无界箭头。

人工接受最多形成 `ready_for_chapter_integration`。之后仍依次保留：

- `accepted for integration ≠ chapter integrated`；
- 第 26 章 Integration Gate，且实际集成需另行验证；
- `chapter integration ≠ publication approved`；
- 第 43 章 Chapter DoD 与 `publication_approval_required`。

最终流程停在 `blocked／external decision`。图中没有从 Role output、Review、Fact Check、Human Decision 或 Integration Gate 直接进入“已发布”的箭头。

## 责任断点复核

| 断点 | 图中位置 | 保留的边界 |
| --- | --- | --- |
| `more agents ≠ independent evidence` | 六类 Role Contract 后 | 角色数量不证明来源、标准或审查独立。 |
| `review passed ≠ facts verified` | Review Gate 与双门汇合之间 | Review 通过不能替代 Fact Check。 |
| `facts verified ≠ publication approved` | 双门汇合后、Content Evidence Package 前 | 事实门通过不能越过人工与出版责任。 |
| `role output exists ≠ role output accepted` | Content Evidence Package 后 | 工件存在不能替代 gate 或 Human Decision。 |
| `accepted for integration ≠ chapter integrated` | Human Decision 接受后 | 人工接受只允许提交 Integration Gate。 |
| `chapter integration ≠ publication approved` | Integration Gate 后 | 集成结果仍需第 43 章 DoD 与出版决定。 |

## 视觉检查

- PNG 为 1568×4866、8-bit RGB、非交错，白色背景；整体采用纵向主链，适合按“输入—双门—回流—人工—集成边界”自上而下阅读。
- 已实际查看完整 PNG。Chapter Contract、Role Contract、Versioned Queue、Frozen Draft、Review／Fact Check 双分支、Content Evidence Package、Conflict Router、Rework Envelope、bounded reflow、Human Decision、Integration Gate、最终 Stop 节点均可见。
- 中文、英文状态码、箭头标签和六个 `≠` 断点无明显裁切或重叠。较长返工线沿图外侧返回 Conflict Router，未穿过 Human Decision 或发布断点节点。
- Review Gate 与 Fact Check Gate 的通过线在“同一 Frozen Draft、双硬门均无阻塞”处汇合；失败线分别进入 `needs_revision` 和 `needs_fact_resolution`，语义方向与正文一致。
- source、structure、scope 与 stale 四类目标从 bounded reflow 返回对应责任入口；循环耗尽分支进入 `needs_human_decision`，没有视觉上可误读为自动批准的捷径。

## 已执行验证

- `rtk npx --yes @mermaid-js/mermaid-cli@11.16.0 --version`：退出码 0，输出 `11.16.0`。
- SVG 与 PNG 均使用 Mermaid CLI 11.16.0、`-b white -s 2` 导出：两个命令均退出码 0，输出 `Generating single mermaid chart`。
- `file` 将导出物识别为 SVG 与 1568×4866 RGB PNG；SVG `viewBox` 为 `0 0 1630.1640625 5057.109375`，背景为白色。
- 已实际查看 PNG，完成上述节点、文字、箭头、回流和责任断点的视觉检查。
- 以 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者均为 3446 个字符，逐字一致。
- 正文链接检查：退出码 0，10 个链接全部通过；正文与本记录联合 Markdown lint：退出码 0，2 个文件、0 个错误。
- 正文、`.mmd` 与本记录的尾随空白扫描无匹配；本轮 5 个图示文件的定向 `git diff --check` 退出码 0。5 个文件当前均为未跟踪新增文件，未执行 Git 写操作。

## 未验证范围

图只表达本书设计的内容生产责任链。它不读取真实仓库或队列状态，不运行 Agent、模型、Research、Writing、Review、Fact Check、Conflict Router、Rework、Human Decision、Integration Gate、Chapter DoD、批准或出版。Mermaid 语法通过、导出成功、正文同源和 PNG 可读都不能证明图中系统已经实现或运行。
