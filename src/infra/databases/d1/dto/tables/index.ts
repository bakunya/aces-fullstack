export type TableUser = {
	uuid: string;
	fullname: string;
	username: string;
	email: string;
	role_app: number;
	role_aces: number;
	role_module: number;
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
	case_analysis_assessor_uuid: string;
	intray_assessor_uuid: string;
	interview_assessor_uuid: string;
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