/** Assess a teaching-only MCP integration admission record. */
export function assessMcpIntegrationAdmission(input) {
  const reasons = [];
  const profile = input?.serverProfile;
  const request = input?.toolRequest;
  const environment = input?.environment;
  const approval = input?.approval;
  const observationPlan = input?.observationPlan;

  if (!profile?.serverId || profile.sourceVerified !== true || !profile.transportBoundary) {
    reasons.push("server_profile_incomplete_or_unverified");
  }

  if (!request?.tool || !request?.target || !["read", "write", "high_risk"].includes(request.effectClass)) {
    reasons.push("tool_request_incomplete_or_effect_unknown");
  }

  if (profile?.allowedTargets && request?.target && !profile.allowedTargets.includes(request.target)) {
    reasons.push("target_outside_server_profile");
  }

  const requestedScopes = request?.requestedScopes ?? [];
  const allowedScopes = environment?.allowedScopes ?? [];
  if (!requestedScopes.every((scope) => allowedScopes.includes(scope))) {
    reasons.push("scope_outside_environment_boundary");
  }

  if (!observationPlan?.verifyEffect) {
    reasons.push("effect_observation_plan_missing");
  }

  if (request?.effectClass === "write" || request?.effectClass === "high_risk") {
    if (approval?.status !== "approved" || approval.target !== request.target) {
      reasons.push("matching_human_approval_required");
    }
  }

  if (request?.annotationsTrusted === false) {
    reasons.push("untrusted_tool_annotations_require_review");
  }

  const hasHardBlock = reasons.some((reason) => [
    "server_profile_incomplete_or_unverified",
    "tool_request_incomplete_or_effect_unknown",
    "target_outside_server_profile",
    "scope_outside_environment_boundary",
    "effect_observation_plan_missing"
  ].includes(reason));
  const needsReview = reasons.some((reason) => [
    "matching_human_approval_required",
    "untrusted_tool_annotations_require_review"
  ].includes(reason));

  return {
    status: hasHardBlock ? "blocked" : needsReview ? "requires_human_review" : "ready",
    code: hasHardBlock
      ? "mcp_integration_admission_blocked"
      : needsReview
        ? "mcp_integration_admission_needs_review"
        : "mcp_integration_admission_ready",
    reasons,
    executionPerformed: false
  };
}

const demo = assessMcpIntegrationAdmission({
  serverProfile: {
    serverId: "reference-index-service",
    sourceVerified: true,
    transportBoundary: "reviewed-remote-profile",
    allowedTargets: ["book-references-staging"]
  },
  toolRequest: {
    tool: "update_reference_index",
    target: "book-references-staging",
    effectClass: "write",
    requestedScopes: ["references:write"]
  },
  environment: { allowedScopes: ["references:write"] },
  approval: { status: "approved", target: "book-references-staging" },
  observationPlan: { verifyEffect: "read_back_index" }
});

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(demo, null, 2));
}
