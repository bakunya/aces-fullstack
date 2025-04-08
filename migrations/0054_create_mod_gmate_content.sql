-- Migration number: 0054 	 2025-04-08T03:18:10.021Z
CREATE TABLE mod_gmate_content (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [seq] INTEGER NOT NULL,
    [prompts] INTEGER, -- jumlah prompt terkait
    [url] TEXT NOT NULL DEFAULT '',
    [content] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (mod_uuid, seq)
);

CREATE TRIGGER update_mod_gmate_content AFTER UPDATE ON mod_gmate_content
BEGIN
    UPDATE mod_gmate_content SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_gmate_content (id, mod_uuid, seq, content) VALUES
    (1, 'bcnecqL6zF4PgUxfNWHn1a', 1, '<p>Divisi Anda telah menunjukkan prestasi terbaik pada tahun ini, dan perusahaan memberikan insentif berupa paket liburan ke sejumlah tujuan wisata dalam dan luar negeri. Biasanya, dalam menentukan siapa yang berhak berwisata di dalam kota, ke luar kota atau yang berhak ke luar negeri, tolok ukur utamanya adalah hierarki jabatan dan masa kerja. Namun Anda berpandangan bahwa prestasi kerja (nilai kinerja) merupakan kriteria utama, diikuti dengan yang kedua: hierarki jabatan, lalu gaji dan yang terakhir masa kerja. Untuk membantu Anda mengambil keputusan, Anda telah menentukan bahwa prestasi dua kali lebih penting daripada gaji, dan masa kerja hanya setengah pentingnya dari gaji. Jawablah pertanyaan-pertanyaan berikut berdasarkan informasi di bawah ini.</p> <figure><img src="" title="Tabel dan Grafik Hierarki Jabatan"/></figure>'),
    (2, 'bcnecqL6zF4PgUxfNWHn1a', 2, '<figure><img src="" title="Keuntungan dari 5 Perusahaan Sejenis"/></figure>'),
    (3, 'bcnecqL6zF4PgUxfNWHn1a', 3, '<p>Gosip beredar bahwa sistem promosi karyawan yang terjadi di perusahaan Anda lebih banyak ditentukan secara subjektif. Tetapi, Anda tidak menghiraukan gosip itu dan tetap percaya bahwa aturan perusahaan yang menyatakan prestasi kerja merupakan tolok ukur utama masih berlaku, sehingga seorang karyawan yang berprestasi tetap akan mendapat prioritas untuk dipromosikan tanpa mengandalkan nasib baik.</p> <p>Karena banyaknya keluhan yang diajukan bawahan, Anda perlu mengkaji ulang proses promosi. Departemen HRD memberi Anda daftar yang bersifat rahasia yang digunakan oleh pihak manajemen (tim penilai) dalam menentukan promosi, meskipun tabel/kolom yang berisi komentar pribadi para penilai tidak diikutsertakan.</p> <figure><img src="" title="Tabel Kriteria Promosi"/></figure>'),
    (4, 'bcnecqL6zF4PgUxfNWHn1a', 4, '<p>Berdasarkan penelitian terhadap beragam sepatu sport untuk anak muda yang telah dilakukan oleh lembaga independen, Anda sebagai Manager Marketing dari sebuah perusahaan distributor peralatan olah raga, diminta untuk mengidentifikasi beragam peluang pemasaran untuk masing-masing produk sepatu tersebut. Adapun hasil penelitiannya adalah sebagai berikut:</p> <figure><img src="" title="Tabel Rating Per Merek Sepatu"/></figure>'),
    (5, 'bcnecqL6zF4PgUxfNWHn1a', 5, '<h3>Proses Tender PT Tipsani Indonusa</h3> <ul> <li>Nilai Tender kurang dari Rp. 25.000.000,- disetujui oleh Manajer Pembelian atau Kepala Divisi Terkait</li> <li>Nilai Tender antara Rp. 25.000.000,-  s/d Rp. 100.000.000,-  disetujui oleh Kepala Divisi Terkait dan Kepala Divisi Pengadaan</li> <li>Nilai Tender lebih dari Rp. 100.000.000,- s/d Rp. 500.000.000,- disetujui oleh Kepala Divisi Pengadaan atau Direktur Operasional; Direktur Utama juga harus menyetujui.</li> </ul>'),
    (6, 'bcnecqL6zF4PgUxfNWHn1a', 6, '<h3>Ringkasan Hasil Evaluasi Karyawan</h3> <p><strong>AMIR</strong> Memiliki kemampuan analisa dan sintesa yang baik meskipun kemampuannya dalam mengorganisir pekerjaan menjadi titik lemahnya. Ia mampu menuangkan hasil analisanya dalam bentuk presentasi lisan maupun tulisan secara baik, namun kurang bisa membangun hubungan kerja sama dengan tim, termasuk dalam memimpin. Ia mampu bekerja baik di bawah tekanan  sama halnya dengan dorongan untuk memberikan prestasi yang terbaik; namun dalam kesehariannya, ia belum bisa menunjukkan prestasi kerja yang baik</p> <p><strong>BERTA</strong> Memiliki kemampuan yang baik dalam mengorganisir pekerjaan dengan didukung kemampuan analisa yang mendalam, namun punya kesulitan dalam menyampaikan pikiran dan gagasan secara verbal. Walaupun kooperatif bila bekerja dengan orang lain, ia menunjukkan sikap dingin dan menjaga jarak saat berperan sebagai pemimpin. Dalam kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif. </p> <p><strong>CARLO</strong> Ia memiliki kemampuan analisa yang memadai, serta menunjukkan ketenangan dan keyakinan saat bekerja dalam tekanan dan memenuhi target. Dalam kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif. Ia merupakan karyawan terbaru, namun mudah beradaptasi dan menunjukkan sikap kooperatif yang menonjol. Dalam beberapa hal ia juga dapat memainkan peran sebagai pimpinan yang efektif. Kelugasannya tersebut juga tampak saat ia harus mengkomunikasikan gagasannya secara lisan meskipun masih memerlukan perbaikan untuk komunikasi tulisan.</p> <p><strong>DENNY</strong> Salah seorang karyawan paling produktif di departemen. Meskipun ia gampang tersinggung dan mempunyai kesulitan dalam berteman atau bergaul dalam kelompok. Ia memiliki kemampuan menyesuaikan diri terhadap tekanan tugas yang baik. Walaupun lancar berbicara, namun gaya berbicaranya tampak kaku. Kemampuan analisa dan sintesanya tergolong rata-rata</p> <p><strong>ERNI</strong> Karyawan yang kooperatif dan banyak disukai dengan skill komunikasi yang kuat. Namun sikapnya santai dan tidak suka repot-repot membuat ia kurang optimal dalam mengerjakan tugas analisa dan sintesa. Meskipun ia suka menjadi pemimpin, tetapi kemampuan pengelolaan pekerjaannya tidak optimal. Ia terkadang terlambat memenuhi target namun ia mampu untuk bekerja di bawah tekanan.</p>'),
    (7, 'bcnecqL6zF4PgUxfNWHn1a', 7, '<p>Perusahaan Anda, sebuah pabrik <em>manufacturing</em> mesin diesel untuk industri, telah bekerja beberapa bulan dalam rangka mengembangkan sebuah tipe <em>genset</em> (pembangkit listrik) baru. Pada sebuah <em>meeting</em> dengan departemen produksi, dampak pengembangan produk baru itu dipaparkan secara ringkas dan perubahan berikut akan terjadi di jalur produksi A dan/atau B.</p> <ul> <li>Jalur produksi A akan kekurangan lima karyawan atau jalur produksi B akan kekurangan sepuluh karyawan.</li> <li>Biaya <em>training</em> perusahaan akan meningkat jika jalur produksi A menambah karyawan baru.</li> <li>Produktivitas keseluruhan akan menurun jika jalur produksi A atau B menambah karyawan baru.</li> <li>Area kerja harus diperluas jika departemen B menambah karyawan baru.</li> </ul>'),
    (8, 'bcnecqL6zF4PgUxfNWHn1a', 8, '<p>Sebagai seorang manajer, Anda mempunyai sebuah proyek yang terdiri dari empat tahap. Masing-masing tahap memerlukan waktu dua minggu dan dikerjakan oleh satu tim yang terdiri dari dua orang.</p> <p>Anda mempunyai enam orang staff, 4 diantaranya: Yudi, Yuda, Parti, dan Heru yang karena kesibukannya hanya bisa terlibat untuk satu tahap saja; sedangkan dua yang lainnya adalah Tari dan Gilang.</p> <p>Parti hanya memiliki waktu luang di bulan pertama dan tidak bisa bekerja sama dengan Tari. Gilang bertanggungjawab untuk implementasi dan lebih suka bekerja di bagian akhir. Yuda hanya bisa bekerja pada tahap dua atau tiga.</p> <p>Heru lebih suka bekerja di bulan pertama, namun dia tidak cocok bekerja dengan Parti dan/atau Yudi. Tari adalah pemimpin tim secara keseluruhan sehingga harus bekerja di tahap pertama dan empat. Hal lain yang perlu diperhatikan adalah tak seorang pun boleh bekerja lebih dari dua tahap.</p>'),
    (9, 'bcnecqL6zF4PgUxfNWHn1a', 9, '<figure><img src="" title="Gambar Aturan Absensi Karyawan"/></figure> <p>Berdasarkan aturan absensi karyawan dan catatan kehadiran enam bulan terakhir dari tiap-tiap karyawan pada kondisi di atas, jawablah pertanyaan-pertanyaan berikut.</p>'),
    (10, 'bcnecqL6zF4PgUxfNWHn1a', 10, '<p>Sebagai seorang manajer penjualan, Anda mengetahui bahwa salah seorang <em>salesman</em> Anda tidak menindaklanjuti komitmennya pada seorang customer besar, yang dahulu adalah salah satu dari customer Anda ketika masih menjadi <em>salesman</em>.</p> <p>Hari ini, <em>customer</em> tersebut menelpon Anda dan mengeluhkan pelayanan yang kurang memadai dari <em>salesman</em> Anda, terutama ketidakmampuannya untuk memberikan informasi yang diminta secara tepat waktu. </p>'),
    (11, 'bcnecqL6zF4PgUxfNWHn1a', 11, '<p>Berikut ini sebuah cuplikan dari sebuah rapat bisnis. Pak Yunus bertindak sebagai ketua panel, dan Fred, seorang manajer Produksi.</p> <p>Pak Yunus: "…. dan dengan proses kerja yang selaras dan terpadu antar departemen, serta keseragaman persepsi terhadap visi/misi perusahaan, kita dapat memastikan efisiensi dan efektivitas di setiap lini organisasi yang pada akhirnya akan menjamin tercapainya keuntungan perusahaan."</p> <p>Fred: "Maaf saya berbeda pendapat, Pak, tapi berdasarkan biaya produksi saat ini, akan sulit untuk bisa balik modal di tahun ini, apalagi meraih keuntungan."</p>'),
    (12, 'bcnecqL6zF4PgUxfNWHn1a', 12, '<figure><img src="" title="Gambar Kerja dan Efisiensi"/></figure>'),
    (13, 'bcnecqL6zF4PgUxfNWHn1a', 13, '<p>Sebagai manajer keuangan, Anda bekerja di kantor dari jam 09.00 hingga 14.00 setiap hari, kecuali pada hari Kamis, ketika Anda menghadiri rapat perusahaan sebagai wakil divisi dari jam 12.00 hingga 15.00 (Anda tetap bekerja di kantor dari jam 09.00 hingga 12.00).</p> <p>Pada hari Senin, Anda bekerja dengan Agung untuk tugas di luar kantor dari jam 14.00 hingga 17.00. Pada hari Selasa jam 15.00 Anda memimpin rapat sebuah komite, yang biasanya berlangsung hingga jam 17.30 atau 16.00.</p> <p>Pada hari Rabu, Anda harus mengunjungi beberapa cabang mulai jam 14.00. Pada hari Jumat, Anda biasanya mengadakan rapat informal dengan staff kantor dari jam 15.00 hingga 16.00, yang terkadang berlangsung hingga jam 16.30 atau 17.00</p>'),
    (14, 'bcnecqL6zF4PgUxfNWHn1a', 14, '<figure><img src="" title="Grafik Presentase Nilai Penjualan per Cabang (dibanding total penjualan)"/></figure>'),
    (15, 'bcnecqL6zF4PgUxfNWHn1a', 15, '<figure><img src="" title="Tabel Hasil Evaluasi Kemampuan Karyawan"/></figure>'),
    (16, 'bcnecqL6zF4PgUxfNWHn1a', 16, '<p>Tabel di bawah ini dipergunakan oleh Departemen Pembelian untuk memastikan bahwa pesanan material bisa datang tepat waktu agar tidak mengganggu proses produksi. Sebagai Manajer Pembelian, Anda melakukan pengawasan rutin pada bawahan Anda. Berikut ini adalah hasil pekerjaan Karno.</p> <figure><img src="" title="Tabel Rencana Pemesanan Material"/></figure>'),
    (17, 'bcnecqL6zF4PgUxfNWHn1a', 17, '<figure><img src="" title="Tabel Alokasi Waktu per Proyek"/></figure>'),
    (18, 'bcnecqL6zF4PgUxfNWHn1a', 18, '<figure><img src="" title="Grafik Keuntungan per Tahun Div A, B, dan C"/></figure>'),
    (19, 'bcnecqL6zF4PgUxfNWHn1a', 19, '<p>Sebuah perusahaan akan membeli sejumlah perangkat teknologi informasi (IT) dari sebuah distributor perlengkapan komputer. Pada saat penawaran, Anda sebagai Manager Penjualan pada perusahaan distributor tersebut menjelaskan kepada <em>salesman</em> Anda tentang kemungkinan permasalahan yang akan terjadi apabila beberapa perangkat dihubungkan satu sama lain. Beberapa catatan tersebut adalah:</p> <ul> <li>Program Akuntansi SIMKEU akan bermasalah bila digabung dengan <em>printer</em> merek Conan, karena program ini tidak cocok dengan <em>printer</em> Conan</li> <li><em>Notebook</em> merek Anyer tidak cocok dipasangkan dengan <em>wireless mouse</em> merek Logik, karena ketidaksesuaian sistem <em>infrared</em>-nya</li> <li>Komputer PC merek BIM tidak boleh dipadukan dengan monitor merek GL, karena ketidak sesuaian sistem digital-nya.</li> </ul>'),
    (20, 'bcnecqL6zF4PgUxfNWHn1a', 20, '<figure><img src="" title="Tabel Penawaran Service Fotokopi AMAN"/></figure>'),
    (21, 'bcnecqL6zF4PgUxfNWHn1a', 21, '<figure><img src="" title="Tabel Hasil Tes Keterampilan Dasar Supervisor"/></figure>'),
    (22, 'bcnecqL6zF4PgUxfNWHn1a', 22, '<p>Hasil survey terhadap para karyawan yang dengan keluar secara sukarela, menunjukkan bahwa lima alasan tertinggi untuk mencari pekerjaan di tempat lain adalah:</p> <ol> <li>Kejemuan karena tidak cukup banyak tugas yang non-rutin</li> <li>Keinginan untuk mencoba pekerjaan di bidang lain</li> <li>Lembur yang diharapkan tidak datang-datang juga</li> <li>Tidak cocok dengan rekan sekerja</li> <li>Ketidak mampuan menyelesaikan beban pekerjaan.</li> </ol>'),
    (23, 'bcnecqL6zF4PgUxfNWHn1a', 23, '<p>Anda adalah manager yang bertanggungjawab atas pengadaan bahan mentah untuk produksi; dan salah satu tugas utamanya adalah mengevaluasi tawaran <em>supplier</em> setiap tahunnya. Tiga minggu yang lalu supervisor Anda pensiun dan digantikan oleh Pundi, seorang supervisor muda yang berkarir pesat yang berasal dari perusahaan kompetitor terbesar.</p> <p>Hubungan Anda dengan Pundi belum cukup harmonis, dan pada suatu hari, mendekati akhir proses evaluasi tahunan, Pundi menaruh kontrak dengan <em>supplier</em> Bina Utama, yang sudah dia tandatangani, di meja Anda, sambil memberitahu dia telah memutuskan untuk memilih <em>supplier</em> tersebut.</p> <p>Adapun alasannya karena dia pernah bekerja sama dengan Bina Utama di masa lalu dan benar-benar mempercayai produk dan service-nya, sambil menambahkan bahwa dia juga tahu kalau Bina Utama merupakan salah satu <em>supplier</em> yang sedang Anda pertimbangkan.</p>'),
    (24, 'bcnecqL6zF4PgUxfNWHn1a', 24, '<p>Anda Manajer HRD yang baru di PLP Industries, yang selama ini selalu mengalami permasalahan naik turunnya jumlah pekerja di pabrik secara tak terduga. Permasalahan menjadi lebih rumit ketika persyaratan produksi minimum per bulan juga fluktuatif sebagaimana permintaan pasar yang juga fluktuatif. Untuk itu Anda perlu terlebih dahulu melakukan pemetaan terhadap fluktuasi jumlah pekerja satu tahun terakhir yang dibandingkan dengan hasil produksi pabrik.</p> <figure><img src="" title="Grafik Rerata Produksi tahun 20xx PLP Industries"/></figure>'),
    (25, 'bcnecqL6zF4PgUxfNWHn1a', 25, '<figure><img src="" title="Grafik Karyawan per Cabang vs Grafik Profit per Cabang"/></figure>'),
    (26, 'bcnecqL6zF4PgUxfNWHn1a', 26, '<p>Anda melihat dua orang bawahan Bu Yati sedang berdebat seru, yang semakin lama meningkat menjadi pertengkaran mulut yang kasar dan mengganggu suasana kerja di sekitarnya, meskipun beberapa saat kemudian perdebatan tersebut berakhir ketika salah seorang bergegas menyingkir. </p> <p>Di lain pihak, pada waktu yang bersamaan, di sekitar tempat perdebatan terjadi, Anda melihat Bu Yati sedang berbicara dengan seorang pelanggan; dan setelah pelanggan itu pergi, Bu Yati kembali ke ruang kerjanya tanpa melakukan apa-apa terhadap kedua bawahannya yang berdebat tadi.</p> <p>Anda merasa kedua karyawan tersebut harus ditegur, karena berdebat dan bertengkar mulut di hadapan pelanggan adalah hal yang tabu di perusahaan. Pak Farid, sebagai atasan Anda dan Bu Yati, keluar kantor hari ini; dan Anda sendiri harus menemui pelanggan yang 15 menit lagi akan tiba.</p>');