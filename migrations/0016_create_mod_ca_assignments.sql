-- Migration number: 0016 	 2025-03-12T06:08:19.827Z
CREATE TABLE mod_ca_assignments (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [content_id] INTEGER NOT NULL, -- mod_ca_contents(id)
    [title] TEXT,
    [content] TEXT,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_ca_assignments AFTER UPDATE ON mod_ca_assignments
BEGIN
    UPDATE mod_ca_assignments SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;