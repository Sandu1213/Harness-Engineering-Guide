import assert from 'node:assert/strict';
import test from 'node:test';

import { evaluateSkillSelection } from './skill-selection.mjs';

function createRequest(overrides = {}) {
  return {
    contract: {
      id: 'review-markdown-chapter@1',
      taskKind: 'markdown-review',
      allowedScopes: ['single-chapter'],
      allowedEffects: ['read-only'],
      requiredInputs: ['chapterPath', 'ruleVersion', 'referenceRegistry', 'reviewDimensions'],
      requiredPreconditions: ['chapterReadable', 'rulesAvailable'],
      requiredEvidence: ['contract-id', 'task-inputs', 'precondition-snapshot'],
    },
    task: {
      kind: 'markdown-review',
      scope: 'single-chapter',
      requestedEffect: 'read-only',
      inputs: {
        chapterPath: 'docs/chapter.md',
        ruleVersion: 'book-rules@2026-07-15',
        referenceRegistry: 'injected:references',
        reviewDimensions: ['citations', 'terminology'],
      },
    },
    preconditions: {
      chapterReadable: true,
      rulesAvailable: true,
    },
    evidence: ['contract-id', 'task-inputs', 'precondition-snapshot'],
    ...overrides,
  };
}

test('should select a read-only markdown review when contract and prerequisites agree', () => {
  const result = evaluateSkillSelection(createRequest());

  assert.deepEqual(result, {
    status: 'selected',
    phase: 'ready_for_read_only_review',
    contractId: 'review-markdown-chapter@1',
    reasons: ['task kind, scope, inputs, preconditions, and evidence satisfy the contract'],
    missing: [],
    effects: [],
  });
});

test('should block selection when a required task input is missing', () => {
  const result = evaluateSkillSelection(createRequest({
    task: {
      kind: 'markdown-review',
      scope: 'single-chapter',
      requestedEffect: 'read-only',
      inputs: {
        chapterPath: 'docs/chapter.md',
        ruleVersion: 'book-rules@2026-07-15',
        referenceRegistry: '',
        reviewDimensions: ['citations', 'terminology'],
      },
    },
  }));

  assert.deepEqual(result, {
    status: 'blocked',
    phase: 'missing_required_inputs',
    contractId: 'review-markdown-chapter@1',
    reasons: ['required task inputs are missing'],
    missing: ['referenceRegistry'],
    effects: [],
  });
});

test('should block selection when a required precondition is not satisfied', () => {
  const result = evaluateSkillSelection(createRequest({
    preconditions: {
      chapterReadable: true,
      rulesAvailable: false,
    },
  }));

  assert.deepEqual(result, {
    status: 'blocked',
    phase: 'missing_preconditions',
    contractId: 'review-markdown-chapter@1',
    reasons: ['required preconditions are not satisfied'],
    missing: ['rulesAvailable'],
    effects: [],
  });
});

test('should reject an out-of-scope task without trying to select the skill', () => {
  const result = evaluateSkillSelection(createRequest({
    task: {
      kind: 'markdown-review',
      scope: 'repository-wide-rewrite',
      requestedEffect: 'read-only',
      inputs: {
        chapterPath: 'docs/chapter.md',
        ruleVersion: 'book-rules@2026-07-15',
        referenceRegistry: 'injected:references',
        reviewDimensions: ['citations', 'terminology'],
      },
    },
  }));

  assert.deepEqual(result, {
    status: 'not_applicable',
    phase: 'scope_not_supported',
    contractId: 'review-markdown-chapter@1',
    reasons: ['task scope is outside the skill contract'],
    missing: [],
    effects: [],
  });
});

test('should require approval for a write request without approving or performing it', () => {
  const result = evaluateSkillSelection(createRequest({
    task: {
      kind: 'markdown-review',
      scope: 'single-chapter',
      requestedEffect: 'write',
      inputs: {
        chapterPath: 'docs/chapter.md',
        ruleVersion: 'book-rules@2026-07-15',
        referenceRegistry: 'injected:references',
        reviewDimensions: ['citations', 'terminology'],
      },
    },
  }));

  assert.deepEqual(result, {
    status: 'requires_approval',
    phase: 'effect_outside_default_boundary',
    contractId: 'review-markdown-chapter@1',
    reasons: ['requested effect is outside the contract default'],
    missing: [],
    effects: ['write'],
  });
});

test('should block when required selection evidence is absent', () => {
  const result = evaluateSkillSelection(createRequest({
    evidence: ['contract-id', 'task-inputs'],
  }));

  assert.deepEqual(result, {
    status: 'blocked',
    phase: 'missing_selection_evidence',
    contractId: 'review-markdown-chapter@1',
    reasons: ['required selection evidence is missing'],
    missing: ['precondition-snapshot'],
    effects: [],
  });
});
