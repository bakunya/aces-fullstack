-- Migration number: 0016 	 2025-03-12T06:08:19.827Z
CREATE TABLE mod_ca_assignments (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT,
    [content] TEXT,
	[seq] INTEGER NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
	UNIQUE(mod_uuid, seq)
);

CREATE TRIGGER update_mod_ca_assignments AFTER UPDATE ON mod_ca_assignments
BEGIN
    UPDATE mod_ca_assignments SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_ca_assignments (id, mod_uuid, seq, title, content) VALUES
(1, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 'Tugas 1', 'Oleh Direktur Operasional, Anda sebagai Manajer Senior, dalam dua minggu ke depan, diminta untuk mempresentasikan sebuah rencana aksi untuk mengatasi berbagai masalah yang sedang dihadapi oleh LuxeStay. Rencana Anda harus merinci langkah-langkah konkret untuk perbaikan; yang meliputi:'),
(2, 'kXYbZ4CWC15SNj2A52Jo2r', 2, 'Tugas 2', 'Ketika beragam kegiatan prioritas telah selesai dilakukan dan menunjukkan beragam hasil yang cukup menggembirakan, serta berdasarkan pengalaman Anda dalam penyelesaian kasus di atas, Dewan Direksi melalui Direktur Operasional, meminta Anda untuk membuat sebuah analisis kreatif, merencanakan langkah-langkah inovatif terkait perkembangan organisasi ke depan; yang meliputi:');
