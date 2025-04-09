-- Migration number: 0066 	 2025-04-09T07:51:57.482Z
CREATE TABLE userdata_intray_task (
  -- Nomor 1 s.d. 12
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_uuid` TEXT NOT NULL,
  `batch_uuid` TEXT NOT NULL,
  `mod_uuid` TEXT NOT NULL,
  `task_seq` INTEGER NOT NULL CHECK (task_seq > 0 AND task_seq < 13),
  `content` TEXT NOT NULL DEFAULT '',
  `started` INTEGER, -- time in milliseconds
  `finished` INTEGER, -- time in milliseconds
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT,
  UNIQUE (user_uuid, batch_uuid, task_seq)
);

CREATE TRIGGER update_userdata_intray_task AFTER UPDATE ON userdata_intray_task
BEGIN
    UPDATE userdata_intray_task SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
