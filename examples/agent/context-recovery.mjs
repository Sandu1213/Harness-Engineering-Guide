/**
 * Check whether a Chapter Outline task can be claimed from an injected,
 * in-memory context snapshot. It performs no filesystem, network, process,
 * credential, or environment-variable I/O.
 *
 * @param {{
 *   currentState: { chapter: string, nextPhase: string, research: string, outline: string },
 *   progress: { research: string, outline: string },
 *   artifacts: { research: { present: boolean } },
 *   historySummary?: { outline?: string },
 * }} snapshot
 * @returns {{
 *   state: 'ready' | 'blocked',
 *   phase: 'task_claimable' | 'missing_prerequisite' | 'state_conflict',
 *   task: 'outline',
 *   requiredInputs: string[],
 *   evidence: string[],
 *   missing: string[],
 *   conflicts: string[],
 * }}
 */
export function recoverTask({ currentState, progress, artifacts, historySummary = {} }) {
  if (!currentState || typeof currentState !== 'object') {
    throw new TypeError('currentState must be an object');
  }

  if (!progress || typeof progress !== 'object') {
    throw new TypeError('progress must be an object');
  }

  if (!artifacts || typeof artifacts !== 'object' || !artifacts.research || typeof artifacts.research.present !== 'boolean') {
    throw new TypeError('artifacts.research.present must be a boolean');
  }

  if (!historySummary || typeof historySummary !== 'object') {
    throw new TypeError('historySummary must be an object');
  }

  const requiredInputs = ['currentState', 'progress', 'artifacts.research'];
  const missing = [];
  const conflicts = [];

  if (currentState.nextPhase !== 'outline') {
    conflicts.push('current state does not name outline as the next phase');
    return {
      state: 'blocked',
      phase: 'state_conflict',
      task: 'outline',
      requiredInputs,
      evidence: ['confirm the next phase before claiming outline work'],
      missing,
      conflicts,
    };
  }

  if (currentState.research !== 'complete' || progress.research !== 'complete' || !artifacts.research.present) {
    missing.push('artifacts.research');
    return {
      state: 'blocked',
      phase: 'missing_prerequisite',
      task: 'outline',
      requiredInputs,
      evidence: ['research artifact is required before outline'],
      missing,
      conflicts,
    };
  }

  if (currentState.outline !== progress.outline) {
    conflicts.push('outline status differs between current state and progress');
    return {
      state: 'blocked',
      phase: 'state_conflict',
      task: 'outline',
      requiredInputs,
      evidence: ['resolve the status conflict with reproducible evidence before claiming work'],
      missing,
      conflicts,
    };
  }

  if (historySummary.outline === 'complete' && currentState.outline !== 'complete') {
    conflicts.push('history summary conflicts with current unfinished outline state');
    return {
      state: 'blocked',
      phase: 'state_conflict',
      task: 'outline',
      requiredInputs,
      evidence: ['current state takes precedence until reproducible evidence resolves the conflict'],
      missing,
      conflicts,
    };
  }

  return {
    state: 'ready',
    phase: 'task_claimable',
    task: 'outline',
    requiredInputs,
    evidence: [
      'research artifact is present',
      'current state and progress agree on outline',
    ],
    missing,
    conflicts,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = recoverTask({
    currentState: {
      chapter: '03',
      nextPhase: 'outline',
      research: 'complete',
      outline: 'not_started',
    },
    progress: {
      research: 'complete',
      outline: 'not_started',
    },
    artifacts: {
      research: { present: true },
    },
  });

  console.log(JSON.stringify(result, null, 2));
}
