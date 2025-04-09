-- Migration number: 0065 	 2025-04-09T07:50:29.640Z
CREATE TABLE userdata_intray_page (
  -- Page 0 s.d. 5
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_uuid` TEXT NOT NULL,
  `batch_uuid` TEXT NOT NULL,
  `mod_uuid` TEXT NOT NULL,
  `seq` INTEGER NOT NULL CHECK (seq >= 0 AND seq <= 5),
  `minutes` INTEGER NOT NULL,
  `started` INTEGER,
  `finished` INTEGER,
  `tasks` INTEGER, -- number of tasks
  `done` INTEGER, -- number of tasks done
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT,
  UNIQUE (user_uuid, batch_uuid, seq)
);

CREATE TRIGGER update_userdata_intray_page AFTER UPDATE ON userdata_intray_page
BEGIN
    UPDATE userdata_intray_page SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
