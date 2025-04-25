-- Migration number: 0011 	 2025-02-26T03:27:51.298Z
CREATE TABLE user_hashes (
    [user_uuid] TEXT PRIMARY KEY,
    [hash] TEXT NOT NULL,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE TRIGGER update_user_hashes AFTER UPDATE ON user_hashes
BEGIN
    UPDATE user_hashes SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE user_uuid=NEW.user_uuid;
END;

INSERT INTO user_hashes (user_uuid, hash) VALUES
('3176512d-34f1-4120-8437-487c9e05f12f', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('c38878cf-ff6e-45c7-8f5e-66f784f1902e', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('52d3ca31-6580-42c2-e11c-82e2493ab851', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('9ed84f2c-f842-467f-fb27-3f37908906a2', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('be22b40e-905a-4e8c-dd92-7bae57bbcb01', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('68962bd9-fd47-44d8-9c0d-d5d7d4a61538', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('1fff45d9-795a-4bb9-aa92-1c5185c2555f', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('5edf07df-34e4-46cb-eb20-ff406887fea2', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('abb88787-bd66-4629-dcf6-335717e2a6bc', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('cbbe7ce4-5c58-47fe-a147-0c5b7a1c82ed', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('1a299d76-987c-4e98-e0b4-50b1d80bdb56', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('1597e45b-0ad1-4784-b201-bb23ab841ff5', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('ebbce2fc-609d-4772-881b-26c6bc9b8ac2', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS'),
('be1ef546-5430-4cb4-adef-a3160659af3b', '$2a$12$U/VHyJ.psOG2mDBpD.Ja1OuviwCBj8FEeBzbBd3QNSU/dg92tF9LS');