-- Migration number: 0024 	 2025-03-12T06:10:33.957Z
CREATE TABLE mod_intray_page (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `seq` INTEGER NOT NULL CHECK (seq >= 0 AND seq < 6),
  `mod_uuid` TEXT NOT NULL,
  `minutes` INTEGER DEFAULT 20,
  `title` TEXT NOT NULL DEFAULT '',
  `body` TEXT NOT NULL DEFAULT '',
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT,
  UNIQUE (mod_uuid, seq)
);

CREATE TRIGGER update_mod_intray_page AFTER UPDATE ON mod_intray_page
BEGIN
    UPDATE mod_intray_page SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_intray_page (id,mod_uuid,seq,minutes) VALUES
  (1, 'oUxJMANwEzQDg2b7SF71EV', 0, 20), -- pengantar
  (2, 'oUxJMANwEzQDg2b7SF71EV', 1, 25), -- page 1
  (3, 'oUxJMANwEzQDg2b7SF71EV', 2, 15), -- page 2
  (4, 'oUxJMANwEzQDg2b7SF71EV', 3, 20), -- page 3
  (5, 'oUxJMANwEzQDg2b7SF71EV', 4, 25), -- page 4
  (6, 'oUxJMANwEzQDg2b7SF71EV', 5, 30); -- page 5


