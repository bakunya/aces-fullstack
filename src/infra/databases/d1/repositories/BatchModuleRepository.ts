import { BatchModuleDetail, InsertOneData , BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { TableBatchModule, } from "@src/infra/databases/d1/dto/tables";

export class BatchModuleRepositoryImpl implements BatchModuleRepository {
	constructor(private readonly db: D1Database) {}

	static create(db: D1Database): BatchModuleRepository {
		return new BatchModuleRepositoryImpl(db);
	}

	async deleteOne(uuid: string): Promise<void> {
		const query = `DELETE FROM batch_modules WHERE uuid = ?`;
		const params = [uuid];
		await this.db.prepare(query).bind(...params).run();
	}

	async getByBatch(batchId: string): Promise<TableBatchModule[]> {
		const query = `SELECT * FROM batch_modules WHERE batch_uuid = ?`;
		const params = [batchId];
		return (await this.db.prepare(query).bind(...params).all()).results as unknown as TableBatchModule[];
	}

	async getAllDetailByBatch(batchId: string): Promise<BatchModuleDetail[]> {
		const query = `
			SELECT 
				modules.uuid as module_uuid, 
				modules.type as module_type, 
				modules.title as module_title,
				modules.status as module_status,
				batch_modules.batch_uuid as batch_uuid,
				batch_modules.uuid as batch_module_uuid,
				module_types.category as module_category,
				modules.description as module_description,
				batch_modules.priority as batch_module_priority
			FROM batch_modules
				JOIN modules ON modules.uuid = batch_modules.module_uuid
				JOIN module_types ON module_types.type = modules.type
			WHERE batch_uuid = ?`;
		const params = [batchId];

		return (await this.db.prepare(query).bind(...params).all()).results as unknown as BatchModuleDetail[];
	}

	async insertOne(data: InsertOneData) {
		const query = `INSERT INTO batch_modules (uuid, priority, batch_uuid, module_uuid) VALUES (?, ?, ?, ?)`;
		const params = [data.uuid, data.priority, data.batch_uuid, data.module_uuid];
		await this.db.prepare(query).bind(...params).run();
	}
}