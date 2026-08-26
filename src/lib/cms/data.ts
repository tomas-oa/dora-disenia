import { asc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { PROJECTS } from "@/constants";
import { cmsSchema, media, projectTags, projects, tags } from "@/src/lib/cms/schema";
import type { ProjectMedia, ProjectTag, PublicProject } from "@/src/lib/cms/types";

type CmsEnv = Partial<Cloudflare.Env>;

const legacyProjects: PublicProject[] = PROJECTS.map((project) => ({
  id: `legacy-${project.slug}`,
  title: project.title,
  slug: project.slug,
  published: project.published,
  status: project.published ? "published" : "draft",
  color: project.color,
  content: project.content,
  tags: [...(project.tags as readonly ProjectTag[])],
  storage: {
    cover: project.storage.cover,
    coverMedia: {
      id: `legacy-${project.slug}-cover`,
      src: project.storage.cover,
      alt: project.title,
      className: "",
      mediaType: "image",
      role: "cover",
      sortOrder: -1,
      objectKey: project.storage.cover.replace(/^\//, ""),
      publicUrl: project.storage.cover,
      mimeType: null,
      sizeBytes: null,
      width: null,
      height: null,
    },
    images: project.storage.images.map((image, mediaIndex) => ({
      id: `legacy-${project.slug}-${mediaIndex}`,
      src: image.src,
      alt: image.alt,
      className: image.className,
      mediaType: image.src.endsWith(".mp4") ? "video" : "image",
      role: "gallery",
      sortOrder: mediaIndex,
      objectKey: image.src.replace(/^\//, ""),
      publicUrl: image.src,
      mimeType: null,
      sizeBytes: null,
      width: null,
      height: null,
    })),
  },
}));

void cmsSchema;

function getDb(env: CmsEnv) {
  return env.DB ? drizzle(env.DB, { schema: cmsSchema }) : null;
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

async function readProjects(env: CmsEnv, includeDrafts: boolean) {
  const db = getDb(env);
  if (!db) return null;

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

export async function getProjects(env: CmsEnv, includeDrafts = false) {
  try {
    const result = await readProjects(env, includeDrafts);
    return result ?? legacyProjects.filter((project) => includeDrafts || project.published);
  } catch (error) {
    console.error("CMS read failed", error);
    return legacyProjects.filter((project) => includeDrafts || project.published);
  }
}

export async function getProjectBySlug(env: CmsEnv, slug: string, includeDrafts = false) {
  const project = (await getProjects(env, includeDrafts)).find((item) => item.slug === slug);
  return project ?? null;
}

export async function getProjectById(env: CmsEnv, id: string) {
  return (await getProjects(env, true)).find((item) => item.id === id) ?? null;
}

export { legacyProjects };
