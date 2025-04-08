-- Migration number: 0041 	 2025-03-25T05:14:35.015Z
CREATE TABLE userdata_intray_f09 (
    [id] INTEGER PRIMARY KEY,
    [userdata_id] INTEGER NOT NULL,
    [issue] TEXT NOT NULL,
    [factor] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_userdata_intray_f09_userdata_id ON userdata_intray_f09 (userdata_id);

CREATE TRIGGER update_userdata_intray_f09 AFTER UPDATE ON userdata_intray_f09
BEGIN
    UPDATE userdata_intray_f09 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;