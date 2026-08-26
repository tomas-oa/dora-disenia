import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getProjects } from "@/src/lib/cms/data";
import { createProject } from "@/src/lib/cms/admin";

export const prerender = false;

export const GET: APIRoute = async () => Response.json(await getProjects(env, true));

export const POST: APIRoute = async ({ request }) => {
  try {
    const id = await createProject(env);
    if (request.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
      return Response.redirect(new URL(`/admin/projects/${id}`, request.url), 303);
    }
    return Response.json({ id }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to create project" },
      { status: 400 },
    );
  }
};
