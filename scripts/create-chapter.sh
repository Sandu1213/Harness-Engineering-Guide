#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./scripts/create-chapter.sh <two-digit-number> <english-slug> <part-directory>

Example:
  ./scripts/create-chapter.sh 01 prompt-to-harness docs/part-01-foundations

The script creates a chapter from CHAPTER_TEMPLATE.md. Replace the generated
Chinese title placeholder, then update docs/SUMMARY.md, .ai/outline.md and
.ai/progress.md before starting the Research Brief.
EOF
}

if [[ "$#" -ne 3 ]]; then
  usage >&2
  exit 1
fi

number="$1"
slug="$2"
destination="$3"

if [[ ! "$number" =~ ^[0-9]{2}$ ]]; then
  echo "Chapter number must be two digits, for example 01." >&2
  exit 1
fi

if [[ ! "$slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Slug must use lowercase English kebab-case." >&2
  exit 1
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
template="$repo_root/CHAPTER_TEMPLATE.md"
output_dir="$repo_root/$destination"
output_file="$output_dir/$number-$slug.md"

if [[ ! -f "$template" ]]; then
  echo "Missing template: $template" >&2
  exit 1
fi

if [[ -e "$output_file" ]]; then
  echo "Refusing to overwrite existing chapter: $output_file" >&2
  exit 1
fi

mkdir -p "$output_dir"
cp "$template" "$output_file"

perl -0pi -e "s/NN-english-kebab-case/${number}-${slug}/g; s/part-XX/$(basename "$destination")/g" "$output_file"

echo "Created $output_file"
echo "Next: replace the Chinese title placeholder and begin the Research Brief."
