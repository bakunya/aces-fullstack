// CREATE TABLE module_developers (
//     [mod_uuid] TEXT NOT NULL,
//     [user_uuid] TEXT NOT NULL,
//     PRIMARY KEY (mod_uuid, user_uuid)
// );

export type ModuleDeveloper = {
	mod_uuid: string;
	user_uuid: string;
};