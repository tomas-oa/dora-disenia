import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
    colorClass: text("color_class").notNull(),
    digest: text("digest").notNull().default(""),
    summary: text("summary").notNull().default(""),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  },
  (table) => [uniqueIndex("projects_slug_idx").on(table.slug)],
);

export const tags = sqliteTable("tags", {
  key: text("key").primaryKey(),
  label: text("label").notNull(),
  className: text("class_name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projectTags = sqliteTable(
  "project_tags",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagKey: text("tag_key")
      .notNull()
      .references(() => tags.key, { onDelete: "restrict" }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.tagKey] })],
);

export const media = sqliteTable(
  "media",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["cover", "gallery"] }).notNull(),
    mediaType: text("media_type", { enum: ["image", "video"] }).notNull(),
    objectKey: text("object_key").notNull(),
    publicUrl: text("public_url").notNull(),
    alt: text("alt").notNull().default(""),
    className: text("class_name").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    mimeType: text("mime_type"),
    sizeBytes: integer("size_bytes"),
    width: integer("width"),
    height: integer("height"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [index("media_project_order_idx").on(table.projectId, table.role, table.sortOrder)],
);

export const cmsSchema = { projects, tags, projectTags, media };

export type CmsProject = typeof projects.$inferSelect;
export type CmsMedia = typeof media.$inferSelect;
