import { mkdir, writeFile } from "node:fs/promises";

import { PROJECTS, TAGS_ITERABLE } from "../constants";

const timestamp = Date.now();

function sql(value: string | number | null) {
  if (value === null) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${value.replaceAll("'", "''")}'`;
}

const statements = [
  ...TAGS_ITERABLE.map(
    (tag) =>
      `INSERT OR IGNORE INTO tags (key, label, class_name) VALUES (${sql(tag.key)}, ${sql(tag.label)}, ${sql(tag.className)});`,
  ),
  ...PROJECTS.flatMap((project) => {
    const projectId = `legacy-${project.slug}`;
    const projectRow = `INSERT OR IGNORE INTO projects (id, slug, title, status, color_class, digest, summary, created_at, updated_at, published_at) VALUES (${sql(projectId)}, ${sql(project.slug)}, ${sql(project.title)}, ${sql(project.published ? "published" : "draft")}, ${sql(project.color)}, ${sql(project.content.diggest)}, ${sql(project.content.summary)}, ${timestamp}, ${timestamp}, ${project.published ? timestamp : "NULL"});`;
    const tagRows = project.tags.map(
      (tag) => `INSERT OR IGNORE INTO project_tags (project_id, tag_key) VALUES (${sql(projectId)}, ${sql(tag.key)});`,
    );
    const cover = project.storage.cover;
    const coverExt = cover.split(".").pop() ?? "bin";
    const mediaRows = [
      `INSERT OR IGNORE INTO media (id, project_id, role, media_type, object_key, public_url, alt, class_name, sort_order, mime_type, created_at) VALUES (${sql(`${projectId}-cover`)}, ${sql(projectId)}, 'cover', 'image', ${sql(cover.replace(/^\//, ""))}, ${sql(cover)}, ${sql(project.title)}, '', 0, ${sql(`image/${coverExt === "jpg" ? "jpeg" : coverExt}`)}, ${timestamp});`,
      ...project.storage.images.map((image, index) => {
        const type = image.src.endsWith(".mp4") ? "video" : "image";
        const ext = image.src.split(".").pop() ?? "bin";
        return `INSERT OR IGNORE INTO media (id, project_id, role, media_type, object_key, public_url, alt, class_name, sort_order, mime_type, created_at) VALUES (${sql(`${projectId}-gallery-${index}`)}, ${sql(projectId)}, 'gallery', '${type}', ${sql(image.src.replace(/^\//, ""))}, ${sql(image.src)}, ${sql(image.alt)}, ${sql(image.className)}, ${index}, ${sql(`${type}/${ext === "jpg" ? "jpeg" : ext}`)}, ${timestamp});`;
      }),
    ];
    return [projectRow, ...tagRows, ...mediaRows];
  }),
];

await mkdir("drizzle", { recursive: true });
await writeFile("drizzle/0001_seed_projects.sql", `${statements.join("\n")}\n`);
