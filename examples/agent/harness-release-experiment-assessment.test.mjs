import assert from 'node:assert/strict';
import test from 'node:test';

import { assessHarnessReleaseExperiment } from './harness-release-experiment-assessment.mjs';

const baseManifest = {
  candidateId: 'candidate-structured-summary-v2',
  parentId: 'baseline-summary-v1',
  artifactDigest: 'sha256:teaching-candidate',
  modelSelection: 'injected-model-snapshot',
  evaluationSpecId: 'fixed-recovery-suite-v1',
  dependenciesResolved: true,
};

const baseCompatibility = { status: 'compatible', migrationReady: true };

const baseComparison = {
  baselineManifestId: 'baseline-summary-v1',
  candidateManifestId: 'candidate-structured-summary-v2',
  taskSetVersion: 'recovery-tasks-v1',
  candidateTaskSetVersion: 'recovery-tasks-v1',
  metricSpecVersion: 'quality-resource-spec-v1',
  candidateMetricSpecVersion: 'quality-resource-spec-v1',
  sharedStateIsolated: true,
};

const baseEvaluation = { status: 'accepted', guardrailsPassed: true };
const baseRollback = {
  knownGoodManifestId: 'baseline-summary-v1',
  status: 'ready',
  readbackComplete: false,
};

function createInput({
  manifest = {},
  compatibility = {},
  comparison = {},
  evaluation = {},
  exposure = { requested: false },
  rollback = {},
  execution = { requested: false },
} = {}) {
  return {
    manifest: { ...baseManifest, ...manifest },
    compatibility: { ...baseCompatibility, ...compatibility },
    comparison: { ...baseComparison, ...comparison },
    evaluation: { ...baseEvaluation, ...evaluation },
    exposure,
    rollback: { ...baseRollback, ...rollback },
    execution,
  };
}

test('routes a complete offline candidate to limited-exposure review without execution', () => {
  assert.deepEqual(assessHarnessReleaseExperiment(createInput()), {
    status: 'ready_for_review',
    code: 'offline_candidate_ready',
    candidateId: 'candidate-structured-summary-v2',
    next: 'review_limited_exposure',
    executionPerformed: false,
  });
});

test('requires evidence when the version manifest is incomplete', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(createInput({ manifest: { artifactDigest: '' } })),
    {
      status: 'needs_evidence',
      code: 'manifest_incomplete',
      candidateId: 'candidate-structured-summary-v2',
      next: 'complete_version_manifest',
      executionPerformed: false,
    },
  );
});

test('requires evidence when dynamic dependencies are unresolved', () => {
  assert.equal(
    assessHarnessReleaseExperiment(
      createInput({ manifest: { dependenciesResolved: false } }),
    ).code,
    'dependencies_unresolved',
  );
});

test('requires compatibility review for a breaking candidate without migration readiness', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(
      createInput({ compatibility: { status: 'breaking', migrationReady: false } }),
    ),
    {
      status: 'needs_compatibility_review',
      code: 'breaking_change_without_migration',
      candidateId: 'candidate-structured-summary-v2',
      next: 'review_consumers_and_migration',
      executionPerformed: false,
    },
  );
});

test('stops an experiment with different task-set versions as not comparable', () => {
  assert.equal(
    assessHarnessReleaseExperiment(
      createInput({ comparison: { candidateTaskSetVersion: 'recovery-tasks-v2' } }),
    ).code,
    'task_set_mismatch',
  );
});

test('stops an experiment with different metric specifications as not comparable', () => {
  assert.equal(
    assessHarnessReleaseExperiment(
      createInput({ comparison: { candidateMetricSpecVersion: 'quality-resource-spec-v2' } }),
    ).code,
    'metric_spec_mismatch',
  );
});

test('stops an experiment when shared state is not isolated', () => {
  assert.equal(
    assessHarnessReleaseExperiment(
      createInput({ comparison: { sharedStateIsolated: false } }),
    ).code,
    'shared_state_not_isolated',
  );
});

test('requests rollback when a declared guardrail fails without performing it', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(
      createInput({ evaluation: { status: 'rejected', guardrailsPassed: false } }),
    ),
    {
      status: 'rollback_requested',
      code: 'guardrail_failed',
      candidateId: 'candidate-structured-summary-v2',
      next: 'request_rollback_decision',
      executionPerformed: false,
    },
  );
});

test('requires evidence when the known-good rollback target is missing', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(
      createInput({ rollback: { knownGoodManifestId: '' } }),
    ),
    {
      status: 'needs_evidence',
      code: 'rollback_target_missing',
      candidateId: 'candidate-structured-summary-v2',
      next: 'identify_known_good_manifest',
      executionPerformed: false,
    },
  );
});

test('requires readback after an injected rollback application record', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(
      createInput({ rollback: { status: 'applied', readbackComplete: false } }),
    ),
    {
      status: 'rollback_verification_required',
      code: 'rollback_readback_missing',
      candidateId: 'candidate-structured-summary-v2',
      next: 'verify_known_good_state',
      executionPerformed: false,
    },
  );
});

test('requires approval for limited exposure without performing it', () => {
  assert.deepEqual(
    assessHarnessReleaseExperiment(createInput({ exposure: { requested: true } })),
    {
      status: 'approval_required',
      code: 'limited_exposure_requires_approval',
      candidateId: 'candidate-structured-summary-v2',
      next: 'request_human_approval',
      executionPerformed: false,
    },
  );
});
