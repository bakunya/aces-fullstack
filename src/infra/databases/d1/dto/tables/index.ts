export type TableUser = {
	uuid: string;
	fullname: string;
	username: string;
	email: string;
	role_app: number;
	role_aces: number;
	role_batch: number;
	role_assessor: number;
	created: string;
	updated: string;
};

export type TablePerson = {
	uuid: string;
	batch_uuid: string;
	batch_group_id: number;
	organization_uuid: string;
	name: string;
	email: string;
	username: string;
	hash: string;
	gender: string;
	nip: string;
	created: string;
	updated: string;
}

export type TableBatch = {
	uuid: string;
	organization_uuid: string;
	token: string;
	title: string;
	split: number;
	status: number;
	regrouping: number;
	time1?: string;
	time2?: string;
	time3?: string;
	time4?: string;
	time1_end?: string;
	time2_end?: string;
	time3_end?: string;
	time4_end?: string;
	batch_timestamp_start?: string;
	batch_timestamp_end?: string;
	created: string;
	updated?: string;
}

export type TableOrganization = {
	uuid: string;
	name: string;
	code: string;
	created: string;
	updated?: string;
}

export type TableModule = {
	uuid: string;
	type: string;
	title: string;
	description: string;
	created: string;
	status: number;
	updated?: string;
}

export type TableUserHash = {
	uuid: string;
	hash: string;
	created: string;
	updated?: string;
}

export type TableModuleType = {
	id: number;
	type: string;
	category: string;
	created: string;
	updated: string | null; // Bisa null jika belum pernah diupdate
}

export type TableBatchModule = {
	batch_uuid: string;
	module_uuid: string;
	uuid: string;
	created: string;
	updated?: string;
	priority: number;
}

export interface TableBatchGroup {
	id: number;
	batch_uuid: string;
	assessor_uuid: string | null;
	name: string;
	slot1: string | null;
	slot2: string | null;
	slot3: string | null;
	slot4: string | null;
	created: string;
	updated: string | null;
}

export interface TableBatchGrouping {
	id: number;
	batch_uuid: string;
	group_id: string;
	person_uuid: string;
	face_assessor_user_uuid: string | null;
	case_assessor_user_uuid: string | null;
	created: string;
	updated: string | null;
}

export interface TableAssessor {
	user_uuid: string;
	ranking: number;
	university: string;
	date_of_birth: string;
	graduation_year: number;
	phone_number: string;
	home_address: string;
	ktp_number: string;
	npwp_number: string;
	npwp_name: string;
	created: string;
	updated: string | null; // Bisa null jika belum pernah diupdate
}

export interface TableAssessorBatch {
	id: number;
	batch_uuid: string;
	user_uuid: string;
	type: string; // face, disc, case
	slot1: number; // 0, 1
	slot2: number; // 0, 1
	slot3: number; // 0, 1
	slot4: number; // 0, 1
	created: string; // YYYY-MM-DDTHH:MM:SS.sssZ
	updated: string | null; // YYYY-MM-DDTHH:MM:SS.sssZ
}