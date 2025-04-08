-- Migration number: 0059 	 2025-04-08T05:10:52.299Z
CREATE TABLE userdata_verbal (
    -- Menyimpan jawaban setiap nomor verbal (1 - 25)
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 26),
    [keycode] INTEGER NOT NULL DEFAULT 0,
    [selection] TEXT, -- b (benar), s (salah), t (tidak tahu)
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_verbal_user_uuid ON userdata_verbal (user_uuid);
CREATE INDEX idx_userdata_verbal_batch_uuid ON userdata_verbal (batch_uuid);
CREATE INDEX idx_userdata_verbal_mod_uuid ON userdata_verbal (mod_uuid);

CREATE TRIGGER update_userdata_verbal AFTER UPDATE ON userdata_verbal
BEGIN
	UPDATE userdata_verbal SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;