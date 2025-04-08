-- Migration number: 0014 	 2025-03-12T06:07:31.194Z
CREATE TABLE mod_abstract_contents (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [url] TEXT NOT NULL DEFAULT '',
	[keycode] INTEGER NOT NULL DEFAULT 0,
	[content] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE INDEX idx_mod_abstract_contents_seq ON mod_abstract_contents (seq);
CREATE INDEX idx_mod_abstract_contents_mod_uuid ON mod_abstract_contents (mod_uuid);

CREATE TRIGGER update_mod_abstract_contents AFTER UPDATE ON mod_abstract_contents
BEGIN
    UPDATE mod_abstract_contents SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_abstract_contents (id, mod_uuid, seq) VALUES
    (1, '1pWz3DRkhtN38fdWatach8', 1),
    (2, '1pWz3DRkhtN38fdWatach8', 2),
    (3, '1pWz3DRkhtN38fdWatach8', 3),
    (4, '1pWz3DRkhtN38fdWatach8', 4),
    (5, '1pWz3DRkhtN38fdWatach8', 5),
    (6, '1pWz3DRkhtN38fdWatach8', 6),
    (7, '1pWz3DRkhtN38fdWatach8', 7),
    (8, '1pWz3DRkhtN38fdWatach8', 8),
    (9, '1pWz3DRkhtN38fdWatach8', 9),
    (10, '1pWz3DRkhtN38fdWatach8', 10);