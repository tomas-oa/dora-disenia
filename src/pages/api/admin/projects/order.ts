import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

import { saveProjectOrder } from "@/src/lib/cms/admin";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: unknown = await request.json();
    const projectIds =
      body && typeof body === "object" && "projectIds" in body
        ? (body as { projectIds?: unknown }).projectIds
        : undefined;
    await saveProjectOrder(env, projectIds);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to save project order" },
      { status: 400 },
    );
  }
};
