-- Migration number: 0027 	 2025-03-12T06:11:53.220Z
CREATE TABLE mod_intray_task_2 (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT NOT NULL DEFAULT 'Tugas 2',
    [name] TEXT NOT NULL DEFAULT 'intray_task_2',
    [time_in_seconds] INTEGER DEFAULT 1800,
    [content] TEXT DEFAULT '',
    [label_1] TEXT DEFAULT 'Pilih 3 topik utama',
    [label_2] TEXT DEFAULT 'Topik yang paling penting',
    [label_3] TEXT DEFAULT 'Alasan yang menjadikan topik tersebut paling penting',
    [label_4] TEXT DEFAULT 'Rencana tindakan terkait topik tersebut',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_2 AFTER UPDATE ON mod_intray_task_2
BEGIN
    UPDATE mod_intray_task_2 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;