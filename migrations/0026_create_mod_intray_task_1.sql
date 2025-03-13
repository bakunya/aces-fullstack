-- Migration number: 0026 	 2025-03-12T06:11:36.175Z
CREATE TABLE mod_intray_task_1 (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Tugas 1',
    [name] TEXT NOT NULL DEFAULT 'intray_task_1',
    [time_in_seconds] INTEGER DEFAULT 3600,
    [content] TEXT DEFAULT '',
    [label_1] TEXT DEFAULT 'Nomor item',
    [label_2] TEXT DEFAULT 'Hasil identifikasi',
    [label_3] TEXT DEFAULT 'Nama isyu',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_1 AFTER UPDATE ON mod_intray_task_1
BEGIN
    UPDATE mod_intray_task_1 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;