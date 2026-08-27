UPDATE `media`
SET `public_url` = CASE
  WHEN `public_url` LIKE '/media/%' THEN `public_url`
  ELSE '/media/' || `object_key`
END;
