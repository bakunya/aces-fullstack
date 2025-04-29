-- Migration number: 0003 	 2025-02-07T06:07:37.376Z
CREATE TABLE batches (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [organization_uuid] TEXT NOT NULL, -- organizations(id)
    [token] TEXT UNIQUE NOT NULL,
    [title] TEXT NOT NULL,
    -- other batch fields
	[split] INTEGER CHECK(split IN(1, 2, 3, 4)) NOT NULL DEFAULT 1,
	[status] INTEGER NOT NULL DEFAULT 0,
	[regrouping] INTEGER NOT NULL DEFAULT 0,
	[time1_start] TEXT,
	[time2_start] TEXT,
	[time3_start] TEXT,
	[time4_start] TEXT,
	[time1_end] TEXT,
	[time2_end] TEXT,
	[time3_end] TEXT,
	[time4_end] TEXT,
	[batch_time_start] TEXT,
	[batch_time_end] TEXT,
    --
    [created] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	[updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))
);

CREATE INDEX idx_batches_organization_uuid ON batches (organization_uuid);
CREATE INDEX idx_batches_token ON batches (token);

CREATE TRIGGER update_batches AFTER UPDATE ON batches
BEGIN
    UPDATE batches SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO batches (uuid, organization_uuid, token, title) VALUES
('d4acbe9d-28c8-4b25-9f29-6a53f4cbceda1', 'd1607ddc-06bd-4c71-bbbc-b0929c7173df', '0001', 'Batch 1'),
('87f7f9fc-7315-4c0f-a6fc-cdde277754cf', 'd1607ddc-06bd-4c71-bbbc-b0929c7173df', '0002', 'Batch 2');
