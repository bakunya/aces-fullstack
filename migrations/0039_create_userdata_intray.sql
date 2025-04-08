-- Migration number: 0039 	 2025-03-25T05:14:02.568Z
CREATE TABLE userdata_intray (
    -- Nomor 1 s.d. 12
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 13),
    -- [content] menampung jawaban user, tetapi, khusus untuk seq=1, 
    -- seq=9, seq=10, isinya string jumlah item, mis. '3', '4', dst.
    [content] TEXT NOT NULL DEFAULT '',
    [elapsed] INTEGER,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid)
);


CREATE INDEX idx_userdata_intray_mod_uuid ON userdata_intray (mod_uuid);


CREATE TRIGGER update_userdata_intray AFTER UPDATE ON userdata_intray
BEGIN
    UPDATE userdata_intray SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;