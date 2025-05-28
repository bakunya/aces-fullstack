import { BatchDTO } from "@src/application/dto/batch";
import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { BatchJoinOrganization } from "@src/infra/databases/d1/dto/aggregations";
import { BatchAssessment } from "@src/domain/BatchAssessment";
import { CreateBatch } from "@src/domain/CreateBatch";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";


export class BatchRepositoryImpl extends RepositoryImpl implements BatchRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): BatchRepositoryImpl {
		return new BatchRepositoryImpl(db)
	}


	createBatch<T extends false>(batch: CreateBatch, inTransaction?: T): Promise<void>
	createBatch<T extends true>(batch: CreateBatch, inTransaction: T): Promise<PreparedTransaction[]>
	async createBatch(batch: CreateBatch, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db
			.prepare(`INSERT INTO batches (uuid, organization_uuid, token, title, type) VALUES (?, ?, ?, ?, ?)`)
			.bind(batch.uuid, batch.organization_uuid, batch.token, batch.title, batch.type)

		if (inTransaction) {
			return [prepared]
		}

		try {
			await prepared.run();
		} catch (error: any) {
			if (error.cause.message === "UNIQUE constraint failed: batches.token: SQLITE_CONSTRAINT") {
				throw AppError.database(error.cause.message, `Batch ${batch.title}: Token ${batch.token} already exists`)
			}
			throw error
		}
	}


	updateTitle<T extends false>(batchId: string, title: string, inTransaction?: T): Promise<void>
	updateTitle<T extends true>(batchId: string, title: string, inTransaction: T): Promise<PreparedTransaction[]>
	async updateTitle(batchId: string, title: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db
			.prepare(`UPDATE batches SET title = ? WHERE uuid = ?`)
			.bind(title, batchId)

		if (inTransaction) {
			return [prepared]
		}

		await prepared.run();
	}


	updateTime<T extends false>(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction?: T): Promise<void>
	updateTime<T extends true>(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction: T): Promise<PreparedTransaction[]>
	async updateTime(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const timeStartColumn = `${timeType}_start`
		const timeEndColumn = `${timeType}_end`

		const prepared = this.db
			.prepare(`UPDATE batches SET ${timeStartColumn} = ?, ${timeEndColumn} = ? WHERE uuid = ?`)
			.bind(timeStart, timeEnd, batchId)

		if (inTransaction) {
			return [prepared]
		}

		await prepared.run()
	}

	async getBatchByToken(token: string): Promise<BatchDTO> {
		const data = await this.db.prepare(`SELECT batches.*, organizations.name FROM batches JOIN organizations ON batches.organization_uuid = organizations.uuid WHERE token = ?`)
			.bind(token)
			.first() as unknown as BatchJoinOrganization;

		if (!data) throw AppError.notFound("Batch not found");

		return {
			...data,
			organization_name: data.name,
		}
	}

	async getBatchById(id: string): Promise<BatchDTO> {
		const data = await this.db.prepare(`SELECT batches.*, organizations.name FROM batches JOIN organizations ON batches.organization_uuid = organizations.uuid WHERE batches.uuid = ?`)
			.bind(id)
			.first() as unknown as BatchJoinOrganization;

		if (!data) throw AppError.notFound("Batch not found");

		return {
			...data,
			organization_name: data.name,
		}
	}

	async getAssessmentList(): Promise<BatchAssessment[]> {
		const data = (await this.db.prepare(`
			SELECT 
				batches.uuid,
				batches.token,
				batches.title,
				organizations.name,
				batches.batch_time_start,
				batches.type
			FROM batches 
			JOIN organizations ON batches.organization_uuid = organizations.uuid
			ORDER BY batches.batch_time_start DESC
			`)
			.all())
			.results as unknown as BatchJoinOrganization[];

		return data.map(item => BatchAssessment.create(item.uuid, item.token, item.title, item.type, item.name, item.batch_time_start))
	}

	async getLastBatchToken(): Promise<string> {
		const data = await this.db.prepare(`SELECT token FROM batches ORDER BY token DESC LIMIT 1`)
			.first() as unknown as { token: string };
		return data.token
	}

	async getBatchIdInSameTimestamp(batchId: string) {
		const stmt = `
			SELECT DISTINCT CASE WHEN b1.uuid = ? THEN b2.uuid ELSE b1.uuid END AS uuid
			FROM batches b1
			JOIN batches b2
				ON (
					(DATE(b1.batch_time_start) = DATE(b2.batch_time_start) OR (b1.batch_time_start IS NULL AND b2.batch_time_start IS NULL))
					AND
					(DATE(b1.batch_time_end) = DATE(b2.batch_time_end) OR (b1.batch_time_end IS NULL AND b2.batch_time_end IS NULL))
				)
				AND b1.uuid != b2.uuid
			WHERE b1.uuid = ? OR b2.uuid = ?;
		`
		return (await this.db.prepare(stmt)
			.bind(batchId, batchId, batchId)
			.all())
			.results as unknown as { uuid: string }[]
	}
}