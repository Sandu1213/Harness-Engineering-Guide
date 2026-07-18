/**
 * Evaluates a teaching task contract using only injected collaboration data.
 * It does not create agents, processes, file locks, worktrees, messages,
 * files, network connections, shared state, or external side effects.
 *
 * @param {{task?: Record<string, unknown>, claims?: Array<Record<string, unknown>>, integration?: Record<string, unknown>}} input
 * @returns {{status: "ready" | "blocked" | "requires_integration" | "not_applicable", route: string | null, reasons: string[], isolatedPaths: string[]}}
 */
export function assessTaskIsolation({ task, claims = [], integration = {} } = {}) {
  if (!task || typeof task !== "object") {
    return decision("blocked", null, ["task_missing"]);
  }

  if (task.kind && task.kind !== "task_contract") {
    return decision("not_applicable", null, ["task_contract_not_provided"]);
  }

  if (!nonEmptyString(task.id)) {
    return decision("blocked", null, ["task_id_missing"]);
  }

  if (!nonEmptyString(task.owner)) {
    return decision("blocked", null, ["task_owner_missing"]);
  }

  const exclusivePaths = stringList(task.exclusivePaths);
  if (exclusivePaths.length === 0) {
    return decision("blocked", null, ["exclusive_paths_missing"]);
  }

  if (stringList(task.acceptance).length === 0) {
    return decision("blocked", null, ["acceptance_contract_missing"]);
  }

  if (stringList(task.stopConditions).length === 0) {
    return decision("blocked", null, ["stop_condition_missing"]);
  }

  const sharedArtifacts = stringList(integration.sharedArtifacts);
  if (exclusivePaths.some((path) => sharedArtifacts.includes(path))) {
    return decision("blocked", null, ["shared_artifact_cannot_be_exclusive"]);
  }

  const requestedSharedWrites = stringList(task.requestedSharedWrites);
  if (requestedSharedWrites.length > 0) {
    if (!nonEmptyString(integration.owner)) {
      return decision("blocked", null, ["integration_owner_missing"]);
    }
    if (requestedSharedWrites.some((path) => !sharedArtifacts.includes(path))) {
      return decision("blocked", null, ["shared_artifact_not_declared"]);
    }
    return decision("requires_integration", "integration_owner", ["shared_artifact_write_requires_integration"]);
  }

  const activeClaims = Array.isArray(claims) ? claims : [];
  const overlap = activeClaims.some((claim) => {
    if (!claim || typeof claim !== "object" || claim.owner === task.owner) {
      return false;
    }
    return stringList(claim.exclusivePaths).some((claimedPath) =>
      exclusivePaths.some((taskPath) => pathsOverlap(taskPath, claimedPath)),
    );
  });

  if (overlap) {
    return decision("blocked", null, ["exclusive_path_already_claimed"]);
  }

  return decision("ready", "isolated_task", [], exclusivePaths);
}

function decision(status, route, reasons, isolatedPaths = []) {
  return { status, route, reasons, isolatedPaths };
}

function stringList(value) {
  return Array.isArray(value) ? value.filter(nonEmptyString) : [];
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function pathsOverlap(left, right) {
  const normalizedLeft = left.replace(/\/+$/, "");
  const normalizedRight = right.replace(/\/+$/, "");
  return (
    normalizedLeft === normalizedRight ||
    normalizedLeft.startsWith(`${normalizedRight}/`) ||
    normalizedRight.startsWith(`${normalizedLeft}/`)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = assessTaskIsolation({
    task: {
      kind: "task_contract",
      id: "chapter-26-draft",
      owner: "chapter-26-writer",
      exclusivePaths: ["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"],
      acceptance: ["local-node-test", "local-markdown-lint"],
      stopConditions: ["shared-artifact-needed", "ownership-conflict"],
    },
    claims: [],
    integration: {
      owner: "integration-lead",
      sharedArtifacts: [".ai/progress.md", ".context/CURRENT_STATE.md"],
    },
  });
  console.log(JSON.stringify(result));
}
