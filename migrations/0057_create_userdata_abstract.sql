-- Migration number: 0057 	 2025-04-08T05:10:33.970Z
CREATE TABLE userdata_abstract (
    -- Menyimpan jawaban setiap nomor abstract
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 11),
    [keycode] INTEGER NOT NULL DEFAULT 0,
    [selection] TEXT, -- a, b, c, d, e, f
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_abstract_user_uuid ON userdata_abstract (user_uuid);
CREATE INDEX idx_userdata_abstract_batch_uuid ON userdata_abstract (batch_uuid);
CREATE INDEX idx_userdata_abstract_mod_uuid ON userdata_abstract (mod_uuid);
CREATE INDEX idx_userdata_abstract_seq ON userdata_abstract (seq);

CREATE TRIGGER update_userdata_abstract AFTER UPDATE ON userdata_abstract
BEGIN
    UPDATE userdata_abstract SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
