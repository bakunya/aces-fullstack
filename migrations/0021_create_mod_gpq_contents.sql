-- Migration number: 0021 	 2025-03-12T06:09:48.715Z
CREATE TABLE mod_gpq_contents (
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

CREATE TRIGGER update_mod_gpq_contents AFTER UPDATE ON mod_gpq_contents
BEGIN
    UPDATE mod_gpq_contents SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_gpq_contents (seq, mod_uuid, elm_a, elm_b, prompt_a, prompt_b) VALUES
(1, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'STR', 'Saya senang melihat interaksi antar beragam situasi', 'Saya suka memikirkan kondisi jangka panjang'),
(2, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'ORG', 'Saya tertarik dengan hal yang detail', 'Saya tertarik untuk mengatur sumber daya yang ada'),
(3, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'SOC', 'Saya suka mendiskusikan ide-ide baru', 'Saya tertarik memperhatikan kondisi emosi orang lain'),
(4, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'NET', 'Saya senang memilah tujuan menjadi langkah-langkah', 'Saya senang membangun jejaring hubungan'),
(5, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'PER', 'Saya menjadikan target sebagai tolok ukur keberhasilan', 'Saya suka menjual ide saya ke orang lain'),
(6, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'ADA', 'Saya suka bekerja bersama orang lain', 'Saya senang mencoba hal-hal baru'),
(7, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'SLD', 'Saya senang tampil di depan umum', 'Saya berupaya mengenali kelemahan dan kelebihan diri'),
(8, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'ACH', 'Saya berupaya tetap tenang di saat-saat menegangkan', 'Saya memiliki dorongan kuat untuk mencapai tujuan'),
(9, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'ORG', 'Saya suka memprediksi kondisi jangka panjang', 'Saya suka mengelola sumber daya dalam rangka mencapai target'),
(10, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'SOC', 'Saya tertarik melihat keterkaitan antar kondisi', 'Saya suka memperhatikan sudut pandang orang lain'),
(11, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'NET', 'Saya suka informasi yang rinci', 'Saya suka membina hubungan yang saling menguntungkan'),
(12, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'PER', 'Saya suka mengembangkan gagasan orisinil', 'Saya selalu berusaha membuat pendapat saya diterima'),
(13, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'ADA', 'Saya selalu membuat persiapan sebelum bertindak', 'Saya suka mencoba suatu hal yang berbeda'),
(14, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'SLD', 'Saya suka memastikan pekerjaan sesuai rencana', 'Saya selalu berupaya mengatasi kekurangan diri'),
(15, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'SLC', 'Saya suka menjadi bagian dari suatu kelompok', 'Saya berupaya tetap berpikir jernih ketika berada di bawah tekanan'),
(16, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'ACH', 'Saya senang menyampaikan pendapat', 'Saya senang menetapkan sasaran yang menantang'),
(17, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'SOC', 'Saya suka mengatur tugas-tugas yang ada', 'Saya terdorong untukmembantu orang lain'),
(18, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'NET', 'Saya tertarik mendiskusikan analisa jangka panjang', 'Saya suka membangun kedekatan dan keakraban'),
(19, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'PER', 'Saya suka membuat kesimpulan', 'Saya suka membuat orang lain menerima gagasan saya '),
(20, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'ADA', 'Saya senang mengerjakan hal yang detail', 'Saya suka mengerjakan hal yang baru'),
(21, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'SLD', 'Saya suka mengembangkan metode baru', 'Saya berupaya mencari masukan mengenai kelemahan diri'),
(22, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'SLC', 'Saya suka mempersiapkan tindakan alternatif untuk berjaga-jaga', 'Saya berusaha positif dan "berkepala dingin" ketika situasi memanas'),
(23, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'COM', 'Saya suka mengawasi kesesuaian rencana dengan pelaksanaan', 'Saya senang menyampaikan pendapat '),
(24, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'ACH', 'Saya suka membangun iklim kerja yang bersahabat', 'Saya suka pekerjaan yang menatang'),
(25, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'NET', 'Saya selalu memahami orang lain', 'Saya senang bisa memperluas jejaring interaksi'),
(26, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'PER', 'Saya suka mengorganisir tugas yang diberikan', 'Saya menganggap penting keberhasilan menjual ide ke orang lain'),
(27, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'ADA', 'Saya suka membuat target jangka panjang', 'Saya santai menghadapi kondisi yang baru'),
(28, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'SLD', 'Saya suka menyatukan beragam informasi', 'Saya senang mempelajari hal yang bisa mengembangkan diri'),
(29, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'SLC', 'Saya suka mendetailkan beragam hal', 'Saya berupaya mengenali emosi yang sedang saya rasakan dan penyebabnya'),
(30, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'COM', 'Saya sering memunculkan gagasan orisinil', 'Saya santai ketika menghadapi perbedaan pendapat'),
(31, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'COL', 'Saya suka mempersiapkan rencana kerja', 'Saya senang mendapat kesempatan untuk bekerja sama '),
(32, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'ACH', 'Saya suka memantau penyimpangan dalam pekerjaan', 'Saya berupaya bekerja lebih baik dari orang lain'),
(33, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'PER', 'Saya suka membangun hubungan dengan orang baru', 'Saya suka bernegosiasi supaya ide saya dapat diterima'),
(34, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'ADA', 'Saya suka memenuhi kebutuhan orang lain', 'Saya santai menghadapi lingkungan baru'),
(35, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'SLD', 'Saya suka mempertimbangkan sumber daya saat bekerja', 'Saya tertarik dengan kegiatan meningkatkan kemampuan diri'),
(36, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'SLC', 'Saya tertarik dengan keluasan dari sebuah masalah', 'Saya berupaya menyelami keterkaitan antara emosi dan pemikiran saya'),
(37, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'COM', 'Saya tertarik melihatpola hubungan antar kondisi', 'Saya memandang penting dapat mengemukakan pendapat'),
(38, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'COL', 'Saya suka menggali informasi hingga rinci', 'Saya suka berbagi informasi dengan orang lain'),
(39, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'CTR', 'Saya suka cara penyelesaian yang tidak biasa', 'Saya selalu memastikan tidak ada penyimpangan dalam pekerjaan '),
(40, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'ACH', 'Saya suka menentukan target dari setiap tindakan', 'Saya ingin berusaha sebaik mungkin'),
(41, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'ADA', 'Saya suka mempengaruhi orang lain', 'Saya santai bergaul dengan orang-orang baru'),
(42, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'SLD', 'Saya suka mempertahankan hubungan yang sudah ada', 'Saya senang dengan beragamkegiatan pengembangan diri'),
(43, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'SLC', 'Saya selalu membantu dengan senang hati', 'Saya senang memikirkan bagaimana perasaan dapat mempengaruhi kinerja saya'),
(44, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'COM', 'Saya suka keteraturan dalam bekerja', 'Saya suka mengobrol'),
(45, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'COL', 'Saya tertarik dengan wacana masa depan', 'Saya suka bergabung dalam kelompok'),
(46, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'CTR', 'Saya suka merangkum data menjadi kesimpulan', 'Saya suka mengawasi ketidaksesuaian kerja dengan rencana'),
(47, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'PLA', 'Saya suka mengurai sesuatu menjadi detail', 'Saya selalu mempertimbangkan beragam hal dalam merencanakan'),
(48, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'ACH', 'Saya suka mempraktekkan cara yang baru', 'Saya ingin mengerjakan segala sesuatunya lebih baik dari yang lain'),
(49, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'SLD', 'Saya menyukai perubahan', 'Saya menindaklanjuti umpan balik mengenai diri saya'),
(50, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'SLC', 'Saya senang apabila berhasil mengubah sudut pandang orang', 'Saya santai menyadari kelemahan pribadi'),
(51, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'COM', 'Saya senang menikmati hubungan yang sudah ada', 'Saya santai ketika berbicara di depan umum'),
(52, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'COL', 'Saya suka menganalisa kondisi emosi orang lain', 'Saya suka menyesuaikan diri dalam kelompok'),
(53, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'CTR', 'Saya tertantang mengorganisir sumber daya yang ada', 'Saya selalu menentukan tolok ukur pengawasan setiap pekerjaan'),
(54, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'PLA', 'Saya suka strategi pencapaian target jangka panjang', 'Saya suka mempertimbangkan beragam kendala ketika merencanakan'),
(55, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'CRE', 'Saya senang menyederhanakan beragam informasi', 'Saya suka pekerjaan yang memerlukan daya imajinasi'),
(56, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'ACH', 'Saya suka menganalisa sampai hal terkecil', 'Saya senang menyelesaikan dengan baik pekerjaan yang sulit'),
(57, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'SLC', 'Saya suka dengan kegiatan pengembangan diri', 'Saya senang untuk berintrospeksi'),
(58, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'COM', 'Saya berupaya untuk menyesuaikan diri dengan hal baru', 'Saya mudah dipancing untuk berbicara'),
(59, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'COL', 'Saya suka apabila orang lain mau menerima ide saya', 'Saya suka menjadi anggota kelompok'),
(60, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'CTR', 'Saya senang memanfaatkan jejaring interaksi', 'Saya suka mengevaluasi setiap hasil kerja'),
(61, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'PLA', 'Saya senang menyimak kondisi emosi orang lain', 'Saya suka menyusun langkah-langkah sebuah tindakan'),
(62, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'CRE', 'Saya tertarik untuk mengatur pekerjaan', 'Saya sering menemukan cara penyelesaian baru'),
(63, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'ANA', 'Saya suka analisa jangka panjang', 'Saya suka mendiskusikan hal yang detail'),
(64, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CON', 'ACH', 'Saya tertarik mencari kesamaan dari beragam isu', 'Saya berusaha keras untuk menjadi yang terbaik'),
(65, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'COM', 'Saya santai menerima masukan mengenai kelemahan diri saya', 'Saya santai ketika diminta menyampaikan pendapat'),
(66, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'COL', 'Saya selalu mencari kesempatan untuk mengembangkan diri', 'Saya senang bekerja dengan berbagai macam orang'),
(67, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'CTR', 'Saya santai dalam menghadapi perubahan', 'Saya selalu peka dengan penyimpangan yang ada dalam pekerjaan'),
(68, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'PLA', 'Saya santai dengan proses negosiasi', 'Saya suka merancang langkah apa yang harus dilakukan'),
(69, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'CRE', 'Saya suka memulai suatu hubungan baru', 'Saya suka mengembangkan pendekatan baru'),
(70, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'ANA', 'Saya suka memperhatikan pengaruh emosi pada kinerja', 'Saya menikmati hal-hal yang detail'),
(71, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'CON', 'Saya suka pekerjaan yang teratur dan tertata rapi', 'Saya suka hal-hal yang bersifat konseptual'),
(72, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'STR', 'ACH', 'Saya suka menganalisa hal-hal yang mempengaruhi masa depan', 'Saya senang dengan target yang menantang'),
(73, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'COL', 'Saya santai menerima kritik atas pendapat saya', 'Saya senang mendukung keputusan kelompok'),
(74, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'CTR', 'Saya santai dalam menanggapi umpan balik mengenai diri saya', 'Saya senang menganalisa penyimpangan kerja'),
(75, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'PLA', 'Saya selalu berupaya memperbaiki kekurangan diri sendiri', 'Saya tertarik dengan kegiatan perencanaan'),
(76, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'CRE', 'Saya berupaya luwes dalam menganalisa situasi yang selalu berubah', 'Saya menikmati proses kreatif'),
(77, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'ANA', 'Saya senang membuat orang lain bisa menerima ide saya', 'Saya senang mengeksplorasi hal yang detail'),
(78, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'CON', 'Saya mudah berteman dengan orang baru', 'Saya suka pekerjaan dengan penalaran konseptual'),
(79, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'STR', 'Saya mudah menangkap situasi emosi orang lain', 'Saya suka memproyeksikan keadaan sekarang'),
(80, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ORG', 'ACH', 'Saya suka suasana kerja yang tertib dan terkendali', 'Saya selalu berusaha melampaui target yang sudah ditentukan'),
(81, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'CTR', 'Saya senang membantu terciptanya kerja sama', 'Saya suka mengarahkan pekerjaan orang lain'),
(82, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'PLA', 'Saya santai saat mengkritik pendapat orang lain', 'Saya suka merancang jadwal dari suatu rencana kerja'),
(83, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'CRE', 'Saya santai dalam melihat sisi lain dari kelemahan diri', 'Saya suka hal-hal yang bervariasi'),
(84, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'ANA', 'Saya suka mencari referensi yang bisa dipakai untuk mengembangkan diri', 'Saya menganggap detailisasi itu penting'),
(85, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'CON', 'Saya berupaya menyesuaikan perilaku dengan tuntutan perubahan', 'Saya suka diskusi pada tataran konsep'),
(86, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'STR', 'Saya senang berupaya membuat orang lain setuju dengan pendapat saya', 'Saya suka mengantisipasi kendala yang akan muncul'),
(87, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'ORG', 'Saya senang mencari teman baru', 'Saya suka bekerja secara teratur sesuai dengan kebutuhan tugas'),
(88, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SOC', 'ACH', 'Saya tertarik untuk memperhatikan perasaan orang lain', 'Saya menyukai target yang menantang'),
(89, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'PLA', 'Saya suka mengawasi pekerjaan orang lain', 'Saya senang menentukan tujuan dan langkah sebelum bertindak'),
(90, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'CRE', 'Saya senang membangun iklim kerja sama', 'Saya suka hal-hal yang tidak rutin'),
(91, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'ANA', 'Saya selalu berbicara setiap diberi kesempatan', 'Saya suka mengamati hal yang detail'),
(92, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'CON', 'Saya berupaya tetap tenang dalam menghadapi tekanan emosi', 'Saya suka menyimpulkan sebuah proses diskusi'),
(93, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'STR', 'Saya suka diskusi tentang cara-cara pengembangan diri', 'Saya tertarik membuat simulasi jangka panjang'),
(94, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'ORG', 'Saya menikmati beragam perubahan yang terjadi', 'Saya suka pekerjaan yang rapi dan teratur'),
(95, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'SOC', 'Saya selalu berupaya menjual ide di setiap kesempatan', 'Saya suka bersosialisasi dengan siapa saja'),
(96, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'NET', 'ACH', 'Saya banyak menjalin hubungan persahabatan', 'Saya suka pencapaian target yang kompetitif '),
(97, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'CRE', 'Saya suka membuat jadwal dari setiap target yang ada', 'Saya suka ketidakmapanan'),
(98, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'ANA', 'Saya suka mengamati cara kerja orang lain', 'Saya senang menganalisa situasi secara terperinci'),
(99, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'CON', 'Saya siap bekerjasama dengan orang lain', 'Saya tertarik dengan wacana baru'),
(100, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'STR', 'Saya selalu siap ketika pendapat saya dikritik', 'Saya tertarik memikirkan kejadian di masa depan'),
(101, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'ORG', 'Saya selalu memikirkan latar belakang dari setiap tindakan saya', 'Saya suka meletakkan segala sesuatu pada tempatnya'),
(102, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'SOC', 'Saya serius berupaya memperbaiki kelemahan diri', 'Saya suka berinteraksi dengan siapapun'),
(103, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'NET', 'Saya santai merubah perilaku sesuai perubahan', 'Saya senang tetap berhubungan dengan teman lama'),
(104, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PER', 'ACH', 'Saya selalu mengemukakan gagasan saya di setiap kesempatan', 'Saya suka berada dalam situasi yang kompetitif'),
(105, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'ANA', 'Saya suka hal-hal yang imajinatif', 'Saya selalu memperhatikan hal-hal yang detail'),
(106, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'CON', 'Saya tertarik dengan kegiatan penjadwalan dari rencana kerja', 'Saya suka membandingkan teori dengan kenyataan'),
(107, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'STR', 'Saya suka memantau kesalahan pelaksanaan pekerjaan', 'Saya suka mempersiapkan rencana jangka panjang'),
(108, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'ORG', 'Saya suka berteman dalam suatu kelompok', 'Saya suka mengorganisir untuk kelancaran kerja'),
(109, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'SOC', 'Saya santai dengan obrolan basa-basi', 'Saya selalu merasa nyaman berada di lingkungan sosial apapun'),
(110, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'NET', 'Saya berupaya tetap tenang di saat-saat yang menegangkan', 'Saya senang membangun jejaring hubungan'),
(111, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'PER', 'Saya selalu berupaya mengatasi kekurangan diri', 'Saya selalu berupaya menjual ide saya ke orang lain'),
(112, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ADA', 'ACH', 'Saya santai menyesuaikan diri terhadap perubahan situasi', 'Saya ingin berusaha sebaik mungkin'),
(113, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'ANA', 'CON', 'Saya suka mendalami topik sampai rinci', 'Saya senang melihathubungan antar situasi'),
(114, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CRE', 'STR', 'Saya tertarik dengan metode-metode baru', 'Saya tertarik dengan kemungkinan jangka panjang'),
(115, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'PLA', 'ORG', 'Saya suka kegiatan perencanaan dan penjadwalan', 'Saya suka kerapian dan keteraturan'),
(116, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'CTR', 'SOC', 'Saya selalu memastikan tidak ada kendala dalam pekerjaan', 'Saya selalu menjaga perasaan orang lain'),
(117, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COL', 'NET', 'Saya senang bekerjasama dengan orang lain', 'Saya suka membina hubungan yang saling menguntungkan'),
(118, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'COM', 'PER', 'Saya suka bertukar pikiran dengan orang lain', 'Saya menikmati proses negosiasiketika menjual ide saya'),
(119, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLC', 'ADA', 'Saya berupaya tetap berpikir jernih ketika berada di bawah tekanan', 'Saya suka mencoba beragam hal yang baru'),
(120, 'b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 'SLD', 'ACH', 'Saya tertarik dengan kegiatan meningkatkan kemampuan diri', 'Saya berusaha keras untuk menjadi yang terbaik');
