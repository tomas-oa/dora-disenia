import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { parseAdminProjectInput, saveProject } from "@/src/lib/cms/admin";

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const body = await request.json();
    await saveProject(env, params.id!, parseAdminProjectInput(body));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to save project" },
      { status: 400 },
    );
  }
};
