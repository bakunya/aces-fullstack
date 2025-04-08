-- Migration number: 0058 	 2025-04-08T05:10:43.310Z
CREATE TABLE userdata_numerical (
    -- Menyimpan jawaban setiap nomor abstract
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 21),
    [keycode] INTEGER NOT NULL DEFAULT 0,
    [selection] TEXT, -- a, b, c, d, e
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_numerical_user_uuid ON userdata_numerical (user_uuid);
CREATE INDEX idx_userdata_numerical_batch_uuid ON userdata_numerical (batch_uuid);
CREATE INDEX idx_userdata_numerical_mod_uuid ON userdata_numerical (mod_uuid);

CREATE TRIGGER update_userdata_numerical AFTER UPDATE ON userdata_numerical
BEGIN
	UPDATE userdata_numerical SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;