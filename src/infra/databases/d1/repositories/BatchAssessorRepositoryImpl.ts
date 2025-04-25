import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory } from "@src/domain/ModuleType";

export class BatchAssessorRepositoryImpl implements BatchAssessorRepository {
	constructor(private readonly db: D1Database) {}

	static create(db: D1Database): BatchAssessorRepositoryImpl {
		return new BatchAssessorRepositoryImpl(db);
	}

	async allocate(data: BatchAssessorDomain): Promise<void> {
		const stm = `
			INSERT INTO batch_assessors (batch_uuid, user_uuid, type)
			VALUES (?, ?, ?)
		`
		await this.db.prepare(stm).bind(data.batchId, data.userId, data.type).run()
	}

	async updateSlot(data: BatchAssessorSlotDataToUpdate): Promise<void> {
		const stm = `
			UPDATE batch_assessors
			SET ${data.slotType} = ?
			WHERE batch_uuid = ? AND user_uuid = ?
		`
		await this.db.prepare(stm).bind(data.slotStatus, data.batchId, data.assessorId).run()
	}

	async delete(batchId: string, assessorId: string): Promise<void> {
		const stm = `
			DELETE FROM batch_assessors
			WHERE batch_uuid = ? AND user_uuid = ?
		`
		await this.db.prepare(stm).bind(batchId, assessorId).run()
	}

	async unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[]): Promise<void> {
		const stm0 = this.db.prepare("DELETE FROM batch_assessors WHERE batch_uuid = ? AND user_uuid = ?")
			.bind(batchId, assessorId)
		const stmN = allocated.map(v => {
			return this.db.prepare(`UPDATE batch_groupings SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? WHERE group_uuid = ? AND person_uuid = ? AND batch_uuid = ?`)
				.bind(null, v?.group_id, v?.person_uuid, batchId)
		}) 		
		await this.db.batch([stm0, ...stmN])
	}

	async unallocateGroups(batchId: string, assessorId: string): Promise<void> {
		await this.db.batch([
			this.db.prepare("DELETE FROM batch_assessors WHERE batch_uuid = ? AND user_uuid = ?")
				.bind(batchId, assessorId),
			this.db.prepare("UPDATE batch_groups SET assessor_uuid = ? WHERE assessor_uuid = ? AND batch_uuid = ?").bind(null, assessorId, batchId)
		])	
	}
}