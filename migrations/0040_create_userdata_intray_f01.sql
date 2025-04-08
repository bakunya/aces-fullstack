-- Migration number: 0040 	 2025-03-25T05:14:11.510Z
CREATE TABLE userdata_intray_f01 (
    [id] INTEGER PRIMARY KEY,
    [userdata_id] INTEGER NOT NULL,
    [topic] TEXT NOT NULL,
    [item_labels] TEXT NOT NULL, -- TODO: apa yang paling appropriate?
    [reason] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_userdata_intray_f01_userdata_id ON userdata_intray_f01 (userdata_id);

CREATE TRIGGER update_userdata_intray_f01 AFTER UPDATE ON userdata_intray_f01
BEGIN
    UPDATE userdata_intray_f01 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;