CREATE TABLE IF NOT EXISTS `site_assets` (
  `key` text PRIMARY KEY NOT NULL,
  `object_key` text NOT NULL,
  `public_url` text NOT NULL,
  `mime_type` text NOT NULL,
  `size_bytes` integer NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

INSERT OR IGNORE INTO `site_assets` (`key`, `object_key`, `public_url`, `mime_type`, `size_bytes`, `created_at`, `updated_at`)
VALUES ('cv', 'cv.pdf', '/media/cv.pdf', 'application/pdf', 66598, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);
