ALTER TABLE `tags` ADD COLUMN `sort_order` integer NOT NULL DEFAULT 0;
UPDATE `tags` SET `sort_order` = CASE `key`
  WHEN 'design' THEN 0
  WHEN 'graphic' THEN 1
  WHEN 'editorial' THEN 2
  WHEN 'branding' THEN 3
  WHEN 'illustration' THEN 4
  ELSE 9999
END;
