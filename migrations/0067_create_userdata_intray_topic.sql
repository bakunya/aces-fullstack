-- Migration number: 0067 	 2025-04-09T07:53:10.540Z
CREATE TABLE userdata_intray_topic (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userdata_id` INTEGER NOT NULL,
  `topic` TEXT NOT NULL,
  `items_ref` TEXT NOT NULL, -- TODO: apa yang paling appropriate?
  `reason` TEXT NOT NULL,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')))
);

CREATE TRIGGER update_userdata_intray_topic AFTER UPDATE ON userdata_intray_topic
BEGIN
    UPDATE userdata_intray_topic SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;
