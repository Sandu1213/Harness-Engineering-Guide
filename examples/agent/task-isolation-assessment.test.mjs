import assert from "node:assert/strict";
import test from "node:test";

import { assessTaskIsolation } from "./task-isolation-assessment.mjs";

const integration = {
  owner: "integration-lead",
  sharedArtifacts: [".ai/progress.md", ".context/CURRENT_STATE.md"],
};

function isolatedTask(overrides = {}) {
  return {
    id: "chapter-26-draft",
    owner: "chapter-26-writer",
    exclusivePaths: ["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"],
    acceptance: ["local-node-test", "local-markdown-lint"],
    stopConditions: ["shared-artifact-needed", "ownership-conflict"],
    ...overrides,
  };
}

test("accepts a bounded task with exclusive output ownership", () => {
  const result = assessTaskIsolation({
    task: isolatedTask(),
    claims: [],
    integration,
  });

  assert.equal(result.status, "ready");
  assert.equal(result.route, "isolated_task");
});

test("blocks a task without a named owner", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({ owner: "" }),
    claims: [],
    integration,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["task_owner_missing"]);
});

test("blocks a task without an acceptance contract", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({ acceptance: [] }),
    claims: [],
    integration,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["acceptance_contract_missing"]);
});

test("blocks a task without a stop condition", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({ stopConditions: [] }),
    claims: [],
    integration,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["stop_condition_missing"]);
});

test("blocks overlapping exclusive path claims from different owners", () => {
  const result = assessTaskIsolation({
    task: isolatedTask(),
    claims: [
      {
        taskId: "chapter-26-review",
        owner: "chapter-26-reviewer",
        exclusivePaths: ["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"],
      },
    ],
    integration,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["exclusive_path_already_claimed"]);
});

test("allows the same owner to continue an existing claim", () => {
  const result = assessTaskIsolation({
    task: isolatedTask(),
    claims: [
      {
        taskId: "chapter-26-draft",
        owner: "chapter-26-writer",
        exclusivePaths: ["docs/part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md"],
      },
    ],
    integration,
  });

  assert.equal(result.status, "ready");
  assert.equal(result.route, "isolated_task");
});

test("routes shared artifact writes to the integration owner", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({
      requestedSharedWrites: [".ai/progress.md"],
    }),
    claims: [],
    integration,
  });

  assert.equal(result.status, "requires_integration");
  assert.equal(result.route, "integration_owner");
  assert.deepEqual(result.reasons, ["shared_artifact_write_requires_integration"]);
});

test("blocks shared artifact writes when no integration owner is declared", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({
      requestedSharedWrites: [".ai/progress.md"],
    }),
    claims: [],
    integration: { sharedArtifacts: [".ai/progress.md"] },
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["integration_owner_missing"]);
});

test("blocks a task whose claimed path is shared but not declared as an integration request", () => {
  const result = assessTaskIsolation({
    task: isolatedTask({
      exclusivePaths: [".context/CURRENT_STATE.md"],
    }),
    claims: [],
    integration,
  });

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["shared_artifact_cannot_be_exclusive"]);
});

test("marks an unstructured request as out of scope for task-isolation admission", () => {
  const result = assessTaskIsolation({
    task: { kind: "conversation" },
    claims: [],
    integration,
  });

  assert.equal(result.status, "not_applicable");
  assert.deepEqual(result.reasons, ["task_contract_not_provided"]);
});
