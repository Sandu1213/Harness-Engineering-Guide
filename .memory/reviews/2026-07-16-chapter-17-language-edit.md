# 第 17 章 Language Editing

## 范围

- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md`
- Research Brief、Chapter Outline、Fact Check、示例计划与局部候选资料。

## 编辑结论

- 统一首次出现的“评估（Evaluation）”“评分器（Grader）”“证据矩阵（Evidence Matrix）”“质量门（Quality Gate）”及 `Evaluation Spec`、`Evidence Record` 写法。
- 用“规格—证据—判定”替代“模型觉得完成”的抽象表述，避免把测试、观察、评判和结果混为一层。
- 对 Anthropic、NIST 和论文相关段落使用具体来源主语；四类标准、质量门、案例和教学状态保持为本书模型。
- 在每个可能被误读为真实验证的段落补上边界：`accepted` 不代表真实执行、权限、外部状态、用户满意或生产发布。

## 未改变的内容

语言编辑没有扩大 C17-REF-01 至 C17-REF-04 的来源范围，没有改变纯内存函数接口，也没有改变 Mermaid 的判定语义。

## 交叉审查后的术语校正

- 统一把证据的范围与新鲜度写为 `scope` 和注入的 `freshness`，并明确它们是教学质量门的最小守卫，不是函数读取时钟或计算真实 TTL 的结果。
- 将“状态不是 `passed` 即失败”改为“只有显式 `failed` 才失败”；`unknown`、缺失或不支持的状态均需要补证。
- 明确可选标准缺少记录也进入 `needs_review`，避免“可选”被理解为可以静默忽略。
- 将第 16 章的职责统一为待验证的反思/经验候选与准入审查，删除会暗示自动跨任务写入的表述。

## 未验证范围

语言审查不验证真实模型、评判器校准、链接、文档质量、用户理解、CI、权限、外部效果或书籍共享状态。
