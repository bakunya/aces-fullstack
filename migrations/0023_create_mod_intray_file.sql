-- Migration number: 0023 	 2025-03-12T06:10:20.139Z
CREATE TABLE mod_intray_file (
  -- Sesuaikan dengan R2
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `mod_uuid` TEXT NOT NULL,
  `title` TEXT,
  `url` TEXT,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT
);

CREATE TRIGGER update_mod_intray_file AFTER UPDATE ON mod_intray_file
BEGIN
    UPDATE mod_intray_file SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_intray_file (id, mod_uuid, title, url) VALUES
  (1, 'oUxJMANwEzQDg2b7SF71EV', 'Laki-laki', '/static/intray/samples/item-1.jpeg'),
  (2, 'oUxJMANwEzQDg2b7SF71EV', 'Kedelai Belanda', '/static/intray/samples/item-2.jpeg'),
  (3, 'oUxJMANwEzQDg2b7SF71EV', 'Siberia Tenggara', '/static/intray/samples/item-3.jpeg'),
  (4, 'oUxJMANwEzQDg2b7SF71EV', 'Persilangan Samudra Baru', '/static/intray/samples/item-4.jpeg'),
  (5, 'oUxJMANwEzQDg2b7SF71EV', 'Kedung Gudel', '/static/intray/samples/item-5.jpeg'),
  (6, 'oUxJMANwEzQDg2b7SF71EV', 'Almari dari Kaca', '/static/intray/samples/item-6.jpeg'),
  (7, 'oUxJMANwEzQDg2b7SF71EV', 'Menganyam Rumput Laut', '/static/intray/samples/item-7.jpeg'),
  (8, 'oUxJMANwEzQDg2b7SF71EV', 'Kijang Innova Hybrid', '/static/intray/samples/item-8.jpeg'),
  (9, 'oUxJMANwEzQDg2b7SF71EV', 'Logam Mulia Bersejarah', '/static/intray/samples/item-9.jpeg'),
  (10, 'oUxJMANwEzQDg2b7SF71EV', 'Karang Pramuka', '/static/intray/samples/item-10.jpeg'),
  (11, 'oUxJMANwEzQDg2b7SF71EV', 'Ludruk Mumpuni', '/static/intray/samples/item-11.jpeg'),
  (12, 'oUxJMANwEzQDg2b7SF71EV', 'Hidram Elektrik', '/static/intray/samples/item-12.jpeg'),
  (13, 'oUxJMANwEzQDg2b7SF71EV', 'Kalender Cina', '/static/intray/samples/item-13.jpeg'),
  (14, 'oUxJMANwEzQDg2b7SF71EV', 'MacBook Pro 2025', '/static/intray/samples/item-14.jpeg'),
  (15, 'oUxJMANwEzQDg2b7SF71EV', 'Hikayat Mercubuana', '/static/intray/samples/item-15.jpeg');