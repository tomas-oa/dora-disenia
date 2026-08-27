# DORA DISEÑA

Astro portfolio site with Tailwind CSS v4, one hydrated Preact form island, and a Cloudflare Workers deployment target.

## Development

```sh
bun install
bun dev
```

Open https://dora-disenia.localhost. Portless may ask for permission once to create and trust its local HTTPS certificate.

To bypass Portless and use Astro's default port directly:

```sh
bun run dev:app
```

## Verification

```sh
bun run check
bun run lint
bun run format:check
bun run build
```

TypeScript 7 is used. Astro's `astro check` is currently incompatible with TypeScript 7, so `check` runs Wrangler type generation plus `tsc --noEmit`; `astro build` validates Astro templates and the production bundle.

Oxc replaces Biome: Oxlint handles linting and Oxfmt handles supported JS, TS, CSS, and config files. Astro templates are formatted by the Astro editor extension and validated by the build.

## Contact form

Create `.dev.vars`:

```sh
RESEND_API_KEY=...
PRODUCTION_EMAIL_TO=...
```

For deployment:

```sh
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put PRODUCTION_EMAIL_TO
```

## CMS

Public project pages and the admin editor read content from D1 at request time. D1 is required; a missing or failing binding is surfaced as an application error instead of serving stale static content. The initial migration preserves all projects, tags, gallery order, legacy URLs, and media metadata:

```sh
bunx wrangler d1 migrations apply dora-disenia --local
bunx wrangler d1 migrations apply dora-disenia --remote
```

The admin editor lives at `https://admin.doradisena.cl/`. Cloudflare Access protects the hostname with an owner-only email policy. The worker rewrites `/`, `/projects/*`, `/preview/*`, and `/api/*` on that hostname to internal handlers; the old public-host `/admin/*` route is blocked. The worker also checks the Access email header against `ADMIN_EMAIL`. Projects and media expose readable labels, enum choices, drag-and-drop ordering, keyboard-friendly move controls, and save-time removal. For local-only editor testing, set `ADMIN_DEV_BYPASS=true` in `.dev.vars`; never enable that in production.

Media uploads go to the `MEDIA` R2 binding. Set `MEDIA_BASE_URL` only when using an R2 custom domain; otherwise the worker serves objects through `/media/*`. Uploaded files are stored with project and media IDs, MIME type, size, optional dimensions, alt text, role, and gallery order.

`wrangler.jsonc` is the source of truth for the Worker, custom domains, D1, R2, and runtime vars. The Access API is not exposed by Wrangler; its applied app/policy identifiers and desired settings are recorded in `infra/cloudflare/access.json` for reconciliation. All former `public/` assets live in R2 and are served through `/media/*`.

## Cloudflare Workers

```sh
bun run deploy
```

The site is server-rendered so CMS edits appear without a rebuild. `/api/send` runs on demand in the Cloudflare Worker. Preview with `bunx wrangler dev`.
