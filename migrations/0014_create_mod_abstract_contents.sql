-- Migration number: 0014 	 2025-03-12T06:07:31.194Z
CREATE TABLE mod_abstract_contents (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [url] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_abstract_contents AFTER UPDATE ON mod_abstract_contents
BEGIN
    UPDATE mod_abstract_contents SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;


INSERT INTO mod_abstract_contents (id, seq, mod_uuid) VALUES
(1, '1', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(2, '2', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(3, '3', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(4, '4', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(5, '5', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(6, '6', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(7, '7', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(8, '8', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(9, '9', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa'),
(10, '10', '4a8d1e68-f83f-4030-b3c4-297c92d4cefa');