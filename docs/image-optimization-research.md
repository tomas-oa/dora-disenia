# Image optimization research

Date: 2026-08-26

## Audit

The production site serves original raster assets from R2 through `src/pages/media/[...key].ts`.
The route sets long-lived immutable caching, but performs no resizing or format conversion.
`src/components/ui/media-image.astro` renders plain `<img>` elements, so Astro does not process these
CMS/R2 images.

Observed from `https://www.doradisena.cl/` and the Kombucha Loyca project page:

| Asset | Bytes | Intrinsic size | Main use |
| --- | ---: | ---: | --- |
| `kombucha-loyca/cover.png` | 3.94 MB | 2844 px wide | cover |
| `kombucha-loyca/1.png` | 3.45 MB | 3000 px wide | gallery |
| `kombucha-loyca/2.png` | 3.50 MB | 2000 px wide | gallery |
| `kombucha-loyca/3.png` | 1.95 MB | 2000 px wide | gallery |
| `kombucha-loyca/4.png` | 1.85 MB | 2000 px wide | gallery |
| `ui/lets_work.png` | 114 KB | 4267 px wide | home hero/background |
| `ui/contact/gradient_desktop.png` | 797 KB | 2905 px wide | contact panel |

The five-image project gallery is about 14.7 MB before browser caching. A local Bun 1.4 test on the
3.94 MB cover produced approximately 31.6 KB at 800 px WebP quality 85, 80.6 KB at 1600 px, and
175 KB at 2400 px quality 90. These are directional measurements, not visual-QA approval.

## Options

### Recommended: Cloudflare Images binding at the media route

Keep the originals in R2. Add an `IMAGES` binding, transform R2 bytes on demand, and cache each
width/format variant. Use WebP quality around 85 as the first visual baseline, with AVIF as an
optional modern-browser source and the original as a fallback. Add explicit width variants such as
800, 1200, 1600, and 2400 px, then emit `srcset`/`sizes` from `MediaImage`.

Cloudflare documents passing R2 bytes directly to the Images binding, resizing, encoding to WebP or
AVIF, and enabling Workers Cache because transforms otherwise repeat on every request:

- https://developers.cloudflare.com/images/optimization/binding/
- https://developers.cloudflare.com/images/pricing/

This preserves full-resolution originals and avoids a destructive re-upload. It does require an
Images binding/config rollout and should be validated against the account plan and transformation
budget.

### Useful: Bun 1.4 conversion tooling

Bun 1.4's `Bun.Image` supports resizing and WebP/AVIF output, including quality and lossless modes:

- https://bun.sh/reference/bun/Image
- https://bun.sh/reference/bun/Image/resize
- https://bun.sh/reference/bun/Image/webp
- https://bun.sh/reference/bun/Image/write

Use it for a one-time R2 migration or local asset pipeline only. The deployed target is a Cloudflare
Worker, not a Bun server, so Bun cannot be the request-time image transformer here.

### Alternative: pre-generate variants and store them in R2

Generate fixed WebP/AVIF variants during upload or via a migration job, then store them beside the
original. This makes delivery cheap and predictable, but increases storage, upload complexity, and
variant invalidation work. It is reasonable if transform billing or first-request latency becomes a
concern.

### Re-upload optimized media

Manual re-uploading as WebP is a valid short-term fix for the existing portfolio. Prefer keeping the
original master outside the delivery path, then uploading a high-quality WebP derivative. Do not
overwrite the only master if the image may later be repurposed, cropped, or exported. Existing media
records would need their `object_key`, `public_url`, `mime_type`, `size_bytes`, and dimensions updated;
changing only the filename would leave stale DB metadata and cached URLs.

This is simpler than runtime transforms, but it does not automatically create mobile-sized versions,
and future uploads can regress unless the admin upload path or a documented conversion step enforces
the policy.

### Bundle stable UI assets in the codebase

The current R2 UI inventory is approximately:

| Asset group | Current bytes | Recommendation |
| --- | ---: | --- |
| Small SVG logos, arrows, sticker, icon, backgrounds, footer art | ~34 KB total | Move to `src/assets/ui` |
| `ui/lets_work.png` | 114 KB | Move to `src/assets/ui`, resize/compress during build |
| Contact gradients | ~1.56 MB total | Move to `src/assets/ui`, resize/compress; consider CSS gradients later |
| `cv.pdf` | 66 KB | Keep as a downloadable R2/static file |

Astro documents that images in `src/` can be transformed, optimized, and bundled, while `public/`
assets are served as-is. Use imported assets with Astro's image components where raster processing
is useful; use hashed imported URLs for tiny SVGs. Bundling the SVGs will not materially change their
already-small transfer size, but gives them deploy-time hashing and keeps immutable site chrome
versioned with the code. It also removes unnecessary R2 requests for non-CMS assets.

The smooth gradient assets are the strongest static candidates: local Bun tests produced about 23 KB
and 17 KB WebP quality 90 at 1600 px and 1200 px widths, respectively, versus ~797 KB and ~760 KB
as original PNGs. Validate gradient banding before committing to lossy output.

### Avoid as the first move: only changing PNG to WebP

Format conversion helps, but serving a 2800–3000 px image into a roughly 978 px desktop slot still
wastes bytes. Resize and format together. Keep PNG/lossless WebP for assets where exact pixels or
transparency matter; use lossy WebP/AVIF for photographic or raster portfolio work after visual QA.

Astro's `<Image />`/`<Picture />` can generate optimized responsive output for authorized local or
remote images, but the current Cloudflare setup uses runtime R2 URLs and plain `<img>` tags. Astro
also documents that plain `<img>` receives no image processing, and that Cloudflare adapters may use
a passthrough service:

- https://docs.astro.build/en/guides/images/

## Implementation guardrails

1. Keep original R2 objects and existing URLs available.
2. Transform only `image/*`; pass video, PDF, SVG, and unsupported/animated assets through unchanged
   initially.
3. Bound requested widths server-side; never allow arbitrary transform parameters.
4. Set `Vary: Accept`, content type from the actual output, and cache keys that include width/format.
5. Preserve width/height metadata and emit `srcset`/`sizes` to stop mobile devices downloading desktop
   pixels.
6. Test representative illustration, text-heavy PNG, transparency, GIF, and high-detail assets at
   WebP quality 80/85/90 before choosing the default.

## Conclusion

The immediate issue is oversized original PNG delivery, not missing cache headers. The lowest-risk
production fix is Cloudflare edge transformation backed by R2, with Bun reserved for offline
conversion/migration. The static UI assets are now bundled from `src/assets/ui`; large static PNGs are
stored locally as visually checked WebP derivatives. The CMS now stores the CV as a versioned R2 asset
with an admin replacement flow. Project media still needs the separate R2 transformation or derivative
migration described above.
