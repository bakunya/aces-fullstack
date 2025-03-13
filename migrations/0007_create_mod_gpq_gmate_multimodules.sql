-- Migration number: 0007 	 2025-03-12T06:14:26.544Z
CREATE TABLE mod_gpq_gmate (
    [mod_uuid] TEXT PRIMARY KEY,
    [gpq_uuid] TEXT NOT NULL,
    [gmate_uuid] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_mod_gpq_gmate_module_uuid ON mod_gpq_gmate (mod_uuid);

CREATE TRIGGER update_mod_gpq_gmate AFTER UPDATE ON mod_gpq_gmate
BEGIN
    UPDATE mod_gpq_gmate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_gpq_gmate (mod_uuid, gpq_uuid, gmate_uuid) VALUES (
    '979b8d98-565e-440f-afce-e29e96407790',
    'b1ddf643-4de2-4dc0-9f5c-303d59b5f150',
    'd201052f-5e10-4ab6-9ac4-e405fd3b6db9'
);