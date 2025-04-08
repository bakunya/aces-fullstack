-- Migration number: 0042 	 2025-03-25T05:14:40.816Z
CREATE TABLE userdata_intray_f10 (
    [id] INTEGER PRIMARY KEY,
    [userdata_id] INTEGER NOT NULL,
    [condition] TEXT NOT NULL,
    [factor] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_userdata_intray_f10_userdata_id ON userdata_intray_f10 (userdata_id);

CREATE TRIGGER update_userdata_intray_f10 AFTER UPDATE ON userdata_intray_f10
BEGIN
    UPDATE userdata_intray_f10 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;