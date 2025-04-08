-- Migration number: 0055 	 2025-04-08T03:36:23.782Z
CREATE TABLE mod_gpq (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 120,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_gpq AFTER UPDATE ON mod_gpq
BEGIN
    UPDATE mod_gpq SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_gpq (mod_uuid) VALUES ('q4yGxmhn2JebYQY7U8rUXt');