-- Migration number: 0046 	 2025-03-27T05:16:42.497Z
CREATE TABLE userscore_ca (
    -- Menyimpan skor elemen
	[id] INTEGER PRIMARY KEY,
    [batch_uuid] TEXT NOT NULL,
    [user_uuid] TEXT NOT NULL,
    [question_id] INTEGER NOT NULL,
    [element_id] INTEGER NOT NULL,
    [score] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (batch_uuid, user_uuid, question_id, element_id)
);

CREATE INDEX idx_userscore_ca_user_uuid ON userscore_ca (user_uuid);
CREATE INDEX idx_userscore_ca_batch_uuid ON userscore_ca (batch_uuid);
CREATE INDEX idx_userscore_ca_element_id ON userscore_ca (element_id);
CREATE INDEX idx_userscore_ca_question_id ON userscore_ca (question_id);

CREATE TRIGGER update_userscore_ca AFTER UPDATE ON userscore_ca
BEGIN
    UPDATE userscore_ca SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;