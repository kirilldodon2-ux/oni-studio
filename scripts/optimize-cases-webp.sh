#!/usr/bin/env bash
# Generate WebP siblings for PNG assets under public/cases/.
# WebP files are gitignored — upload to R2 via sync:cases-r2.
# Production CDN serves .webp when NEXT_PUBLIC_CASES_MEDIA_ORIGIN is set.
#
# Usage: ./scripts/optimize-cases-webp.sh [--force]

set -euo pipefail

FORCE=false
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
  esac
done

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found — install libwebp (brew install webp)" >&2
  exit 1
fi

count=0
skipped=0

while IFS= read -r -d '' png; do
  webp="${png%.png}.webp"
  if [ "$FORCE" = false ] && [ -f "$webp" ] && [ "$webp" -nt "$png" ]; then
    skipped=$((skipped + 1))
    continue
  fi
  # -alpha_q 90 preserves punch planet / sticker edges on RGBA sources
  cwebp -q 82 -alpha_q 90 "$png" -o "$webp" -quiet
  echo "→ ${webp#public/}"
  count=$((count + 1))
done < <(find public/cases -type f -name '*.png' ! -name '.DS_Store' -print0)

echo "Done — ${count} WebP created, ${skipped} skipped (up to date)"
