UPDATE `media`
SET `role` = 'gallery'
WHERE `role` = 'cover'
  AND `id` NOT IN (
    SELECT MIN(`id`)
    FROM `media`
    WHERE `role` = 'cover'
    GROUP BY `project_id`
  );

CREATE UNIQUE INDEX IF NOT EXISTS `media_one_cover_per_project_idx`
ON `media` (`project_id`)
WHERE `role` = 'cover';
