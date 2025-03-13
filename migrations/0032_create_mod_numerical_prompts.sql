-- Migration number: 0032 	 2025-03-12T06:12:54.147Z
CREATE TABLE mod_numerical_prompts (
    [id] INTEGER PRIMARY KEY,
    [figure_id] INTEGER NOT NULL,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    -- [figure] TEXT NOT NULL,
    [prompt] TEXT NOT NULL,
    [a] TEXT NOT NULL,
    [b] TEXT NOT NULL,
    [c] TEXT NOT NULL,
    [d] TEXT NOT NULL,
    [e] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_numerical_prompts AFTER UPDATE ON mod_numerical_prompts
BEGIN
    UPDATE mod_numerical_prompts SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_numerical_prompts (seq, mod_uuid, figure_id, prompt, a, b, c, d, e) VALUES
(1, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 1, 'Berapa nilai total dari produksi Mutu A dan C yang diproduksi selama tahun 2011?', 'Rp. 49.000.000,-', 'Rp. 54.000.000,-', 'Rp. 55.000.000,-', 'Rp. 79.000.000,-', 'bukan semuanya'),
(2, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 1, 'Jika produksi barang mutu B dari tahun 2014 ke tahun 2015 bertambah 26%; berapa nilai total produksi barang mutu B yang diproduksi selama tahun 2015?.', 'Rp. 11.340.000,-', 'Rp. 12.600.000,-', 'Rp. 15.120.000,-', 'Rp. 22.680.000,-', 'bukan semuanya'),
(3, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 1, 'Berapa perbandingan nilai total produksi barang mutu A terhadap mutu C pada tahun 2010?.', '0,83 : 1', '0,89 : 1', '0,94 : 1', '1,06 : 1', 'bukan semuanya'),
(4, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 1, 'Berapa nilai total produksi barang mutu C tahun 2012 dan barang mutu B tahun 2014?', 'Rp. 30.000.000,-', 'Rp. 31.000.000,-', 'Rp. 33.000.000,-', 'Rp. 39.000.000,-', 'bukan semuanya'),
(5, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 2, 'Berapa total jumlah peserta yang mendaftar di Universitas Endahnesa pada tahun 2013 dan 2014?', '35.040', '36.600', '46.560', '48.000', 'bukan semuanya'),
(6, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 2, 'Dari tahun 2013 ke tahun 2014, berapa persen perubahan jumlah peserta yang mendaftar di Universitas Adiwasesa? (hasil dibulatkan ke satuan)', 'turun 7%', 'naik 16%', 'naik 65%', 'naik 86%', 'bukan semuanya'),
(7, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 2, 'Berapa rasio jumlah peserta di Universitas Daksina yang mendaftar pada tahun 2014 dibandingkan dengan tahun 2013? (hasil dibulatkan ke satuan)', '1,08 : 1', '1 : 0,93', '1 : 1,16', '0,93 : 1', 'bukan semuanya'),
(8, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 2, 'Berapa perbedaan jumlah peserta yang mendaftar di Universitas Citrabangsa dari tahun 2013 ke tahun 2014?', 'lebih sedikit 1.800', 'lebih sedikit 8.640', 'lebih banyak 11.400', 'lebih banyak 14.160', 'bukan semuanya'),
(9, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 3, 'Untuk semua lokasi di Jakarta, berlaku potongan harga 25% (untuk Standar) dan 40% (untuk Premium); berapa total nilai sewa untuk 1 hari di 1 lokasi Premium: 10 m2 di Jakarta Barat dan 1 lokasi Standar: 10 m2 di Jakarta Pusat?', 'Rp. 853.500,-', 'Rp. 1.101.500,-', 'Rp. 1.095.500,-', 'Rp. 1.105.100,-', 'bukan semuanya'),
(10, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 3, 'Berapa banyak lokasi kantor tersebut di atas yang nilai total sewa per bulan untuk 1 lokasi: 10m2 kantor Standar dan 1 lokasi: 10 m2 kantor Premium, nilainya dibawah Rp. 27.000.000,- (dengan asumsi hari kerja 20 hari per bulan)?', '1', '2', '3', '5', 'bukan semuanya'),
(11, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 3, 'Berapa nilai total harga sewa per hari, kalau kebutuhannya adalah: 2.000 m2 kantor Standar di setiap lokasi di Indonesia, di luar biaya pengelolaan gedung?', 'Rp. 305.000.000,-', 'Rp. 365.000.000,-', 'Rp. 335.000.000,-', 'Rp. 395.000.000,-', 'bukan semuanya'),
(12, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 3, 'Jika biaya servis harian sebesar Rp. 50.000,-/hari diberlakukan untuk kantor Standar di lokasi Jakarta Barat; berapa rata-rata persentase kenaikan harga Standar per bulan, untuk kedua lokasi di Jakarta, dengan asumsi 20 hari kerja per bulan (hasil dibulatkan ke satuan)?', '2%', '3%', '4%', '5%', 'bukan semuanya'),
(13, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 4, 'Kota manakah yang yang jumlah rata-rata manajer prianya paling rendah untuk setiap tokonya?', 'Medan', 'Balikpapan', 'Makasar', 'Ambon', 'bukan semuanya'),
(14, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 4, 'Jika unit yang dikirim ke Balikpapan, Makasar, dan Ambon menurun 7%, 5%, dan 12%; menjadi berapa jumlah total unit yang tidak dikirim untuk keseluruhan 5 kota?', '14.098', '13.301', '13.302', '13.303', 'bukan semuanya'),
(15, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 4, 'Berapa jumlah pegawai yang dikurangi di Medan dan Jakarta?', '400', '410', '420', '430', 'bukan semuanya'),
(16, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 4, 'Jika sisa unit yang ada di lokasi Jakarta, termasuk yang belum dikirim, semuanya terjual dengan harga resmi; akan mendapat tambahan berapa nilai penjualan semua toko yang ada di Jakarta?', '157.600.000', '167.600.000', '427.950.000', '443.450.000', 'bukan semuanya'),
(17, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 5, 'Berapa harga total untuk 2 tiket pulang pergi (P/P), dengan memakai BIS PATAS yang paling cepat waktu tempuhnya dan juga menyediakan makan pagi?', 'Rp. 420.000,-', 'Rp. 540.000,-', 'Rp. 440.000,-', 'Rp. 340.000,-', 'bukan semuanya'),
(18, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 5, 'Dari Jogja, Anda harus bertemu dengan klien di kantornya di Semarang pada jam 13:00. Anda berencana naik taksi dari setasiun Kereta Api ataupun Bus Patas di Semarang, menuju kantornya yang kurang lebih akan memakan waktu 25 s/d 35 menit. Tiket termurah apa yang harus anda beli dari Jogja, kalau anda harus berangkat dari Jogja antara jam 09:00 – 09:30?', 'Kereta Api Jam 09:20', 'Kereta Api Jam 09:00', 'Bis Patas Jam 09:30', 'Bis Patas Jam 09:10', 'bukan semuanya'),
(19, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 5, 'Berapa perbedaan kecepatan rata antara kereta api yang berangkat jam 07:50 dan yang berangkat jam 10:30, dengan asumsi jarak tempuh Jogja – Semarang: 125 kilometer?', '3 km/jam', '5 km/jam', '4 km/jam', '6 km/jam', 'bukan semuanya'),
(20, '16863206-1cc6-4d7a-8313-f769b8d5b0ea', 5, 'Kalau Anda harus bepergian dari Jogja ke Semarang secepat mungkin, dan harus memanfaatkan koneksi WiFi selama di perjalananan, serta harus sampai Semarang sebelum jam 13:00, berapa harga tiket 1 xjalan yang harus anda bayar?', 'Rp. 130.000,-', 'Rp. 100.000,-', 'Rp. 110.000,- ', 'Rp. 119.000,-', 'bukan semuanya');
