import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { Repository } from "@src/application/repositories/Repository";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export type BatchModuleDetail = {
	module_uuid: string
	module_type: string
	module_title: string
	module_hash?: string
	batch_uuid: string
	batch_module_uuid: string
	module_category: string
	module_description: string
	batch_module_priority: number
}

export type InsertOneData = {
	uuid: string
	priority: number | null
	batch_uuid: string
	module_uuid: string
}

export interface BatchModuleRepository extends Repository {
	deleteOne<T extends false>(uuid: string, inTransaction?: T): Promise<void>;
	deleteOne<T extends true>(uuid: string, inTransaction: T): Promise<PreparedTransaction[]>;
	deleteOne(uuid: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
	
	insertOne<T extends false>(data: InsertOneData, inTransaction?: T): Promise<void>;
	insertOne<T extends true>(data: InsertOneData, inTransaction: T): Promise<PreparedTransaction[]>;
	insertOne(data: InsertOneData, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	getByBatch(batchId: string): Promise<TableBatchModule[]>
	getByBatchToken(batchToken: string): Promise<TableBatchModule[]>
	getAllDetailByBatch(batchId: string, modules: ModuleGetAll[]): Promise<BatchModuleDetail[]>
	getOne(batchId: string, moduleId: string, modules: ModuleGetAll[]): Promise<BatchModuleDetail | null>
}