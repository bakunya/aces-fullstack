-- Migration number: 0031 	 2025-03-12T06:12:41.247Z
CREATE TABLE mod_numerical_figures (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [content] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_numerical_figures AFTER UPDATE ON mod_numerical_figures
BEGIN
    UPDATE mod_numerical_figures SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_numerical_figures (mod_uuid, seq, content) VALUES
('16863206-1cc6-4d7a-8313-f769b8d5b0ea', 1, ''),
('16863206-1cc6-4d7a-8313-f769b8d5b0ea', 2, ''),
('16863206-1cc6-4d7a-8313-f769b8d5b0ea', 3, ''),
('16863206-1cc6-4d7a-8313-f769b8d5b0ea', 4, ''),
('16863206-1cc6-4d7a-8313-f769b8d5b0ea', 5, '');