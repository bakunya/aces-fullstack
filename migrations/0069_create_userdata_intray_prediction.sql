-- Migration number: 0069 	 2025-04-09T07:55:30.047Z
CREATE TABLE userdata_intray_prediction (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userdata_id` INTEGER NOT NULL,
  `item` TEXT NOT NULL,
  `factor` TEXT NOT NULL,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')))
);

CREATE TRIGGER update_userdata_intray_prediction AFTER UPDATE ON userdata_intray_prediction
BEGIN
    UPDATE userdata_intray_prediction SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
