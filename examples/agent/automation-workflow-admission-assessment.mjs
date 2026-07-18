/**
 * Assesses a teaching proposal's responsibility boundary from injected data.
 * It does not discover or invoke a Skill, Hook, Workflow, CI system, scheduler,
 * permission system, file system, network, or external side effect.
 *
 * @param {{artifact?: Record<string, unknown>, environment?: {approvedEffects?: string[]}}} input
 * @returns {{status: "ready" | "blocked" | "requires_approval" | "not_applicable", boundary: string | null, reasons: string[]}}
 */
export function assessAutomationWorkflowAdmission({ artifact, environment = {} } = {}) {
  if (!artifact || typeof artifact !== "object") {
    return decision("blocked", null, ["artifact_missing"]);
  }

  const { kind, trigger, task, output, effect, failurePolicy, statefulSteps, stateRecord, checkpointRequired } = artifact;
  const approvedEffects = Array.isArray(environment.approvedEffects) ? environment.approvedEffects : [];

  if (!isSupportedKind(kind)) {
    const reason = kind === "tool" ? "tool_protocol_is_a_separate_boundary" : "artifact_kind_not_supported";
    return decision("not_applicable", null, [reason]);
  }

  if (!nonEmptyString(task) || !nonEmptyString(output)) {
    return decision("blocked", null, ["task_or_output_missing"]);
  }

  if (!nonEmptyString(effect)) {
    return decision("blocked", null, ["effect_boundary_missing"]);
  }

  if (!approvedEffects.includes(effect)) {
    return decision("requires_approval", null, ["effect_not_approved"]);
  }

  if (kind === "skill") {
    if (trigger !== "task_match") {
      return decision("blocked", null, ["skill_task_trigger_missing"]);
    }
    return decision("ready", "reusable_task_capability", []);
  }

  if (kind === "hook") {
    if (!nonEmptyString(trigger)) {
      return decision("blocked", null, ["hook_lifecycle_event_missing"]);
    }
    if (statefulSteps === true) {
      return decision("not_applicable", null, ["stateful_orchestration_requires_workflow"]);
    }
    if (!nonEmptyString(failurePolicy)) {
      return decision("blocked", null, ["hook_failure_policy_missing"]);
    }
    return decision("ready", "lifecycle_constraint", []);
  }

  if (kind === "workflow") {
    if (statefulSteps !== true || !nonEmptyString(stateRecord) || checkpointRequired !== true) {
      return decision("blocked", null, ["workflow_state_or_checkpoint_missing"]);
    }
    if (!nonEmptyString(failurePolicy)) {
      return decision("blocked", null, ["workflow_failure_policy_missing"]);
    }
    return decision("ready", "stateful_orchestration", []);
  }

  if (!nonEmptyString(trigger)) {
    return decision("blocked", null, ["automation_trigger_missing"]);
  }
  if (!nonEmptyString(failurePolicy)) {
    return decision("blocked", null, ["automation_failure_policy_missing"]);
  }
  return decision("ready", "event_driven_check", []);
}

function decision(status, boundary, reasons) {
  return { status, boundary, reasons };
}

function isSupportedKind(kind) {
  return kind === "skill" || kind === "hook" || kind === "workflow" || kind === "automation";
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "automation",
      trigger: "pull_request",
      task: "run Markdown checks",
      output: "check report",
      effect: "read",
      failurePolicy: "fail_visible",
    },
    environment: { approvedEffects: ["none", "read"] },
  });
  console.log(JSON.stringify(result));
}
