-- Migration number: 0070 	 2025-04-09T07:56:12.106Z
CREATE TABLE userscore_intray (
  -- skor untuk elemen intray
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `batch_uuid` TEXT NOT NULL,
  `user_uuid` TEXT NOT NULL,
  `element_code` TEXT NOT NULL,
  `score` INTEGER,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT,
  UNIQUE (batch_uuid, user_uuid, element_code)
);

CREATE TRIGGER update_userscore_intray AFTER UPDATE ON userscore_intray
BEGIN
    UPDATE userscore_intray SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
