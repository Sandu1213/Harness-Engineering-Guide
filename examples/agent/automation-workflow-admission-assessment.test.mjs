import assert from "node:assert/strict";
import test from "node:test";

import { assessAutomationWorkflowAdmission } from "./automation-workflow-admission-assessment.mjs";

const safeEnvironment = {
  approvedEffects: ["none", "read"],
};

test("accepts a focused skill that has a task trigger and explicit output", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "skill",
      trigger: "task_match",
      task: "review one Markdown chapter",
      output: "structured findings",
      effect: "read",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "ready");
  assert.equal(result.boundary, "reusable_task_capability");
});

test("blocks a hook proposal without a lifecycle event", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "hook",
      task: "check a command before it runs",
      output: "allow or block",
      effect: "none",
      failurePolicy: "stop",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["hook_lifecycle_event_missing"]);
});

test("rejects using a hook as a substitute for stateful workflow orchestration", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "hook",
      trigger: "PreToolUse",
      task: "run research, drafting, review, and release",
      output: "published chapter",
      effect: "none",
      failurePolicy: "stop",
      statefulSteps: true,
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "not_applicable");
  assert.deepEqual(result.reasons, ["stateful_orchestration_requires_workflow"]);
});

test("requires approval for a lifecycle hook that asks for an unapproved write effect", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "hook",
      trigger: "PostToolUse",
      task: "record command output",
      output: "audit record",
      effect: "write",
      failurePolicy: "stop",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "requires_approval");
  assert.deepEqual(result.reasons, ["effect_not_approved"]);
});

test("blocks a workflow proposal that has no state or checkpoint boundary", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "workflow",
      trigger: "task_received",
      task: "research and review a chapter",
      output: "review package",
      effect: "read",
      failurePolicy: "stop",
      statefulSteps: true,
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["workflow_state_or_checkpoint_missing"]);
});

test("blocks scheduled automation without an explicit failure policy", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "automation",
      trigger: "pull_request",
      task: "run Markdown checks",
      output: "check report",
      effect: "read",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["automation_failure_policy_missing"]);
});

test("marks a tool proposal as out of scope for this routing decision", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "tool",
      trigger: "task_match",
      task: "read a file",
      output: "file contents",
      effect: "read",
      failurePolicy: "stop",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "not_applicable");
  assert.deepEqual(result.reasons, ["tool_protocol_is_a_separate_boundary"]);
});

test("accepts a workflow only when its state and checkpoint boundary is explicit", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "workflow",
      trigger: "task_received",
      task: "research and review a chapter",
      output: "review package",
      effect: "read",
      failurePolicy: "stop",
      statefulSteps: true,
      stateRecord: "chapter-review-v1",
      checkpointRequired: true,
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "ready");
  assert.equal(result.boundary, "stateful_orchestration");
});

test("accepts event-driven automation only with a bounded failure policy", () => {
  const result = assessAutomationWorkflowAdmission({
    artifact: {
      kind: "automation",
      trigger: "pull_request",
      task: "run Markdown checks",
      output: "check report",
      effect: "read",
      failurePolicy: "fail_visible",
    },
    environment: safeEnvironment,
  });

  assert.equal(result.status, "ready");
  assert.equal(result.boundary, "event_driven_check");
});
