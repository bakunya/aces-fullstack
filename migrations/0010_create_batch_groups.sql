-- Migration number: 0010 	 2025-02-12T06:37:58.363Z
CREATE TABLE batch_groups (
    [id] INTEGER PRIMARY KEY,
    [batch_uuid] TEXT NOT NULL, -- batches(id)
    [assessor_uuid] TEXT,
    [name] TEXT NOT NULL,
	[slot1] TEXT,
	[slot2] TEXT,
	[slot3] TEXT,
	[slot4] TEXT,
	[updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))
);

CREATE INDEX idx_batch_groups_batch_uuid ON batch_groups (batch_uuid);
CREATE INDEX idx_batch_groups_assessor_uuid ON batch_groups (assessor_uuid);

CREATE TRIGGER update_batch_groups AFTER UPDATE ON batch_groups
BEGIN
    UPDATE batch_groups SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;