-- Migration number: 0024 	 2025-03-12T06:10:33.957Z
CREATE TABLE mod_intray_intro (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Pengantar',
    [name] TEXT NOT NULL DEFAULT 'intray_intro',
    [content] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_intro AFTER UPDATE ON mod_intray_intro
BEGIN
    UPDATE mod_intray_intro SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;