-- Migration number: 0015 	 2025-04-22T06:46:44.336Z
DROP TABLE IF EXISTS batch_assessors; CREATE TABLE batch_assessors (
  [id] INTEGER PRIMARY KEY,
  [batch_uuid] TEXT NOT NULL,
  [user_uuid] INTEGER NOT NULL,
  [type] TEXT CHECK(type IN('CASE', 'FACE', 'DISC')) NOT NULL,
  [slot1] INTEGER CHECK(slot1 IN(0, 1)) NOT NULL DEFAULT 1,
  [slot2] INTEGER CHECK(slot2 IN(0, 1)) NOT NULL DEFAULT 1,
  [slot3] INTEGER CHECK(slot3 IN(0, 1)) NOT NULL DEFAULT 1,
  [slot4] INTEGER CHECK(slot4 IN(0, 1)) NOT NULL DEFAULT 1,
  [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  [updated] TEXT,
  UNIQUE (batch_uuid, user_uuid)
);

CREATE INDEX idx_batch_assessors_user_uuid ON batch_assessors (user_uuid);
CREATE INDEX idx_batch_assessors_batch_uuid ON batch_assessors (batch_uuid);

CREATE TRIGGER update_batch_assessors AFTER UPDATE ON batch_assessors
BEGIN
    UPDATE batch_assessors SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;