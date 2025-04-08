-- Migration number: 0045 	 2025-03-27T05:14:42.704Z
CREATE TABLE userdata_ca (
	[id] INTEGER PRIMARY KEY,
    [batch_uuid] TEXT NOT NULL,
    [user_uuid] TEXT NOT NULL,
    [question_id] INTEGER NOT NULL,
    [content] TEXT,
    [timestamp] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (batch_uuid, user_uuid, question_id)
);

CREATE INDEX idx_userdata_ca_batch_uuid ON userdata_ca (batch_uuid);
CREATE INDEX idx_userdata_ca_user_uuid ON userdata_ca (user_uuid);
CREATE INDEX idx_userdata_ca_question_id ON userdata_ca (question_id);

CREATE TRIGGER update_userdata_ca AFTER UPDATE ON userdata_ca
BEGIN
    UPDATE userdata_ca SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;