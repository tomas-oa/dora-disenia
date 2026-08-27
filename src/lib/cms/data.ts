import { asc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { cmsSchema, media, projectTags, projects, tags } from "@/src/lib/cms/schema";
import type { ProjectMedia, ProjectTag, PublicProject } from "@/src/lib/cms/types";

function getDb(env: Cloudflare.Env) {
  if (!env.DB) throw new Error("D1 binding missing");
  return drizzle(env.DB, { schema: cmsSchema });
}

function mapMedia(row: typeof media.$inferSelect): ProjectMedia {
  return {
    id: row.id,
    src: row.publicUrl,
    alt: row.alt,
    className: row.className,
    mediaType: row.mediaType,
    role: row.role,
    sortOrder: row.sortOrder,
    objectKey: row.objectKey,
    publicUrl: row.publicUrl,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    width: row.width,
    height: row.height,
  };
}

async function readProjects(env: Cloudflare.Env, includeDrafts: boolean) {
  const db = getDb(env);

  const projectRows = await db
    .select()
    .from(projects)
    .where(includeDrafts ? undefined : eq(projects.status, "published"))
    .orderBy(asc(projects.sortOrder), asc(projects.createdAt));
  if (projectRows.length === 0) return [];

  const ids = projectRows.map((project) => project.id);
  const [tagRows, mediaRows] = await Promise.all([
    db
      .select({
        projectId: projectTags.projectId,
        key: tags.key,
        label: tags.label,
        className: tags.className,
      })
      .from(projectTags)
      .innerJoin(tags, eq(tags.key, projectTags.tagKey))
      .where(inArray(projectTags.projectId, ids)),
    db.select().from(media).where(inArray(media.projectId, ids)).orderBy(asc(media.sortOrder)),
  ]);

  return projectRows.map((project) => {
    const projectMedia = mediaRows.filter((item) => item.projectId === project.id).map(mapMedia);
    const cover = projectMedia.find((item) => item.role === "cover") ?? projectMedia[0];
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      published: project.status === "published",
      status: project.status,
      color: project.colorClass,
      content: { diggest: project.digest, summary: project.summary },
      tags: tagRows
        .filter((tag) => tag.projectId === project.id)
        .map(({ projectId: _projectId, ...tag }) => tag),
      storage: {
        cover: cover?.src ?? "",
        coverMedia: cover?.role === "cover" ? cover : null,
        images: projectMedia.filter((item) => item.role === "gallery"),
      },
    } satisfies PublicProject;
  });
}

export async function getProjects(env: Cloudflare.Env, includeDrafts = false) {
  return readProjects(env, includeDrafts);
}

export async function getTags(env: Cloudflare.Env): Promise<ProjectTag[]> {
  return getDb(env)
    .select({ key: tags.key, label: tags.label, className: tags.className })
    .from(tags)
    .orderBy(asc(tags.sortOrder), asc(tags.key));
}

export async function getProjectBySlug(env: Cloudflare.Env, slug: string, includeDrafts = false) {
  const project = (await getProjects(env, includeDrafts)).find((item) => item.slug === slug);
  return project ?? null;
}

export async function getProjectById(env: Cloudflare.Env, id: string) {
  return (await getProjects(env, true)).find((item) => item.id === id) ?? null;
}
