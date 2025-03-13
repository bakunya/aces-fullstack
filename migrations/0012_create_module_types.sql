-- Migration number: 0012 	 2025-03-12T05:01:28.423Z
CREATE TABLE module_types (
    [id] INTEGER PRIMARY KEY,
    [type] TEXT NOT NULL UNIQUE,
	[category] TEXT CHECK (category IN('SELF', 'CASE', 'FACE', 'DISC')) NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_modules_types_category ON module_types (category);

CREATE TRIGGER update_module_types AFTER UPDATE ON module_types
BEGIN
    UPDATE module_types SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO module_types (type, category) VALUES
('abstract', 'SELF'),
('aime', 'SELF'),
('csi', 'SELF'),
('ggate', 'SELF'),
('gmate', 'SELF'),
('gpq', 'SELF'),
('gpq-gmate', 'SELF'),
('gpro', 'SELF'),
('intray', 'SELF'),
('numerical', 'SELF'),
('verbal', 'SELF'),
('interview', 'FACE'),
('lgd', 'DISC'),
('case-analysis', 'CASE');