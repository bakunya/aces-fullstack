-- Migration number: 0050 	 2025-03-27T06:07:18.148Z
CREATE TABLE mod_numerical (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 5,
    [prompts] INTEGER NOT NULL DEFAULT 20,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_numerical AFTER UPDATE ON mod_numerical
BEGIN
	UPDATE mod_numerical SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;


INSERT INTO mod_numerical (mod_uuid) VALUES ('agm3tGJGjLH9YoH9XTxUAD');