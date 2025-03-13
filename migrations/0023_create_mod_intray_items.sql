-- Migration number: 0023 	 2025-03-12T06:10:20.139Z
CREATE TABLE mod_intray_items (
    [id] INTEGER PRIMARY KEY,
    [mod_uuid] TEXT NOT NULL,
    [title] TEXT,
    [asset_id] TEXT, -- cloudinary_asset_id
    [public_id] TEXT, -- cloudinary_public_id
    [signature] TEXT, -- cloudinary_signature
    [resource_type] TEXT, -- cloudinary_resource_type
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_mod_intray_items AFTER UPDATE ON mod_intray_items
BEGIN
    UPDATE mod_intray_items SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;