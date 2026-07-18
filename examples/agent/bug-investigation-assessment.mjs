/**
 * Assess an injected, no-execution bug investigation for the teaching scenario.
 * The function never reproduces a failure, changes code, invokes Git, starts a
 * browser, contacts a service, or reads files and environment state.
 *
 * @param {unknown} investigation
 * @returns {{
 *   status: 'ready' | 'stopped' | 'requires_approval',
 *   code: string,
 *   next: 'implement_in_isolated_example' | 'stop' | 'obtain_environment_approval',
 *   executionPerformed: false,
 * }}
 */
export function assessBugInvestigation(investigation) {
  if (!isRecord(investigation)) {
    return stopped('invalid_bug_investigation');
  }

  if (!hasSymptom(investigation.symptom)) {
    return stopped('missing_symptom_record');
  }

  if (!isRecord(investigation.approvals) || investigation.approvals.environmentExecution === 'requested') {
    return requiresApproval('environment_execution_not_approved');
  }

  if (investigation.approvals.environmentExecution !== 'not-requested') {
    return stopped('invalid_environment_approval_state');
  }

  if (!isRecord(investigation.reproduction)) {
    return stopped('missing_reproduction_contract');
  }

  if (!hasReproductionContract(investigation.reproduction)) {
    return stopped('incomplete_reproduction_contract');
  }

  if (!Array.isArray(investigation.hypotheses) || investigation.hypotheses.length === 0) {
    return stopped('missing_hypothesis_record');
  }

  for (const hypothesis of investigation.hypotheses) {
    const hypothesisDecision = assessHypothesis(hypothesis);
    if (hypothesisDecision) {
      return hypothesisDecision;
    }
  }

  if (!isRecord(investigation.fixCandidate)) {
    return stopped('missing_fix_candidate');
  }

  if (!hasFixCandidateShape(investigation.fixCandidate)) {
    return stopped('incomplete_fix_candidate');
  }

  if (!hasSupportedHypothesis(investigation.hypotheses, investigation.fixCandidate.hypothesisId)) {
    return stopped('fix_candidate_not_linked_to_supported_hypothesis');
  }

  if (!isRecord(investigation.regressionGate)) {
    return stopped('missing_regression_gate');
  }

  if (!hasNonEmptyString(investigation.regressionGate.originalFailureCheck)) {
    return stopped('missing_original_failure_regression_check');
  }

  if (!hasNonEmptyString(investigation.regressionGate.expectedBehaviorObservation)) {
    return stopped('missing_expected_behavior_observation');
  }

  if (!hasRegressionGateShape(investigation.regressionGate)) {
    return stopped('incomplete_regression_gate');
  }

  return {
    status: 'ready',
    code: 'bug_investigation_ready',
    next: 'implement_in_isolated_example',
    executionPerformed: false,
  };
}

/** @param {unknown} symptom */
function hasSymptom(symptom) {
  return (
    isRecord(symptom) &&
    hasNonEmptyString(symptom.id) &&
    hasNonEmptyString(symptom.expected) &&
    hasNonEmptyString(symptom.actual)
  );
}

/** @param {unknown} reproduction */
function hasReproductionContract(reproduction) {
  return (
    isRecord(reproduction) &&
    hasNonEmptyString(reproduction.input) &&
    hasNonEmptyString(reproduction.preconditions) &&
    hasNonEmptyString(reproduction.failurePredicate) &&
    hasNonEmptyStringArray(reproduction.allowedActions) &&
    hasNonEmptyStringArray(reproduction.untrustedVariables)
  );
}

/** @param {unknown} hypothesis */
function assessHypothesis(hypothesis) {
  if (!isRecord(hypothesis) || !hasNonEmptyString(hypothesis.id) || !hasNonEmptyString(hypothesis.mechanism)) {
    return stopped('incomplete_hypothesis_record');
  }

  if (!hasNonEmptyString(hypothesis.prediction)) {
    return stopped('missing_hypothesis_prediction');
  }

  if (!hasNonEmptyString(hypothesis.counterfactual)) {
    return stopped('missing_hypothesis_counterfactual');
  }

  if (
    !isRecord(hypothesis.check) ||
    !hasNonEmptyString(hypothesis.check.id) ||
    hypothesis.check.distinguishesHypotheses !== true ||
    hypothesis.check.executionState !== 'planned'
  ) {
    return stopped('missing_discriminating_check');
  }

  return undefined;
}

/** @param {unknown} candidate */
function hasFixCandidateShape(candidate) {
  return (
    isRecord(candidate) &&
    hasNonEmptyString(candidate.hypothesisId) &&
    hasNonEmptyString(candidate.change) &&
    hasNonEmptyString(candidate.expectedImpact) &&
    hasNonEmptyString(candidate.protectedScope) &&
    candidate.executionState === 'planned'
  );
}

/** @param {unknown[]} hypotheses @param {unknown} hypothesisId */
function hasSupportedHypothesis(hypotheses, hypothesisId) {
  return hypotheses.some(
    (hypothesis) => isRecord(hypothesis) && hypothesis.id === hypothesisId && hypothesis.status === 'supported',
  );
}

/** @param {unknown} gate */
function hasRegressionGateShape(gate) {
  return (
    isRecord(gate) &&
    hasNonEmptyString(gate.scope) &&
    hasNonEmptyString(gate.uncovered) &&
    gate.claimState === 'planned'
  );
}

/** @param {unknown} value */
function hasNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/** @param {unknown} value */
function hasNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(hasNonEmptyString);
}

/** @param {unknown} value */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** @param {string} code */
function stopped(code) {
  return { status: 'stopped', code, next: 'stop', executionPerformed: false };
}

/** @param {string} code */
function requiresApproval(code) {
  return {
    status: 'requires_approval',
    code,
    next: 'obtain_environment_approval',
    executionPerformed: false,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = assessBugInvestigation({
    symptom: {
      id: 'checkout-welcome-missing',
      expected: 'welcome state is observable after submission',
      actual: 'welcome state was not observed after submission',
    },
    reproduction: {
      input: 'teaching submission record',
      preconditions: 'controlled teaching state',
      failurePredicate: 'welcome state is absent after the declared observation',
      allowedActions: ['compare-observations'],
      untrustedVariables: ['timing'],
    },
    hypotheses: [
      {
        id: 'observe-too-early',
        mechanism: 'the observation precedes the declared target condition',
        prediction: 'the missing observation correlates with the target condition',
        counterfactual: 'inspect target or precondition evidence',
        check: {
          id: 'compare-target-condition',
          distinguishesHypotheses: true,
          executionState: 'planned',
        },
        status: 'supported',
      },
    ],
    fixCandidate: {
      hypothesisId: 'observe-too-early',
      change: 'bind the observation to the named target condition',
      expectedImpact: 'the teaching observation follows the declared condition',
      protectedScope: 'do not change timing, data, or external environment',
      executionState: 'planned',
    },
    regressionGate: {
      originalFailureCheck: 'recheck the declared failure predicate',
      expectedBehaviorObservation: 'observe the declared welcome state',
      scope: 'teaching UI observation only',
      uncovered: 'service, data, and release behavior remain uncovered',
      claimState: 'planned',
    },
    approvals: { environmentExecution: 'not-requested' },
  });

  console.log(JSON.stringify(result, null, 2));
}
