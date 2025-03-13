-- Migration number: 0029 	 2025-03-12T06:12:02.944Z
CREATE TABLE mod_intray_task_4 (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Tugas 4',
    [name] TEXT NOT NULL DEFAULT 'intray_task_4',
    [time_in_seconds] INTEGER DEFAULT 900,
    [content] TEXT DEFAULT '',
    [label_1] TEXT DEFAULT 'Isyu',
    [label_2] TEXT DEFAULT 'Penyebab',
    [label_3] TEXT DEFAULT 'Kondisi dalam 1 sampai 3 tahun mendatang',
    [label_4] TEXT DEFAULT 'Hal-hal yang mempengaruhi kondisi tersebut',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_4 AFTER UPDATE ON mod_intray_task_4
BEGIN
    UPDATE mod_intray_task_4 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;