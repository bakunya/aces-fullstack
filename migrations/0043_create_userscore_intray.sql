-- Migration number: 0043 	 2025-03-25T05:15:02.588Z
CREATE TABLE userscore_intray (
    -- skor untuk elemen intray
    [id] INTEGER PRIMARY KEY,
    [batch_uuid] TEXT NOT NULL,
    [user_uuid] TEXT NOT NULL,
    [element_code] TEXT NOT NULL,
    [score] TEXT,
	[created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (batch_uuid, user_uuid, element_code)
);

CREATE INDEX idx_userscore_intray_batch_uuid ON userscore_intray (batch_uuid);
CREATE INDEX idx_userscore_intray_user_uuid ON userscore_intray (user_uuid);
CREATE INDEX idx_userscore_intray_element_code ON userscore_intray (element_code);

CREATE TRIGGER update_userscore_intray AFTER UPDATE ON userscore_intray
BEGIN
    UPDATE userscore_intray SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;