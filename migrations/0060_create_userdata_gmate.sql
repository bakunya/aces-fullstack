-- Migration number: 0060 	 2025-04-08T05:10:59.661Z
CREATE TABLE userdata_gmate (
    -- Menyimpan jawaban setiap nomor gmate
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    -- seq: urut dari 1 s.d. 45
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 46),
    -- gmate_seq: randomized
    [gmate_seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 46),
    -- `keycode` INTEGER NOT NULL DEFAULT 0,
    [selection] TEXT, -- a, b, c, d, e
    -- `components` hanya diisi bila `selection` matches `keycode`
    [components] TEXT, -- 'find search inference', etc
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_gmate_user_uuid ON userdata_gmate (user_uuid);
CREATE INDEX idx_userdata_gmate_batch_uuid ON userdata_gmate (batch_uuid);
CREATE INDEX idx_userdata_gmate_mod_uuid ON userdata_gmate (mod_uuid);

CREATE TRIGGER update_userdata_gmate AFTER UPDATE ON userdata_gmate
BEGIN
	UPDATE userdata_gmate SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;