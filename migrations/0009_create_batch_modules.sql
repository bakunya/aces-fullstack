-- Migration number: 0009 	 2025-02-12T06:36:48.115Z
CREATE TABLE batch_modules (
    [id] TEXT PRIMARY KEY, -- uuid
    [batch_id] TEXT NOT NULL, -- batches(id)
    [module_id] TEXT NOT NULL, -- modules(id)
    [type] TEXT NOT NULL, -- modules(type)
	[priority] INTEGER,
    [updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	UNIQUE (batch_id, module_id)
);

CREATE INDEX idx_batch_modules_batch_id ON batch_modules (batch_id);
CREATE INDEX idx_batch_modules_module_id ON batch_modules (module_id);

CREATE TRIGGER update_batch_modules AFTER UPDATE ON batch_modules
BEGIN
    UPDATE batch_modules SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;