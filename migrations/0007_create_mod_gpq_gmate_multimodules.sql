-- Migration number: 0007 	 2025-03-12T06:14:26.544Z
CREATE TABLE mod_gpq_gmate (
    [mod_uuid] TEXT PRIMARY KEY,
    [gpq_mod_uuid] TEXT NOT NULL,
    [gmate_mod_uuid] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_mod_gpq_gmate_module_uuid ON mod_gpq_gmate (mod_uuid);

CREATE TRIGGER update_mod_gpq_gmate AFTER UPDATE ON mod_gpq_gmate
BEGIN
    UPDATE mod_gpq_gmate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_gpq_gmate (mod_uuid, gpq_mod_uuid, gmate_mod_uuid) VALUES (
    '979b8d98-565e-440f-afce-e29e96407790',
    'q4yGxmhn2JebYQY7U8rUXt',
    'bcnecqL6zF4PgUxfNWHn1a'
);