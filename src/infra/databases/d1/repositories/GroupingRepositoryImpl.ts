import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class GroupingRepositoryImpl extends RepositoryImpl implements GroupingRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database) {
		return new GroupingRepositoryImpl(db)
	}

	async getUnallocated(batchId: string, type: ModuleCategory, groupPositionIds: string[][]) {
		return (await this.db.batch(groupPositionIds.map(v => {
			const stm = `SELECT 
				group_uuid as group_id, 
				person_uuid
			FROM batch_groupings 
			WHERE batch_uuid = ? 
			AND group_uuid IN (${v.map(x => `"${x}"`).join(",")}) 
			AND ${type.toLocaleLowerCase()}_assessor_user_uuid IS NULL LIMIT 1`
			return this.db.prepare(stm).bind(batchId)
		})))
			.map((v) => {
				const curr = v.results[0] as { group_id: string; person_uuid: string }
				if (!curr) return null
				if (!curr?.group_id) return null
				if (!curr?.person_uuid) return null
				return {
					group_id: curr.group_id,
					person_uuid: curr.person_uuid,
				}
			})
			.filter(Boolean) as { group_id: string; person_uuid: string }[]
	}

	async allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[]): Promise<void> {
		await this.db.batch(data.map(v => {
			return this.db
				.prepare(`
					UPDATE 
						batch_groupings 
					SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
					WHERE group_uuid = ? 
					AND person_uuid = ? 
					AND batch_uuid = ?
				`)
				.bind(assessor_uuid, v?.group_id, v?.person_uuid, batch_uuid)
		}))
	}

	async unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[]): Promise<void> {
		await this.db.batch(data.map(v => {
			return this.db
				.prepare(`
					UPDATE 
						batch_groupings 
					SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
					WHERE group_uuid = ? 
					AND person_uuid = ? 
					AND batch_uuid = ?
					AND ${type.toLocaleLowerCase()}_assessor_user_uuid = ?
				`)
				.bind(null, v?.group_id, v?.person_uuid, batch_uuid, assessor_uuid)
		}))
	}


	async getAllocated(batchId: string, assessorId: string, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string; }[]> {
		const stm = `
			SELECT 
				group_uuid as group_id, 
				person_uuid 
			FROM batch_groupings
			WHERE ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
			AND batch_uuid = ?
			`
		return (await this.db.prepare(stm).bind(assessorId, batchId).all()).results as { group_id: string; person_uuid: string; }[]
	}

	async getAllocatedFromPosition(batchId: string, assessorId: string, slotPosition: number, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string; }[]> {
		const stm = `
			SELECT 
				batch_groupings.group_uuid as group_id, 
				person_uuid 
			FROM batch_groupings
			JOIN batch_groups ON batch_groupings.group_uuid = batch_groups.uuid 
			WHERE ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
			AND batch_groupings.batch_uuid = ?
			AND slot_module_category_${slotPosition} = ?
		`
		return (await this.db.prepare(stm).bind(assessorId, batchId, type).all()).results as { group_id: string; person_uuid: string; }[]
	}

	async getDetail(batchId: string): Promise<BatchGroupingDetailAggregation[]> {
		let stm = `
				SELECT
					g.slot_module_uuid_1,
					g.slot_module_category_1,
					g.slot_module_uuid_2,
					g.slot_module_category_2,
					g.slot_module_uuid_3,
					g.slot_module_category_3,
					g.slot_module_uuid_4,
					g.slot_module_category_4,
					bc.id as batch_groupings_id,
					g.uuid as batch_groups_id,
					g.batch_uuid,
					p.name as person_name,
					a1.user_uuid as face_assessor_uuid,
					u1.fullname as face_assessor_name,
					a2.user_uuid as case_assessor_uuid,
					u2.fullname as case_assessor_name
				FROM batch_groupings bc
				JOIN batch_groups g ON bc.group_uuid = g.uuid
				JOIN persons p ON bc.person_uuid = p.uuid
				LEFT JOIN assessors a1 ON bc.face_assessor_user_uuid=a1.user_uuid
				LEFT JOIN assessors a2 ON bc.case_assessor_user_uuid=a2.user_uuid
				LEFT JOIN users u1 ON a1.user_uuid = u1.uuid
				LEFT JOIN users u2 ON a2.user_uuid = u2.uuid
				WHERE g.batch_uuid = ?
			`
		
		return (await this.db.prepare(stm).bind(batchId).all()).results as unknown as BatchGroupingDetailAggregation[]
	}

	async manualPair(batchId: string, assessorId: string, type: ModuleCategory, groupingId: number): Promise<void> {
		const stm = `
			UPDATE batch_groupings 
			SET ${type.toLocaleLowerCase()}_assessor_user_uuid = ? 
			WHERE id = ? 
			AND batch_uuid = ?
		`
		await this.db.prepare(stm).bind(assessorId.trim() ?? null, groupingId, batchId).run()
	}
}