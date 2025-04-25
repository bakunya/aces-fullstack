import { TableBatch, TableModule, TableModuleType, TableOrganization, TablePerson } from "@src/infra/databases/d1/dto/tables";

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