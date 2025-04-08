-- Migration number: 0034 	 2025-03-14T06:50:30.716Z
DROP TABLE IF EXISTS mod_ca_question_elements; CREATE TABLE mod_ca_question_elements (
	[id] INTEGER NOT NULL,
	[id_element] INTEGER NOT NULL,
	[id_mod_ca_question] INTEGER NOT NULL,
	[created] TEXT NOT NULL DEFAULT ((strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc'))),
	[updated] TEXT,
	PRIMARY KEY (id)
	UNIQUE (id_element, id_mod_ca_question)
);

CREATE TRIGGER update_mod_ca_question_elements AFTER UPDATE ON mod_ca_question_elements
    BEGIN UPDATE mod_ca_question_elements SET updated = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'utc')) WHERE id=NEW.id;
END;