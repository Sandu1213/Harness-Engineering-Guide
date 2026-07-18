#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
progress_file="$repo_root/.ai/progress.md"

if [[ ! -f "$progress_file" ]]; then
  echo "Missing progress file: $progress_file" >&2
  exit 1
fi

awk -F '|' '
  function trim(value) {
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
    return value
  }

  BEGIN {
    allowed["未开始"] = 1
    allowed["进行中"] = 1
    allowed["完成"] = 1
    allowed["不适用"] = 1
    allowed["阻塞"] = 1
  }

  /^\| [0-9][0-9] / {
    total += 1
    chapter = trim($2)

    for (column = 3; column <= 11; column += 1) {
      state = trim($column)
      if (!(state in allowed)) {
        printf "Invalid state in %s, column %d: %s\\n", chapter, column - 2, state > "/dev/stderr"
        invalid = 1
      }
    }

    status = trim($11)
    counts[status] += 1
  }

  END {
    if (total == 0) {
      print "No chapter rows found in progress table." > "/dev/stderr"
      exit 1
    }

    print "Chapter progress"
    print "Total: " total
    for (status in counts) print status ": " counts[status]
    exit invalid
  }
' "$progress_file" | sort
