import { Module } from "@src/domain/Module";
import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { TableModuleType } from "@src/infra/databases/d1/dto/tables";
import { ModuleJoinModuleType } from "@src/infra/databases/d1/dto/aggregations";
import { ModuleDeveloper } from "@src/application/dto/module-developer";

export class ModuleRepositoryImpl implements ModuleRepository {
	constructor(private readonly db: D1Database) { }

	static create(db: D1Database): ModuleRepository {
		return new ModuleRepositoryImpl(db)
	}

	async getAll(): Promise<Module[]> {
		const modules = (await this.db.prepare(`
			 SELECT
                    m.*,
					mt.type,
					mt.category
                FROM
                    modules m
                JOIN
                    module_types mt ON m.type = mt.type
		`).bind().all()).results as unknown as ModuleJoinModuleType[]
		return modules.map((module) => Module.create(module.uuid, module.type, module.title, module.category))
	}

	async getAllModuleType(): Promise<TableModuleType[]> {
		const rows = (await this.db.prepare('SELECT * FROM module_types').all()).results as TableModuleType[];
		return rows
	}

	async getModuleType(type: string): Promise<TableModuleType> {
		const row = (await this.db.prepare('SELECT * FROM module_types WHERE type = ? LIMIT 1').bind(type).first()) as TableModuleType;
		return row
	}	

	async insert(module: Module, developer: ModuleDeveloper): Promise<void> {
		const insertModuleStmt = this.db
			.prepare(`INSERT INTO modules (uuid, type, title, status) VALUES (?, ?, ?, ?)`)
			.bind(module.uuid, module.type, module.title, 0); // Status = 0 (developing)

		const insertModuleDeveloperStmt = this.db
			.prepare(`INSERT INTO module_developers (mod_uuid, user_uuid) VALUES (?, ?)`)
			.bind(module.uuid, developer.user_uuid);

		await this.db.batch([insertModuleStmt, insertModuleDeveloperStmt]);
	}
}