export type ApiBindBatchGroupResponse = {
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