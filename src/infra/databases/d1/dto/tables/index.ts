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
	organization_uuid: string;
	name: string;
	email: string;
	username: string;
	hash: string;
	gender: string;
	nip: string;
	ca_assessor_uuid: string;
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

export type TableCaseAnalysElement = {
	id: string;
	name: string;
	domain: string;
	description: string;
	created: string;
	updated?: string;
}

export type TableModCaElement = {
	id: string;
	id_element: string;
	id_mod_ca_question: string;
	created: string;
	updated?: string;
}

export type TableModIntrayIntro = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	content: string;
	created: string;
	updated?: string;
};

export type TableModIntrayOutro = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	content: string;
	created: string;
	updated?: string;
};

export type TableModIntrayTask1 = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	time_in_seconds: number;
	content: string;
	label_1: string;
	label_2: string;
	label_3: string;
	created: string;
	updated?: string;
};

export type TableModIntrayTask2 = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	time_in_seconds: number;
	content: string;
	label_1: string;
	label_2: string;
	label_3: string;
	label_4: string;
	created: string;
	updated?: string;
};

export type TableModIntrayTask3 = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	time_in_seconds: number;
	content: string;
	label_1: string;
	label_2: string;
	label_3: string;
	created: string;
	updated?: string;
};

export type TableModIntrayTask4 = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	time_in_seconds: number;
	content: string;
	label_1: string;
	label_2: string;
	label_3: string;
	label_4: string;
	created: string;
	updated?: string;
};

export type TableModIntrayTask5 = {
	id: number;
	mod_uuid: string;
	title: string;
	name: string;
	time_in_seconds: number;
	content: string;
	label_1: string;
	created: string;
	updated?: string;
};
