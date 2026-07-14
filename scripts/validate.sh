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

echo "Validation completed."
