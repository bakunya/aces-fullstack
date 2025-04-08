-- Migration number: 0009 	 2025-02-12T06:36:48.115Z
CREATE TABLE batch_modules (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [batch_uuid] TEXT NOT NULL, -- batches(id)
    [module_uuid] TEXT NOT NULL, -- modules(id)
    [type] TEXT NOT NULL, -- modules(type)
	[priority] INTEGER,
    [updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	UNIQUE (batch_uuid, module_uuid)
);

CREATE INDEX idx_batch_modules_batch_uuid ON batch_modules (batch_uuid);
CREATE INDEX idx_batch_modules_module_uuid ON batch_modules (module_uuid);

CREATE TRIGGER update_batch_modules AFTER UPDATE ON batch_modules
BEGIN
    UPDATE batch_modules SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;