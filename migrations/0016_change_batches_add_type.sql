-- Migration number: 0016 	 2025-05-05T03:35:06.159Z
ALTER TABLE batches
ADD COLUMN type TEXT CHECK (type IN ('ascent', 'custom')) NOT NULL DEFAULT 'ascent';