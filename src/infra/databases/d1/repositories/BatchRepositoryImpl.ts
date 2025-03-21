import { BatchDTO } from "@src/application/dto/batch";
import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { BatchJoinOrganization } from "@src/infra/databases/d1/dto/aggregations";
import { BatchAssessment } from "@src/domain/BatchAssessment";
import { CreateBatch } from "@src/domain/CreateBatch";


export class BatchRepositoryImpl implements BatchRepository {
	constructor(private readonly DB: D1Database) { }

	async getBatchByToken(token: string): Promise<BatchDTO> {
		const data = await this.DB.prepare(`SELECT batches.*, organizations.name FROM batches JOIN organizations ON batches.organization_uuid = organizations.uuid WHERE token = ?`)
			.bind(token)
			.first() as unknown as BatchJoinOrganization;

		if (!data) throw AppError.notFound("Batch not found");

		return {
			...data,
			organization_name: data.name,
		}
	}

	async getBatchById(id: string): Promise<BatchDTO> {
		const data = await this.DB.prepare(`SELECT batches.*, organizations.name FROM batches JOIN organizations ON batches.organization_uuid = organizations.uuid WHERE batches.uuid = ?`)
			.bind(id)
			.first() as unknown as BatchJoinOrganization;

		if (!data) throw AppError.notFound("Batch not found");

		return {
			...data,
			organization_name: data.name,
		}
	}
	
	async getAssessmentList(): Promise<BatchAssessment[]> {
		const data = (await this.DB.prepare(`
			SELECT 
				batches.uuid,
				batches.token,
				batches.title,
				organizations.name,
				batches.batch_timestamp_start 
			FROM batches 
			JOIN organizations ON batches.organization_uuid = organizations.uuid
			ORDER BY batches.batch_timestamp_start DESC
			`)
			.all())
			.results as unknown as BatchJoinOrganization[];

		return data.map(item => BatchAssessment.create(item.uuid, item.token, item.title, item.name, item.batch_timestamp_start))
	}

	async getLastBatchToken(): Promise<number> {
		const data = await this.DB.prepare(`SELECT token FROM batches ORDER BY token DESC LIMIT 1`)
			.first() as unknown as { token: string };
		
		const integer = parseInt(data.token)

		if (isNaN(integer)) throw AppError.conversion("Token is not a number");
		return integer;
	}

	async createBatch(batch: CreateBatch): Promise<void> {
		try {
			await this.DB.prepare(`INSERT INTO batches (uuid, organization_uuid, token, title) VALUES (?, ?, ?, ?)`)
				.bind(batch.uuid, batch.organization_uuid, batch.token, batch.title)
				.run();
		} catch (error: any) {
			if (error.cause.message === "UNIQUE constraint failed: batches.token: SQLITE_CONSTRAINT") {
				throw AppError.database(error.cause.message, `Batch ${batch.title}: Token ${batch.token} already exists`)
			}
			throw error
		}
	}

	async updateTitle(batchId: string, title: string): Promise<void> {
		await this.DB.prepare(`UPDATE batches SET title = ? WHERE uuid = ?`)
			.bind(title, batchId)
			.run();
	}
}