ALTER TABLE `projects` ADD COLUMN `sort_order` integer NOT NULL DEFAULT 0;
UPDATE `projects` SET `sort_order` = CASE `slug`
  WHEN 'una-ventana-para-el-arte' THEN 0
  WHEN 'kombucha-loyca' THEN 1
  WHEN 'frankenstein' THEN 2
  WHEN 'chao-reunionitis' THEN 3
  WHEN 'a-solas-el-jardin' THEN 4
  WHEN '¿?' THEN 5
  WHEN 'hicigrafia' THEN 6
  ELSE 9999
END;
