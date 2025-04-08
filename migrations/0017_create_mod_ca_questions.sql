-- Migration number: 0017 	 2025-03-12T06:08:37.480Z
CREATE TABLE mod_ca_questions (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [mod_ca_assignments_id] INTEGER NOT NULL,
    [seq] INTEGER NOT NULL,
    [content] TEXT,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_ca_questions AFTER UPDATE ON mod_ca_questions
BEGIN
    UPDATE mod_ca_questions SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_ca_questions (id, mod_uuid, mod_ca_assignments_id, seq, content) VALUES
(1, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 1, 'Dengan isu-isu yang ada di atas, buatkan daftar masalah-masalah yang bisa Anda identifikasi'),
(2, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 2, 'Setelahnya urutkan dari yang paling kritis hingga yang kurang kritis'),
(3, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 3, 'Buatkan argumen atau analisis mengapa masalah-masalah tersebut harus diselesaikan dalam urutan yang Anda tentukan.'),
(4, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 4, 'Berdasarkan semua daftar masalah yang telah Anda buat, buatkan 3 (tiga) prioritas kegiatan utama yang harus dilakukan dan apa alasannya?'),
(5, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 5, 'Dari 100% anggaran yang masih tersedia, buatkan prosentase alokasi anggaran, dan alasannya  untuk setiap tugas/prioritas yang telah direncanakan (contoh: 40% untuk kegiatan/isu A, karena...; 30% untuk kegiatan/isu B, karena...; 10% untuk kegiatan/isu C, karena...; dan seterusnya).'),
(6, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 6, 'Pilih salah satu dari tiga prioritas yang telah Anda identifikasi. Buatkan analisa SWOT mengapa Anda memilih prioritas tersebut.'),
(7, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 7, 'Buatkan juga rencana untuk menjalankan prioritas yang telah Anda pilih beserta timeline/milestones, indikator keberhasilannya (KPI - Key Performance Indicator)'),
(8, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 8, 'Buat juga risiko yang mungkin muncul dalam pelaksanaannya dari rencana yang telah disusun.'),
(9, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 9, 'Bagaimana Anda akan memastikan bahwa dalam implementasinya, setiap aspek dari rencana yang telah Anda buat telah memenuhi atau bahkan melampaui standar yang telah ditentukan?'),
(10, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 10, 'Apa mekanisme untuk memantau dan mengevaluasi kemajuan dari implementasi yang telah dilakukan?'),
(11, 'kXYbZ4CWC15SNj2A52Jo2r', 1, 11, 'Jika ada hambatan atau variabel yang tak terduga ataupun hasil pemantauan dan evaluasi tidak sesuai ekspektasi, tolok ukur apa saja yang harus dipertimbangkan dan/atau dikembangkan dalam menyikapi hal tersebut, tolong terangkan secara rinci.'),
(12, 'kXYbZ4CWC15SNj2A52Jo2r', 2, 12, 'Apa saja ide-ide out-of-the-box/kreatif yang bisa membantu menumbuh-kembangkan  perusahaan?'),
(13, 'kXYbZ4CWC15SNj2A52Jo2r', 2, 13, 'Berdasarkan ide-ide tersebut di atas, apa saja inisiatif/program (minimal 3) yang Anda anggap bisa membawa perubahan yang signifikan (yang bisa saja berupa inisiatif: produk, perubahan sistim, perubahan paradigma, perubahan sikap/prilaku, ataupun yang lainnya).'),
(14, 'kXYbZ4CWC15SNj2A52Jo2r', 2, 14, 'Apakah Anda bisa menghubungkan/mengkaitkan salah satu atau 3 inisiatif tersebut di atas dengan konsep, pola, cara, atau pendekatan lain yang tampaknya tidak terkait ataupun bukan ranah bisnis perhotelan, namun mampu menghasilkan inisiatif/solusi yang lebih kreatif?  Contoh: Inisiatif 1 dari jawaban nomer 10, ditambah dengan konsep X:. . .  dari bisnis Y:. . . , bisa menghasilkan inisiatif baru Z: . . . ., yang akan sangat bagus untuk LuxeStay, karena . . . . (Anda bisa membuat lebih dari 1 inisiatif baru sesuai jawaban Anda pada nomer 10, dan sesuai dengan konten dan konteks dari kasus di atas, dan juga Anda bebas memakai beragam latarbelakang pengetahuan dan pengalaman Anda selama ini)'),
(15, 'kXYbZ4CWC15SNj2A52Jo2r', 2, 15, 'Berdasarkan semua analisa yang telah Anda buat dari Nomor 1 sampai dengan Nomor 11, Management meminta Anda untuk: membuat trend analysis terkait perkembangan bisnis perhotelan (LuxeStay dan semua kompetitor-nya) sedetail dan selengkap mungkin untuk 5 - 10 tahun ke depan; dan berdasarkan hasil trend analysis tersebut, buat sebuah visi yang baru untuk LuxeStay.');
