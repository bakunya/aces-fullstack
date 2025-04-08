-- Migration number: 0049 	 2025-03-27T05:32:14.649Z
CREATE TABLE mod_verbal (
    [mod_uuid] TEXT PRIMARY KEY,
    [contents] INTEGER NOT NULL DEFAULT 5,
    [prompts] INTEGER NOT NULL DEFAULT 25,
    [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_verbal AFTER UPDATE ON mod_verbal
BEGIN
	UPDATE mod_verbal SET updated = ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_verbal (mod_uuid) VALUES ('uoNUHeFRxiQ5cEajH8oYyf');