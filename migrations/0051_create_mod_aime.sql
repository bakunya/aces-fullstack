-- Migration number: 0051 	 2025-04-08T02:56:53.526Z
CREATE TABLE mod_aime (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 136,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_aime AFTER UPDATE ON mod_aime
BEGIN
    UPDATE mod_aime SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_aime (mod_uuid) VALUES ('mRrDunGQnbQ19E5tMvA7cq');