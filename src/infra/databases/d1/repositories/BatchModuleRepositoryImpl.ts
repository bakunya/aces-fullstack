import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { BatchModuleDetail, InsertOneData, BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { TableBatchModule, } from "@src/infra/databases/d1/dto/tables";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class BatchModuleRepositoryImpl extends RepositoryImpl implements BatchModuleRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): BatchModuleRepository {
		return new BatchModuleRepositoryImpl(db);
	}

	insertOne<T extends false>(data: InsertOneData, inTransaction?: T): Promise<void>;
	insertOne<T extends true>(data: InsertOneData, inTransaction: T): Promise<PreparedTransaction[]>;
	async insertOne(data: InsertOneData, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const query = `INSERT INTO batch_modules (uuid, priority, batch_uuid, module_uuid) VALUES (?, ?, ?, ?)`;
		const params = [data.uuid, data.priority, data.batch_uuid, data.module_uuid];
		const prepared = this.db.prepare(query).bind(...params)
		if (inTransaction) {
			return [prepared]
		}
		await prepared.run()
	}

	deleteOne<T extends false>(uuid: string, inTransaction?: T): Promise<void>;
	deleteOne<T extends true>(uuid: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async deleteOne(uuid: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const query = `DELETE FROM batch_modules WHERE uuid = ?`;
		const params = [uuid];
		const prepared = this.db.prepare(query).bind(...params)
		if (inTransaction) {
			return [prepared]
		}
		await prepared.run()
	}

	async getByBatch(batchId: string): Promise<TableBatchModule[]> {
		const query = `SELECT * FROM batch_modules WHERE batch_uuid = ?`;
		const params = [batchId];
		return (await this.db.prepare(query).bind(...params).all()).results as unknown as TableBatchModule[];
	}

	async getOne(batchId: string, moduleId: string, modules: ModuleGetAll[]): Promise<BatchModuleDetail | null> {
		const query = `
			SELECT 
				batch_modules.batch_uuid as batch_uuid,
				batch_modules.uuid as batch_module_uuid,
				batch_modules.module_uuid as module_uuid,
				batch_modules.priority as batch_module_priority
			FROM batch_modules
			WHERE batch_uuid = ? AND uuid = ?`;
		const params = [batchId, moduleId];
		const data = (await this.db.prepare(query).bind(...params).first()) as unknown as {
			batch_uuid: string;
			module_uuid: string;
			batch_module_uuid: string;
			batch_module_priority: number;
		};
		if (!data) return null;

		const module = modules.find((module) => module.uuid === data.module_uuid);
		if (!module) return null;

		const res: BatchModuleDetail = {
			module_uuid: module.uuid,
			module_type: module.type,
			module_title: module.title,
			batch_uuid: data.batch_uuid,
			batch_module_uuid: data.batch_module_uuid,
			module_category: module.category,
			module_description: module.description,
			batch_module_priority: data.batch_module_priority,
			module_hash: module.hash
		}

		return res;



		// const query = `
		// 	SELECT 
		// 		modules.uuid as module_uuid, 
		// 		modules.type as module_type, 
		// 		modules.title as module_title,
		// 		modules.status as module_status,
		// 		batch_modules.batch_uuid as batch_uuid,
		// 		batch_modules.uuid as batch_module_uuid,
		// 		module_types.category as module_category,
		// 		modules.description as module_description,
		// 		batch_modules.priority as batch_module_priority
		// 	FROM batch_modules
		// 		JOIN modules ON modules.uuid = batch_modules.module_uuid
		// 		JOIN module_types ON module_types.type = modules.type
		// 	WHERE batch_uuid = ? AND batch_modules.uuid = ?`;
		// const params = [batchId, moduleId];
		// return (await this.db.prepare(query).bind(...params).first()) as unknown as BatchModuleDetail;
	}

	async getAllDetailByBatch(batchId: string, modules: ModuleGetAll[]): Promise<BatchModuleDetail[]> {
		const query = `
			SELECT 
				batch_modules.batch_uuid as batch_uuid,
				batch_modules.uuid as batch_module_uuid,
				batch_modules.module_uuid as module_uuid,
				batch_modules.priority as batch_module_priority
			FROM batch_modules
			WHERE batch_uuid = ?`;
		const params = [batchId];
		const data = (await this.db.prepare(query).bind(...params).all()).results as unknown as {
			batch_uuid: string;
			module_uuid: string;
			batch_module_uuid: string;
			batch_module_priority: number;
		}[];

		const res = []

		for (const dataItem of data) {
			const module = modules.find((module) => module.uuid === dataItem.module_uuid);
			if (!module) continue;

			const resItem: BatchModuleDetail = {
				module_uuid: module.uuid,
				module_type: module.type,
				module_title: module.title,
				batch_uuid: dataItem.batch_uuid,
				batch_module_uuid: dataItem.batch_module_uuid,
				module_category: module.category,
				module_description: module.description,
				batch_module_priority: dataItem.batch_module_priority,
				module_hash: module.hash
			}
			res.push(resItem)
		}

		return res;






		// const query = `
		// 	SELECT 
		// 		modules.uuid as module_uuid, 
		// 		modules.type as module_type, 
		// 		modules.title as module_title,
		// 		modules.status as module_status,
		// 		batch_modules.batch_uuid as batch_uuid,
		// 		batch_modules.uuid as batch_module_uuid,
		// 		module_types.category as module_category,
		// 		modules.description as module_description,
		// 		batch_modules.priority as batch_module_priority
		// 	FROM batch_modules
		// 		JOIN modules ON modules.uuid = batch_modules.module_uuid
		// 		JOIN module_types ON module_types.type = modules.type
		// 	WHERE batch_uuid = ?`;
		// const params = [batchId];

		// return (await this.db.prepare(query).bind(...params).all()).results as unknown as BatchModuleDetail[];
	}
}