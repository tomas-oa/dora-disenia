import type { MiddlewareHandler } from "astro";
import { env } from "cloudflare:workers";

import { ADMIN_HOST } from "@/src/lib/cms/hosts";

const protectedPrefixes = ["/admin", "/api/admin"];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;
  const protectedPath = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isAdminHost = context.url.hostname === ADMIN_HOST;
  const localBypass =
    ["localhost", "127.0.0.1"].includes(context.url.hostname) && env.ADMIN_DEV_BYPASS === "true";
  const localAdminPath = localBypass && protectedPath;
  if (!isAdminHost && !protectedPath && !localAdminPath) return next();

  const requestEmail = context.request.headers.get("Cf-Access-Authenticated-User-Email");
  const allowedEmail = env.ADMIN_EMAIL;
  const authorized =
    localBypass || (Boolean(requestEmail) && (!allowedEmail || requestEmail === allowedEmail));
  if (!authorized) return new Response("Forbidden", { status: 403 });
  if (!isAdminHost) return next();

  const internalPath = pathname.startsWith("/api/admin")
    ? pathname
    : pathname.startsWith("/api/")
      ? `/api/admin${pathname.slice("/api".length)}`
      : pathname === "/"
        ? "/admin"
        : pathname.startsWith("/projects/") || pathname.startsWith("/preview/")
          ? `/admin${pathname}`
          : pathname;
  return internalPath === pathname
    ? next()
    : context.rewrite(new URL(internalPath, context.request.url));
};
