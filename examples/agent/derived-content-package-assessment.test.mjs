import assert from 'node:assert/strict';
import test from 'node:test';

import { assessDerivedContentPackage } from './derived-content-package-assessment.mjs';

const sourceVersion = 'chapter-28-v3';

const baseInput = {
  sourceSnapshot: {
    sourceChapter: 'chapter-28',
    sourceVersion,
    reviewedAt: '2026-07-17',
    available: true,
  },
  contentAtoms: [
    {
      atomId: 'atom-28-admission-boundary',
      kind: 'interface_boundary',
      sourceVersion,
      sourceAnchor: {
        path: 'docs/part-05-case-studies/28-minimal-harness-from-scratch.md',
        sectionId: 'minimal-example',
        sourceVersion,
        referenceKeys: ['REF-107'],
        applicability: ['nodejs', 'pure-memory'],
        located: true,
      },
      evidenceRefs: ['chapter-28-example-test'],
      applicability: ['tutorial', 'workshop', 'faq'],
      reviewedAt: '2026-07-17',
      license: { status: 'cleared', attributionRequired: false },
      status: 'current',
    },
  ],
  learningPath: {
    learningPathId: 'learning-path-28-workshop-v1',
    audience: 'engineers new to Harness admission',
    prerequisites: ['read JavaScript objects'],
    objectives: [
      {
        objectiveId: 'objective-diagnose-admission',
        observableAction: 'classify an injected admission candidate',
      },
    ],
    practice: [
      {
        practiceId: 'practice-three-candidates',
        objectiveIds: ['objective-diagnose-admission'],
      },
    ],
    assessment: [
      {
        assessmentId: 'assessment-unknown-candidate',
        objectiveIds: ['objective-diagnose-admission'],
        expectedEvidence: 'independent status, reason, and boundary explanation',
      },
    ],
    feedback: 'point to missing evidence without solving the task',
    completionEvidence: 'submitted classification and explanation',
  },
  derivativeManifest: {
    derivativeId: 'workshop-28-v1',
    medium: 'workshop',
    audience: 'engineers new to Harness admission',
    sourceChapter: 'chapter-28',
    sourceVersion,
    atomIds: ['atom-28-admission-boundary'],
    rewrites: ['timebox', 'practice cards', 'facilitator feedback'],
    omissions: [
      {
        item: 'production execution',
        rationale: 'the workshop only classifies pure-memory candidates',
      },
    ],
    learningPathId: 'learning-path-28-workshop-v1',
    owner: 'chapter-46-teaching-owner',
    refreshTriggers: ['source version changes', 'interface semantics change'],
    publicationState: 'draft',
  },
  adapterProfile: {
    profileId: 'preview-adapter-v1',
    targetPlatform: 'injected-preview-target',
    adapterVersion: 'adapter-v1',
    inputFormat: 'structured-object',
    outputFormat: 'preview-record',
    linkRulesDefined: true,
    assetConstraintsDefined: true,
    accessibilityChecksDefined: true,
    previewEntry: 'preview-only',
    rollbackEntry: 'discard-preview',
    credentialFree: true,
    publicationExecutionAllowed: false,
    current: true,
  },
  consistencyEvidence: {
    sourceVersion,
    anchorsLocated: true,
    identitiesConsistent: true,
    licenseEvidenceComplete: true,
    learningAligned: true,
    mediumRewritesComplete: true,
    linksPassed: true,
    assetsPassed: true,
    renderPassed: true,
    ownerAssigned: true,
    current: true,
    uncoveredItems: [
      'learning effect',
      'platform compatibility',
      'publication approval',
    ],
  },
  feedbackCandidates: [],
  publicationRequest: {
    requested: false,
    requestedAction: 'none',
  },
};

function createInput(mutate = () => {}) {
  const input = structuredClone(baseInput);
  mutate(input);
  return input;
}

function expected(status, code, next) {
  return {
    status,
    code,
    derivativeId: 'workshop-28-v1',
    next,
    executionPerformed: false,
  };
}

test('requires a current source snapshot', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.sourceSnapshot.available = false;
      }),
    ),
    expected(
      'needs_source_evidence',
      'source_snapshot_incomplete',
      'provide_current_source_snapshot',
    ),
  );
});

test('requires every Content Atom to include a locatable Source Anchor', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.contentAtoms[0].sourceAnchor.sectionId = '';
      }),
    ),
    expected(
      'needs_source_evidence',
      'source_anchor_incomplete',
      'complete_source_anchors',
    ),
  );
});

