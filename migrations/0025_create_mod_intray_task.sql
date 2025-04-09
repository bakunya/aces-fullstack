-- Migration number: 0025 	 2025-03-12T06:10:48.534Z
CREATE TABLE mod_intray_task (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `mod_uuid` TEXT NOT NULL,
  `page_seq` INTEGER NOT NULL,
  `seq` INTEGER NOT NULL CHECK (seq > 0 AND seq < 13),
  `title` TEXT NOT NULL DEFAULT '',
  `body` TEXT NOT NULL DEFAULT '',
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT,
  UNIQUE (mod_uuid, page_seq, seq)
);

CREATE TRIGGER update_mod_intray_task AFTER UPDATE ON mod_intray_task
BEGIN
    UPDATE mod_intray_task SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_intray_task (id,mod_uuid,page_seq,seq,title) VALUES
  (1, 'oUxJMANwEzQDg2b7SF71EV', 1, 1, 'Identifikasi isu-isu penting'),
  (2, 'oUxJMANwEzQDg2b7SF71EV', 2, 2, 'Memilih tiga topik utama'),
  (3, 'oUxJMANwEzQDg2b7SF71EV', 2, 3, 'Menentukan satu topik prioritas'),
  (4, 'oUxJMANwEzQDg2b7SF71EV', 2, 4, 'Faktor-faktor yang menjadikan prioritas'),
  (5, 'oUxJMANwEzQDg2b7SF71EV', 2, 5, 'Rencana tindakan terkait topik prioritas'),
  (6, 'oUxJMANwEzQDg2b7SF71EV', 3, 6, 'Analisis untung-rugi dan/atau pro-kontra'),
  (7, 'oUxJMANwEzQDg2b7SF71EV', 3, 7, 'Keputusan setelah ada analisis untung-rugi/pro-kontra'),
  (8, 'oUxJMANwEzQDg2b7SF71EV', 3, 8, 'Rasional atas keputusan yang diambil'),
  (9, 'oUxJMANwEzQDg2b7SF71EV', 4, 9, 'Isu dan faktor-faktor penyebabnya'),
  (10, 'oUxJMANwEzQDg2b7SF71EV', 4, 10, 'Prediksi hingga tiga tahun mendatang'),
  (11, 'oUxJMANwEzQDg2b7SF71EV', 5, 11, 'Rencana kerja strategis'),
  (12, 'oUxJMANwEzQDg2b7SF71EV', 5, 12, 'Rasional di balik rencana kerja strategis');