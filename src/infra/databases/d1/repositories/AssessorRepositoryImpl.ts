import { AssessorRepository } from "@src/application/repositories/AssessorRepository";
import { ModuleCategory } from "@src/domain/ModuleType";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export class AssessorRepositoryImpl implements AssessorRepository {
	constructor(private db: D1Database) { }

	static create(db: D1Database) {
		return new AssessorRepositoryImpl(db)
	}

	async getInBatch(batchId: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]> {
		const stm = `
			SELECT
				ba.*,
				email,
				username, 
				fullname
			FROM batch_assessors ba
			LEFT JOIN assessors a ON ba.user_uuid=a.user_uuid
			LEFT JOIN users u ON a.user_uuid=u.uuid
			WHERE ba.batch_uuid=?
		`
		return (await this.db.prepare(stm).bind(batchId).all()).results as unknown as (TableAssessorBatch & { email: string, username: string, fullname: string })[];
	}

	async getFree(batchId: string[], type: ModuleCategory) {
		const stm = `
			SELECT
				ba.*,
				a.user_uuid,
				email,
				username, 
				fullname
			FROM assessors a
			LEFT JOIN batch_assessors ba ON ba.user_uuid=a.user_uuid
			LEFT JOIN users u ON a.user_uuid=u.uuid
			WHERE 
				(
					ba.batch_uuid 
					NOT IN (${batchId.map(() => "?").join(",")})
					OR ba.batch_uuid IS NULL
				)
				AND (ba.type IS NULL OR ba.type!=?)
			`
		
		return (await this.db.prepare(stm).bind(...batchId, type).all()).results as unknown as (TableAssessorBatch & { email: string, username: string, fullname: string })[];
	}
}