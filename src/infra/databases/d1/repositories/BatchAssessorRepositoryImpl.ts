import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchAssessorDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class BatchAssessorRepositoryImpl extends RepositoryImpl implements BatchAssessorRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): BatchAssessorRepositoryImpl {
		return new BatchAssessorRepositoryImpl(db);
	}

	allocate<T extends false>(data: BatchAssessorDomain, inTransaction?: T): Promise<void>;	
	allocate<T extends true>(data: BatchAssessorDomain, inTransaction: T): Promise<PreparedTransaction[]>;
	async allocate(data: BatchAssessorDomain, inTransaction: boolean = false):  Promise<PreparedTransaction[] | void>  {
		const stm = `
			INSERT INTO batch_assessors (batch_uuid, user_uuid, type)
			VALUES (?, ?, ?)
		`
		
		const prepared = this.db.prepare(stm).bind(data.batchId, data.userId, data.type)
		if (inTransaction) {
			return [prepared] as PreparedTransaction[]
		}

		await prepared.run()
	}

	updateSlot<T extends false>(data: BatchAssessorSlotDataToUpdate, inTransaction?: T): Promise<void>;
	updateSlot<T extends true>(data: BatchAssessorSlotDataToUpdate, inTransaction: T): Promise<PreparedTransaction[]>;
	async updateSlot(data: BatchAssessorSlotDataToUpdate, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm = `
			UPDATE batch_assessors
			SET ${data.slotType} = ?
			WHERE batch_uuid = ? AND user_uuid = ?
		`
		
		const prepared = this.db.prepare(stm).bind(data.slotStatus, data.batchId, data.assessorId)
		if (inTransaction) {
			return [prepared] as PreparedTransaction[]
		}

		await prepared.run()
	}


	delete<T extends false>(batchId: string, assessorId: string, inTransaction?: T): Promise<void>;
	delete<T extends true>(batchId: string, assessorId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async delete(batchId: string, assessorId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm = `
			DELETE FROM batch_assessors
			WHERE batch_uuid = ? AND user_uuid = ?
		`
		
		const prepared = this.db.prepare(stm).bind(batchId, assessorId)
		if (inTransaction) {
			return [prepared] as PreparedTransaction[]
		}

		await prepared.run()
	}

	
	unallocateGroupings<T extends false>(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction?: T): Promise<void>;
	unallocateGroupings<T extends true>(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction: T): Promise<PreparedTransaction[]>;
	async unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm0 = this.db.prepare("DELETE FROM batch_assessors WHERE batch_uuid = ? AND user_uuid = ?")
			.bind(batchId, assessorId)
		const stmN = allocated.map(v => {
			return this.db.prepare(`UPDATE batch_groupings SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? WHERE group_uuid = ? AND person_uuid = ? AND batch_uuid = ?`)
				.bind(null, v?.group_id, v?.person_uuid, batchId)
		})

		if (inTransaction) {
			return [stm0, ...stmN]
		}

		await this.db.batch([stm0, ...stmN])
	}

	unallocateGroups<T extends false>(batchId: string, assessorId: string, inTransaction?: T): Promise<void>;
	unallocateGroups<T extends true>(batchId: string, assessorId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async unallocateGroups(batchId: string, assessorId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = [
			this.db.prepare("DELETE FROM batch_assessors WHERE batch_uuid = ? AND user_uuid = ?").bind(batchId, assessorId),
			this.db.prepare("UPDATE batch_groups SET assessor_uuid = ? WHERE assessor_uuid = ? AND batch_uuid = ?").bind(null, assessorId, batchId)
		]

		if (inTransaction) {
			return prepared as PreparedTransaction[]
		}
		await this.db.batch(prepared)
	}

	unallocateGroupAll<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	unallocateGroupAll<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async unallocateGroupAll(batchId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm = `DELETE FROM batch_assessors WHERE batch_uuid = ?`
		const prepared = this.db.prepare(stm).bind(batchId)
		
		if (inTransaction) {
			return [prepared] as PreparedTransaction[]
		}
		await prepared.run()
	}

	unallocateGroupingAll<T extends false>(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction?: T): Promise<void>;
	unallocateGroupingAll<T extends true>(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction: T): Promise<PreparedTransaction[]>;
	async unallocateGroupingAll(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm = `
			UPDATE batch_groupings 
			SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
			WHERE batch_uuid = ? AND ${type.toLocaleLowerCase()}_assessor_user_uuid IS NOT NULL
		`
		const prepared = this.db.prepare(stm).bind(null, batchId)
		
		if (inTransaction) {
			return [prepared] as PreparedTransaction[]
		}
		await prepared.run()
	}

	async getDetail(batchId: string) {
		const stm = `
			SELECT
				ba.id,
				ba.batch_uuid,
				ba.user_uuid,
				ba.type,
				ba.slot1,
				ba.slot2,
				ba.slot3,
				ba.slot4,
				u.fullname AS user_fullname,
				u.username AS user_username,
				u.email AS user_email,
				u.role_app,
				u.role_aces,
				u.role_batch,
				u.role_assessor,
				u.role_extra1,
				u.role_extra2,
				u.role_extra3,
				a.ranking,
				a.university,
				a.date_of_birth,
				a.graduation_year,
				a.phone_number,
				a.home_address,
				a.ktp_number,
				a.npwp_number,
				a.npwp_name
			FROM batch_assessors ba
			JOIN users u ON ba.user_uuid = u.uuid
			JOIN assessors a ON ba.user_uuid = a.user_uuid
			WHERE ba.batch_uuid = ?
			AND u.role_assessor = true
		`

		return (await this.db.prepare(stm).bind(batchId).all()).results as unknown as BatchAssessorDetailAggregation[]
	}
}