-- Migration number: 0031 	 2025-03-12T06:12:41.247Z
CREATE TABLE mod_numerical_content (
    [id] INTEGER PRIMARY KEY,
    [seq] INTEGER NOT NULL,
    [mod_uuid] TEXT NOT NULL,
    [content] TEXT NOT NULL,
	[url] TEXT NOT NULL DEFAULT '',
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT,
    UNIQUE (seq, mod_uuid)
);

CREATE TRIGGER update_mod_numerical_content AFTER UPDATE ON mod_numerical_content
BEGIN
    UPDATE mod_numerical_content SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;

INSERT INTO mod_numerical_content (id, mod_uuid, seq, content) VALUES
    (1, 'agm3tGJGjLH9YoH9XTxUAD', 1, ''),
    (2, 'agm3tGJGjLH9YoH9XTxUAD', 2, ''),
    (3, 'agm3tGJGjLH9YoH9XTxUAD', 3, ''),
    (4, 'agm3tGJGjLH9YoH9XTxUAD', 4, ''),
    (5, 'agm3tGJGjLH9YoH9XTxUAD', 5, '');