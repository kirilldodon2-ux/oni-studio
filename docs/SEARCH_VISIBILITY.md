# Search Visibility

## Implemented Locally

- Original team-supplied social preview: `public/social/oni-preview.jpg`.
- Open Graph / Twitter large-image metadata with production-absolute URLs.
- Homepage canonical: `https://onidigital.net/`, including export-query variants.
- `app/sitemap.ts` lists all published pages: homepage, brandbook, archive and
  Works indexes, cases index, PUNCH, every registered archive object and Work.
  It is independent of the homepage selection. No fabricated lastmod dates.
- Main menu retains all page indexes alongside homepage anchors. Root copy and
  metadata identify ONI as an independent creative collective focused on 3D,
  motion design and web development. This is not a claim of legal cooperative status.
- `app/robots.ts` permits crawling and points to the production sitemap.
- Global EN/RU is currently a client reading preference, not separate language
  URLs. Search metadata and sitemap remain English-first; no hreflang is emitted.

## After Deployment

1. Check production `/robots.txt`, `/sitemap.xml`, and `/social/oni-preview.jpg`.
2. Verify the `onidigital.net` Domain property in Google Search Console via DNS.
   The Google account does not need to match the Cloudflare account. The
   developer can verify first and grant the ONI account ownership of the same
   property; do not share passwords or create duplicate resources unnecessarily.
3. Submit the sitemap and inspect the homepage and principal project URLs.
4. Review page-specific descriptions and project context for search quality.
5. Check social-link unfurling. Platforms may retain an earlier cached image.

No Search Console submission or verification has been performed. Crawl access
and sitemap inclusion do not guarantee indexing, ranking, or AI citations.

Google's AI search features use the same SEO foundations; a special AI file or
new schema is not required:
https://developers.google.com/search/docs/appearance/ai-features

## Next Pass

Separately indexed EN/RU pages are explicitly deferred to the next pass. Plan
stable `/ru/...` URLs, translated metadata, reciprocal hreflang, language-aware
canonicals and sitemap alternates together. Do not add hreflang to the current
single-URL language preference or claim Russian search coverage is complete.

Search Console ownership and access:
https://support.google.com/webmasters/answer/9008080
https://support.google.com/webmasters/answer/7687615

## Local Media

The public archive R2 origin was observed on the deployed site and is configured
in the ignored `.env.local` for preview. This allows public media playback without
bucket credentials. It does not alter Cloudflare settings or private access.
