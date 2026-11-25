CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL CHECK(length(trim(title)) BETWEEN 1 AND 150),
  description TEXT NOT NULL DEFAULT '',
  due_date TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('study','work','personal')),
  priority TEXT NOT NULL CHECK(priority IN ('low','medium','high')),
  status TEXT NOT NULL CHECK(status IN ('todo','doing','done')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
