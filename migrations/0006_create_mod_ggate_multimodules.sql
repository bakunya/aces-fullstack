-- Migration number: 0006 	 2025-03-12T06:14:05.157Z
CREATE TABLE mod_ggate (
    [mod_uuid] TEXT PRIMARY KEY,
    [verbal_uuid] TEXT NOT NULL,
    [abstract_uuid] TEXT NOT NULL,
    [numerical_uuid] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_mod_ggate_module_uuid ON mod_ggate (mod_uuid);

CREATE TRIGGER update_mod_ggate AFTER UPDATE ON mod_ggate
BEGIN
    UPDATE mod_ggate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_ggate (mod_uuid, verbal_uuid, abstract_uuid, numerical_uuid) VALUES (
    'ab89b2cf-5e8e-45b7-a1f6-0f96a092d10a',
    'a0ddaf8e-5120-4191-b2a0-10b55369b019',
    '4a8d1e68-f83f-4030-b3c4-297c92d4cefa',
    '16863206-1cc6-4d7a-8313-f769b8d5b0ea'
);