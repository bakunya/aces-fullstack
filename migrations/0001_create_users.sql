-- Migration number: 0001 	 2025-02-07T03:29:07.286Z
CREATE TABLE users (
    [uuid] TEXT PRIMARY KEY,
    [fullname] TEXT NOT NULL,
    [username] TEXT NOT NULL,
    [email] TEXT UNIQUE NOT NULL,
    [role_app] BOOLEAN DEFAULT false,
    [role_aces] BOOLEAN DEFAULT false,
    [role_module] BOOLEAN DEFAULT false,
    [role_batch] BOOLEAN DEFAULT false,
    [role_assessor] BOOLEAN DEFAULT false,
    [role_extra1] BOOLEAN DEFAULT false,
    [role_extra2] BOOLEAN DEFAULT false,
    [role_extra3] BOOLEAN DEFAULT false,
    [created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
    [updated] TEXT
);

CREATE INDEX idx_users_email ON users (email);

CREATE TRIGGER update_users AFTER UPDATE ON users
BEGIN
    UPDATE users SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE uuid=NEW.uuid;
END;

INSERT INTO users (uuid, fullname, username, email, role_app, role_aces, role_module, role_batch, role_assessor) VALUES
('3176512d-34f1-4120-8437-487c9e05f12f','Imakara','imakara','allaccess@aces.com', true, true, true, true, true),
('c38878cf-ff6e-45c7-8f5e-66f784f1902e','Arif Muslax','muslax','muslax@okemail.com',true,false,true,false,false),
('52d3ca31-6580-42c2-e11c-82e2493ab851','Irvan Hakim','irvan','irvan@okemail.com',false,false,true,false,false),
('9ed84f2c-f842-467f-fb27-3f37908906a2','Yudhi Hermanu','yudhih','yudhih@okemail.com',false,false,true,false,true),
('be22b40e-905a-4e8c-dd92-7bae57bbcb01','Sriyanto','sriyanto','sriyanto@okemail.com',false,false,true,false,true),
('68962bd9-fd47-44d8-9c0d-d5d7d4a61538','Heru Yulianto','heruhya','heruhya@okemail.com',false,false,true,false,true),
('1fff45d9-795a-4bb9-aa92-1c5185c2555f','Atep Barnabas','ateps','ateps@okemail.com',false,true,true,true,true),
('5edf07df-34e4-46cb-eb20-ff406887fea2','Mohtar Abunawas','mohtar','mohtar@okemail.com',false,true,false,true,true),
('abb88787-bd66-4629-dcf6-335717e2a6bc','Andrea Pirelina','andrea','andrea@okemail.com',false,true,true,true,true),
('cbbe7ce4-5c58-47fe-a147-0c5b7a1c82ed','Aik Kulonprogo','aikkpg','aikkpg@okemail.com',false,false,false,false,true),
('1a299d76-987c-4e98-e0b4-50b1d80bdb56','Suparjo Rustam','suparjo','suparjo@okemail.com',false,false,false,false,true),
('1597e45b-0ad1-4784-b201-bb23ab841ff5','Rustam Suparjo','rustam','rustam@okemail.com',false,false,false,false,true),
('ebbce2fc-609d-4772-881b-26c6bc9b8ac2','Endang Cuiri','endang','endang@okemail.com',false,false,false,false,true),
('be1ef546-5430-4cb4-adef-a3160659af3b','Cuiri Endang','cuiri','cuiri@okemail.com',false,false,false,false,true);