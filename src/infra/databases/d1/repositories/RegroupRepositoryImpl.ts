import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { ICreateGroupReturn, ICreateGroupingReturn } from "@src/application/usecase-interface/IBatchRegroup";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class RegroupRepositoryImpl extends RepositoryImpl implements RegroupRepository {
	constructor(db: D1Database) {
		super(db);
	}

	static create(db: D1Database): RegroupRepositoryImpl {
		return new RegroupRepositoryImpl(db);	
	}

		
	clean<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	clean<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async clean(batchId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const stm0 = this.db.prepare(`DELETE FROM batch_groupings WHERE batch_uuid=?`).bind(batchId);
		const stm1 = this.db.prepare(`DELETE FROM batch_groups WHERE batch_uuid=?`).bind(batchId);
		
		if (inTransaction) {
			return [stm0, stm1];
		}

		await this.db.batch([
			stm0,
			stm1,
		]);
	}


	
	replace<T extends false>(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction?: T): Promise<void>;
	replace<T extends true>(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction: T): Promise<PreparedTransaction[]>;
	async replace(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
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

		const prepared = [
			this.db.prepare(stm00),
			this.db.prepare(stm01),
		]


		if (inTransaction) {
			return prepared;
		}

		await this.db.batch(prepared);
	}

	
	setShouldRegroup<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	setShouldRegroup<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async setShouldRegroup(batchId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db.prepare(`UPDATE batches SET regrouping=1 WHERE uuid=?`).bind(batchId);

		if (inTransaction) {
			return [prepared];
		}

		await prepared.run();
	}

	
	unsetShouldRegroup<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	unsetShouldRegroup<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async unsetShouldRegroup(batchId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db.prepare(`UPDATE batches SET regrouping=0 WHERE uuid=?`).bind(batchId)

		if (inTransaction) {
			return [prepared];
		}

		await prepared.run();
	}
}