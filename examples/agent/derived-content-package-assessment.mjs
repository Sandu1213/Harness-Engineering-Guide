function result(input, status, code, next) {
  return {
    status,
    code,
    derivativeId: input?.derivativeManifest?.derivativeId,
    next,
    executionPerformed: false,
  };
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function nonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function sourceSnapshotIsComplete(sourceSnapshot) {
  return Boolean(
    sourceSnapshot?.sourceChapter &&
      sourceSnapshot.sourceVersion &&
      sourceSnapshot.reviewedAt &&
      sourceSnapshot.available === true,
  );
}

function contentAtomIsComplete(atom) {
  return Boolean(
    atom?.atomId &&
      atom.kind &&
      atom.sourceVersion &&
      nonEmptyArray(atom.applicability) &&
      atom.reviewedAt &&
      atom.license?.status &&
      atom.status,
  );
}

function sourceAnchorIsComplete(atom) {
  const anchor = atom?.sourceAnchor;

  return Boolean(
    anchor?.path &&
      anchor.sectionId &&
      anchor.sourceVersion &&
      nonEmptyArray(anchor.referenceKeys) &&
      nonEmptyArray(anchor.applicability) &&
      anchor.located === true,
  );
}

function derivativeManifestIsComplete(manifest) {
  return Boolean(
    manifest?.derivativeId &&
      manifest.medium &&
      manifest.audience &&
      manifest.sourceChapter &&
      manifest.sourceVersion &&
      nonEmptyArray(manifest.atomIds) &&
      Array.isArray(manifest.rewrites) &&
      Array.isArray(manifest.omissions) &&
      manifest.owner &&
      nonEmptyArray(manifest.refreshTriggers) &&
      manifest.publicationState,
  );
}

function sourceVersionsHaveDrifted(input) {
  const expectedVersion = input.sourceSnapshot.sourceVersion;

  return (
    input.derivativeManifest.sourceVersion !== expectedVersion ||
    input.consistencyEvidence?.sourceVersion !== expectedVersion ||
    input.contentAtoms.some(
      (atom) =>
        atom.sourceVersion !== expectedVersion ||
        atom.sourceAnchor.sourceVersion !== expectedVersion ||
        atom.status !== 'current',
    )
  );
}

function manifestReferencesAtoms(contentAtoms, manifest) {
  const availableAtomIds = new Set(contentAtoms.map(({ atomId }) => atomId));
  return manifest.atomIds.every((atomId) => availableAtomIds.has(atomId));
}

function mediumNeedsLearningPath(medium) {
  return ['course', 'tutorial', 'workshop'].includes(medium);
}

function learningPathIsAligned(learningPath, manifest) {
  if (!mediumNeedsLearningPath(manifest.medium)) {
    return true;
  }

  if (
    !learningPath?.learningPathId ||
    learningPath.learningPathId !== manifest.learningPathId ||
    !learningPath.audience ||
    !nonEmptyArray(learningPath.prerequisites) ||
    !nonEmptyArray(learningPath.objectives) ||
    !nonEmptyArray(learningPath.practice) ||
    !nonEmptyArray(learningPath.assessment) ||
    !learningPath.feedback ||
    !learningPath.completionEvidence
  ) {
    return false;
  }

  return learningPath.objectives.every(({ objectiveId, observableAction }) => {
    if (!objectiveId || !observableAction) {
      return false;
    }

    const hasPractice = learningPath.practice.some(({ objectiveIds }) =>
      objectiveIds?.includes(objectiveId),
    );
    const hasAssessment = learningPath.assessment.some(
      ({ objectiveIds, expectedEvidence }) =>
        objectiveIds?.includes(objectiveId) && nonEmptyString(expectedEvidence),
    );

    return hasPractice && hasAssessment;
  });
}

function adapterProfileIsComplete(adapterProfile) {
  return Boolean(
    adapterProfile?.profileId &&
      adapterProfile.targetPlatform &&
      adapterProfile.adapterVersion &&
      adapterProfile.inputFormat &&
      adapterProfile.outputFormat &&
      adapterProfile.linkRulesDefined === true &&
      adapterProfile.assetConstraintsDefined === true &&
      adapterProfile.accessibilityChecksDefined === true &&
      adapterProfile.previewEntry &&
      adapterProfile.rollbackEntry,
  );
}

function consistencyGatePassed(consistencyEvidence) {
  return Boolean(
    consistencyEvidence?.anchorsLocated === true &&
      consistencyEvidence.identitiesConsistent === true &&
      consistencyEvidence.mediumRewritesComplete === true &&
      consistencyEvidence.linksPassed === true &&
      consistencyEvidence.assetsPassed === true &&
      consistencyEvidence.renderPassed === true &&
      consistencyEvidence.ownerAssigned === true &&
      Array.isArray(consistencyEvidence.uncoveredItems),
  );
}

function feedbackCandidateIsComplete(candidate) {
  return Boolean(
    candidate?.feedbackId &&
      candidate.derivativeId &&
      candidate.location &&
      candidate.summary &&
      candidate.observedAt &&
      nonEmptyArray(candidate.evidence) &&
      candidate.impactScope &&
      candidate.candidateTarget &&
      candidate.owner &&
      candidate.decisionStatus,
  );
}

/** Assess injected derived-content evidence without creating or publishing content. */
export function assessDerivedContentPackage(input = {}) {
  const {
    sourceSnapshot,
    contentAtoms,
    learningPath,
    derivativeManifest,
    adapterProfile,
    consistencyEvidence,
    feedbackCandidates,
    publicationRequest,
  } = input;

  if (!sourceSnapshotIsComplete(sourceSnapshot)) {
    return result(
      input,
      'needs_source_evidence',
      'source_snapshot_incomplete',
      'provide_current_source_snapshot',
    );
  }

  if (!nonEmptyArray(contentAtoms) || !contentAtoms.every(contentAtomIsComplete)) {
    return result(
      input,
      'needs_source_evidence',
      'content_atom_incomplete',
      'complete_content_atoms',
    );
  }

  if (!contentAtoms.every(sourceAnchorIsComplete)) {
    return result(
      input,
      'needs_source_evidence',
      'source_anchor_incomplete',
      'complete_source_anchors',
    );
  }

  if (!contentAtoms.every(({ evidenceRefs }) => nonEmptyArray(evidenceRefs))) {
    return result(
      input,
      'needs_source_evidence',
      'content_atom_evidence_missing',
      'complete_content_atom_evidence',
    );
  }

  if (contentAtoms.some(({ license }) => license.status !== 'cleared')) {
    return result(
      input,
      'blocked_by_license_review',
      'license_review_required',
      'request_license_review',
    );
  }

  if (!derivativeManifestIsComplete(derivativeManifest)) {
    return result(
      input,
      'needs_medium_rewrite',
      'derivative_manifest_incomplete',
      'complete_derivative_manifest',
    );
  }

  if (sourceVersionsHaveDrifted(input)) {
    return result(
      input,
      'refresh_required',
      'source_version_drift',
      'refresh_derived_content',
    );
  }

  if (!manifestReferencesAtoms(contentAtoms, derivativeManifest)) {
    return result(
      input,
      'needs_source_evidence',
      'manifest_atom_reference_missing',
      'repair_manifest_atom_references',
    );
  }

  if (derivativeManifest.rewrites.length === 0) {
    return result(
      input,
      'needs_medium_rewrite',
      'medium_rewrite_incomplete',
      'complete_medium_rewrite',
    );
  }

  if (!learningPathIsAligned(learningPath, derivativeManifest)) {
    return result(
      input,
      'learning_alignment_failed',
      'objective_practice_assessment_misaligned',
      'align_learning_path',
    );
  }

  if (adapterProfile?.current !== true) {
    return result(
      input,
      'refresh_required',
      'adapter_profile_stale',
      'refresh_adapter_profile',
    );
  }

  if (
    adapterProfile.credentialFree !== true ||
    adapterProfile.publicationExecutionAllowed !== false
  ) {
    return result(
      input,
      'publication_approval_required',
      'adapter_permission_boundary_violation',
      'remove_publication_capability',
    );
  }

  if (!adapterProfileIsComplete(adapterProfile)) {
    return result(
      input,
      'needs_medium_rewrite',
      'adapter_profile_incomplete',
      'complete_adapter_profile',
    );
  }

  if (consistencyEvidence?.current !== true) {
    return result(
      input,
      'refresh_required',
      'consistency_evidence_stale',
      'refresh_consistency_evidence',
    );
  }

  if (consistencyEvidence.licenseEvidenceComplete !== true) {
    return result(
      input,
      'blocked_by_license_review',
      'license_evidence_incomplete',
      'request_license_review',
    );
  }

  if (consistencyEvidence.learningAligned !== true) {
    return result(
      input,
      'learning_alignment_failed',
      'consistency_learning_alignment_failed',
      'align_learning_path',
    );
  }

  if (!consistencyGatePassed(consistencyEvidence)) {
    return result(
      input,
      'needs_medium_rewrite',
      'consistency_gate_failed',
      'repair_preview_candidate',
    );
  }

  if (!Array.isArray(feedbackCandidates)) {
    return result(
      input,
      'needs_feedback_evidence',
      'feedback_candidates_missing',
      'provide_feedback_candidates',
    );
  }

  if (!feedbackCandidates.every(feedbackCandidateIsComplete)) {
    return result(
      input,
      'needs_feedback_evidence',
      'feedback_candidate_incomplete',
      'complete_feedback_candidate',
    );
  }

  if (feedbackCandidates.some(({ candidateTarget }) => candidateTarget === 'source')) {
    return result(
      input,
      'needs_feedback_evidence',
      'source_feedback_requires_review',
      'route_to_source_review',
    );
  }

  if (
    publicationRequest?.requested === true ||
    publicationRequest?.requestedAction === 'publish'
  ) {
    return result(
      input,
      'publication_approval_required',
      'human_publication_decision_required',
      'request_publication_decision',
    );
  }

  return result(
    input,
    'ready_for_preview_review',
    'derived_content_evidence_ready',
    'review_preview_candidate',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const sourceVersion = 'chapter-28-v3';
  const demonstration = assessDerivedContentPackage({
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
        applicability: ['workshop'],
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
    publicationRequest: { requested: false, requestedAction: 'none' },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
