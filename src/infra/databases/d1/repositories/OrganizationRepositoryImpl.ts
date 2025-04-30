import { AppError } from "@src/application/error/AppError";
import { OrganizationRepository } from "@src/application/repositories/OrganizationRepository";
import { OrganizationEntity } from "@src/domain/Organization";
import { TableOrganization } from "@src/infra/databases/d1/dto/tables";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class OrganizationRepositoryImpl extends RepositoryImpl implements OrganizationRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database) {
		return new OrganizationRepositoryImpl(db)
	}
	
	create<T extends false>(data: OrganizationEntity, inTransaction?: T): Promise<void>
	create<T extends true>(data: OrganizationEntity, inTransaction: T): Promise<PreparedTransaction[]>
	async create(data: OrganizationEntity, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db.prepare("INSERT INTO organizations (uuid, name, code) VALUES (?, ?, ?)").bind(data.uuid, data.name, data.code)

		if (inTransaction) {
			return [prepared]
		}

		try {
			await prepared.run()
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