import { eq, inArray, max } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { media, projectTags, projects, tags } from "@/src/lib/cms/schema";
import { adminProjectSchema, type AdminProjectInput } from "@/src/lib/cms/project-form";

export function parseAdminProjectInput(value: unknown): AdminProjectInput {
  const result = adminProjectSchema.safeParse(value);
  if (!result.success)
    throw new Error(result.error.issues[0]?.message ?? "Invalid project payload");
  return result.data;
}

export async function saveProject(env: Cloudflare.Env, projectId: string, value: unknown) {
  const input = parseAdminProjectInput(value);
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
  if (removedObjectKeys.length > 0) await env.MEDIA.delete(removedObjectKeys);
}

export async function createProject(env: Cloudflare.Env) {
  const id = crypto.randomUUID();
  const now = new Date();
  const db = drizzle(env.DB);
  const lastProject = await db
    .select({ sortOrder: max(projects.sortOrder) })
    .from(projects)
    .get();
  await db.insert(projects).values({
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
  if (!Array.isArray(projectIds) || !projectIds.every((id) => typeof id === "string"))
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
