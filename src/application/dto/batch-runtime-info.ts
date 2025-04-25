import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";

export type BatchRuntimeToken = {
	module_uuid: string;
	module_category: string;
}

export type BatchRuntimeInfo = {
	batch_uuid: string;
	modules: number;
	tokens: BatchRuntimeToken[];
	slot_mode: string;
	types: string;
	permutation: number;
	grouping: string;
	runtime: string;
	mod_self: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_case: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_face: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_disc: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_1: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_2: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_3: (TableBatchModule & { module?: ModuleGetAll}) | null;
	mod_4: (TableBatchModule & { module?: ModuleGetAll}) | null;
}