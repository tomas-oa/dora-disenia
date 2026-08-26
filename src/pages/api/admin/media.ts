import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { media, projects } from "@/src/lib/cms/schema";
import { MEDIA_PRESENTATION_OPTIONS } from "@/src/lib/cms/types";

export const prerender = false;

function mediaType(type: string) {
  if (type.startsWith("video/")) return "video" as const;
  if (type.startsWith("image/")) return "image" as const;
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const bucket = env.MEDIA;
  if (!bucket || !env.DB)
    return Response.json({ error: "Media bindings missing" }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  const projectId = form.get("projectId");
  const role = form.get("role") === "cover" ? "cover" : "gallery";
  if (!(file instanceof File) || typeof projectId !== "string")
    return Response.json({ error: "File and project required" }, { status: 400 });
  const db = drizzle(env.DB);
  const project = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();
  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });
  const type = mediaType(file.type);
  if (!type) return Response.json({ error: "Only images and videos supported" }, { status: 415 });
  if (role === "cover" && type !== "image")
    return Response.json({ error: "Cover must be an image" }, { status: 415 });

  const className = typeof form.get("className") === "string" ? String(form.get("className")) : "";
  if (!MEDIA_PRESENTATION_OPTIONS.some((option) => option.value === className))
    return Response.json({ error: "Invalid media presentation" }, { status: 400 });
  const id = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectKey = `projects/${projectId}/${id}-${safeName}`;
  await bucket.put(objectKey, file, {
    httpMetadata: { contentType: file.type },
    customMetadata: { projectId, mediaId: id, role },
  });
  const baseUrl = env.MEDIA_BASE_URL?.replace(/\/$/, "");
  const publicUrl = baseUrl ? `${baseUrl}/${objectKey}` : `/media/${objectKey}`;
  if (role === "cover")
    await db.update(media).set({ role: "gallery" }).where(eq(media.projectId, projectId));
  await db.insert(media).values({
    id,
    projectId,
    role,
    mediaType: type,
    objectKey,
    publicUrl,
    alt: typeof form.get("alt") === "string" ? String(form.get("alt")) : "",
    className,
    sortOrder: 0,
    mimeType: file.type,
    sizeBytes: file.size,
    createdAt: new Date(),
  });
  return Response.json({ id, objectKey, publicUrl, mediaType: type }, { status: 201 });
};
