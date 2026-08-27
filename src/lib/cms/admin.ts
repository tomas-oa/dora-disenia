import { eq, inArray, max } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { media, projectTags, projects, tags } from "@/src/lib/cms/schema";
import {
  MEDIA_PRESENTATION_OPTIONS,
  PROJECT_COLOR_OPTIONS,
  type ProjectMedia,
  type ProjectTag,
} from "@/src/lib/cms/types";

type AdminProjectInput = {
  title: string;
  slug: string;
  colorClass: (typeof PROJECT_COLOR_OPTIONS)[number]["value"];
  digest: string;
  summary: string;
  status: "draft" | "published";
  tags: ProjectTag[];
  media: ProjectMedia[];
};

function assertInput(value: unknown): AdminProjectInput {
  if (!value || typeof value !== "object") throw new Error("Invalid project payload");
  const input = value as Record<string, unknown>;
  const status = input.status === "published" ? "published" : "draft";
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error("Title and URL slug required");

  const tagsInput = Array.isArray(input.tags) ? input.tags : [];
  const mediaInput = Array.isArray(input.media) ? input.media : [];
  const parsedTags = tagsInput.filter(isProjectTag);
  const parsedMedia = mediaInput.filter(isProjectMedia);
  const covers = parsedMedia.filter((item) => item.role === "cover");
  if (covers.length !== 1 || covers[0].mediaType !== "image")
    throw new Error("Choose one image as the cover");
  const colorClass = typeof input.colorClass === "string" ? input.colorClass : "bg-dora-pink";
  if (!isProjectColor(colorClass)) throw new Error("Choose a valid project color");

  return {
    title,
    slug,
    colorClass,
    digest: typeof input.digest === "string" ? input.digest : "",
    summary: typeof input.summary === "string" ? input.summary : "",
    status,
    tags: parsedTags,
    media: parsedMedia,
  };
}

function isProjectColor(value: unknown): value is AdminProjectInput["colorClass"] {
  return (
    typeof value === "string" && PROJECT_COLOR_OPTIONS.some((option) => option.value === value)
  );
}

function isProjectTag(value: unknown): value is ProjectTag {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return [item.key, item.label, item.className].every((field) => typeof field === "string");
}

function isProjectMedia(value: unknown): value is ProjectMedia {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.src === "string" &&
    typeof item.objectKey === "string" &&
    typeof item.publicUrl === "string" &&
    (item.role === "cover" || item.role === "gallery") &&
    (item.mediaType === "image" || item.mediaType === "video") &&
    typeof item.sortOrder === "number" &&
    MEDIA_PRESENTATION_OPTIONS.some((option) => option.value === item.className)
  );
}

export function parseAdminProjectInput(input: unknown) {
  return assertInput(input);
}

export async function saveProject(env: Cloudflare.Env, projectId: string, value: unknown) {
  if (!env.DB) throw new Error("D1 binding missing");
  const input = assertInput(value);
  const db = drizzle(env.DB);
  const now = new Date();
  const project = await db.select().from(projects).where(eq(projects.id, projectId)).get();
  if (!project) throw new Error("Project not found");
  const tagKeys = [...new Set(input.tags.map((tag) => tag.key))];
  const tagRows =
    tagKeys.length > 0 ? await db.select().from(tags).where(inArray(tags.key, tagKeys)) : [];
  if (tagRows.length !== tagKeys.length) throw new Error("Choose valid project tags");
  const existingMedia = await db.select().from(media).where(eq(media.projectId, projectId));
  const retainedObjectKeys = new Set(input.media.map((item) => item.objectKey));
  const removedObjectKeys = existingMedia
    .map((item) => item.objectKey)
    .filter((objectKey) => objectKey.startsWith(`projects/${projectId}/`))
    .filter((objectKey) => !retainedObjectKeys.has(objectKey));

  const statements = [
    db
      .update(projects)
      .set({
        title: input.title,
        slug: input.slug,
        colorClass: input.colorClass,
        digest: input.digest,
        summary: input.summary,
        status: input.status,
        updatedAt: now,
        publishedAt: input.status === "published" ? (project.publishedAt ?? now) : null,
      })
      .where(eq(projects.id, projectId)),
    db.delete(projectTags).where(eq(projectTags.projectId, projectId)),
    db.delete(media).where(eq(media.projectId, projectId)),
    ...tagRows.map((tag) => db.insert(projectTags).values({ projectId, tagKey: tag.key })),
    ...input.media.map((item) =>
      db.insert(media).values({
        id: item.id,
        projectId,
        role: item.role,
        mediaType: item.mediaType,
        objectKey: item.objectKey,
        publicUrl: item.publicUrl,
        alt: item.alt,
        className: item.className,
        sortOrder: item.sortOrder,
        mimeType: item.mimeType,
        sizeBytes: item.sizeBytes,
        width: item.width,
        height: item.height,
        createdAt: now,
      }),
    ),
  ];
  await db.batch(statements as [(typeof statements)[number], ...(typeof statements)[number][]]);
  if (env.MEDIA && removedObjectKeys.length > 0) await env.MEDIA.delete(removedObjectKeys);
}

export async function createProject(env: Cloudflare.Env) {
  if (!env.DB) throw new Error("D1 binding missing");
  const id = crypto.randomUUID();
  const now = new Date();
  const lastProject = await drizzle(env.DB)
    .select({ sortOrder: max(projects.sortOrder) })
    .from(projects)
    .get();
  await drizzle(env.DB)
    .insert(projects)
    .values({
      id,
      slug: `nuevo-proyecto-${id.slice(0, 8)}`,
      title: "Nuevo proyecto",
      status: "draft",
      sortOrder: (lastProject?.sortOrder ?? -1) + 1,
      colorClass: "bg-dora-pink",
      digest: "",
      summary: "",
      createdAt: now,
      updatedAt: now,
    });
  return id;
}

export async function saveProjectOrder(env: Cloudflare.Env, projectIds: unknown) {
  if (!env.DB || !Array.isArray(projectIds) || !projectIds.every((id) => typeof id === "string"))
    throw new Error("Invalid project order");
  const db = drizzle(env.DB);
  const existingProjects = await db.select({ id: projects.id }).from(projects);
  const existingIds = new Set(existingProjects.map((project) => project.id));
  const ids = projectIds as string[];
  if (
    ids.length !== existingIds.size ||
    new Set(ids).size !== ids.length ||
    !ids.every((id) => existingIds.has(id))
  )
    throw new Error("Project order must include every project once");
  const statements = ids.map((id, sortOrder) =>
    db.update(projects).set({ sortOrder, updatedAt: new Date() }).where(eq(projects.id, id)),
  );
  if (statements.length > 0)
    await db.batch(statements as [(typeof statements)[number], ...(typeof statements)[number][]]);
}
