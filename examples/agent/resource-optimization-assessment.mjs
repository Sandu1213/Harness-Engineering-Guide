function result(status, code, candidateId, next) {
  return { status, code, candidateId, next, executionPerformed: false };
}

function recordsAreObserved(records) {
  return Array.isArray(records) && records.length > 0 && records.every(({ kind }) => kind === 'observed');
}

function recordsAlignWithCandidate(records, candidate) {
  return records.every(
    ({ taskId, scope }) => taskId === candidate.taskId && scope === candidate.scope,
  );
}

function parallelStepsConflict(parallelSteps, dependencies) {
  if (!Array.isArray(parallelSteps) || parallelSteps.length !== 2) {
    return false;
  }

  const [first, second] = parallelSteps;
  return dependencies.some(
    ({ step, dependsOn }) =>
      (step === first && dependsOn?.includes(second)) ||
      (step === second && dependsOn?.includes(first)),
  );
}

/**
 * Assesses injected resource evidence without performing optimization or external I/O.
 */
export function assessResourceOptimization({
  budget,
  baselineRecords,
  candidateRecords,
  latencyPath,
  rateSnapshot,
  optimizationCandidate,
  qualityGate,
}) {
  const candidateId = optimizationCandidate?.id;

  if (
    qualityGate?.status !== 'passed' ||
    qualityGate.requiredEvidenceComplete !== true ||
    qualityGate.taskId !== optimizationCandidate?.taskId ||
    qualityGate.scope !== optimizationCandidate?.scope
  ) {
    return result(
      'quality_regression',
      'quality_gate_failed',
      candidateId,
      'reject_candidate',
    );
  }

  if (
    !recordsAreObserved(baselineRecords) ||
    !recordsAreObserved(candidateRecords) ||
    !recordsAlignWithCandidate(baselineRecords, optimizationCandidate) ||
    !recordsAlignWithCandidate(candidateRecords, optimizationCandidate)
  ) {
    return result(
      'needs_measurement',
      'observed_records_missing',
      candidateId,
      'collect_observed_records',
    );
  }

  if (
    rateSnapshot?.status !== 'current' ||
    rateSnapshot.scope !== optimizationCandidate.scope
  ) {
    return result(
      'rate_stale',
      'rate_snapshot_not_current',
      candidateId,
      'refresh_rate_snapshot',
    );
  }

  if (
    [...baselineRecords, ...candidateRecords].some(
      ({ unit }) => unit !== rateSnapshot.unit,
    )
  ) {
    return result(
      'unit_mismatch',
      'rate_unit_mismatch',
      candidateId,
      'align_measurement_units',
    );
  }

  if (
    optimizationCandidate.type === 'cache' &&
    optimizationCandidate.cacheIdentity?.hitObserved !== true
  ) {
    return result(
      'cache_evidence_missing',
      'cache_hit_not_observed',
      candidateId,
      'collect_cache_evidence',
    );
  }

  if (
    optimizationCandidate.type === 'parallel' &&
    parallelStepsConflict(
      optimizationCandidate.parallelSteps,
      latencyPath?.dependencies ?? [],
    )
  ) {
    return result(
      'dependency_conflict',
      'parallel_steps_not_independent',
      candidateId,
      'revise_latency_path',
    );
  }

  if (
    optimizationCandidate.type === 'retry' &&
    budget?.retriesUsed > budget?.retryLimit
  ) {
    return result(
      'requires_approval',
      'retry_budget_exceeded',
      candidateId,
      'request_budget_approval',
    );
  }

  return result(
    'ready_for_comparison',
    'comparable_evidence_ready',
    candidateId,
    'compare_without_deployment',
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessResourceOptimization({
    budget: {
      taskId: 'research-task-40',
      trialId: 'trial-40-a',
      scope: 'official-source-summary',
      retryLimit: 2,
      retriesUsed: 1,
    },
    baselineRecords: [
      {
        taskId: 'research-task-40',
        trialId: 'trial-40-a',
        scope: 'official-source-summary',
        kind: 'observed',
        unit: 'teaching_units',
        amount: 12,
      },
    ],
    candidateRecords: [
      {
        taskId: 'research-task-40',
        trialId: 'trial-40-b',
        scope: 'official-source-summary',
        kind: 'observed',
        unit: 'teaching_units',
        amount: 9,
      },
    ],
    latencyPath: {
      dependencies: [
        { step: 'summarize', dependsOn: ['retrieve'] },
        { step: 'fact_check', dependsOn: ['summarize'] },
      ],
    },
    rateSnapshot: {
      status: 'current',
      scope: 'official-source-summary',
      unit: 'teaching_units',
    },
    optimizationCandidate: {
      id: 'reuse-summary-candidate',
      taskId: 'research-task-40',
      scope: 'official-source-summary',
      type: 'cache',
      changesOneVariable: true,
      cacheIdentity: { hitObserved: true },
    },
    qualityGate: {
      status: 'passed',
      taskId: 'research-task-40',
      scope: 'official-source-summary',
      requiredEvidenceComplete: true,
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
