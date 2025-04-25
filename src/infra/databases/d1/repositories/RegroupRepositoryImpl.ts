import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { ICreateGroupReturn, ICreateGroupingReturn } from "@src/application/usecase-interface/IBatchRegroup";

export class RegroupRepositoryImpl implements RegroupRepository {
	constructor(private readonly db: D1Database) {
		this.db = db;
	}

	static create(db: D1Database): RegroupRepositoryImpl {
		return new RegroupRepositoryImpl(db);	
	}

	async clean(batchId: string): Promise<void> {
		const stm0 = `DELETE FROM batch_groupings WHERE batch_uuid=?`;
		const stm1 = `DELETE FROM batch_groups WHERE batch_uuid=?`;

		await this.db.batch([
			this.db.prepare(stm0).bind(batchId),
			this.db.prepare(stm1).bind(batchId),
		]);
	}

	async replace(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[]): Promise<void> {
		const group_values = groups
			.map((g) => `(
				'${g.uuid}', 
				'${g.batch_uuid}', 
				'${g.name}', 
				'${g.slot1?.module_uuid ?? ""}', 
				'${g.slot2?.module_uuid ?? ""}', 
				'${g.slot3?.module_uuid ?? ""}', 
				'${g.slot4?.module_uuid ?? ""}',
				'${g.slot1?.module_category ?? ""}', 
				'${g.slot2?.module_category ?? ""}', 
				'${g.slot3?.module_category ?? ""}', 
				'${g.slot4?.module_category ?? ""}'
			)`)
			.join(', ');
		const grouping_values = groupings.map((g) => `('${g.batch_uuid}', '${g.group_id}', '${g.person_uuid}')`).join(', ');

		const stm00 = `
			INSERT INTO 
				batch_groups 
			(
				uuid, 
				batch_uuid, 
				name, 
				slot_module_uuid_1, 
				slot_module_uuid_2, 
				slot_module_uuid_3, 
				slot_module_uuid_4,
				slot_module_category_1, 
				slot_module_category_2, 
				slot_module_category_3, 
				slot_module_category_4
			) VALUES 
		` + group_values;
		const stm01 = 'INSERT INTO batch_groupings (batch_uuid, group_uuid, person_uuid) VALUES ' + grouping_values;
		await this.db.batch([
			this.db.prepare(stm00),
			this.db.prepare(stm01),
		]);
	}

	async setShouldRegroup(batchId: string): Promise<void> {
		try {
			const stm = `UPDATE batches SET regrouping=1 WHERE uuid=?`;
			await this.db.prepare(stm).bind(batchId).run();
		} catch (err) {
			console.error(err);
		}
	}

	async unsetShouldRegroup(batchId: string): Promise<void> {
		try {
			const stm = `UPDATE batches SET regrouping=0 WHERE uuid=?`;
			await this.db.prepare(stm).bind(batchId).run();
		} catch (err) {
			console.error(err);
		}
	}
}