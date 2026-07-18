/**
 * 对注入的教学压缩记录作确定性判断。
 * 不读取对话、模型、文件、网络、时钟、外部记忆或工具结果。
 */
export function assessCompactionRecord({ run, record, policy }) {
  if (
    !run?.id ||
    !run.scope ||
    !run.contractVersion ||
    !Array.isArray(policy?.requiredAnchorIds) ||
    !Array.isArray(policy?.allowedDiscardKinds) ||
    !Array.isArray(policy?.requiredPointerKinds) ||
    !record?.summary ||
    !record?.resumption?.nextAction ||
    !Array.isArray(record?.lossChecks)
  ) {
    return result('needs_spec', 'compaction_record_incomplete', run?.id);
  }

  if (record.runId !== run.id || record.scope !== run.scope) {
    return result('blocked', 'record_identity_mismatch', run.id);
  }

  if (record.contractVersion !== run.contractVersion) {
    return result('needs_rehydration', 'contract_version_mismatch', run.id);
  }

  const anchors = Array.isArray(record.anchors) ? record.anchors : [];
  const pointers = Array.isArray(record.pointers) ? record.pointers : [];
  const discarded = Array.isArray(record.discarded) ? record.discarded : [];

  for (const pointerKind of policy.requiredPointerKinds) {
    if (!pointers.some((item) => item?.kind === pointerKind && item.target && item.purpose)) {
      return result('needs_evidence', 'required_pointer_kind_missing', run.id, { pointerKind });
    }
  }

  for (const anchorId of policy.requiredAnchorIds) {
    const anchor = anchors.find((item) => item?.id === anchorId);
    if (!anchor?.statement) {
      return result('needs_evidence', 'required_anchor_missing', run.id, { anchorId });
    }

    if (!pointers.some((item) => item?.id === anchor.pointerId && item.target && item.purpose)) {
      return result('needs_rehydration', 'anchor_pointer_missing', run.id, { anchorId });
    }

    if (
      anchor.status === 'uncertain' &&
      !record.lossChecks.includes(`uncertain_anchor:${anchor.id}`)
    ) {
      return result('needs_evidence', 'uncertain_anchor_requires_loss_check', run.id, { anchorId });
    }
  }

  if (
    discarded.some(
      (item) =>
        !policy.allowedDiscardKinds.includes(item?.kind) ||
        typeof item?.reason !== 'string' ||
        item.reason.trim() === '',
    )
  ) {
    return result('needs_review', 'discard_decision_not_justified', run.id);
  }

  return result('ready_to_resume', 'compaction_record_ready', run.id);
}

function result(status, code, runId, extra = {}) {
  return { status, code, runId, ...extra };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessCompactionRecord({
      run: {
        id: 'book-review-run-19',
        scope: 'chapter-19-review',
        contractVersion: '2026-07-16',
      },
      record: {
        runId: 'book-review-run-19',
        scope: 'chapter-19-review',
        contractVersion: '2026-07-16',
        summary: '保留恢复所需锚点与指针，不把摘要写成事实证明。',
        anchors: [
          { id: 'goal', statement: '完成引用核验', pointerId: 'source-evidence' },
          { id: 'decision-source', statement: '来源需重新读取', pointerId: 'source-evidence' },
          {
            id: 'unknown-citation',
            statement: '引用状态尚未确认',
            pointerId: 'source-evidence',
          },
        ],
        pointers: [
          {
            id: 'source-evidence',
            kind: 'evidence',
            target: 'records/citation-brief.md',
            purpose: '恢复时回到来源位置',
          },
        ],
        retained: [
          { kind: 'task_goal', reason: '恢复时必须确认目标' },
          { kind: 'unresolved_item', reason: '不能被摘要掩盖' },
        ],
        discarded: [
          { kind: 'redundant_tool_output', reason: '可从受控原始记录重新定位' },
        ],
        resumption: {
          nextAction: '重新读取引用位置并核对版本',
          mustVerify: ['unknown-citation'],
        },
        lossChecks: ['required_anchors_present', 'pointers_resolve_before_use'],
      },
      policy: {
        requiredAnchorIds: ['goal', 'decision-source', 'unknown-citation'],
        allowedDiscardKinds: ['redundant_tool_output', 'superseded_draft'],
        requiredPointerKinds: ['evidence'],
      },
    }),
  );
}
