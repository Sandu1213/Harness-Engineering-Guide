import assert from 'node:assert/strict';
import test from 'node:test';

import { assessBookChapterCompletion } from './book-chapter-completion-assessment.mjs';

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

const baseChapterContract = {
  chapterId: 'chapter-43-teaching-input',
  contractVersion: 'chapter-contract-v1',
  objectivesDefined: true,
  scopeDefined: true,
};

const baseSourceEvidence = { claimsMapped: true, sourcesCurrent: true };
const baseExampleEvidence = {
  implementationPresent: true,
  testsPassed: true,
  demonstrationPassed: true,
};
const baseDiagramEvidence = { sourcePresent: true, visualReviewPassed: true };
const baseReviewEvidence = {
  technicalReviewComplete: true,
  factCheckComplete: true,
  languageEditingComplete: true,
};
const baseValidationEvidence = { passed: true, current: true };

function createStageRecords(overrides = {}) {
  return stageOrder.map((stage) => ({
    stage,
    status: stage === 'completion' ? 'in_progress' : 'complete',
    evidenceId: `${stage}-evidence-v1`,
    ...overrides[stage],
  }));
}

function createInput({
  chapterContract = {},
  stageOverrides = {},
  stageRecords,
  sourceEvidence = {},
  exampleEvidence = {},
  diagramEvidence = {},
  reviewEvidence = {},
  validationEvidence = {},
  stateSync = { inSync: true },
  publicationRequest = { requested: false },
} = {}) {
  return {
    chapterContract: { ...baseChapterContract, ...chapterContract },
    stageRecords: stageRecords ?? createStageRecords(stageOverrides),
    sourceEvidence: { ...baseSourceEvidence, ...sourceEvidence },
    exampleEvidence: { ...baseExampleEvidence, ...exampleEvidence },
    diagramEvidence: { ...baseDiagramEvidence, ...diagramEvidence },
    reviewEvidence: { ...baseReviewEvidence, ...reviewEvidence },
    validationEvidence: { ...baseValidationEvidence, ...validationEvidence },
    stateSync,
    publicationRequest,
  };
}

const incompleteStageCases = [
  ['research', 'research_incomplete', 'complete_research'],
  ['outline', 'outline_incomplete', 'complete_outline'],
  ['draft', 'draft_incomplete', 'complete_draft'],
  ['technical_review', 'technical_review_incomplete', 'complete_technical_review'],
  [
    'example_implementation',
    'example_implementation_incomplete',
    'complete_example_implementation',
  ],
  ['diagram_review', 'diagram_review_incomplete', 'complete_diagram_review'],
  ['fact_check', 'fact_check_incomplete', 'complete_fact_check'],
  ['language_editing', 'language_editing_incomplete', 'complete_language_editing'],
  ['validation', 'validation_incomplete', 'complete_validation'],
];

for (const [stage, code, next] of incompleteStageCases) {
  test(`requires evidence when the ${stage} stage is incomplete`, () => {
    assert.deepEqual(
      assessBookChapterCompletion(
        createInput({ stageOverrides: { [stage]: { status: 'blocked' } } }),
      ),
      {
        status: 'needs_evidence',
        code,
        chapterId: 'chapter-43-teaching-input',
        next,
        executionPerformed: false,
      },
    );
  });
}

test('requires evidence when outline and draft are out of sequence', () => {
  const stageRecords = createStageRecords();
  [stageRecords[1], stageRecords[2]] = [stageRecords[2], stageRecords[1]];

  assert.equal(
    assessBookChapterCompletion(createInput({ stageRecords })).code,
    'stage_sequence_invalid',
  );
});

test('requires mapped and current source evidence', () => {
  assert.equal(
    assessBookChapterCompletion(
      createInput({ sourceEvidence: { claimsMapped: false } }),
    ).code,
    'source_evidence_missing',
  );
});

test('requires a passing implementation test and demonstration record', () => {
  assert.equal(
    assessBookChapterCompletion(
      createInput({ exampleEvidence: { testsPassed: false } }),
    ).code,
    'example_evidence_missing',
  );
});

test('requires diagram source and visual-review evidence', () => {
  assert.equal(
    assessBookChapterCompletion(
      createInput({ diagramEvidence: { visualReviewPassed: false } }),
    ).code,
    'diagram_evidence_missing',
  );
});

test('requires technical, fact, and language review evidence', () => {
  assert.equal(
    assessBookChapterCompletion(
      createInput({ reviewEvidence: { factCheckComplete: false } }),
    ).code,
    'review_evidence_missing',
  );
});

test('reports failed repository validation without running it', () => {
  assert.deepEqual(
    assessBookChapterCompletion(
      createInput({ validationEvidence: { passed: false } }),
    ),
    {
      status: 'validation_failed',
      code: 'repository_validation_failed',
      chapterId: 'chapter-43-teaching-input',
      next: 'rerun_repository_validation',
      executionPerformed: false,
    },
  );
});

test('reports state drift without reading or modifying state files', () => {
  assert.deepEqual(
    assessBookChapterCompletion(createInput({ stateSync: { inSync: false } })),
    {
      status: 'state_drift',
      code: 'shared_state_out_of_sync',
      chapterId: 'chapter-43-teaching-input',
      next: 'reconcile_shared_state',
      executionPerformed: false,
    },
  );
});

test('routes complete pre-completion evidence to the completion review', () => {
  assert.deepEqual(assessBookChapterCompletion(createInput()), {
    status: 'ready_for_completion_review',
    code: 'chapter_evidence_ready',
    chapterId: 'chapter-43-teaching-input',
    next: 'review_completion_record',
    executionPerformed: false,
  });
});

test('reports a verified injected completion record as chapter complete', () => {
  assert.deepEqual(
    assessBookChapterCompletion(
      createInput({ stageOverrides: { completion: { status: 'complete' } } }),
    ),
    {
      status: 'chapter_complete',
      code: 'completion_record_verified',
      chapterId: 'chapter-43-teaching-input',
      next: 'prepare_publication_candidate',
      executionPerformed: false,
    },
  );
});

test('requires publication approval after chapter completion without publishing', () => {
  assert.deepEqual(
    assessBookChapterCompletion(
      createInput({
        stageOverrides: { completion: { status: 'complete' } },
        publicationRequest: { requested: true },
      }),
    ),
    {
      status: 'publication_approval_required',
      code: 'publication_requires_human_approval',
      chapterId: 'chapter-43-teaching-input',
      next: 'request_publication_approval',
      executionPerformed: false,
    },
  );
});
