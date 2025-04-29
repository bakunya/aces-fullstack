import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { BatchGroupDetailAggregation, RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class GroupRepositoryImpl extends RepositoryImpl implements GroupRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database) {
		return new GroupRepositoryImpl(db)
	}

	async getSlotAllocationInBatch(batchId: string): Promise<RawGroupAllocation[]> {
		const stm = `	
		SELECT
			g.batch_uuid,
			g.uuid AS group_id,
			g.slot_module_uuid_1, 
			g.slot_module_uuid_2, 
			g.slot_module_uuid_3, 
			g.slot_module_uuid_4,
			g.slot_module_category_1, 
			g.slot_module_category_2, 
			g.slot_module_category_3, 
			g.slot_module_category_4,
			(SELECT COUNT(*) FROM batch_groupings WHERE group_uuid = g.uuid) AS members
		FROM batch_groups g
		WHERE g.batch_uuid = ?;
		`
		return (await this.db.prepare(stm).bind(batchId).all()).results as RawGroupAllocation[]
	}

	async getUnallocated(batchId: string, groupPositionIds: string[][]) {
		return (await this.db.batch(Object.values(groupPositionIds)
			.map((v) => {
				const stm = `SELECT uuid FROM batch_groups WHERE batch_uuid = ? AND uuid IN (${v.map(x => `"${x}"`).join(",")}) AND assessor_uuid IS NULL LIMIT 1`
				return this.db.prepare(stm).bind(batchId)
			})))
			.map((v) => {
				const curr = v.results.pop() as { uuid: string }
				if (!curr) return null
				if (!curr?.uuid) return null
				return {
					group_uuid: curr.uuid
				}
			})
			.filter(Boolean) as { group_uuid: string }[]
	}

	async allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[]): Promise<void> {
		await this.db.batch(data.map(v => {
			return this.db
				.prepare(`UPDATE batch_groups SET assessor_uuid = ? WHERE uuid = ? AND batch_uuid = ?`)
				.bind(assessor_uuid, v.group_uuid, batch_uuid)
		}))
	}
	
	async unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[]): Promise<void> {
		await this.db.batch(data.map(v => {
			return this.db
				.prepare("UPDATE batch_groups SET assessor_uuid = ? WHERE uuid = ? AND batch_uuid = ? AND assessor_uuid = ?")
				.bind(null, v.group_uuid, batch_uuid, assessor_uuid)
		}))
	}

	async getAllocated(batchId: string, assessorId: string): Promise<RawGroupAllocation[]> {
		const stm = `	
		SELECT
			g.batch_uuid,
			g.uuid AS group_id,
			g.slot_module_uuid_1, 
			g.slot_module_uuid_2, 
			g.slot_module_uuid_3, 
			g.slot_module_uuid_4,
			g.slot_module_category_1, 
			g.slot_module_category_2, 
			g.slot_module_category_3, 
			g.slot_module_category_4,
			(SELECT COUNT(*) FROM batch_groupings WHERE group_uuid = g.uuid) AS members
		FROM batch_groups g
		WHERE g.batch_uuid = ? 
		AND g.assessor_uuid = ?;
		`
		return (await this.db.prepare(stm).bind(batchId, assessorId).all()).results as RawGroupAllocation[]
	}

	async getDetail(batchId: string): Promise<BatchGroupDetailAggregation[]> {
		let stm = `
			SELECT
				g.*, 
				g.assessor_uuid as disc_assessor_uuid,
				u.fullname as disc_assessor_name, 
				(SELECT COUNT(*) FROM batch_groupings WHERE group_uuid=g.uuid) members
			FROM batch_groups g
			LEFT JOIN assessors a ON g.assessor_uuid=a.user_uuid
			LEFT JOIN users u ON a.user_uuid = u.uuid
			WHERE g.batch_uuid = ?
		`

		return (await this.db.prepare(stm).bind(batchId).all()).results as BatchGroupDetailAggregation[]
	}

	async manualPair(batchId: string, groupId: string, assessorId: string): Promise<void> {
		const stm = `UPDATE batch_groups SET assessor_uuid = ? WHERE batch_uuid = ? AND uuid = ?`
		await this.db.prepare(stm).bind(assessorId.trim() ?? null, batchId, groupId).run()
	}
}