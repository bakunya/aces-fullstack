-- Migration number: 0062 	 2025-04-08T05:11:11.359Z
CREATE TABLE userdata_aime (
    -- Menyimpan jawaban setiap aime (1 - 136)
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 137),
    -- 1 sangat setuju
    -- 2 setuju
    -- 3 ragu
    -- 4 tidak setuju
    -- 5 sangat tidak setuju
    [selection] INTEGER CHECK (selection > 0 AND selection < 6),
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_aime_user_uuid ON userdata_aime (user_uuid);
CREATE INDEX idx_userdata_aime_batch_uuid ON userdata_aime (batch_uuid);
CREATE INDEX idx_userdata_aime_mod_uuid ON userdata_aime (mod_uuid);

CREATE TRIGGER update_userdata_aime AFTER UPDATE ON userdata_aime
BEGIN
	UPDATE userdata_aime SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;