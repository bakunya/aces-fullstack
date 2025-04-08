-- Migration number: 0063 	 2025-04-08T05:11:17.113Z
CREATE TABLE userdata_csi (
    -- Menyimpan jawaban setiap csi (1 - 72)
    [id] INTEGER PRIMARY KEY,
    [user_id] TEXT NOT NULL,
    [batch_id] TEXT NOT NULL,
    [mod_id] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 73),
    -- 1 sangat tidak
    -- 2 sedikit ya
    -- 3 ya
    -- 4 sangat ya
    -- 5 amat sangat ya
    [selection] INTEGER CHECK (selection > 0 AND selection < 6),
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_id, batch_id, seq)
);

CREATE INDEX idx_userdata_csi_user_id ON userdata_csi (user_id);
CREATE INDEX idx_userdata_csi_batch_id ON userdata_csi (batch_id);
CREATE INDEX idx_userdata_csi_mod_id ON userdata_csi (mod_id);

CREATE TRIGGER update_userdata_csi AFTER UPDATE ON userdata_csi
BEGIN
	UPDATE userdata_csi SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;