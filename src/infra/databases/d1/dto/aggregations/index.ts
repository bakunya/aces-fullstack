import {  TableBatch, TableModule, TableModuleType, TableOrganization, TablePerson } from "@src/infra/databases/d1/dto/tables";

export type BatchJoinOrganization = TableBatch & TableOrganization
export type ModuleJoinModuleType = TableModule & TableModuleType

export type RawGroupAllocation = {
	batch_uuid: string;
	group_id: number;
	slot_module_uuid_1: string | null;
	slot_module_uuid_2: string | null;
	slot_module_uuid_3: string | null;
	slot_module_uuid_4: string | null;
	slot_module_category_1: string | null;
	slot_module_category_2: string | null;
	slot_module_category_3: string | null;
	slot_module_category_4: string | null;
	members: number;
};

export type BatchGroupDetailAggregation = {
	uuid: string;
	batch_uuid: string;
	disc_assessor_uuid: string | null;
	disc_assessor_name: string | null;
	name: string;
	slot_module_uuid_1: string;
	slot_module_category_1: string;
	slot_module_uuid_2: string;
	slot_module_category_2: string;
	slot_module_uuid_3: string;
	slot_module_category_3: string;
	slot_module_uuid_4: string;
	slot_module_category_4: string;
	created: string;
	updated: string | null;
	members: number;
}

export type BatchPersonDetailAggregation = TablePerson & {
	organization_name: string,
	group_uuid: string,
	group_name: string,
	disc_assessor_uuid?: null,
	disc_assessor_name?: null,
	face_assessor_uuid?: null,
	face_assessor_name?: null,
	case_assessor_uuid?: null,
	case_assessor_name?: null
}

export type BatchAssessorDetailAggregation = {
	id: number;
	batch_uuid: string;
	user_uuid: string;
	type: string;
	slot1: number;
	slot2: number;
	slot3: number;
	slot4: number;
	user_fullname: string;
	user_username: string;
	user_email: string;
	role_app: number;
	role_aces: number;
	role_batch: number;
	role_assessor: number;
	role_extra1: number;
	role_extra2: number;
	role_extra3: number;
	ranking: number | null;
	university: string | null;
	date_of_birth: string | null;
	graduation_year: number | null;
	phone_number: string | null;
	home_address: string | null;
	ktp_number: string | null;
	npwp_number: string | null;
	npwp_name: string | null;
}

export type BatchGroupingDetailAggregation = {
	slot_module_uuid_1: string,
    slot_module_category_1: string,
    slot_module_uuid_2: string,
    slot_module_category_2: string,
    slot_module_uuid_3: string,
    slot_module_category_3: string,
    slot_module_uuid_4: string,
    slot_module_category_4: string,
    batch_groups_id: string,
    person_name: string,
    batch_groupings_id: number,
    face_assessor_uuid: string | null,
    face_assessor_name: string | null,
    case_assessor_uuid: string | null,
    case_assessor_name: string | null,
	batch_uuid: string,
}