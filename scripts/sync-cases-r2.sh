#!/usr/bin/env bash
# Sync public/cases/ → Cloudflare R2 (cases lane transport).
# Keys mirror repo paths: public/cases/punch/foo.png → cases/punch/foo.png
#
# Requires: wrangler authenticated, CASES_R2_BUCKET set (default: oni-cases)
# Usage: ./scripts/sync-cases-r2.sh [--dry-run]
#
# See docs/CASES_SYSTEM.md § Media delivery

set -euo pipefail

BUCKET="${CASES_R2_BUCKET:-oni-cases}"
DRY_RUN=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
  esac
done

mime_for() {
  case "${1##*.}" in
    png)  echo "image/png" ;;
    jpg|jpeg) echo "image/jpeg" ;;
    webp) echo "image/webp" ;;
    avif) echo "image/avif" ;;
    mp4)  echo "video/mp4" ;;
    mov)  echo "video/quicktime" ;;
    svg)  echo "image/svg+xml" ;;
    *)    echo "application/octet-stream" ;;
  esac
}

count=0
while IFS= read -r -d '' file; do
  key="${file#public/}"
  ctype="$(mime_for "$file")"
  if [ "$DRY_RUN" = true ]; then
    echo "[dry-run] $key ($ctype)"
  else
    wrangler r2 object put "${BUCKET}/${key}" \
      --file="$file" \
      --content-type="$ctype" \
      --cache-control="public, max-age=31536000, immutable" \
      --remote
    echo "↑ $key"
  fi
  count=$((count + 1))
done < <(find public/cases -type f ! -name '.DS_Store' -print0)

echo "Done — ${count} object(s) → bucket ${BUCKET}"
