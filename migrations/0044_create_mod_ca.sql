-- Migration number: 0044 	 2025-03-25T05:34:28.595Z
CREATE TABLE mod_ca (
    [mod_uuid] TEXT PRIMARY KEY, -- reference to modules table
    [maxtime] INTEGER,
    [content] TEXT,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER updated_ca AFTER UPDATE ON mod_ca
    BEGIN UPDATE mod_ca SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE mod_uuid=NEW.mod_uuid;
END;

INSERT INTO mod_ca (mod_uuid, content) VALUES ('kXYbZ4CWC15SNj2A52Jo2r', 'LuxeStay adalah sebuah jaringan hotel mewah yang beroperasi di beberapa kota besar dan destinasi wisata populer. Dibangun pada tahun 2000, perusahaan ini telah tumbuh menjadi salah satu merek hotel paling diakui di industri perhotelan. Produk dan layanannya terdiri dari: menawarkan berbagai jenis kamar mulai dari standar, deluxe, hingga suite; setiap hotel dilengkapi dengan setidaknya satu restoran fine dining dan sebuah bar; gym, kolam renang, dan spa tersedia di hampir semua lokasi; fasilitas untuk rapat bisnis, pesta pernikahan, dan acara-acara lain. Target pasar adalah wisatawan bisnis yang membutuhkan akomodasi jangka pendek maupun panjang, pasangan yang mencari pengalaman romantis atau bulan madu, ataupun keluarga yang ingin fasilitas lengkap dan layanan yang ramah anak. Pendapatan tahunan sekitar $500 juta dengan rata-rata tingkat hunian kamar adalah 80%; memiliki lebih dari 2.000 karyawan, termasuk staff front office, housekeeping, restoran, dan manajemen. Anda adalah Manajer Senior di LuxeStay, yang bertanggung jawab atas operasional, manajemen tim, serta profit & loss di beberapa cabang dan bertanggung jawab langsung kepada Direktur Operasional. LuxeStay yang selama ini dikenal dengan reputasinya yang baik, saat ini sedang menghadapi beberapa masalah serius; dan berikut ini adalah kesimpulan utama dari hasil rapat terakhir, dewan direksi LuxeStay Inc.: dalam tiga bulan terakhir, omzet menurun sekitar 15% dibandingkan dengan kuartal yang sama tahun lalu; adanya peningkatan keluhan pelanggan terkait kebersihan dan layanan; tingkat pergantian staf mencapai 20%, dan banyak dari staff yang baru kurang terlatih; sebuah jaringan hotel baru dengan fasilitas modern baru saja dibuka, menawarkan tarif lebih rendah dan telah menarik minat pelanggan potensial; perlunya mulai membahas topik ekspansi internasional dan implementasi energi terbarukan.');