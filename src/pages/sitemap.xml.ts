import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

import { BASE_URL } from "@/constants";
import { getProjects } from "@/src/lib/cms/data";

export const prerender = false;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async () => {
  const projects = await getProjects(env, false);
  const urls = [
    "/",
    "/aniversario",
    ...projects.map((project) => `/proyectos/${encodeURIComponent(project.slug)}`),
  ];
  const body = urls
    .map((path) => `<url><loc>${escapeXml(new URL(path, BASE_URL).toString())}</loc></url>`)
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
};
