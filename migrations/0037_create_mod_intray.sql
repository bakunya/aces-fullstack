-- Migration number: 0037 	 2025-03-25T04:57:47.155Z
CREATE TABLE mod_intray (
    [mod_uuid] TEXT PRIMARY KEY, -- reference to modules table
    [maxtime] INTEGER, -- in minutes
    [time_in_minutes] INTEGER NOT NULL DEFAULT 120,
    -- [maxtime] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray AFTER UPDATE ON mod_intray
BEGIN
    UPDATE mod_intray SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;