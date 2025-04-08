-- Migration number: 0006 	 2025-03-12T06:14:05.157Z
CREATE TABLE mod_ggate (
    [mod_uuid] TEXT PRIMARY KEY,
    [verbal_mod_uuid] TEXT NOT NULL,
    [abstract_mod_uuid] TEXT NOT NULL,
    [numerical_mod_uuid] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_mod_ggate_module_uuid ON mod_ggate (mod_uuid);

CREATE TRIGGER update_mod_ggate AFTER UPDATE ON mod_ggate
BEGIN
    UPDATE mod_ggate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_ggate (mod_uuid, verbal_mod_uuid, abstract_mod_uuid, numerical_mod_uuid) VALUES (
    'ab89b2cf-5e8e-45b7-a1f6-0f96a092d10a',
    'uoNUHeFRxiQ5cEajH8oYyf',
    '1pWz3DRkhtN38fdWatach8',
    'agm3tGJGjLH9YoH9XTxUAD'
);