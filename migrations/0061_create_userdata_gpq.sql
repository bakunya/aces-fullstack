-- Migration number: 0061 	 2025-04-08T05:11:05.748Z
CREATE TABLE userdata_gpq (
    -- Menyimpan jawaban setiap nomor gpq
    [id] INTEGER PRIMARY KEY,
    [user_uuid] TEXT NOT NULL,
    [batch_uuid] TEXT NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL CHECK (seq > 0 AND seq < 121),
	[element] TEXT CHECK (element IN ('CON','STR','ANA','ORG','CRE','SOC','PLA','NET','CTR','PER','COL','ADA','COM','SLD','SLC','ACH')),
	[elapsed] INTEGER,
	[timestamp]  INTEGER, -- !! TIDAK PERLU, sudah ada kolom updated
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE INDEX idx_userdata_gpq_user_uuid ON userdata_gpq (user_uuid);
CREATE INDEX idx_userdata_gpq_batch_uuid ON userdata_gpq (batch_uuid);	
CREATE INDEX idx_userdata_gpq_mod_uuid ON userdata_gpq (mod_uuid);

CREATE TRIGGER update_userdata_gpq AFTER UPDATE ON userdata_gpq
BEGIN
	UPDATE userdata_gpq SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;