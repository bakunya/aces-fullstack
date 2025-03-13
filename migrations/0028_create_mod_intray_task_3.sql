-- Migration number: 0028 	 2025-03-12T06:11:57.753Z
CREATE TABLE mod_intray_task_3 (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Tugas 3',
    [name] TEXT NOT NULL DEFAULT 'intray_task_3',
    [time_in_seconds] INTEGER DEFAULT 900,
    [content] TEXT DEFAULT '',
    [label_1] TEXT DEFAULT 'Pertimbangan untung-rugi atau pro-kontra dari solusi yang disarankan',
    [label_2] TEXT DEFAULT 'Solusi yang disarankan untuk diambil',
    [label_3] TEXT DEFAULT 'Alasan pemilihan solusi di atas',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_3 AFTER UPDATE ON mod_intray_task_3
BEGIN
    UPDATE mod_intray_task_3 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;