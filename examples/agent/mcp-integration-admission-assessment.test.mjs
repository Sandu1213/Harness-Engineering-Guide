import assert from "node:assert/strict";
import test from "node:test";

import { assessMcpIntegrationAdmission } from "./mcp-integration-admission-assessment.mjs";

function completeInput(overrides = {}) {
  return {
    serverProfile: {
      serverId: "reference-index-service",
      sourceVerified: true,
      transportBoundary: "reviewed-remote-profile",
      allowedTargets: ["book-references-staging"],
      ...overrides.serverProfile
    },
    toolRequest: {
      tool: "update_reference_index",
      target: "book-references-staging",
      effectClass: "read",
      requestedScopes: ["references:read"],
      ...overrides.toolRequest
    },
    environment: {
      allowedScopes: ["references:read", "references:write"],
      ...overrides.environment
    },
    approval: {
      status: "approved",
      target: "book-references-staging",
      ...overrides.approval
    },
    observationPlan: {
      verifyEffect: "read_back_index",
      ...overrides.observationPlan
    }
  };
}

test("accepts a complete read-only teaching admission record", () => {
  const result = assessMcpIntegrationAdmission(completeInput());

  assert.equal(result.status, "ready");
  assert.equal(result.executionPerformed, false);
});

test("requires a matching approval before a write admission is ready", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    toolRequest: { effectClass: "write" },
    approval: { status: "pending" }
  }));

  assert.equal(result.status, "requires_human_review");
  assert.deepEqual(result.reasons, ["matching_human_approval_required"]);
});

test("blocks an unverified server source", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    serverProfile: { sourceVerified: false }
  }));

  assert.equal(result.status, "blocked");
  assert.ok(result.reasons.includes("server_profile_incomplete_or_unverified"));
});

test("blocks a target outside the declared server profile", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    toolRequest: { target: "production-reference-index" }
  }));

  assert.equal(result.status, "blocked");
  assert.ok(result.reasons.includes("target_outside_server_profile"));
});

test("blocks a scope outside the teaching environment boundary", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    toolRequest: { requestedScopes: ["references:write", "admin:all"] }
  }));

  assert.equal(result.status, "blocked");
  assert.ok(result.reasons.includes("scope_outside_environment_boundary"));
});

test("blocks a request without an independent effect observation plan", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    observationPlan: { verifyEffect: "" }
  }));

  assert.equal(result.status, "blocked");
  assert.ok(result.reasons.includes("effect_observation_plan_missing"));
});

test("routes untrusted tool annotations to human review", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    toolRequest: { annotationsTrusted: false }
  }));

  assert.equal(result.status, "requires_human_review");
  assert.deepEqual(result.reasons, ["untrusted_tool_annotations_require_review"]);
});

test("blocks an unknown effect category", () => {
  const result = assessMcpIntegrationAdmission(completeInput({
    toolRequest: { effectClass: "unknown" }
  }));

  assert.equal(result.status, "blocked");
  assert.ok(result.reasons.includes("tool_request_incomplete_or_effect_unknown"));
});
