-- Migration number: 0005 	 2025-02-12T05:12:19.676Z
CREATE TABLE modules (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [type] TEXT NOT NULL, -- gpq, gmate, gpq-gmate, interview, etc
    [title] TEXT NOT NULL,
    [description] TEXT,
    -- status 0 developing
    -- status 1 reviewing, partial approval
    -- status 3 active/released
    -- status -1 disabled/archived
    [status] INTEGER NOT NULL DEFAULT 0,
    [created] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
    [updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))
);

CREATE INDEX idx_modules_type ON modules (type);

CREATE TRIGGER update_modules AFTER UPDATE ON modules
BEGIN
    UPDATE modules SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO modules (uuid, status, type, title) VALUES
('ab89b2cf-5e8e-45b7-a1f6-0f96a092d10a', 3, 'ggate', 'GGate Default'),
('979b8d98-565e-440f-afce-e29e96407790', 3, 'gpq-gmate', 'GPQ & GMate Default'),
('oUxJMANwEzQDg2b7SF71EV', 0, 'intray', 'Intray Default'),
('kXYbZ4CWC15SNj2A52Jo2r', 0, 'case-analysis', 'LUXESTAY Inc.'),
('kXYbZ4CWC15SNj2A52Jo2b', 0, 'interview', 'Interview Mockup 1.'),
('kXYbZ4CWC15SNj2A52Jo2c', 0, 'interview', 'Interview Mockup 2.'),
('kXYbZ4CWC15SNj2A52Jo2d', 0, 'lgd', 'LGD Mockup 2.'),
('kXYbZ4CWC15SNj2A52Jo2e', 0, 'lgd', 'LGD Mockup 2.'),
('bsAhnSgXBpEBxnbkkqnkuL', 0, 'gpro', 'GPro Default'),
('q4yGxmhn2JebYQY7U8rUXt', 0, 'gpq', 'GPQ Default'),
('bcnecqL6zF4PgUxfNWHn1a', 0, 'gmate', 'GMate Default'),
('1pWz3DRkhtN38fdWatach8', 0, 'abstract', 'Abstract'),
('uoNUHeFRxiQ5cEajH8oYyf', 0, 'verbal', 'Verbal (DEFAULT)'),
('agm3tGJGjLH9YoH9XTxUAD', 0, 'numerical', 'Numerical (DEFAULT)'),
('9LXiqv2vxZpc3JHrwzoC3h', 0, 'csi', 'CSI Default'),
('mRrDunGQnbQ19E5tMvA7cq', 0, 'aime', 'Aime (DEFAULT)');