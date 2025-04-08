-- Migration number: 0056 	 2025-04-08T03:41:26.314Z
CREATE TABLE mod_gpro (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 60,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_gpro AFTER UPDATE ON mod_gpro
BEGIN
    UPDATE mod_gpro SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_gpro (mod_uuid) VALUES ('bsAhnSgXBpEBxnbkkqnkuL');