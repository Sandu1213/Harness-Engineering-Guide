const stageOrder = [
  'research',
  'outline',
  'draft',
  'technical_review',
  'example_implementation',
  'diagram_review',
  'fact_check',
  'language_editing',
  'validation',
  'completion',
];

const stageNextActions = {
  research: 'complete_research',
  outline: 'complete_outline',
  draft: 'complete_draft',
  technical_review: 'complete_technical_review',
  example_implementation: 'complete_example_implementation',
  diagram_review: 'complete_diagram_review',
  fact_check: 'complete_fact_check',
  language_editing: 'complete_language_editing',
  validation: 'complete_validation',
};

function result(status, code, chapterId, next) {
  return { status, code, chapterId, next, executionPerformed: false };
}

function chapterContractIsComplete(chapterContract) {
  return Boolean(
    chapterContract?.chapterId &&
      chapterContract.contractVersion &&
      chapterContract.objectivesDefined === true &&
      chapterContract.scopeDefined === true,
  );
}

function stageSequenceIsValid(stageRecords) {
  return Boolean(
    Array.isArray(stageRecords) &&
      stageRecords.length === stageOrder.length &&
      stageRecords.every((record, index) => record?.stage === stageOrder[index]),
  );
}

function hardEvidenceGap({
  sourceEvidence,
  exampleEvidence,
  diagramEvidence,
  reviewEvidence,
}) {
  if (
    sourceEvidence?.claimsMapped !== true ||
    sourceEvidence.sourcesCurrent !== true
  ) {
    return ['source_evidence_missing', 'complete_source_evidence'];
  }

  if (
    exampleEvidence?.implementationPresent !== true ||
    exampleEvidence.testsPassed !== true ||
    exampleEvidence.demonstrationPassed !== true
  ) {
    return ['example_evidence_missing', 'complete_example_evidence'];
  }

  if (
    diagramEvidence?.sourcePresent !== true ||
    diagramEvidence.visualReviewPassed !== true
  ) {
    return ['diagram_evidence_missing', 'complete_diagram_evidence'];
  }

  if (
    reviewEvidence?.technicalReviewComplete !== true ||
    reviewEvidence.factCheckComplete !== true ||
    reviewEvidence.languageEditingComplete !== true
  ) {
    return ['review_evidence_missing', 'complete_review_evidence'];
  }

  return undefined;
}

/** Assess injected chapter evidence without reading or changing external state. */
export function assessBookChapterCompletion({
  chapterContract,
  stageRecords,
  sourceEvidence,
  exampleEvidence,
  diagramEvidence,
  reviewEvidence,
  validationEvidence,
  stateSync,
  publicationRequest,
}) {
  const chapterId = chapterContract?.chapterId;

  if (!chapterContractIsComplete(chapterContract)) {
    return result(
      'needs_evidence',
      'chapter_contract_incomplete',
      chapterId,
      'complete_chapter_contract',
    );
  }

  if (!stageSequenceIsValid(stageRecords)) {
    return result(
      'needs_evidence',
      'stage_sequence_invalid',
      chapterId,
      'repair_stage_sequence',
    );
  }

  for (const record of stageRecords.slice(0, -1)) {
    if (record.status !== 'complete' || !record.evidenceId) {
      return result(
        'needs_evidence',
        `${record.stage}_incomplete`,
        chapterId,
        stageNextActions[record.stage],
      );
    }
  }

  const gap = hardEvidenceGap({
    sourceEvidence,
    exampleEvidence,
    diagramEvidence,
    reviewEvidence,
  });
  if (gap) {
    return result('needs_evidence', gap[0], chapterId, gap[1]);
  }

  if (validationEvidence?.passed !== true) {
    return result(
      'validation_failed',
      'repository_validation_failed',
      chapterId,
      'rerun_repository_validation',
    );
  }

  if (validationEvidence.current !== true) {
    return result(
      'validation_failed',
      'validation_evidence_stale',
      chapterId,
      'refresh_repository_validation',
    );
  }

  if (stateSync?.inSync !== true) {
    return result(
      'state_drift',
      'shared_state_out_of_sync',
      chapterId,
      'reconcile_shared_state',
    );
  }

  const completionRecord = stageRecords.at(-1);
  if (completionRecord.status === 'complete' && completionRecord.evidenceId) {
    if (publicationRequest?.requested === true) {
      return result(
        'publication_approval_required',
        'publication_requires_human_approval',
        chapterId,
        'request_publication_approval',
      );
    }

    return result(
      'chapter_complete',
      'completion_record_verified',
      chapterId,
      'prepare_publication_candidate',
    );
  }

  if (!['not_started', 'in_progress'].includes(completionRecord.status)) {
    return result(
      'needs_evidence',
      'completion_record_not_ready',
      chapterId,
      'review_completion_blocker',
    );
  }

  if (publicationRequest?.requested === true) {
    return result(
      'needs_evidence',
      'completion_record_incomplete',
      chapterId,
      'complete_chapter_before_publication',
    );
  }

  return result(
    'ready_for_completion_review',
    'chapter_evidence_ready',
    chapterId,
    'review_completion_record',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const completePreCompletionStages = stageOrder.map((stage) => ({
    stage,
    status: stage === 'completion' ? 'in_progress' : 'complete',
    evidenceId: `${stage}-teaching-evidence`,
  }));

  const demonstration = assessBookChapterCompletion({
    chapterContract: {
      chapterId: 'chapter-43-teaching-input',
      contractVersion: 'chapter-contract-v1',
      objectivesDefined: true,
      scopeDefined: true,
    },
    stageRecords: completePreCompletionStages,
    sourceEvidence: { claimsMapped: true, sourcesCurrent: true },
    exampleEvidence: {
      implementationPresent: true,
      testsPassed: true,
      demonstrationPassed: true,
    },
    diagramEvidence: { sourcePresent: true, visualReviewPassed: true },
    reviewEvidence: {
      technicalReviewComplete: true,
      factCheckComplete: true,
      languageEditingComplete: true,
    },
    validationEvidence: { passed: true, current: true },
    stateSync: { inSync: true },
    publicationRequest: { requested: false },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
