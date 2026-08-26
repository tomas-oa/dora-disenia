CREATE TABLE IF NOT EXISTS `projects` (
  `id` text PRIMARY KEY NOT NULL,
  `slug` text NOT NULL,
  `title` text NOT NULL,
  `status` text DEFAULT 'draft' NOT NULL CHECK (`status` IN ('draft', 'published')),
  `color_class` text NOT NULL,
  `digest` text DEFAULT '' NOT NULL,
  `summary` text DEFAULT '' NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  `published_at` integer
);
CREATE UNIQUE INDEX IF NOT EXISTS `projects_slug_idx` ON `projects` (`slug`);
CREATE TABLE IF NOT EXISTS `tags` (
  `key` text PRIMARY KEY NOT NULL,
  `label` text NOT NULL,
  `class_name` text NOT NULL
);
CREATE TABLE IF NOT EXISTS `project_tags` (
  `project_id` text NOT NULL REFERENCES `projects`(`id`) ON DELETE CASCADE,
  `tag_key` text NOT NULL REFERENCES `tags`(`key`) ON DELETE RESTRICT,
  PRIMARY KEY(`project_id`, `tag_key`)
);
CREATE TABLE IF NOT EXISTS `media` (
  `id` text PRIMARY KEY NOT NULL,
  `project_id` text NOT NULL REFERENCES `projects`(`id`) ON DELETE CASCADE,
  `role` text NOT NULL CHECK (`role` IN ('cover', 'gallery')),
  `media_type` text NOT NULL CHECK (`media_type` IN ('image', 'video')),
  `object_key` text NOT NULL,
  `public_url` text NOT NULL,
  `alt` text DEFAULT '' NOT NULL,
  `class_name` text DEFAULT '' NOT NULL,
  `sort_order` integer DEFAULT 0 NOT NULL,
  `mime_type` text,
  `size_bytes` integer,
  `width` integer,
  `height` integer,
  `created_at` integer NOT NULL
);
CREATE INDEX IF NOT EXISTS `media_project_order_idx` ON `media` (`project_id`, `role`, `sort_order`);
