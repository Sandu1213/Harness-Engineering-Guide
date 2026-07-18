/** Return a deterministic teaching result without reading files or calling tools. */
function selectionResult(status, phase, contractId, reasons, missing = [], effects = []) {
  return {
    status,
    phase,
    contractId,
    reasons,
    missing,
    effects,
  };
}

/** Reject malformed in-memory teaching input before evaluating a contract. */
function validateRequest(request) {
  if (!request || typeof request !== 'object') {
    throw new TypeError('request must be an object');
  }

  const { contract, task, preconditions, evidence } = request;
  if (!contract || typeof contract !== 'object' || typeof contract.id !== 'string' || contract.id === '' || typeof contract.taskKind !== 'string' || !Array.isArray(contract.allowedScopes) || !Array.isArray(contract.allowedEffects) || !Array.isArray(contract.requiredInputs) || !Array.isArray(contract.requiredPreconditions) || !Array.isArray(contract.requiredEvidence)) {
    throw new TypeError('contract must include id, taskKind, allowed scopes and effects, and required checks');
  }

  if (!task || typeof task !== 'object' || typeof task.kind !== 'string' || typeof task.scope !== 'string' || typeof task.requestedEffect !== 'string' || !task.inputs || typeof task.inputs !== 'object') {
    throw new TypeError('task must include kind, scope, requestedEffect, and inputs');
  }

  if (!preconditions || typeof preconditions !== 'object' || !Array.isArray(evidence)) {
    throw new TypeError('preconditions must be an object and evidence must be an array');
  }
}

/** Return true only for non-empty scalar values or non-empty arrays. */
function isPresent(value) {
  return Array.isArray(value) ? value.length > 0 : value !== '' && value !== undefined && value !== null;
}

/**
 * Select a Skill for a fixed teaching contract without external I/O or authorization.
 *
 * @param {{
 *   contract: {
 *     id: string,
 *     taskKind: string,
 *     allowedScopes: string[],
 *     allowedEffects: string[],
 *     requiredInputs: string[],
 *     requiredPreconditions: string[],
 *     requiredEvidence: string[],
 *   },
 *   task: { kind: string, scope: string, requestedEffect: string, inputs: object },
 *   preconditions: object,
 *   evidence: string[],
 * }} request
 * @returns {{
 *   status: 'selected' | 'blocked' | 'requires_approval' | 'not_applicable',
 *   phase: string,
 *   contractId: string,
 *   reasons: string[],
 *   missing: string[],
 *   effects: string[],
 * }}
 */
export function evaluateSkillSelection(request) {
  validateRequest(request);

  const { contract, task, preconditions, evidence } = request;
  if (task.kind !== contract.taskKind || !contract.allowedScopes.includes(task.scope)) {
    return selectionResult(
      'not_applicable',
      'scope_not_supported',
      contract.id,
      ['task scope is outside the skill contract'],
    );
  }

  if (!contract.allowedEffects.includes(task.requestedEffect)) {
    return selectionResult(
      'requires_approval',
      'effect_outside_default_boundary',
      contract.id,
      ['requested effect is outside the contract default'],
      [],
      [task.requestedEffect],
    );
  }

  const missingInputs = contract.requiredInputs.filter((key) => !isPresent(task.inputs[key]));
  if (missingInputs.length > 0) {
    return selectionResult(
      'blocked',
      'missing_required_inputs',
      contract.id,
      ['required task inputs are missing'],
      missingInputs,
    );
  }

  const missingPreconditions = contract.requiredPreconditions.filter((key) => preconditions[key] !== true);
  if (missingPreconditions.length > 0) {
    return selectionResult(
      'blocked',
      'missing_preconditions',
      contract.id,
      ['required preconditions are not satisfied'],
      missingPreconditions,
    );
  }

  const missingEvidence = contract.requiredEvidence.filter((item) => !evidence.includes(item));
  if (missingEvidence.length > 0) {
    return selectionResult(
      'blocked',
      'missing_selection_evidence',
      contract.id,
      ['required selection evidence is missing'],
      missingEvidence,
    );
  }

  return selectionResult(
    'selected',
    'ready_for_read_only_review',
    contract.id,
    ['task kind, scope, inputs, preconditions, and evidence satisfy the contract'],
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = evaluateSkillSelection({
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
  });

  console.log(JSON.stringify(result, null, 2));
}
