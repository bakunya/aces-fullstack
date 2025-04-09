-- Migration number: 0038 	 2025-03-25T05:08:17.240Z
CREATE TABLE mod_intray_constant (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `page` INTEGER NOT NULL,
  `code` TEXT NOT NULL,
  `domain` TEXT NOT NULL,
  `element` TEXT NOT NULL,
  `created` TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
  `updated` TEXT
);

CREATE TRIGGER update_mod_intray_constant AFTER UPDATE ON mod_intray_constant
BEGIN
    UPDATE mod_intray_constant SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO mod_intray_constant (id, page, code, domain, element) VALUES
    (1, 1, 'ANA:ITEM', 'Analyzing', 'Item Listing'),
    (2, 1, 'ANA:ISSUE', 'Analyzing', 'Issue Listing'),
    (3, 1, 'ANA:ORIGINAL', 'Analyzing', 'Original Listing'),
    (4, 1, 'ANA:DOMAIN', 'Analyzing', 'Domain'),
    (5, 2, 'ORG:GOAT', 'Organizing', 'GOAT Level'),
    (6, 2, 'ORG:PRIORITIZE', 'Organizing', 'Prioritize Level'),
    (7, 3, 'DCD:PERTIMBANGAN', 'Deciding', 'Pertimbangan'),
    (8, 3, 'DCD:ALASAN', 'Deciding', 'Alasan'),
    (9, 3, 'DCD:PROKONTRA', 'Deciding', 'Pro-Kontra'),
    (10, 4, 'FOR:ORIGINALITY', 'Forecasting', 'Originality (I/O)'),
    (11, 4, 'FOR:DOMAIN', 'Forecasting', 'Domain'),
    (12, 4, 'FOR:LINEARITY', 'Forecasting', 'Linearity (L/N)'),
    (13, 5, 'STP:DOMAIN', 'Strategic Planning', 'Domain'),
    (14, 5, 'STP:SWOT', 'Strategic Planning', 'SWOT'),
    (15, 5, 'STP:PLANNING', 'Strategic Planning', 'Planning');