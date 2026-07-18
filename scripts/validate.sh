#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Install a supported Node.js runtime, then run npm install." >&2
  exit 1
fi

echo "Running Markdown lint..."
npm run lint:md

echo "Running Markdown link check..."
npm run check:links

echo "Running minimal Harness tests..."
npm run test:harness

echo "Running runtime boundary example tests..."
npm run test:runtime-boundaries

echo "Running context recovery example tests..."
npm run test:context-recovery

echo "Running controlled configuration change example tests..."
npm run test:controlled-config-change

echo "Running instruction packet example tests..."
npm run test:instruction-packet

echo "Running context packet example tests..."
npm run test:context-packet

echo "Running memory record decision example tests..."
npm run test:memory-record-decision

echo "Running skill selection example tests..."
npm run test:skill-selection

echo "Running task plan assessment example tests..."
npm run test:task-plan-assessment

echo "Running workflow transition assessment example tests..."
npm run test:workflow-transition-assessment

echo "Running tool invocation assessment example tests..."
npm run test:tool-invocation-assessment

echo "Running environment sandbox assessment example tests..."
npm run test:environment-sandbox-assessment

echo "Running retrieval evidence assessment example tests..."
npm run test:retrieval-evidence-assessment

echo "Running human approval routing example tests..."
npm run test:human-approval-routing

echo "Running observation snapshot assessment example tests..."
npm run test:observation-snapshot-assessment

echo "Running reflection record assessment example tests..."
npm run test:reflection-record-assessment

echo "Running evaluation spec assessment example tests..."
npm run test:evaluation-spec-assessment

echo "Running retry and recovery assessment example tests..."
npm run test:retry-recovery-assessment

echo "Running context compaction assessment example tests..."
npm run test:context-compaction-assessment

echo "Running self-improvement boundary assessment example tests..."
npm run test:self-improvement-boundary-assessment

echo "Running project Harness portability assessment example tests..."
npm run test:project-harness-portability-assessment

echo "Running repository rule loading assessment example tests..."
npm run test:repository-rule-loading-assessment

echo "Running automation workflow admission assessment example tests..."
npm run test:automation-workflow-admission-assessment

echo "Running MCP integration admission assessment example tests..."
npm run test:mcp-integration-admission-assessment

echo "Running browser E2E evidence assessment example tests..."
npm run test:browser-e2e-evidence-assessment

echo "Running task isolation assessment example tests..."
npm run test:task-isolation-assessment

echo "Running Git change admission assessment example tests..."
npm run test:git-change-admission-assessment

echo "Running minimal Harness admission assessment example tests..."
npm run test:minimal-harness-admission-assessment

echo "Running software change delivery assessment example tests..."
npm run test:software-change-delivery-assessment

echo "Running Flutter login delivery assessment example tests..."
npm run test:flutter-login-delivery-assessment

echo "Running test evidence plan assessment example tests..."
npm run test:test-evidence-plan-assessment

echo "Running bug investigation assessment example tests..."
npm run test:bug-investigation-assessment

echo "Running project memory health example tests..."
npm run test:project-memory-health

echo "Running skill library admission assessment example tests..."
npm run test:skill-library-admission-assessment

echo "Running enterprise harness admission assessment example tests..."
npm run test:enterprise-harness-admission-assessment

echo "Running Harness pattern selection assessment example tests..."
npm run test:harness-pattern-selection-assessment

echo "Running memory and Skill boundary assessment example tests..."
npm run test:memory-skill-boundary-assessment

echo "Running feedback approval route assessment example tests..."
npm run test:feedback-approval-route-assessment

echo "Running Harness evaluation plan assessment example tests..."
npm run test:harness-evaluation-plan-assessment

echo "Running resource optimization assessment example tests..."
npm run test:resource-optimization-assessment

echo "Running research security plan assessment example tests..."
npm run test:research-security-plan-assessment

echo "Running Harness release experiment assessment example tests..."
npm run test:harness-release-experiment-assessment

echo "Running book chapter completion assessment example tests..."
npm run test:book-chapter-completion-assessment

echo "Running content production handoff assessment example tests..."
npm run test:content-production-handoff-assessment

echo "Running cross-tool handoff assessment example tests..."
npm run test:cross-tool-handoff-assessment

echo "Running derived content package assessment example tests..."
npm run test:derived-content-package-assessment

echo "Running Agent Engineering readiness assessment example tests..."
npm run test:agent-engineering-readiness-assessment

echo "Checking chapter task state..."
./scripts/check-progress.sh

echo "Validation completed."
