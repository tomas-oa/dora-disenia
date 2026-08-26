import type { APIRoute } from "astro";
import { BASE_URL } from "@/constants";

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("sitemap-index.xml", BASE_URL);
  return new Response(`User-agent: *\nAllow: /\nDisallow: /private/\nSitemap: ${sitemapUrl}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
