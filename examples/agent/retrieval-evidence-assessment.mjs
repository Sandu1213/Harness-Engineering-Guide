function result(status, code, extra = {}) {
  return { status, code, ...extra };
}

/**
 * Assess selected retrieval candidates using only injected teaching objects.
 * It does not query, rank, read, persist, or cite any real knowledge source.
 */
export function assessRetrievalEvidence({ query, candidates, policy, selection }) {
  if (!query?.scope) {
    return result('needs_evidence', 'query_scope_missing');
  }

  if (!selection?.candidateIds?.length) {
    return result('needs_evidence', 'no_evidence_selected');
  }

  const candidatesById = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const citedCandidateIds = new Set(selection.citedCandidateIds ?? []);

  for (const candidateId of selection.candidateIds) {
    const candidate = candidatesById.get(candidateId);

    if (!candidate) {
      return result('blocked', 'candidate_not_found', { candidateId });
    }

    if (!policy.allowedSourceKinds.includes(candidate.sourceKind)) {
      return result('blocked', 'source_kind_not_allowed', { candidateId });
    }

    if (!candidate.scopes.includes(query.scope)) {
      return result('needs_evidence', 'candidate_scope_mismatch', { candidateId });
    }

    if (query.requiresFreshness && candidate.freshness !== 'verified') {
      return result('needs_evidence', 'freshness_not_verified', { candidateId });
    }

    if (!candidate.url) {
      return result('needs_evidence', 'source_location_missing', { candidateId });
    }

    if (!citedCandidateIds.has(candidateId)) {
      return result('needs_evidence', 'citation_missing', { candidateId });
    }
  }

  return result('allowed', 'evidence_selection_allowed', {
    selectedCandidateIds: selection.candidateIds,
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessRetrievalEvidence({
    query: {
      scope: 'api_authentication',
      requiresFreshness: true,
    },
    candidates: [
      {
        id: 'official-auth-doc',
        sourceKind: 'official',
        scopes: ['api_authentication'],
        url: 'https://docs.example.invalid/auth',
        freshness: 'verified',
      },
    ],
    policy: {
      allowedSourceKinds: ['official', 'primary_paper'],
    },
    selection: {
      candidateIds: ['official-auth-doc'],
      citedCandidateIds: ['official-auth-doc'],
    },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