test('requires evidence references on every Content Atom', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.contentAtoms[0].evidenceRefs = [];
      }),
    ),
    expected(
      'needs_source_evidence',
      'content_atom_evidence_missing',
      'complete_content_atom_evidence',
    ),
  );
});

test('routes source version drift to refresh without rewriting content', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.derivativeManifest.sourceVersion = 'chapter-28-v2';
      }),
    ),
    expected(
      'refresh_required',
      'source_version_drift',
      'refresh_derived_content',
    ),
  );
});

test('blocks unresolved Content Atom licensing for independent review', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.contentAtoms[0].license.status = 'review_required';
      }),
    ),
    expected(
      'blocked_by_license_review',
      'license_review_required',
      'request_license_review',
    ),
  );
});

test('requires medium-specific rewrites in the Derivative Content Manifest', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.derivativeManifest.rewrites = [];
      }),
    ),
    expected(
      'needs_medium_rewrite',
      'medium_rewrite_incomplete',
      'complete_medium_rewrite',
    ),
  );
});

test('rejects a Learning Path without practice and assessment alignment', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.learningPath.practice[0].objectiveIds = [];
      }),
    ),
    expected(
      'learning_alignment_failed',
      'objective_practice_assessment_misaligned',
      'align_learning_path',
    ),
  );
});

test('routes a stale Publication Adapter Profile to refresh', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.adapterProfile.current = false;
      }),
    ),
    expected(
      'refresh_required',
      'adapter_profile_stale',
      'refresh_adapter_profile',
    ),
  );
});

test('requires a preview-only Publication Adapter Profile', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.adapterProfile.previewEntry = '';
      }),
    ),
    expected(
      'needs_medium_rewrite',
      'adapter_profile_incomplete',
      'complete_adapter_profile',
    ),
  );
});

test('rejects adapter credentials or publication execution capability', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.adapterProfile.credentialFree = false;
        input.adapterProfile.publicationExecutionAllowed = true;
      }),
    ),
    expected(
      'publication_approval_required',
      'adapter_permission_boundary_violation',
      'remove_publication_capability',
    ),
  );
});

test('blocks incomplete license evidence at the Consistency Gate', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.consistencyEvidence.licenseEvidenceComplete = false;
      }),
    ),
    expected(
      'blocked_by_license_review',
      'license_evidence_incomplete',
      'request_license_review',
    ),
  );
});

test('routes a failed preview check back to medium repair', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.consistencyEvidence.renderPassed = false;
      }),
    ),
    expected(
      'needs_medium_rewrite',
      'consistency_gate_failed',
      'repair_preview_candidate',
    ),
  );
});

test('requires a complete Feedback Candidate Record', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.feedbackCandidates.push({
          feedbackId: 'feedback-46-1',
          candidateTarget: 'source',
        });
      }),
    ),
    expected(
      'needs_feedback_evidence',
      'feedback_candidate_incomplete',
      'complete_feedback_candidate',
    ),
  );
});

test('routes source feedback to review without changing the source', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.feedbackCandidates.push({
          feedbackId: 'feedback-46-2',
          derivativeId: 'workshop-28-v1',
          location: 'practice-three-candidates',
          summary: 'an interface fact may be stale',
          observedAt: '2026-07-17',
          evidence: ['reader reproduction note'],
          impactScope: 'source_candidate',
          candidateTarget: 'source',
          owner: 'chapter-46-teaching-owner',
          decisionStatus: 'candidate',
        });
      }),
    ),
    expected(
      'needs_feedback_evidence',
      'source_feedback_requires_review',
      'route_to_source_review',
    ),
  );
});

test('routes a complete package to preview review without creating a preview', () => {
  assert.deepEqual(
    assessDerivedContentPackage(createInput()),
    expected(
      'ready_for_preview_review',
      'derived_content_evidence_ready',
      'review_preview_candidate',
    ),
  );
});

test('requires a separate publication approval without publishing', () => {
  assert.deepEqual(
    assessDerivedContentPackage(
      createInput((input) => {
        input.publicationRequest = {
          requested: true,
          requestedAction: 'publish',
        };
      }),
    ),
    expected(
      'publication_approval_required',
      'human_publication_decision_required',
      'request_publication_decision',
    ),
  );
});

test('does not mutate the injected package or perform external actions', () => {
  const input = createInput();
  const snapshot = structuredClone(input);

  const result = assessDerivedContentPackage(input);

  assert.deepEqual(input, snapshot);
  assert.equal(result.executionPerformed, false);
});
