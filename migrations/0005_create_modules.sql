-- Migration number: 0005 	 2025-02-12T05:12:19.676Z
CREATE TABLE modules (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [type] TEXT NOT NULL, -- gpq, gmate, gpq-gmate, interview, etc
    [title] TEXT NOT NULL,
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
('4c2e045a-fa57-449b-a11f-907a5423734d', 3, 'aime', 'AIME Default'),
('9ca64901-d111-4fac-999c-4eff1f3fe0b6', 0, 'case-analysis', 'Case Default'),
('350bf6b8-1a8b-47ff-8ed8-207973069fe9', 3, 'csi', 'CSI Default'),
('ab89b2cf-5e8e-45b7-a1f6-0f96a092d10a', 3, 'ggate', 'GGate Default'),
('d201052f-5e10-4ab6-9ac4-e405fd3b6db9', 3, 'gmate', 'GMate Default'),
('b1ddf643-4de2-4dc0-9f5c-303d59b5f150', 3, 'gpq', 'GPQ Default'),
('979b8d98-565e-440f-afce-e29e96407790', 3, 'gpq-gmate', 'GPQ & GMate Default'),
('84e2995d-2f91-40ed-b639-83b9e761b690', 3, 'gpro', 'GPro Default'),
('deaea4fe-ee06-4ccc-b633-16ba83953abc', 0, 'intray', 'Intray Default');