import assert from 'node:assert/strict';
import test from 'node:test';

import { assessRetrievalEvidence } from './retrieval-evidence-assessment.mjs';

const policy = {
  allowedSourceKinds: ['official', 'primary_paper'],
};

function candidate(overrides = {}) {
  return {
    id: 'official-auth-doc',
    sourceKind: 'official',
    scopes: ['api_authentication'],
    url: 'https://docs.example.invalid/auth',
    freshness: 'verified',
    ...overrides,
  };
}

function input(overrides = {}) {
  return {
    query: {
      scope: 'api_authentication',
      requiresFreshness: true,
    },
    candidates: [candidate()],
    policy,
    selection: {
      candidateIds: ['official-auth-doc'],
      citedCandidateIds: ['official-auth-doc'],
    },
    ...overrides,
  };
}

test('allows a cited fresh official evidence candidate in scope', () => {
  assert.deepEqual(assessRetrievalEvidence(input()), {
    status: 'allowed',
    code: 'evidence_selection_allowed',
    selectedCandidateIds: ['official-auth-doc'],
  });
});

test('blocks a selected candidate that is not present in the retrieval set', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        selection: {
          candidateIds: ['missing-source'],
          citedCandidateIds: ['missing-source'],
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'candidate_not_found',
      candidateId: 'missing-source',
    },
  );
});

test('blocks a source kind outside the policy', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        candidates: [candidate({ sourceKind: 'blog' })],
      }),
    ),
    {
      status: 'blocked',
      code: 'source_kind_not_allowed',
      candidateId: 'official-auth-doc',
    },
  );
});

test('requests freshness evidence for a current-information query', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        candidates: [candidate({ freshness: 'unknown' })],
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'freshness_not_verified',
      candidateId: 'official-auth-doc',
    },
  );
});

test('requests a source whose declared scope matches the query', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        candidates: [candidate({ scopes: ['api_rate_limits'] })],
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'candidate_scope_mismatch',
      candidateId: 'official-auth-doc',
    },
  );
});

test('requests a stable location for the selected source', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        candidates: [candidate({ url: '' })],
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'source_location_missing',
      candidateId: 'official-auth-doc',
    },
  );
});

test('requires every selected candidate to be linked from the answer evidence', () => {
  assert.deepEqual(
    assessRetrievalEvidence(
      input({
        selection: {
          candidateIds: ['official-auth-doc'],
          citedCandidateIds: [],
        },
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'citation_missing',
      candidateId: 'official-auth-doc',
    },
  );
});
