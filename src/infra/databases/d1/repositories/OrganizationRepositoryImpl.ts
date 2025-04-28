import { AppError } from "@src/application/error/AppError";
import { OrganizationRepository } from "@src/application/repositories/OrganizationRepository";
import { OrganizationEntity } from "@src/domain/Organization";
import { TableOrganization } from "@src/infra/databases/d1/dto/tables";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class OrganizationRepositoryImpl extends RepositoryImpl implements OrganizationRepository {
	constructor(db: D1Database) {
		super(db)
	}

	async create(data: OrganizationEntity): Promise<undefined> {
		try {
			const stmt = this.db.prepare("INSERT INTO organizations (uuid, name, code) VALUES (?, ?, ?)")
			await stmt.bind(data.uuid, data.name, data.code).run()
		} catch (error: any) {
			if (error.cause.message === "UNIQUE constraint failed: organizations.code: SQLITE_CONSTRAINT") {
				throw AppError.database(error.cause.message, "Organization Code already exists")
			}
			throw error
		}
	}

	async all(): Promise<OrganizationEntity[]> {
		const stmt = this.db.prepare("SELECT * FROM organizations ORDER BY created DESC")
		return (await stmt.all<TableOrganization>())
			.results
			.map((itm) => OrganizationEntity.create(
				itm.name,
				itm.code,
				itm.uuid,
				itm.created,
				itm.updated
			))

	}
}