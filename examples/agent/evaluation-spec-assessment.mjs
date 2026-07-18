/**
 * 对注入的教学 Evaluation Spec 作确定性质量门判断。
 * 不执行任何真实检查、模型调用、文件或网络 I/O。
 */
export function assessEvaluationSpec({ task, evidence, policy }) {
  if (
    !task?.id ||
    !task.scope ||
    !Array.isArray(task.successCriteria) ||
    task.successCriteria.length === 0 ||
    !Array.isArray(policy?.acceptedEvidenceKinds) ||
    policy.acceptedEvidenceKinds.length === 0 ||
    !policy.requiredFreshness
  ) {
    return result('needs_spec', 'evaluation_spec_incomplete', task?.id);
  }

  const records = Array.isArray(evidence) ? evidence : [];

  for (const criterion of task.successCriteria) {
    if (!criterion?.id) {
      return result('needs_spec', 'criterion_incomplete', task.id);
    }

    const matchingRecords = records.filter((item) => item?.criterionId === criterion.id);
    const record = matchingRecords[0];
    if (!record) {
      return criterion.required === false
        ? result('needs_review', 'optional_criterion_evidence_missing', task.id, criterion.id)
        : result('needs_evidence', 'criterion_evidence_missing', task.id, criterion.id);
    }

    if (new Set(matchingRecords.map((item) => item.status)).size > 1) {
      return result('needs_evidence', 'criterion_evidence_conflict', task.id, criterion.id);
    }

    if (record.kind === 'self_report') {
      return result('needs_evidence', 'self_report_not_accepted', task.id, criterion.id);
    }

    if (!policy.acceptedEvidenceKinds.includes(record.kind)) {
      return result('needs_evidence', 'evidence_kind_not_allowed', task.id, criterion.id);
    }

    if (record.scope !== task.scope) {
      return result('needs_evidence', 'evidence_scope_mismatch', task.id, criterion.id);
    }

    if (record.freshness !== policy.requiredFreshness) {
      return result('needs_evidence', 'evidence_not_fresh', task.id, criterion.id);
    }

    if (
      record.kind === 'model_judge' &&
      policy.requiresModelJudgeCalibration === true &&
      record.calibrated !== true
    ) {
      return result('needs_evidence', 'model_judge_not_calibrated', task.id, criterion.id);
    }

    if (record.status !== 'passed' && record.status !== 'failed') {
      return result('needs_evidence', 'criterion_evidence_status_not_confirmed', task.id, criterion.id);
    }

    if (record.status === 'failed') {
      return criterion.required === false
        ? result('needs_review', 'optional_criterion_needs_review', task.id, criterion.id)
        : result('rejected', 'criterion_not_passed', task.id, criterion.id);
    }
  }

  return result('accepted', 'evaluation_accepted', task.id);
}

function result(status, code, taskId, criterionId) {
  return criterionId ? { status, code, taskId, criterionId } : { status, code, taskId };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(
    assessEvaluationSpec({
      task: {
        id: 'docs-update-evaluation',
        scope: 'chapter-17-docs',
        successCriteria: [
          { id: 'markdown', required: true },
          { id: 'links', required: true },
        ],
      },
      evidence: [
        {
          criterionId: 'markdown',
          kind: 'deterministic_check',
          scope: 'chapter-17-docs',
          freshness: 'fresh',
          status: 'passed',
        },
        {
          criterionId: 'links',
          kind: 'state_observation',
          scope: 'chapter-17-docs',
          freshness: 'fresh',
          status: 'passed',
        },
      ],
      policy: {
        acceptedEvidenceKinds: ['deterministic_check', 'state_observation', 'model_judge'],
        requiresModelJudgeCalibration: true,
        requiredFreshness: 'fresh',
      },
    }),
  );
}
