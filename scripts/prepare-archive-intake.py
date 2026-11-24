#!/usr/bin/env python3
"""Prepare an ONI archive batch from a reviewed JSON array. Never writes to R2.

Each row supplies slug, title, creator, folderId, sourceUrl and heroUrl.
summary, summaryRu and a verified year are optional. Output is a review manifest and
WebP files under public/archive/objects; use the existing ONI publish flow.
"""

import argparse
import json
import re
import subprocess
from math import gcd
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


TERRITORIES = {
    "3d-motion": ["experimental-media", "editorial-motion"],
    "digital-fashion": ["experimental-media", "editorial-motion"],
    "events": ["spatial-identity", "editorial-motion"],
    "graphic-design": ["spatial-identity", "archive-research"],
    "web": ["system-architectures"],
    "experiments": ["experimental-media"],
}
MAX_PREVIEW_BYTES = 20 * 1024 ** 2
IMAGE_DECODERS = {"image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp",
                  "image/avif": "avif", "image/gif": "gif"}


def https_url(value):
    url = urlsplit(value)
    if url.scheme != "https" or not url.hostname or url.username or url.password:
        raise ValueError(f"Expected a public HTTPS link, got {value!r}")
    return value


def read_preview(url):
    request = Request(https_url(url), headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=20) as response:
        https_url(response.url)
        decoder = IMAGE_DECODERS.get(response.headers.get_content_type())
        if not decoder:
            raise ValueError("The preview must be a JPEG, PNG, WebP, AVIF or GIF")
        data = response.read(MAX_PREVIEW_BYTES + 1)
    if not data or len(data) > MAX_PREVIEW_BYTES:
        raise ValueError("The image is empty or larger than 20 MB")
    return data, decoder


def prepare(row, assets):
    slug = row["slug"]
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise ValueError(f"Invalid archive slug: {slug!r}")
    folder = row["folderId"]
    source = https_url(row["sourceUrl"])
    media_key = f"archive/objects/{slug}/00-hero.webp"
    hero = assets / media_key
    hero.parent.mkdir(parents=True, exist_ok=True)
    if hero.exists():
        raise FileExistsError(f"Preview already staged: {slug}")
    data, decoder = read_preview(row["heroUrl"])
    subprocess.run(
        ["magick", f"{decoder}:-[0]", "-auto-orient", "-colorspace", "sRGB",
         "-resize", "1520x1520>", "-strip", "-quality", "88", str(hero)],
        input=data,
        check=True,
    )
    size = subprocess.check_output(["magick", "identify", "-format", "%w %h", str(hero)], text=True)
    width, height = map(int, size.split())
    if min(width, height) < 240:
        hero.unlink()
        raise ValueError(f"Preview is too small: {slug} ({width}×{height})")
    divisor = gcd(width, height)
    record = {
        "slug": slug,
        "title": row["title"],
        "creator": row["creator"],
        "sourceUrl": source,
        "folderId": folder,
        "territories": TERRITORIES[folder],
        "archetype": "Work",
        "previewSrc": "/" + media_key,
        "mediaAspect": [width // divisor, height // divisor],
    }
    return record | {key: row[key] for key in ("summary", "summaryRu", "year") if row.get(key) is not None}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("batch", type=Path, help="Reviewed JSON input")
    parser.add_argument("output", type=Path, help="Path for a new staging folder")
    args = parser.parse_args()

    repo = Path(__file__).resolve().parents[1]
    catalog = "\n".join((repo / "content" / name).read_text() for name in ("field.ts", "importedArchive.ts"))
    known_slugs = set(re.findall(r'\b"?slug"?\s*:\s*"([^"]+)"', catalog))
    known_sources = set(re.findall(r'\b"?sourceUrl"?\s*:\s*"([^"]+)"', catalog))
    args.output.mkdir(parents=True)
    staged = []
    errors = []
    for row in json.loads(args.batch.read_text()):
        if row["slug"] in known_slugs or row["sourceUrl"] in known_sources:
            print(f'Already in the archive: {row["slug"]}')
            continue
        try:
            record = prepare(row, args.output / "public")
        except (ValueError, OSError, subprocess.CalledProcessError) as error:
            errors.append({"slug": row["slug"], "error": str(error)})
            continue
        staged.append(record)
        known_slugs.add(record["slug"])
        known_sources.add(record["sourceUrl"])
    (args.output / "archive-preview.json").write_text(json.dumps(staged, indent=2, ensure_ascii=False) + "\n")
    if errors:
        (args.output / "skipped.json").write_text(json.dumps(errors, indent=2, ensure_ascii=False) + "\n")
    print(f"{len(staged)} ready for review, {len(errors)} skipped in {args.output}")


if __name__ == "__main__":
    main()
