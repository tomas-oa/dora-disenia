import assert from "node:assert";
import type { NextConfig } from "next";

assert(process.env.RESEND_API_KEY, "RESEND_API_KEY is not set");
assert(process.env.PRODUCTION_EMAIL_TO, "PRODUCTION_EMAIL_TO is not set");
assert(process.env.DEVELOPMENT_EMAIL_TO, "DEVELOPMENT_EMAIL_TO is not set");
assert(
  process.env.NEXT_PUBLIC_POSTHOG_KEY,
  "NEXT_PUBLIC_POSTHOG_KEY is not set",
);
assert(
  process.env.NEXT_PUBLIC_POSTHOG_HOST,
  "NEXT_PUBLIC_POSTHOG_HOST is not set",
);

const nextConfig: NextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PRODUCTION_EMAIL_TO: process.env.PRODUCTION_EMAIL_TO,
    DEVELOPMENT_EMAIL_TO: process.env.DEVELOPMENT_EMAIL_TO,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
  rewrites: async () => [
    {
      source: "/ingest/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
    {
      source: "/ingest/decide",
      destination: "https://us.i.posthog.com/decide",
    },
  ],
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
