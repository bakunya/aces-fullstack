-- Migration number: 0047 	 2025-03-27T05:21:09.665Z
CREATE TABLE mod_abstract (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 10,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_abstract AFTER UPDATE ON mod_abstract
BEGIN
	UPDATE mod_abstract SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_abstract (mod_uuid) VALUES ('1pWz3DRkhtN38fdWatach8');