-- Migration number: 0017 	 2025-03-12T06:08:37.480Z
CREATE TABLE mod_ca_questions (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [assignment_id] INTEGER NOT NULL,
    [seq] INTEGER NOT NULL,
    [content] TEXT,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_ca_questions AFTER UPDATE ON mod_ca_questions
BEGIN
    UPDATE mod_ca_questions SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;