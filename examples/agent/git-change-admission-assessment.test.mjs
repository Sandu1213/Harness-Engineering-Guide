import assert from "node:assert/strict";
import test from "node:test";

import { assessGitChangeAdmission } from "./git-change-admission-assessment.mjs";

const validChange = (overrides = {}) => ({
  kind: "git_change_admission",
  changeId: "chapter-27-teaching-change",
  baseSnapshot: "teaching-baseline-a",
  branch: "chapter-27-teaching",
  worktreePath: "/teaching/worktrees/chapter-27",
  exclusivePaths: ["docs/part-04-engineering-practice/27-git-worktree-and-code-review.md"],
  changedPaths: ["docs/part-04-engineering-practice/27-git-worktree-and-code-review.md"],
  sharedPaths: [".ai/progress.md"],
  integrationOwner: "book-integrator",
  conflictState: "no_reported_conflict",
  evidence: {
    diffReviewed: true,
    validation: { status: "passed", command: "node --test teaching-example" },
    review: { status: "approved", reviewerKind: "human" }
  },
  ...overrides
});

test("returns ready only for a complete teaching change contract", () => {
  const result = assessGitChangeAdmission(validChange());

  assert.deepEqual(result, {
    status: "ready",
    route: "integration_decision",
    code: "change_contract_complete",
    reasons: [],
    admittedPaths: ["docs/part-04-engineering-practice/27-git-worktree-and-code-review.md"]
  });
});

test("returns not_applicable for an unrelated input", () => {
  assert.deepEqual(assessGitChangeAdmission({ kind: "conversation" }), {
    status: "not_applicable",
    route: null,
    code: "git_change_contract_not_provided",
    reasons: ["git_change_contract_not_provided"],
    admittedPaths: []
  });
});

test("blocks a missing baseline snapshot", () => {
  const result = assessGitChangeAdmission(validChange({ baseSnapshot: "" }));

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["base_snapshot_missing"]);
});

test("blocks a missing isolated worktree declaration", () => {
  const result = assessGitChangeAdmission(validChange({ worktreePath: "" }));

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["worktree_declaration_missing"]);
});

test("routes a shared changed path to the integrator", () => {
  const result = assessGitChangeAdmission(
    validChange({ changedPaths: [".ai/progress.md"] })
  );

  assert.equal(result.status, "requires_integration");
  assert.equal(result.route, "book-integrator");
  assert.deepEqual(result.reasons, ["shared_path_requires_integrator"]);
});

test("blocks a changed path outside the exclusive declaration", () => {
  const result = assessGitChangeAdmission(
    validChange({ changedPaths: ["examples/agent/unowned-example.mjs"] })
  );

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["changed_path_outside_exclusive_scope"]);
});

test("blocks missing diff evidence", () => {
  const result = assessGitChangeAdmission(
    validChange({ evidence: { ...validChange().evidence, diffReviewed: false } })
  );

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["diff_evidence_missing"]);
});

test("blocks failed validation evidence", () => {
  const result = assessGitChangeAdmission(
    validChange({
      evidence: {
        ...validChange().evidence,
        validation: { status: "failed", command: "node --test teaching-example" }
      }
    })
  );

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["validation_evidence_missing_or_failed"]);
});

test("blocks a non-human review record", () => {
  const result = assessGitChangeAdmission(
    validChange({
      evidence: {
        ...validChange().evidence,
        review: { status: "approved", reviewerKind: "agent" }
      }
    })
  );

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["human_review_evidence_missing"]);
});

test("blocks a change request instead of treating it as approval", () => {
  const result = assessGitChangeAdmission(
    validChange({
      evidence: {
        ...validChange().evidence,
        review: { status: "request_changes", reviewerKind: "human" }
      }
    })
  );

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["review_not_approved"]);
});

test("blocks an unresolved conflict declaration", () => {
  const result = assessGitChangeAdmission(validChange({ conflictState: "unknown" }));

  assert.equal(result.status, "blocked");
  assert.deepEqual(result.reasons, ["conflict_state_unresolved"]);
});

test("routes a shared path declared as exclusive to the integrator", () => {
  const result = assessGitChangeAdmission(
    validChange({ exclusivePaths: [".ai/progress.md"] })
  );

  assert.equal(result.status, "requires_integration");
  assert.equal(result.route, "book-integrator");
  assert.deepEqual(result.reasons, ["shared_path_requires_integrator"]);
});
