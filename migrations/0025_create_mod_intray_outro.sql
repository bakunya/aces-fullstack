-- Migration number: 0025 	 2025-03-12T06:10:48.534Z
CREATE TABLE mod_intray_outro (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Pengantar',
    [name] TEXT NOT NULL DEFAULT 'intray_intro',
    [content] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_outro AFTER UPDATE ON mod_intray_outro
BEGIN
    UPDATE mod_intray_outro SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;