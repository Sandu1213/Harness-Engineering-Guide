function result(status, code, candidateId, next) {
  return { status, code, candidateId, next, executionPerformed: false };
}

function manifestIsComplete(manifest) {
  return Boolean(
    manifest?.candidateId &&
      manifest.parentId &&
      manifest.artifactDigest &&
      manifest.modelSelection &&
      manifest.evaluationSpecId,
  );
}

/** Assess one injected Harness release experiment without external I/O. */
export function assessHarnessReleaseExperiment({
  manifest,
  compatibility,
  comparison,
  evaluation,
  exposure,
  rollback,
  execution,
}) {
  const candidateId = manifest?.candidateId;

  if (!manifestIsComplete(manifest)) {
    return result(
      'needs_evidence',
      'manifest_incomplete',
      candidateId,
      'complete_version_manifest',
    );
  }

  if (manifest.dependenciesResolved !== true) {
    return result(
      'needs_evidence',
      'dependencies_unresolved',
      candidateId,
      'resolve_version_dependencies',
    );
  }

  if (compatibility?.status === 'breaking' && compatibility.migrationReady !== true) {
    return result(
      'needs_compatibility_review',
      'breaking_change_without_migration',
      candidateId,
      'review_consumers_and_migration',
    );
  }

  if (comparison?.taskSetVersion !== comparison?.candidateTaskSetVersion) {
    return result(
      'not_comparable',
      'task_set_mismatch',
      candidateId,
      'align_experiment_inputs',
    );
  }

  if (comparison?.metricSpecVersion !== comparison?.candidateMetricSpecVersion) {
    return result(
      'not_comparable',
      'metric_spec_mismatch',
      candidateId,
      'align_experiment_inputs',
    );
  }

  if (comparison?.sharedStateIsolated !== true) {
    return result(
      'not_comparable',
      'shared_state_not_isolated',
      candidateId,
      'review_experiment_isolation',
    );
  }

  if (!rollback?.knownGoodManifestId) {
    return result(
      'needs_evidence',
      'rollback_target_missing',
      candidateId,
      'identify_known_good_manifest',
    );
  }

  if (rollback.status === 'applied' && rollback.readbackComplete !== true) {
    return result(
      'rollback_verification_required',
      'rollback_readback_missing',
      candidateId,
      'verify_known_good_state',
    );
  }

  if (evaluation?.guardrailsPassed !== true) {
    return result(
      'rollback_requested',
      'guardrail_failed',
      candidateId,
      'request_rollback_decision',
    );
  }

  if (exposure?.requested === true || execution?.requested === true) {
    return result(
      'approval_required',
      'limited_exposure_requires_approval',
      candidateId,
      'request_human_approval',
    );
  }

  if (evaluation.status !== 'accepted') {
    return result(
      'needs_evidence',
      'evaluation_not_accepted',
      candidateId,
      'complete_offline_evaluation',
    );
  }

  return result(
    'ready_for_review',
    'offline_candidate_ready',
    candidateId,
    'review_limited_exposure',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessHarnessReleaseExperiment({
    manifest: {
      candidateId: 'candidate-structured-summary-v2',
      parentId: 'baseline-summary-v1',
      artifactDigest: 'sha256:teaching-candidate',
      modelSelection: 'injected-model-snapshot',
      evaluationSpecId: 'fixed-recovery-suite-v1',
      dependenciesResolved: true,
    },
    compatibility: { status: 'compatible', migrationReady: true },
    comparison: {
      baselineManifestId: 'baseline-summary-v1',
      candidateManifestId: 'candidate-structured-summary-v2',
      taskSetVersion: 'recovery-tasks-v1',
      candidateTaskSetVersion: 'recovery-tasks-v1',
      metricSpecVersion: 'quality-resource-spec-v1',
      candidateMetricSpecVersion: 'quality-resource-spec-v1',
      sharedStateIsolated: true,
    },
    evaluation: { status: 'accepted', guardrailsPassed: true },
    exposure: { requested: false },
    rollback: {
      knownGoodManifestId: 'baseline-summary-v1',
      status: 'ready',
      readbackComplete: false,
    },
    execution: { requested: false },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
