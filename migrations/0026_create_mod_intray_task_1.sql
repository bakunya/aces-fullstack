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
    [label_3] TEXT DEFAULT 'Nama isu',
    [created] TEXT NOT NULL DEFAULT (datetime('now') || 'Z'),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_task_1 AFTER UPDATE ON mod_intray_task_1
BEGIN
    UPDATE mod_intray_task_1 SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_intray_task_1 (id, mod_uuid, content) VALUES
(
    1,
    'oUxJMANwEzQDg2b7SF71EV',
    '<p>Kucing Schrödinger adalah eksperimen pemikiran (thought experiment) yang diusulkan oleh fisikawan Austria, <strong>Erwin Schrödinger</strong> pada tahun 1935. Eksperimen ini dirancang untuk mengilustrasikan salah satu konsep dasar dalam mekanika kuantum, yaitu <strong>superposisi kuantum</strong>, serta untuk menunjukkan betapa anehnya implikasi teori kuantum jika diterapkan pada objek makroskopis.</p><h3>Penjelasan Eksperimen:</h3><p>Bayangkan ada seekor kucing yang dimasukkan ke dalam kotak tertutup bersama dengan alat berikut:</p><ol><li><strong>Sumber partikel radioaktif</strong>: memiliki peluang tertentu untuk meluruh dalam satu jam.</li><li><strong>Detektor peluruhan</strong>: yang akan mendeteksi jika partikel radioaktif meluruh.</li><li><strong>Botol racun</strong>: yang akan pecah jika detektor mendeteksi peluruhan radioaktif.</li></ol><p>Menurut mekanika kuantum, sebelum kita membuka kotak dan mengamati keadaan kucing, sumber radioaktif berada dalam <strong>superposisi</strong> antara meluruh dan tidak meluruh. Hal ini berarti, secara teori, kucing juga berada dalam superposisi: <strong>hidup dan mati secara bersamaan</strong>.</p><p>Namun, begitu kita membuka kotak dan mengamati, keadaan kucing "runtuh" ke salah satu dari dua kemungkinan: <strong>hidup atau mati</strong>.</p><h3>Makna Eksperimen</h3><p>Eksperimen ini tidak dimaksudkan untuk menggambarkan situasi nyata, melainkan untuk menunjukkan:</p><ol><li><strong>Ketidaksesuaian teori kuantum dengan intuisi kita tentang dunia makroskopis</strong>.</li><li><strong>Peran pengamatan dalam mekanika kuantum</strong>: keadaan sistem kuantum baru "ditentukan" setelah diamati.</li></ol><p>Dalam dunia nyata, konsep superposisi seperti ini hanya berlaku untuk partikel-partikel kecil, seperti elektron atau foton. Pada objek besar seperti kucing, fenomena ini sulit terjadi karena efek <strong>dekoherensi</strong>.</p><p>Eksperimen ini juga memunculkan diskusi filosofis tentang hubungan antara pengamatan, realitas, dan ilmu fisika.</p>'
);