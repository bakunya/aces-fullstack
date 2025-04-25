-- Migration number: 0004 	 2025-02-07T06:14:19.643Z
CREATE TABLE persons (
    [uuid] TEXT PRIMARY KEY, -- uuid
    [batch_uuid] TEXT NOT NULL, -- batches(id)
	[batch_group_id] INTEGER, -- batch_groups(id)
	[organization_uuid] TEXT NOT NULL, -- organizations(id)
    [name] TEXT NOT NULL,
    [email] TEXT NOT NULL,
    [username] TEXT NOT NULL DEFAULT '',
    [hash] TEXT NOT NULL,
    -- other person fields
	[gender] TEXT CHECK (gender IN('perempuan', 'laki-laki')),
	[nip] TEXT,
    --
    [created] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	[updated] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	-- UNIQUE (batch_uuid, username, email)
	UNIQUE (batch_uuid, username),
    UNIQUE (batch_uuid, email),
    UNIQUE (batch_uuid, nip)
);

CREATE INDEX idx_persons_batch_uuid ON persons (batch_uuid);
CREATE INDEX idx_persons_organization_uuid ON persons (organization_uuid);
CREATE INDEX idx_persons_nip ON persons (nip);
CREATE INDEX idx_persons_email ON persons (email);
CREATE INDEX idx_persons_username ON persons (username);

CREATE TRIGGER update_persons AFTER UPDATE ON persons
BEGIN
    UPDATE persons SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO persons (uuid, batch_uuid, organization_uuid, name, email, username, hash) VALUES
('f31966e6-75c8-46a5-8199-e6c0e1b11707', 'd4acbe9d-28c8-4b25-9f29-6a53f4cbceda1', 'd1607ddc-06bd-4c71-bbbc-b0929c7173df', 'Imakara', 'imakara@aces.com', 'imakara', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS');
