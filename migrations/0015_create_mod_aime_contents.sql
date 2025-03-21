-- Migration number: 0015 	 2025-03-12T06:07:56.561Z
CREATE TABLE mod_aime_contents (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [elm] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_aime_contents AFTER UPDATE ON mod_aime_contents
BEGIN
    UPDATE mod_aime_contents SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_aime_contents (seq, mod_uuid, elm, prompt) VALUES
(1, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya cukup terbuka tentang perasaan dan emosi saya.'),
(2, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Ketika sedang memikirkan sesuatu, saya memblokir perasaan saya.'),
(3, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya menjadi sedih ketika melihat ada orang diperlakukan tidak adil.'),
(4, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Bagi saya, kebohongan tidak bisa dimaafkan.'),
(5, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya jarang dipengaruhi oleh perasaan ketika sedang berpikir.'),
(6, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya bisa mengenali orang yang berlagak/sok percaya diri.'),
(7, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya selalu berkata jujur.'),
(8, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya tahu kenapa seseorang bisa menjadi marah.'),
(9, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya cenderung ragu dan penuh pertimbangan untuk berbagai hal.'),
(10, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya cenderung mengabaikan yang terjadi di sekitar saya.'),
(11, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya tahu mengapa emosi bisa berkembang dan berubah.'),
(12, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Dengan cepat saya bisa merubah suasana hati, sesuai dengan situasi/kondisi.'),
(13, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya biasanya dapat memprediksi ketika emosi akan berubah.'),
(14, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya terbuka terhadap perasaan tidak nyaman dari orang lain.'),
(15, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya bertindak mengandalkan perasaan saya sendiri.'),
(16, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya bisa mengenali orang yang ekspresi emosinya dibuat-buat.'),
(17, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya biasanya bisa mengetahui apa yang dirasakan orang lain.'),
(18, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya selalu mengakui kesalahan saya.'),
(19, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya mempertimbangkan perasaan saya ketika membuat keputusan.'),
(20, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya mencoba untuk menjadi positif dan ceria ketika menghadapi sebuah keputusan penting.'),
(21, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Saya bisa berubah pikiran, ketika mengetahui perasaan orang lain.'),
(22, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya mendengarkan percakapan orang lain.'),
(23, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Perasaan saya membantu saya fokus pada hal-hal yang memang penting.'),
(24, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya cenderung lebih mendengarkan suara hati daripada logika saya.'),
(25, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya sering merasa kewalahan oleh suasana hati yang terjadi.'),
(26, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya peduli dengan orang lain.'),
(27, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya bisa tahu apakah seseorang sedang bahagia.'),
(28, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya mampu merasakan apa yang orang lain rasakan.'),
(29, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya tahu ketika seseorang mengalami perasaan yang campur aduk.'),
(30, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya membaca situasi secara akurat.'),
(31, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya memahami apa penyebab rasa malu.'),
(32, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya bisa membaca isyarat non-verbal.'),
(33, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya terkadang harus berbohong.'),
(34, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya tidak begitu memperhatikan perasaan saya.'),
(35, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Pada umumnya saya tahu ketika seseorang sedang marah.'),
(36, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya bisa tahu apakah seseorang merasa jijik.'),
(37, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya benar-benar tidak tahu bagaimana emosi bekerja.'),
(38, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya menyadari apa yang membuat orang takut.'),
(39, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya tidak selalu tahu, ketika seseorang sedang sedih.'),
(40, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya biasanya menyadari apa yang saya rasakan.'),
(41, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya sulit menggambarkan perasaan saya.'),
(42, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya sering salah membaca perasaan orang.'),
(43, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya tidak memahami isyarat emosional.'),
(44, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Saya sering tidak mempertimbangkan perasaan saya ketika memecahkan masalah .'),
(45, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya mengikuti naluri saya ketika harus mengambil sebuah keputusan penting.'),
(46, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Saya bisa dengan tiba-tiba mengubah suasana hati saya bilamana diperlukan.'),
(47, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya memikirkan apa yang dikatakan oleh emosi saya.'),
(48, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Kondisi emosi orang lain bisa mempengaruhi saya.'),
(49, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya bisa melihat ketika orang lain terkejut.'),
(50, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya tetap tenang dan berpikir jernih dalam situasi yang sulit (krisis).'),
(51, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya menyadari perubahan suasana hati saya .'),
(52, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya memahami penyebab emosi saya.'),
(53, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya benar-benar tidak mengerti bagaimana cara emosi berubah.'),
(54, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Perubahan suasana hati, memberi saya pandangan berbeda tentang sebuah situasi.'),
(55, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya tahu ketika seseorang sedang terganggu.'),
(56, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Saya percaya emosi memberikan arah untuk hidup.'),
(57, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya jarang bisa mengenali reaksi emosi orang lain.'),
(58, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya menghindari berurusan dengan emosi yang membuat tidak nyaman.'),
(59, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya bisa tetap jernih dan fokus di bawah tekanan.'),
(60, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya kadang-kadang tidak memahami ekspresi dan gerak palsu.'),
(61, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya tahu bahwa emosi mengikuti sebuah pola tertentu.'),
(62, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya bisa tahu ketika seseorang ketakutan.'),
(63, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Saya membiarkan perasaan mengambil peran utama pada beragam keputusan saya.'),
(64, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya mampu menggambarkan apa yang saya rasakan dengan tepat.'),
(65, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya mengerti apa yang menyebabkan kecemasan.'),
(66, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya mampu membantu orang lain mengelola perasaan mereka.'),
(67, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya tahu ketika orang mengalami suasana hati yang saling bertentangan.'),
(68, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya sering mengekspresikan rasa sayang saya secara fisik.'),
(69, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Insting berperan paling besar ketika saya mengambil keputusan penting.'),
(70, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya tidak membiarkan emosi saya mempengaruhi pemikiran saya.'),
(71, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya biasanya tahu bagaimana emosi tertentu akan berkembang.'),
(72, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya tidak mudah terpengaruh oleh perasaan orang.'),
(73, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya mampu mengatasi beragam kegagalan dengan baik.'),
(74, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SYM', 'Saya bisa melihat ketika seseorang sedang kecewa.'),
(75, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya jarang memikirkan beragam alasan dibalik perasaan sesorang.'),
(76, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya secara emosional stabil.'),
(77, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Suasana hati yang berbeda membantu saya melihat masalah dari sudut yang berbeda.'),
(78, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya membuat keputusan setelah saya memiliki semua fakta.'),
(79, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya mencoba untuk memahami perasaan orang lain.'),
(80, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya tertarik pada bagaimana orang lain merasakan hal-hal tertentu.'),
(81, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Saya menganalisa perasaan saya untuk membantu memecahkan masalah.'),
(82, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya tidak selalu seperti apa yang dilihat oleh orang lain.'),
(83, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Saya cenderung lebih kreatif ketika saya merasa positif.'),
(84, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya sering menganalisis bagaimana perasaan saya.'),
(85, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya bisa membaca ekspresi wajah.'),
(86, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya tahu ketika seseorang sedang berusaha memanipulasi saya.'),
(87, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Saya bukanlah orang yang mudah berubah (naik turun) suasana hatinya.'),
(88, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Saya selalu berada dalam suasana hati yang sama.'),
(89, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya jarang menyadari reaksi emosi saya.'),
(90, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Saya jarang memanfaatkan kondisi suasana hati saya.'),
(91, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLC', 'Saya tidak memperlihatkan perasaan saya pada orang lain.'),
(92, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Perasaan saya memberitahu ketika ada sesuatu yang salah.'),
(93, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya cenderung memendam perasaan saya.'),
(94, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya bisa menyadari latar belakang dari perasaan orang.'),
(95, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya mendengarkan perasaan saya ketika membuat keputusan penting.'),
(96, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya mengerti bagaimana emosi dapat berkembang dari waktu ke waktu.'),
(97, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya lebih suka berurusan dengan data daripada dengan perasaan.'),
(98, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya tahu apa yang membuat orang bahagia.'),
(99, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Kadang saya mengubah suasana hati, untuk mendapatkan sudut pandang yang berbeda.'),
(100, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya tahu apa yang menyebabkan kegembiraan.'),
(101, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya memperhatikan bahasa tubuh orang.'),
(102, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya sering tidak sadar ketika seseorang berpura-pura atau menutupi sesuatu.'),
(103, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya mengalami beragam jenis dan bentuk emosi.'),
(104, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya cenderung untuk pamer jika mendapatkan kesempatan.'),
(105, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya mengikuti firasat dan perasaan saya.'),
(106, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya biasanya tahu ketika orang mencoba menyembunyikan perasaannya.'),
(107, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya suka memperhatikan orang.'),
(108, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya jarang betingkah laku secara berlebihan.'),
(109, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya bisa berbicara dengan lancar tentang perasaan saya.'),
(110, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya bisa tertipu orang lain.'),
(111, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya tidak pernah terpengaruh dengan perasaan saya.'),
(112, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya menceritakan emosi saya dengan keluarga dan teman.'),
(113, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya tidak ingin terlibat dalam masalah orang lain.'),
(114, '4c2e045a-fa57-449b-a11f-907a5423734d', 'DSC', 'Saya bisa tahu ketika seseorang tersenyum palsu.'),
(115, '4c2e045a-fa57-449b-a11f-907a5423734d', 'JUD', 'Saya tidak membiarkan perasaan saya mempengaruhi penalaran saya.'),
(116, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya sering mengabaikan perasaan saya.'),
(117, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Saya menggunakan perasaan untuk memahami beragam aspek dari sebuah situasi.'),
(118, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MON', 'Bilamana diperlukan, saya bisa membebaskan diri dari suasana hati saat itu .'),
(119, '4c2e045a-fa57-449b-a11f-907a5423734d', 'IMP', 'Saya terkadang memanfaatkan pujian dan sanjungan untuk bisa maju.'),
(120, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLA', 'Saya cenderung mengetahui emosi apa yang saya rasakan.'),
(121, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Saya sering tidak mempertimbangkan apa yang dipikirkan orang lain.'),
(122, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CAU', 'Saya bisa mengerti mengapa orang jadi agresif.'),
(123, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Analisis saya terhadap suatu masalah jarang dipengaruhi oleh perasaan saya.'),
(124, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya peka terhadap perasaan orang lain.'),
(125, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya memahami bagaimana perasaan mempengaruhi perilaku saya.'),
(126, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya tidak terlalu peduli tentang perasaan orang lain.'),
(127, '4c2e045a-fa57-449b-a11f-907a5423734d', 'TRA', 'Saya sering lupa bahwa suasana hati bisa berubah seiring perubahan situasi dan kondisi.'),
(128, '4c2e045a-fa57-449b-a11f-907a5423734d', 'MNO', 'Saya berempati dengan orang-orang yang sedang dihimpit masalah.'),
(129, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya biasanya merasa, ketika ada sesuatu yang salah.'),
(130, '4c2e045a-fa57-449b-a11f-907a5423734d', 'CPX', 'Saya sering tidak menyadari kondisi emosi orang lain.'),
(131, '4c2e045a-fa57-449b-a11f-907a5423734d', 'PSO', 'Saya mengijinkan perasaan saya mempengaruhi keputusan saya.'),
(132, '4c2e045a-fa57-449b-a11f-907a5423734d', 'THK', 'Saya jarang dikuasai oleh perasaan, ketika sedang memikirkan sesuatu.'),
(133, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SLE', 'Saya sering tidak bisa menemukan kata yang tepat untuk menggambarkan perasaan saya.'),
(134, '4c2e045a-fa57-449b-a11f-907a5423734d', 'AOO', 'Saya suka mengamati orang.'),
(135, '4c2e045a-fa57-449b-a11f-907a5423734d', 'SNS', 'Saya bukan orang yang moody, yang suasana hatinya sering berubah ubah.'),
(136, '4c2e045a-fa57-449b-a11f-907a5423734d', 'OPN', 'Saya tahu ketika seseorang berusaha menutup-nutupi sesuatu dari saya.');