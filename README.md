# DORA DISEÑA

Astro portfolio site with Tailwind CSS v4, one hydrated Preact form island, and a Cloudflare Workers deployment target.

## Development

```sh
bun install
bun dev
```

Open http://localhost:4321.

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

## Cloudflare Workers

```sh
bun run deploy
```

The site is statically prerendered. `/api/send` runs on demand in the Cloudflare Worker. Preview with `bunx wrangler dev`.
