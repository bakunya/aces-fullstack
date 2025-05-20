import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { TableUser } from "@src/infra/databases/d1/dto/tables";
import { ModuleJoinModuleType } from "@src/infra/databases/d1/dto/aggregations";
import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class ModuleRepositoryImpl extends RepositoryImpl implements ModuleRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): ModuleRepository {
		return new ModuleRepositoryImpl(db)
	}

	async getAll(): Promise<ModuleGetAll[]> {
		return ((await this.db.prepare(`
			 SELECT
                    m.*,
					mt.type,
					mt.category
                FROM
                    modules m
                JOIN
                    module_types mt ON m.type = mt.type
		`)
			.bind()
			.all())
			.results as unknown as (ModuleJoinModuleType & TableUser)[])
			.map(v => ({
				uuid: v.uuid,
				type: v.type,
				title: v.title,
				description: v.description,
				category: v.category,
				status: v.status
			}))
	}
}