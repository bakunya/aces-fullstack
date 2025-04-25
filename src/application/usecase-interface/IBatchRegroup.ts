import { BatchRuntimeToken } from "@src/application/dto/batch-runtime-info";
import { TableBatchGrouping } from "@src/infra/databases/d1/dto/tables";

export type ICreateGroupReturn = {
	uuid: string;
	members: number;
	batch_uuid: string;
	name: string;
	slot1: BatchRuntimeToken | null;
	slot2: BatchRuntimeToken | null;
	slot3: BatchRuntimeToken | null;
	slot4: BatchRuntimeToken | null;
}

export type ICreateGroupingReturn = Omit<Omit<Omit<TableBatchGrouping, "id">, "created">, "updated">