-- Migration number: 0053 	 2025-04-08T03:11:33.715Z
CREATE TABLE mod_gmate (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 26,
    [prompts] INTEGER NOT NULL DEFAULT 45,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_gmate AFTER UPDATE ON mod_gmate
BEGIN
    UPDATE mod_gmate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_gmate (mod_uuid) VALUES ('bcnecqL6zF4PgUxfNWHn1a');