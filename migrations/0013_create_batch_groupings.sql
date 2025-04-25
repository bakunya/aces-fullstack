-- Migration number: 0013 	 2025-04-22T04:23:00.720Z
DROP TABLE IF EXISTS batch_groupings; CREATE TABLE batch_groupings (
	[id] INTEGER PRIMARY KEY,
	[batch_uuid] TEXT NOT NULL,
	[group_uuid] INTEGER NOT NULL,
	[person_uuid] TEXT NOT NULL,
	[face_assessor_user_uuid] TEXT,
	[case_assessor_user_uuid] TEXT,
	[created] TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')),
	[updated] TEXT,
	UNIQUE (batch_uuid, person_uuid)
);

CREATE INDEX idx_batch_groupings_batch_uuid ON batch_groupings (batch_uuid);
CREATE INDEX idx_batch_groupings_group_uuid ON batch_groupings (group_uuid);
CREATE INDEX idx_batch_groupings_person_uuid ON batch_groupings (person_uuid);
CREATE INDEX idx_batch_groupings_face_assessor_uuid ON batch_groupings (face_assessor_user_uuid);
CREATE INDEX idx_batch_groupings_case_assessor_uuid ON batch_groupings (case_assessor_user_uuid);

CREATE TRIGGER update_batch_groupings AFTER UPDATE ON batch_groupings
BEGIN
	UPDATE batch_groupings SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;