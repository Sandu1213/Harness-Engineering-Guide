import assert from 'node:assert/strict';
import test from 'node:test';

import { assessResourceOptimization } from './resource-optimization-assessment.mjs';

const baseBudget = {
  taskId: 'research-task-40',
  trialId: 'trial-40-a',
  scope: 'official-source-summary',
  retryLimit: 2,
  retriesUsed: 1,
};

const baseRecords = [
  {
    taskId: 'research-task-40',
    trialId: 'trial-40-a',
    scope: 'official-source-summary',
    kind: 'observed',
    unit: 'teaching_units',
    amount: 12,
  },
];

const baseLatencyPath = {
  dependencies: [
    { step: 'summarize', dependsOn: ['retrieve'] },
    { step: 'fact_check', dependsOn: ['summarize'] },
  ],
};

const baseRateSnapshot = {
  status: 'current',
  scope: 'official-source-summary',
  unit: 'teaching_units',
};

const baseCandidate = {
  id: 'reuse-summary-candidate',
  taskId: 'research-task-40',
  scope: 'official-source-summary',
  type: 'cache',
  changesOneVariable: true,
  cacheIdentity: { hitObserved: true },
};

const baseQualityGate = {
  status: 'passed',
  taskId: 'research-task-40',
  scope: 'official-source-summary',
  requiredEvidenceComplete: true,
};

function createInput(overrides = {}) {
  return {
    budget: { ...baseBudget, ...overrides.budget },
    baselineRecords: overrides.baselineRecords ?? baseRecords,
    candidateRecords: overrides.candidateRecords ?? [
      { ...baseRecords[0], trialId: 'trial-40-b', amount: 9 },
    ],
    latencyPath: overrides.latencyPath ?? baseLatencyPath,
    rateSnapshot: { ...baseRateSnapshot, ...overrides.rateSnapshot },
    optimizationCandidate: { ...baseCandidate, ...overrides.optimizationCandidate },
    qualityGate: { ...baseQualityGate, ...overrides.qualityGate },
  };
}

test('requires observed baseline and candidate records before comparison', () => {
  assert.deepEqual(
    assessResourceOptimization(
      createInput({
        baselineRecords: [{ ...baseRecords[0], kind: 'estimated' }],
      }),
    ),
    {
      status: 'needs_measurement',
      code: 'observed_records_missing',
      candidateId: 'reuse-summary-candidate',
      next: 'collect_observed_records',
      executionPerformed: false,
    },
  );
});

test('rejects a stale rate snapshot without deriving cost', () => {
  assert.deepEqual(
    assessResourceOptimization(createInput({ rateSnapshot: { status: 'stale' } })),
    {
      status: 'rate_stale',
      code: 'rate_snapshot_not_current',
      candidateId: 'reuse-summary-candidate',
      next: 'refresh_rate_snapshot',
      executionPerformed: false,
    },
  );
});

test('rejects a rate unit that does not match observed records', () => {
  assert.deepEqual(
    assessResourceOptimization(createInput({ rateSnapshot: { unit: 'other_teaching_units' } })),
    {
      status: 'unit_mismatch',
      code: 'rate_unit_mismatch',
      candidateId: 'reuse-summary-candidate',
      next: 'align_measurement_units',
      executionPerformed: false,
    },
  );
});

test('requires observed cache-hit evidence for a cache candidate', () => {
  assert.deepEqual(
    assessResourceOptimization(
      createInput({ optimizationCandidate: { cacheIdentity: { hitObserved: false } } }),
    ),
    {
      status: 'cache_evidence_missing',
      code: 'cache_hit_not_observed',
      candidateId: 'reuse-summary-candidate',
      next: 'collect_cache_evidence',
      executionPerformed: false,
    },
  );
});

test('rejects parallel steps when one depends on the other', () => {
  assert.deepEqual(
    assessResourceOptimization(
      createInput({
        optimizationCandidate: {
          id: 'parallel-check-candidate',
          type: 'parallel',
          parallelSteps: ['summarize', 'fact_check'],
        },
      }),
    ),
    {
      status: 'dependency_conflict',
      code: 'parallel_steps_not_independent',
      candidateId: 'parallel-check-candidate',
      next: 'revise_latency_path',
      executionPerformed: false,
    },
  );
});

test('requires approval when retries exceed the declared budget', () => {
  assert.deepEqual(
    assessResourceOptimization(
      createInput({
        budget: { retriesUsed: 3 },
        optimizationCandidate: { id: 'retry-candidate', type: 'retry' },
      }),
    ),
    {
      status: 'requires_approval',
      code: 'retry_budget_exceeded',
      candidateId: 'retry-candidate',
      next: 'request_budget_approval',
      executionPerformed: false,
    },
  );
});

test('rejects resource improvement when the quality gate fails', () => {
  assert.deepEqual(
    assessResourceOptimization(createInput({ qualityGate: { status: 'failed' } })),
    {
      status: 'quality_regression',
      code: 'quality_gate_failed',
      candidateId: 'reuse-summary-candidate',
      next: 'reject_candidate',
      executionPerformed: false,
    },
  );
});

test('marks aligned observed records as ready only for comparison', () => {
  assert.deepEqual(assessResourceOptimization(createInput()), {
    status: 'ready_for_comparison',
    code: 'comparable_evidence_ready',
    candidateId: 'reuse-summary-candidate',
    next: 'compare_without_deployment',
    executionPerformed: false,
  });
});
