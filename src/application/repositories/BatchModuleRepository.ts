import { Repository } from "@src/application/repositories/Repository";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";

export type BatchModuleDetail = {
	module_uuid: string
	module_type: string
	module_title: string
	module_status: number
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
	getByBatch(batchId: string): Promise<TableBatchModule[]>
	getAllDetailByBatch(batchId: string): Promise<BatchModuleDetail[]>
	insertOne(data: InsertOneData): Promise<void>
	deleteOne(uuid: string): Promise<void>
	getOne(batchId: string, moduleId: string): Promise<BatchModuleDetail | null>
}