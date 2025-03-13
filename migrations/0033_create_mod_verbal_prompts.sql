-- Migration number: 0033 	 2025-03-12T06:13:44.756Z
CREATE TABLE mod_verbal_prompts (
    [id] INTEGER PRIMARY KEY,
    [article_seq] INTEGER NOT NULL,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_verbal_prompts AFTER UPDATE ON mod_verbal_prompts
BEGIN
    UPDATE mod_verbal_prompts SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_verbal_prompts (seq, mod_uuid, article_seq, prompt) VALUES
(1, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 1, 'Demonstrasi damai adalah respon Gandhi terhadap tindakan kekerasan.'),
(2, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 1, 'Nama Mahatma Gandhi berasal dari gabungan bahasa Sanskerta dan bahasa asli India.'),
(3, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 1, 'Bahwa Gandhi tidak menyukai istilah Mahatma dapat dibuktikan kebenarannya.'),
(4, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 1, 'Gandhi memulai aktivitas politik nya justru di luar India.'),
(5, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 1, 'Kegiatan politik Gandhi memecah Kemaharajaan Britania menjadi bentuk Persemakmuran.'),
(6, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 2, 'Perdagangan valas melibatkan pasar-pasar uang utama di dunia selama 24 jam secara terus menerus.'),
(7, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 2, 'Nilai perdagangan valas di dunia bisa mengalahkan total nilai valas bank sentral milik suatu negara.'),
(8, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 2, 'Pasar valas adalah alternatif bisnis yang populer, tapi juga beresiko tinggi.'),
(9, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 2, 'ROI adalah istilah yang muncul karena adanya perdagangan valuta asing.'),
(10, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 2, 'Di Amerika pasar valasnya dibuka dari jam 8.30 malam sampai 10.30 pagi.'),
(11, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 3, 'Gunung Tambora pernah menjadi gunung dengan puncak tertinggi di Nusantara.'),
(12, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 3, 'Semenanjung Sanggar bukan bagian dari semenanjung di pulau Sumbawa.'),
(13, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 3, 'Letusan Tambora menyebabkan dunia mengalami bencana kelaparan terburuk pada abad 19.'),
(14, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 3, 'Taupo adalah nama gunung yang setelah meletus pada tahun 181, sisanya menjadi danau.'),
(15, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 3, 'Paling tidak ada 71.000 korban jiwa, akibat dari letusan gunung Tambora.'),
(16, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 4, 'Malware bisa merusak sistim komputer dan peladen.'),
(17, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 4, 'Perangkat perusak tertentu, mengandung software yang mampu mengunggah data ke server.'),
(18, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 4, 'Bancos adalah perangkat perusak yang mampu membuka situs perbankan.'),
(19, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 4, 'Tidak semua adware adalah perangkat perusak atau malware.'),
(20, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 4, 'Istilah malware kuda Troya, terinspirasi dari mitologi perang Troya dari Yunani.'),
(21, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 5, 'Rendang harus kering dan hitam hingga memasaknya harus berjam-jam..'),
(22, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 5, 'Kalau disimpan di lemari pendingin, rendang bisa bertahan lebih dari 2 bulan.'),
(23, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 5, 'Rendang bukanlah makanan sehari hari masyarakat Minangkabau.'),
(24, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 5, 'Rendang terkenal sebagai hidangan paling lezat di dunia 25. Ada jenis rendang tertentu yang disebut sebagai kalio.'),
(25, 'a0ddaf8e-5120-4191-b2a0-10b55369b019', 5, 'Ada jenis rendang tertentu yang disebut sebagai kalio.');
