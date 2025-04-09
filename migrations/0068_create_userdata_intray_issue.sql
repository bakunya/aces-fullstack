-- Migration number: 0068 	 2025-04-09T07:54:35.262Z
CREATE TABLE userdata_intray_issue (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userdata_id` INTEGER NOT NULL,
  `item` TEXT NOT NULL,
  `factor` TEXT NOT NULL,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')))
);

CREATE TRIGGER update_userdata_intray_issue AFTER UPDATE ON userdata_intray_issue
BEGIN
    UPDATE userdata_intray_issue SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
