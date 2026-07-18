/**
 * Assess a declared teaching change contract without touching Git or the file system.
 * @param {unknown} candidate A caller-provided teaching object.
 * @returns {{status: string, route: string | null, code: string, reasons: string[], admittedPaths: string[]}}
 */
export function assessGitChangeAdmission(candidate) {
  if (!candidate || typeof candidate !== "object" || candidate.kind !== "git_change_admission") {
    return result("not_applicable", null, "git_change_contract_not_provided", [
      "git_change_contract_not_provided"
    ]);
  }

  const reasons = [];
  const exclusivePaths = stringList(candidate.exclusivePaths);
  const changedPaths = stringList(candidate.changedPaths);
  const sharedPaths = stringList(candidate.sharedPaths);
  const evidence = objectOrEmpty(candidate.evidence);
  const validation = objectOrEmpty(evidence.validation);
  const review = objectOrEmpty(evidence.review);

  if (!nonEmptyString(candidate.changeId)) reasons.push("change_id_missing");
  if (!nonEmptyString(candidate.baseSnapshot)) reasons.push("base_snapshot_missing");
  if (!nonEmptyString(candidate.branch)) reasons.push("branch_declaration_missing");
  if (!nonEmptyString(candidate.worktreePath)) reasons.push("worktree_declaration_missing");
  if (exclusivePaths.length === 0) reasons.push("exclusive_paths_missing");
  if (changedPaths.length === 0) reasons.push("changed_paths_missing");
  if (!nonEmptyString(candidate.integrationOwner)) reasons.push("integration_owner_missing");
  if (candidate.conflictState !== "no_reported_conflict") reasons.push("conflict_state_unresolved");

  const sharedChange = [...exclusivePaths, ...changedPaths].some((path) => sharedPaths.includes(path));
  if (sharedChange) {
    if (!nonEmptyString(candidate.integrationOwner)) {
      return result("blocked", null, "integration_owner_missing", ["integration_owner_missing"]);
    }
    return result(
      "requires_integration",
      candidate.integrationOwner,
      "shared_path_requires_integrator",
      ["shared_path_requires_integrator"]
    );
  }

  if (changedPaths.some((path) => !exclusivePaths.includes(path))) {
    reasons.push("changed_path_outside_exclusive_scope");
  }
  if (evidence.diffReviewed !== true) reasons.push("diff_evidence_missing");
  if (validation.status !== "passed" || !nonEmptyString(validation.command)) {
    reasons.push("validation_evidence_missing_or_failed");
  }
  if (review.reviewerKind !== "human") reasons.push("human_review_evidence_missing");
  if (review.status !== "approved") reasons.push("review_not_approved");

  if (reasons.length > 0) {
    return result("blocked", null, reasons[0], unique(reasons));
  }

  return result(
    "ready",
    "integration_decision",
    "change_contract_complete",
    [],
    changedPaths
  );
}

function result(status, route, code, reasons, admittedPaths = []) {
  return { status, route, code, reasons, admittedPaths };
}

function objectOrEmpty(value) {
  return value && typeof value === "object" ? value : {};
}

function stringList(value) {
  return Array.isArray(value) ? value.filter(nonEmptyString) : [];
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function unique(values) {
  return [...new Set(values)];
}

if (import.meta.main) {
  console.log(
    JSON.stringify(
      assessGitChangeAdmission({
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
        }
      })
    )
  );
}
