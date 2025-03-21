-- Migration number: 0022 	 2025-03-12T06:10:04.167Z
CREATE TABLE mod_gpro_contents (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [elm_a] TEXT NOT NULL,
    [elm_b] TEXT NOT NULL,
    [prompt_a] TEXT NOT NULL,
    [prompt_b] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_gpro_contents AFTER UPDATE ON mod_gpro_contents
BEGIN
    UPDATE mod_gpro_contents SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_gpro_contents (seq, mod_uuid, elm_a, elm_b, prompt_a, prompt_b) VALUES
(1, '84e2995d-2f91-40ed-b639-83b9e761b690', 'INS', 'MOT', 'Mengatur dan mengawasi secara langsung pekerjaan bawahan.', 'Mendorong dan menyemangati bawahan.'),
(2, '84e2995d-2f91-40ed-b639-83b9e761b690', 'ASE', 'RES', 'Mengelola,  mengatur, mengawasi pekerjaan tanpa harus terlibat langsung.', 'Lebih suka terlibat dan terjun langsung dengan pekerjaan.'),
(3, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Sering melakukan tindakan kontroversial dan terobosan baru.', 'Lebih suka mengkonsolidasi dan mengamankan berbagai hal yang telah dicapai.'),
(4, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIS', 'SIT', 'Bekerja  mendahulukan fakta,  analisa, dan logika.', 'Bekerja mengutamakan imajinasi, inspirasi dan kreatifitas.'),
(5, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Menyelesaikan satu bagian sampai tuntas, baru melangkah ke bagian selanjutnya.', 'Demi ritme kerja, lanjut ke langkah berikutnya, dan tetap menuntaskan yang sebelumnya.'),
(6, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Senang mengerjakan tugas se-mandiri mungkin.', 'Bekerja dan menyelesaikan tugas secara tim/kerja kelompok.'),
(7, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Membina kolaborasi yang produktif.', 'Memobilisasi tim secara langsung.'),
(8, '84e2995d-2f91-40ed-b639-83b9e761b690', 'ASE', 'RES', 'Lugas mengingatkan ketika semangat kerja bawahan menurun.', 'Menurunkan irama kerja ketika kinerja bawahan menurun.'),
(9, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Senang dengan kondisi kerja yang penuh variasi dan gejolak.', 'Memilih situasi kerja yang tidak variatif dan rutin.'),
(10, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIS', 'SIT', 'Mengandalkan prinsip tertib dan taat azas.', 'Lebih senang fleksibel dan bereksperimen.'),
(11, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Pantang menyerah dalam berdebat.', 'Menyudahi perdebatan,  ketika jauh hari, sadar tidak mungkin menang.'),
(12, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Membuat kesimpulan dan keputusan secara mandiri.', 'Mengambil keputusan setelah berbagi ide dan gagasan dengan orang lain.'),
(13, '84e2995d-2f91-40ed-b639-83b9e761b690', 'INS', 'MOT', 'Mengandalkan kemampuan teknis dan kewenangan.', 'Mengandalkan motivasi dan apresiasi.'),
(14, '84e2995d-2f91-40ed-b639-83b9e761b690', 'ASE', 'RES', 'Mengutamakan kesetaraan tugas dan kemampuan.', 'Mementingkan keselarasan tugas dengan keunikan karakter dan talenta.'),
(15, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Memilih pendekatan yang non-konvensional dan fleksibel.', 'Memakai cara dan metode yang sudah terbukti kehandalannya.'),
(16, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Mendorong munculnya inisiatif dan eksperimen dalam bekerja.', 'Mengutamakan rencana, jadwal dan prosedur yang jelas.'),
(17, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Konsisten dengan prinsip, standar dan nilai profesional.', 'Luwes, mengalir dan beradaptasi.'),
(18, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Senang lingkungan yang tenang untuk mengolah ide dan gagasan.', 'Menikmati situasi  interaktif, saling mencetuskan ide, gagasan dan rencana.'),
(19, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Senang dengan pendapat, ide dan gagasan baru dalam bekerja.', 'Taat pada rencana, standar, prosedur dan target kerja.'),
(20, '84e2995d-2f91-40ed-b639-83b9e761b690', 'ASE', 'RES', 'Tegas menghadapi pertentangan dan perbedaan.', 'Toleran dan penuh pertimbangan menghadapi pertentangan dan perbedaan.'),
(21, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Menganggap tantangan nomer satu, dan keberhasilan adalah nomer dua.', 'Memilih pekerjaan yang tidak terlalu beresiko, tapi lebih pasti keberhasilannya.'),
(22, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIS', 'SIT', 'Mendahulukan logika baru perasaan.', 'Mendahulukan perasaan baru logika.'),
(23, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Konsisten, teguh  dan keras hati.', 'Fleksibel, variatif, dan adaptif.'),
(24, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Yakin dengan penilaian dan pertimbangan saya.', 'Memerlukan umpan balik, dorongan, dan konsultasi dengan orang lain.'),
(25, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Menghargai ide, gagasan dan kontribusi bawahan.', 'Menunjukan kemampuan/ketrampilan pribadi, untuk contoh bagi yang lain.'),
(26, '84e2995d-2f91-40ed-b639-83b9e761b690', 'RES', 'ASE', 'Mendorong hubungan yang akrab, terbuka dan informal.', 'Mempertahankan hubungan non-personal dan menjaga jarak.'),
(27, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Sering mengambil tindakan yang tidak populer dan tidak biasa.', 'Lebih sering bertindak hati-hati, penuh perhitungan dan "aman".'),
(28, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIS', 'SIT', 'Merencanakan dan mengawasi secara sistematis dan menyeluruh.', 'Langsung terlibat sebuah pekerjaan dan merespon apa yang terjadi di lapangan.'),
(29, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Mengutamakan profesionalitas dan hati nurani.', 'Menerima bahwa kadang keberhasilan nomer satu, cara tidak penting.'),
(30, '84e2995d-2f91-40ed-b639-83b9e761b690', 'AFI', 'IND', 'Langsung terlibat dan menikmati atmosfir kerja yang hiruk pikuk dan kolaboratif.', 'Tidak buru-buru terlibat, tunggu sampai saya siap dengan segala resikonya.'),
(31, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Senang membuat orang jadi percaya diri dengan gagasan dan kemampuan mereka.', 'Senang membuat orang merasa aman-terkendali di bawah pimpinan saya.'),
(32, '84e2995d-2f91-40ed-b639-83b9e761b690', 'RES', 'ASE', 'Melakukan hubungan yang akrab dan hangat dengan bawahan.', 'Mengambil jarak, sehingga bisa tegas dan lugas dengan mereka.'),
(33, '84e2995d-2f91-40ed-b639-83b9e761b690', 'STA', 'PRO', 'Dianggap sebagai pemimpin yang  kalem, bertanggung jawab, dan mengayomi.', 'Dianggap sebagai pemimpin yang dinamis dan suka pekerjaan yang menantang.'),
(34, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Sering ber-eksperimen dengan ide dan teori baru.', 'Mengutamakan ke-praktis-an, logis, dan aplikatif.'),
(35, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Responsif dan tepat waktu.', 'Luwes terhadap waktu dan cara kerja.'),
(36, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Memakai analisa logika, non-personal dan menjaga jarak dalam bernegosiasi.', 'Mengamati reaksi dan emosi pihak lain, lalu melakukan pendekatan yang sesuai.'),
(37, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Memimpin dengan luwes, suportif, dan penuh pengertian.', 'Mengandalkan ketaatan pada aturan, kendali dan  wewenang.'),
(38, '84e2995d-2f91-40ed-b639-83b9e761b690', 'ASE', 'RES', 'Menyukai kondisi yang menantang dan beresiko tinggi.', 'Memilih kondisi yang bisa di-kalkulasi resikonya terlebih dahulu.'),
(39, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Memilih pekerjaan yang menantang  dan  beresiko tinggi.', 'Memilih terlibat dengan pekerjaan yang bernuansa "hasil kerja tim".'),
(40, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Memberi orang kesempatan untuk belajar dari kesalahan sendiri.', 'Membekali orang dengan sasaran, tujuan, dan batas kewenangan yang jelas.'),
(41, '84e2995d-2f91-40ed-b639-83b9e761b690', 'FLE', 'KON', 'Sering iseng melakukan hal-hal yang tidak terduga.', 'Jarang melakukan hal yang tidak terduga, tanpa alasan yang rasional.'),
(42, '84e2995d-2f91-40ed-b639-83b9e761b690', 'AFI', 'IND', 'Percaya penuh kepada kemampuan orang yang saya beri tugas.', 'Harus merinci semua tugas termasuk beragam kemungkinan yang bisa terjadi.'),
(43, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Tenang menghadapi situasi kegagalan, dan mengeksplorasi penyebabnya.', 'Tegas menyatakan pada semuanya, konsekuensi dan akibat sebuah kegagalan.'),
(44, '84e2995d-2f91-40ed-b639-83b9e761b690', 'RES', 'ASE', 'Senang membuat bawahan berkembang, sebagai individu maupun tim kerja.', 'Senang kerja yang efisien dan pencapaian target yang impresif.'),
(45, '84e2995d-2f91-40ed-b639-83b9e761b690', 'STA', 'PRO', 'Senang  dengan tugas yang memanfaatkan seluruh kemampuan terbaik saya.', 'Memilih tugas yang penuh persaingan dan "panas" kompetisinya.'),
(46, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Membiarkan orang menyelesaikan tugasnya dengan caranya sendiri.', 'Melakukan pengawasan melekat dan memastikan semuanya benar.'),
(47, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Bersih, rapi dan formal, serta memperhatikan detil.', 'Bersih dan rapi, tapi informal dan santai.'),
(48, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Menyimpan informasi dan gagasan berharga  untuk diri sendiri.', 'Berbagi dan berdiskusi, supaya orang lain juga bisa memanfaatkannya.'),
(49, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Menganalisa diri sendiri, ketika banyak hal yang tidak beres.', 'Menunjukkan kekesalan, karena banyak hal yang tidak beres.'),
(50, '84e2995d-2f91-40ed-b639-83b9e761b690', 'RES', 'ASE', 'Menelusuri alasan mengapa orang tidak senang saya dijadikan pemimpin.', 'Berprinsip "senang-tidak senang", saya adalah yang memimpin.'),
(51, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Menganggap "yang ragu akan kalah" adalah filosofi manajemen yang baik.', 'Lebih suka filosofi manajemen "pikir dulu baik-baik sebelum melompat".'),
(52, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Mendorong orang berani mengemukakan inisiatif,  ide, dan gagasannya sendiri.', 'Memastikan tujuan, sasaran, jalur kewenangan, serta prosedur berjalan dengan benar.'),
(53, '84e2995d-2f91-40ed-b639-83b9e761b690', 'KON', 'FLE', 'Berprinsip bahwa apapun yang sudah dimulai harus dituntaskan.', 'Senang melakukan hal yang penting dan utama saja dari satu rangkaian pekerjaan.'),
(54, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Tidak peduli dengan orang yang  "sok tahu" dan "sok berkuasa".', 'Bersikap ketus terhadap orang  "sok tahu" dan "sok berkuasa".'),
(55, '84e2995d-2f91-40ed-b639-83b9e761b690', 'MOT', 'INS', 'Jadi tempat orang mengadu ketika bermasalah.', 'Jad tempat orang mencari solusi permasalahan mereka.'),
(56, '84e2995d-2f91-40ed-b639-83b9e761b690', 'RES', 'ASE', 'Dilihat sebagai orang yang terbuka dan suka berbagi.', 'Dilihat sebagai orang yang terampil dan percaya diri.'),
(57, '84e2995d-2f91-40ed-b639-83b9e761b690', 'PRO', 'STA', 'Dikomentari sebagai: "dia agak gila, tapi kami suka".', 'Dikomentari: "kami menghormatinya karena perhatiannya yang tak pernah putus".'),
(58, '84e2995d-2f91-40ed-b639-83b9e761b690', 'SIT', 'SIS', 'Senang tugas dengan tujuan akhirnya saja,  selebihnya biar saya yang mengembangkan.', 'Senang tugas yang rinci dan jelas sasaran serta aturan mainnya.'),
(59, '84e2995d-2f91-40ed-b639-83b9e761b690', 'FLE', 'KON', 'Mencoba berbagai hal jadi nomer satu, berhasil atau tidak itu urusan lain.', 'Fokus pada suatu hal dan jalankan sesempurna mungkin.'),
(60, '84e2995d-2f91-40ed-b639-83b9e761b690', 'IND', 'AFI', 'Bekerja dengan menjadi "orang di belakang layar".', 'Bekerja dengan mengorganisir, memotivasi dan memfasilitasi orang lain.');
