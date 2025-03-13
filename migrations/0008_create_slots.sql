-- Migration number: 0008 	 2025-02-12T06:17:04.298Z
DROP TABLE IF EXISTS slots; CREATE TABLE slots (
	[id] INTEGER PRIMARY KEY,
	[modules] INTEGER CHECK(modules IN(1,2,3,4)) NOT NULL,
	[mode] TEXT NOT NULL,
	[slot1] TEXT CHECK (slot1 IN('SELF', 'CASE', 'FACE', 'DISC')),
	[slot2] TEXT CHECK (slot2 IN('SELF', 'CASE', 'FACE', 'DISC')),
	[slot3] TEXT CHECK (slot3 IN('SELF', 'CASE', 'FACE', 'DISC')),
	[slot4] TEXT CHECK (slot4 IN('SELF', 'CASE', 'FACE', 'DISC')),
	[self_position] INTEGER DEFAULT 0,
	[case_position] INTEGER DEFAULT 0,
	[face_position] INTEGER DEFAULT 0,
	[disc_position] INTEGER DEFAULT 0
);

INSERT INTO slots (modules, mode, slot1, slot2, slot3, slot4) VALUES
	(4, 'ALL_TYPES', 'FACE', 'SELF', 'CASE', 'DISC'),
	(4, 'ALL_TYPES', 'SELF', 'CASE', 'DISC', 'FACE'),
	(4, 'ALL_TYPES', 'CASE', 'DISC', 'FACE', 'SELF'),
	(4, 'ALL_TYPES', 'DISC', 'FACE', 'SELF', 'CASE');
INSERT INTO slots (modules, mode, slot1, slot2, slot3, slot4) VALUES
	-- 3-no-selftest
	(3, 'NO_SELF', 'FACE', 'CASE', 'DISC', null),
	(3, 'NO_SELF', 'CASE', 'DISC', 'FACE', null),
	(3, 'NO_SELF', 'DISC', 'FACE', 'CASE', null),
	-- 3-no-group
	(3, 'NO_DISC', 'FACE', 'SELF', 'CASE', null),
	(3, 'NO_DISC', 'SELF', 'CASE', 'FACE', null),
	(3, 'NO_DISC', 'CASE', 'FACE', 'SELF', null),
	-- 3-no-case_analysis
	(3, 'NO_CASE', 'FACE', 'SELF', 'DISC', null),
	(3, 'NO_CASE', 'SELF', 'DISC', 'FACE', null),
	(3, 'NO_CASE', 'DISC', 'FACE', 'SELF', null),
	-- 3-no-single_assisted
	(3, 'NO_FACE', 'SELF', 'CASE', 'DISC', null),
	(3, 'NO_FACE', 'CASE', 'DISC', 'SELF', null),
	(3, 'NO_FACE', 'DISC', 'SELF', 'CASE', null);
INSERT INTO slots (modules, mode, slot1, slot2, slot3, slot4) VALUES
	-- Tanpa asesor
	(2, 'SELF_CASE', 'SELF', 'CASE', null, null),
	(2, 'SELF_CASE', null, null, 'SELF', 'CASE'),
	--
	(2, 'SELF_DISC', 'SELF', 'DISC', null, null),
	(2, 'SELF_DISC', 'DISC', 'SELF', null, null),
	(2, 'SELF_DISC', null, null, 'SELF', 'DISC'),
	(2, 'SELF_DISC', null, null, 'DISC', 'SELF'),
	--
	(2, 'SELF_FACE', 'SELF', 'FACE', null, null),
	(2, 'SELF_FACE', 'FACE', 'SELF', null, null),
	(2, 'SELF_FACE', null, null, 'SELF', 'FACE'),
	(2, 'SELF_FACE', null, null, 'FACE', 'SELF'),
	--
	(2, 'CASE_DISC', 'CASE', 'DISC', null, null),
	(2, 'CASE_DISC', 'DISC', 'CASE', null, null),
	(2, 'CASE_DISC', null, null, 'CASE', 'DISC'),
	(2, 'CASE_DISC', null, null, 'DISC', 'CASE'),
	--
	(2, 'CASE_FACE', 'CASE', 'FACE', null, null),
	(2, 'CASE_FACE', 'FACE', 'CASE', null, null),
	(2, 'CASE_FACE', null, null, 'CASE', 'FACE'),
	(2, 'CASE_FACE', null, null, 'FACE', 'CASE'),
	--
	(2, 'DISC_FACE', 'DISC', 'FACE', null, null),
	(2, 'DISC_FACE', 'FACE', 'DISC', null, null),
	(2, 'DISC_FACE', null, null, 'DISC', 'FACE'),
	(2, 'DISC_FACE', null, null, 'FACE', 'DISC');
INSERT INTO slots (modules, mode, slot1, slot2, slot3, slot4) VALUES
	(1, 'SELF_ONLY', 'SELF', null, null, null),
	(1, 'SELF_ONLY', null, 'SELF', null, null),
	(1, 'SELF_ONLY', null, null, 'SELF', null),
	(1, 'SELF_ONLY', null, null, null, 'SELF'),
	--
	(1, 'CASE_ONLY', 'CASE', null, null, null),
	(1, 'CASE_ONLY', null, 'CASE', null, null),
	(1, 'CASE_ONLY', null, null, 'CASE', null),
	(1, 'CASE_ONLY', null, null, null, 'CASE'),
	--
	(1, 'FACE_ONLY', 'FACE', null, null, null),
	(1, 'FACE_ONLY', null, 'FACE', null, null),
	(1, 'FACE_ONLY', null, null, 'FACE', null),
	(1, 'FACE_ONLY', null, null, null, 'FACE'),
	--
	(1, 'DISC_ONLY', 'DISC', null, null, null),
	(1, 'DISC_ONLY', null, 'DISC', null, null),
	(1, 'DISC_ONLY', null, null, 'DISC', null),
	(1, 'DISC_ONLY', null, null, null, 'DISC');

UPDATE slots SET self_position=1 WHERE slot1='SELF';
UPDATE slots SET self_position=2 WHERE slot2='SELF';
UPDATE slots SET self_position=3 WHERE slot3='SELF';
UPDATE slots SET self_position=4 WHERE slot4='SELF';
UPDATE slots SET case_position=1 WHERE slot1='CASE';
UPDATE slots SET case_position=2 WHERE slot2='CASE';
UPDATE slots SET case_position=3 WHERE slot3='CASE';
UPDATE slots SET case_position=4 WHERE slot4='CASE';
UPDATE slots SET face_position=1 WHERE slot1='FACE';
UPDATE slots SET face_position=2 WHERE slot2='FACE';
UPDATE slots SET face_position=3 WHERE slot3='FACE';
UPDATE slots SET face_position=4 WHERE slot4='FACE';
UPDATE slots SET disc_position=1 WHERE slot1='DISC';
UPDATE slots SET disc_position=2 WHERE slot2='DISC';
UPDATE slots SET disc_position=3 WHERE slot3='DISC';
UPDATE slots SET disc_position=4 WHERE slot4='DISC';