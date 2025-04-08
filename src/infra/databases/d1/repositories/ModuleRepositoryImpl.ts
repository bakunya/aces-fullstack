import { Module } from "@src/domain/Module";
import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { TableModuleType, TableUser } from "@src/infra/databases/d1/dto/tables";
import { ModuleJoinModuleType } from "@src/infra/databases/d1/dto/aggregations";
import { ModuleDeveloper } from "@src/application/dto/module-developer";
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
					mt.category,
					u.fullname,
					md.user_uuid AS user_uuid
                FROM
                    modules m
                JOIN
                    module_types mt ON m.type = mt.type
				LEFT JOIN 
					module_developers md ON m.uuid = md.mod_uuid
				LEFT JOIN
					users u ON md.user_uuid = u.uuid
		`)
			.bind()
			.all())
			.results as unknown as (ModuleJoinModuleType & TableUser & { user_uuid: string })[])
			.map(v => ({
				uuid: v.uuid,
				type: v.type,
				title: v.title,
				description: v.description,
				category: v.category,
				status: v.status,
				developer_uuid: v.user_uuid,
				developer_name: v.fullname,
			}))
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
			.prepare(`INSERT INTO modules (uuid, type, title, description, status) VALUES (?, ?, ?, ?, ?)`)
			.bind(module.uuid, module.type, module.title, module?.description ?? "", 0); // Status = 0 (developing)

		const insertModuleDeveloperStmt = this.db
			.prepare(`INSERT INTO module_developers (mod_uuid, user_uuid) VALUES (?, ?)`)
			.bind(module.uuid, developer.user_uuid);

		await this.db.batch([insertModuleStmt, insertModuleDeveloperStmt]);
	}

	async getModuleByDeveloper(uuid: string): Promise<Module[]> {
		return ((await this.db.prepare(`
			SELECT 
				modules.*,
				module_types.type,
				module_types.category,
				module_developers.user_uuid AS developer_uuid
			FROM 
				modules
			JOIN 
				module_developers
			ON 
				modules.uuid = module_developers.mod_uuid
			JOIN 
				module_types
			ON
				module_types.type = modules.type
			WHERE module_developers.user_uuid = ?
		`)
			.bind(uuid)
			.all())
			.results as unknown as (ModuleJoinModuleType & { developer_uuid: string })[])
			.map((v) => Module.create(v.uuid, v.type, v.title, v.category, v.status, v.description))
	}
}