UPDATE projects
SET status = 'published', published_at = COALESCE(published_at, strftime('%s', 'now') * 1000)
WHERE id IN ('legacy-a-solas-el-jardin', 'legacy-¿?');
