-- Migration number: 0030 	 2025-03-12T06:12:26.979Z
CREATE TABLE mod_intray_task_5 (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Tugas 5',
    [name] TEXT NOT NULL DEFAULT 'intray_task_5',
    [time_in_seconds] INTEGER DEFAULT 1800,
    [content] TEXT DEFAULT '',
    [label_1] TEXT DEFAULT 'Tuliskan analisis Anda di sini',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_5 AFTER UPDATE ON mod_intray_task_5
BEGIN
    UPDATE mod_intray_task_5 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;