UPDATE mod_intray_page SET body = '<p>Saat ini Anda bekerja di PT Mega Mitra Oetama Distributor (MMO), sebuah perusahaan yang menyalurkan sejumlah produk konsumen dari sejumlah perusahaan. MMO memiliki jaringan distribusi yang dapat menjangkau 65 % wilayah negara Indonusa. Keunggulan ini membuat beberapa principal baru menaruh minat untuk memanfaatkan jasa MMO dalam mendistribusikan produknya. Dalam perkembangannya, MMO mulai mengembangkan Produk yang dibuat sendiri; berupa produk makanan kesehatan yang didasarkan pada hasil riset kerja sama dengan sebuah perusahaan yang berpusat di negara Amerika.</p>
<p>Dari usahanya ini, MMO memiliki total revenue mencapai lebih dari 3 Trilyun Rupiah di tahun 200Y-1, dengan margin 11 %. Ini merupakan suatu prestasi mengingat revenue ini naik sekitar 30% dibandingkan tahun sebelumnya. Memperhatikan perkembangan bisnis yang ada, MMO menetapkan strategi bisnis yaitu memperkuat jalur distribusi yang sudah ada sesuai dengan Visi menjadi Distributor produk konsumen yang unggul dalam layanan.</p>
<p>Dalam upaya mencapai visi menjadi Distributor produk konsumen terkemuka yang unggul dalam layanan, MMO telah melaksanakan sejumlah inisiatif bisnis dan telah menetapkan sejumlah rencana strategis antara lain:</p>
<ul>
<li>Mencanangkan diri sebagai sebuah ”learning organization” dan bertahan dengan jumlah principal terbatas.</li>
<li>Membangun sistem dan jaringan distribusi yang terintegrasi dengan didukung infrastruktur IT mutakhir.</li>
<li>Membangun jalur-jalur distribusi baru, diantaranya pola direct selling dan membangun grosir, di luar jalur distribusi yang sudah ada.</li>
</ul>
<p>Untuk menjalankan rencana strategis tersebut Management MMO akan melaksanakan sebuah project, dengan nama MMO-1 (MMO Number One). Atas segala pertimbangan, Manajemen MMO telah menunjuk Anda sebagai team leader Project MMO-1 yang bertanggung jawab untuk merencanakan dan mengkoordinir sejumlah kegiatan yang akan dilaksanakan pada Project MMO-1.</p>
<h4>Mempelajari berkas-berkas Intray</h4>
<p>Tugas pertama yang harus Anda selesaikan adalah mempelajari berkas-berkas yang tersedia supaya dapat memberikan rekomendasi mengenai kegiatan apa yang perlu dilakukan, termasuk tenggang waktu, target, serta prakiraan anggarannya.</p>
<p>Setiap berkas diwakili oleh tombol dengan nomor yang terdapat di bagian atas halaman. Anda harus mengklik tombol tersebut untuk menampilan berkas sesuai dengan nomornya. Selama waktu mengerjakan tugas Anda tetap dapat melihat berkas-berkas tersebut.</p>
<h4>Mengerjakan tugas-tugas Intray</h4>
<p>Tes Intray ini terbagi ke dalam lima bagian, setiap bagiannya memiliki tenggat waktu yang berbeda untuk menyelesaikannya. Kurang lebih 10 menit dari sekarang, tombol di bawah ini akan aktif, dan Anda dapat mengklik untuk mulai mengerjakan tugas bagian pertama.</p>' WHERE seq = 0;
UPDATE mod_intray_page SET body = '<p>Anda diharapkan sudah membaca dan mempelajari seluruh berkas yang disedikan. Dari seluruh berkas tersebut Anda kemudian dapat menentukan isu atau topik apa saja yang menurut Anda perlu mendapat perhatian. Manajemen berharap Anda dapat mengidentifikasi setidaknya lima topik pilihan (boleh lebih).</p>
<p>Untuk setiap topik/isu Anda harus dapat menunjukkan referensi berkasnya. Satu topik dapat memiliki lebih dari satu referensi berkas. Misalnya: Topik A dapat dirujuk ke Berkas 1, Berkas 4, dan Berkas 7, dan seterusnya. Demikian juga sebaliknya, satu berkas dapat menjadi rujukan lebih dari satu topik.</p>
<p>Selain itu, Anda juga harus menuliskan alasan atau analisis mengapa topik-topik yang Anda temukan dan pilih tersebut layak untuk mendapat perhatian.</p>
<h4>Cara mengerjakan</h4>
<ul>
<li>Tuliskan nama topik, referensi (nomor berkas), dan alasan di masing-masing kolom.</li>
<li>Bila ada lebih dari satu referensi, tuliskan setiap nomornya dengan pemisah tanda koma (mis: 2, 5, 7, 10)</li>
<li>Untuk memastikan hubungan antara topik dan referensi, Anda dapat melihat ulang setiap berkas dengan memilih nomor berkas di bagian atas halaman</li>
<li>Tekan tombol SAVE untuk menyimpan data topik sebelum dapat menambahkan topik berikutnya</li>
<li>Setelah pengisian ketiga, Anda dapat menambah isian lagi atau melanjutkan ke tugas berikutnya</li>
</ul>' WHERE seq = 1;
UPDATE mod_intray_page SET body = '<p>Dalam bagian ini Anda diminta untuk membuat prioritas terhadap hasil identifikasi yang telah Anda lakukan pada tahap sebelumnya.</p>' WHERE seq = 2;
UPDATE mod_intray_page SET body = '<p>Dalam tahapan ini Anda diminta untuk menganalisa sejumlah permasalahan tertentu yang harus diselesaikan dengan tetap mengacu pada informasi yang terdapat pada Lembar Persoalan.</p>
<p>Permasalahan yang perlu dianalisis telah tertulis di bagian atas dari lembar kerja. Anda diminta untuk melakukan hal-hal sebagai berikut: </p>
<ul>
<li>Menyusun analisis mengenai keuntungan dan kerugian, atau Pro dan Kontra dari setiap saran solusi pemecahan masalah yang tersedia.</li>
<li>Menentukan saran solusi masalah yang diambil berdasarkan analisis yang telah Anda susun.</li>
<li>Jangan lupa berikan alasan yang mendasari penentuan saran solusi yang Anda pilih tersebut, dibandingkan dengan saran solusi lainnya.</li>
</ul>
<p>Waktu yang disedikan untuk menyelesaikan ketiga hal terebut adalah 15 menit. Klik tombol di bawah untuk memulai.</p>' WHERE seq = 3;
UPDATE mod_intray_page SET body = '<p>Dalam tahapan ini Anda diminta untuk membuat prediksi (forecast) terhadap sejumlah permasalahan yang diambil dari Lembar Persoalan. Gunakanlah semua informasi yang telah tersedia dalam Lembar Persoalan yang menurut anda bermanfaat.</p>
<p>Setiap permasalahan telah tertulis di bagian atas dari Lembar Kerja. Anda dapat melakukan perubahan urutan sesuai dengan prioritas Anda, namun perlu diketahui bahwa setiap permasalahan memiliki bobot yang sama.</p>
<p>Untuk setiap permasalahan Anda diminta untuk melakukan hal-hal sebagai berikut:</p>
<ul>
<li>Anda diminta untuk menentukan isu-isu apa saja yang menjadi permasalahan disertai faktor-faktor penyebab munculnya isu tersebut.</li>
<li>Menyusun perkiraan (prediksi) mengenai kondisi yang akan terjadi terkait isu-isu tersebut dalam waktu 1-3 tahun mendatang. Untuk setiap kondisi, Anda perlu menyertakan pula faktor-faktor penyebabnya.</li>
</ul>' WHERE seq = 4;
UPDATE mod_intray_page SET body = '<p>Sebagai TEAM LEADER Project MMO-1, Anda diminta menyusun rencana kerja strategis yang akan anda lakukan untuk mencapai target Project MMO-1 dengan memanfaatkan seluruh informasi yang terdapat di dalam Lembar Persoalan sebagai sumber informasi Anda.</p>
<p>Sampaikanlah Rencana kerja Anda secara detail dan jelas. Anda diperkenankan untuk menggambarkannya dalam bentuk deskripsi, skema, grafik atau bentuk tulisan lainnya.</p>
<p>Dalam tahapan ini, Anda diminta untuk melakukan hal-hal sebagai berikut:</p>
<ul>
<li>Menyusun rencana kerja strategis yang akan Anda ambil guna mencapai target dari Project MMO-1. Sampaikan secara rinci, sistematik dan jelas termasuk menentukan Tujuan, Sasaran dan Program Kerja yang dibutuhkan untuk mencapai sasaran kerja tersebut yang disertai dengan siapa saja yang perlu dilibatkan.</li>
<li>Menuliskan alasan-alasan yang mendasari pemilihan rencana kerja tersebut. Sampaikanlah alasan tersebut dalam bentuk analisa mengenai situasi internal PT MMO, bisnis makro maupun mikro industri distribusi, serta situasi eksternal lainnya yang relevan dengan rencana kerja yang anda susun. (Format, bentuk dan pendekatan apa yang akan Anda gunakan sangat tergantung dengan kebiasaan dan pemahaman Anda)</li>
</ul>
<p>Waktu yang disedikan untuk menyelesaikan ketiga hal terebut adalah 15 menit. Klik tombol di bawah untuk memulai.</p>' WHERE seq = 5;