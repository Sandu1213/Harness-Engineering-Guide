# Diagram Prompt

为指定章节设计 Mermaid 图。先说明这张图要帮助读者回答的一个问题，再定义边界、节点、箭头语义和读图结论。

将 Mermaid 源码保存到 `diagrams/mermaid/`，文件名使用 `chapter-NN-topic.mmd`。图中术语必须与 `.ai/glossary.md` 和正文一致；避免装饰性节点、未解释箭头和超大图。附上文本替代说明与与正文对应的位置。

验证 Mermaid 语法的可用性；如当前未安装渲染器，明确记录未验证范围，不声称已渲染。
