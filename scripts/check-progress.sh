#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
progress_file="$repo_root/.ai/progress.md"

if [[ ! -f "$progress_file" ]]; then
  echo "Missing progress file: $progress_file" >&2
  exit 1
fi

awk -F '|' '
  /^\| [0-9][0-9] / {
    total += 1
    status = $11
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", status)
    counts[status] += 1
  }
  END {
    print "Chapter progress"
    print "Total: " total
    for (status in counts) print status ": " counts[status]
  }
' "$progress_file" | sort
