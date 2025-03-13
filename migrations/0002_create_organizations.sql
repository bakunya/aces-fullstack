-- Migration number: 0002 	 2025-02-07T06:06:26.557Z
CREATE TABLE organizations (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [name] TEXT NOT NULL,
    [code] TEXT UNIQUE NOT NULL,
    [created] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	[updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))
);

CREATE INDEX idx_organizations_code ON organizations (code);

CREATE TRIGGER update_organizations AFTER UPDATE ON organizations
BEGIN
    UPDATE organizations SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO organizations (uuid, name, code) VALUES
('d1607ddc-06bd-4c71-bbbc-b0929c7173df', 'Organization 1', 'ORG1');