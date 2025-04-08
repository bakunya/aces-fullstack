-- Migration number: 0052 	 2025-04-08T03:06:43.990Z
CREATE TABLE mod_csi (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 72,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_csi AFTER UPDATE ON mod_csi
BEGIN
    UPDATE mod_csi SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;


INSERT INTO mod_csi (mod_uuid) VALUES ('9LXiqv2vxZpc3JHrwzoC3h');