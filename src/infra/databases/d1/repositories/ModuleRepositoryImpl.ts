import { Module } from "@src/domain/Module";
import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { TableModule, TableModuleType, TableUser } from "@src/infra/databases/d1/dto/tables";
import { ModuleJoinModuleType } from "@src/infra/databases/d1/dto/aggregations";
import { ModuleGetAll } from "@src/application/dto/module-get-all";

export class ModuleRepositoryImpl implements ModuleRepository {
	constructor(private readonly db: D1Database) { }

	static create(db: D1Database): ModuleRepository {
		return new ModuleRepositoryImpl(db)
	}

	async getById(uuid: string): Promise<Module> {
		const row = (await this.db.prepare(`
			 SELECT
				m.*,
				mt.type,
				mt.category
			FROM
				modules m
			JOIN
				module_types mt ON m.type = mt.type
			WHERE m.uuid = ?
		`).bind(uuid).first()) as Module;
		return Module.create(row.uuid, row.type, row.title, row.category, row.status, row.description);
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

	async getAllModuleType(): Promise<TableModuleType[]> {
		const rows = (await this.db.prepare('SELECT * FROM module_types').all()).results as TableModuleType[];
		return rows
	}

	
	async getAllWithModuleType() {
		const rows = (await this.db.prepare(`
			SELECT
				m.*,
				mt.type,
				mt.category
			FROM
				modules m
			JOIN
				module_types mt ON m.type = mt.type
			WHERE m.status = 3
		`).all()).results as unknown as (TableModule & { type: string, category: string })[]

		return rows.map((v) => Module.create(v.uuid, v.type, v.title, v.category, v.status, v.description))
	}


	async getModuleType(type: string): Promise<TableModuleType> {
		const row = (await this.db.prepare('SELECT * FROM module_types WHERE type = ? LIMIT 1').bind(type).first()) as TableModuleType;
		return row
	}
}