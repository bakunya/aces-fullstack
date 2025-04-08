-- Migration number: 0064 	 2025-04-08T05:11:23.601Z
CREATE TABLE userdata_gpro (
    -- Menyimpan jawaban setiap gpro (1 - 60)
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 61),
    -- 0 sangat tidak sesuai
    -- 1 tidak begitu sesuai
    -- 2 cukup sesuai
    -- 3 sangat sesuai
    [elm_a] INTEGER CHECK (elm_a >= 0 AND elm_a < 4),
    [elm_b] INTEGER CHECK (elm_b >= 0 AND elm_b < 4),
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_gpro_user_uuid ON userdata_gpro (user_uuid);
CREATE INDEX idx_userdata_gpro_batch_uuid ON userdata_gpro (batch_uuid);
CREATE INDEX idx_userdata_gpro_mod_uuid ON userdata_gpro (mod_uuid);

CREATE TRIGGER update_userdata_gpro AFTER UPDATE ON userdata_gpro
BEGIN
	UPDATE userdata_gpro SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;