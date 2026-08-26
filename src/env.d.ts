declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY: string;
    PRODUCTION_EMAIL_TO: string;
    DB: D1Database;
    MEDIA: R2Bucket;
    MEDIA_BASE_URL: string;
    ADMIN_EMAIL: string;
    ADMIN_DEV_BYPASS: string;
  }
}

declare namespace App {
  interface Locals {
    runtime: {
      env: Cloudflare.Env;
      cf: IncomingRequestCfProperties;
      ctx: ExecutionContext;
    };
  }
}
