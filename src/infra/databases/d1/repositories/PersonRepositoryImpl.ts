import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { PersonDomain } from "@src/domain/Person";
import { BatchPersonDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { TablePerson } from "@src/infra/databases/d1/dto/tables";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class PersonRepositoryImpl extends RepositoryImpl implements PersonRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): PersonRepositoryImpl {
		return new PersonRepositoryImpl(db)
	}


	insertMany<T extends false>(persons: PersonDomain[], inTransaction?: T): Promise<void>;
	insertMany<T extends true>(persons: PersonDomain[], inTransaction: T): Promise<PreparedTransaction[]>;
	async insertMany(persons: PersonDomain[], inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const template = `INSERT INTO persons (uuid, batch_uuid, organization_uuid, name, email, username, hash, gender, nip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
		const prepared = persons.map((person) => this.db.prepare(template).bind(
			person.id,
			person.batchId,
			person.organizationId,
			person.name,
			person.email,
			person.username,
			person.hash,
			person.gender,
			person.nip,
		))

		if (inTransaction) {
			return prepared
		}

		await this.db.batch(prepared)
	}


	updateOne<T extends false>(person: PersonDomain, inTransaction?: T): Promise<void>;
	updateOne<T extends true>(person: PersonDomain, inTransaction: T): Promise<PreparedTransaction[]>;
	async updateOne(person: PersonDomain, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		let sql = `
			UPDATE 
				persons 
			SET 
				nip=?,
				name=?,
				email=?,
				gender=?,
				username=?,
				hash=?
			WHERE
				uuid=?
		`
		const bind = [
			person.nip,
			person.name,
			person.email,
			person.gender,
			person.username,
			person.hash,
			person.id,
		]
		const prepared = this.db.prepare(sql).bind(...bind)

		if (inTransaction) {
			return [prepared]
		}

		await prepared.run()
	}


	createOne<T extends false>(person: PersonDomain, inTransaction?: boolean): Promise<void>;
	createOne<T extends true>(person: PersonDomain, inTransaction: boolean): Promise<PreparedTransaction[]>;
	async createOne(person: PersonDomain, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const template = `INSERT INTO persons (uuid, batch_uuid, organization_uuid, name, email, username, hash, gender, nip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
		const prepared = this.db
			.prepare(template)
			.bind(
				person.id,
				person.batchId,
				person.organizationId,
				person.name,
				person.email,
				person.username,
				person.hash,
				person.gender,
				person.nip,
			)

		if (inTransaction) {
			return [prepared]
		}

		await prepared.run()
	}


	deletePersonInBatch<T extends false>(personId: string, batchId: string, inTransaction?: T): Promise<void>;
	deletePersonInBatch<T extends true>(personId: string, batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	async deletePersonInBatch(personId: string, batchId: string, inTransaction: boolean = false): Promise<void | PreparedTransaction[]> {
		const prepared = this.db
			.prepare(`DELETE FROM persons WHERE uuid = ? AND batch_uuid = ?`)
			.bind(personId, batchId)

		if (inTransaction) {
			return [prepared]
		}

		await prepared.run()
	}

	async getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<PersonDomain | undefined> {
		const data = await this.db.prepare(`SELECT * FROM persons WHERE batch_uuid = ? AND username = ? AND email = ?`)
			.bind(batch_uuid, username, email)
			.first() as unknown as TablePerson;
		if (!data) return undefined;
		return PersonDomain.fromRow(data)
	}

	async getByBatchId(batchId: string): Promise<PersonDomain[]> {
		const sql = `SELECT * FROM persons WHERE batch_uuid = ? ORDER BY created DESC`
		const results = (await this.db.prepare(sql).bind(batchId).all()).results as unknown as TablePerson[]
		if (results.length === 0) return []
		return results.map((row) => PersonDomain.fromRow(row))
	}


	async getCountByBatchId(batchId: string): Promise<number> {
		const sql = `SELECT COUNT(*) as count FROM persons WHERE batch_uuid = ?`
		const result = await this.db.prepare(sql).bind(batchId).first()
		if (!result) return 0
		return result.count as number
	}

	async getDetailInBatch(batchId: string): Promise<BatchPersonDetailAggregation[]> {
		const stm = `
		SELECT
			persons.*,
			organizations.name organization_name,
			batch_groups.uuid group_uuid,
			batch_groups.name group_name,
			batch_groups.assessor_uuid disc_assessor_uuid,
			user_disc.fullname disc_assessor_name,
			batch_groupings.face_assessor_user_uuid face_assessor_uuid,
			user_face.fullname face_assessor_name,
			batch_groupings.case_assessor_user_uuid case_assessor_uuid,
			user_case.fullname case_assessor_name
		FROM persons
		LEFT JOIN organizations ON persons.organization_uuid=organizations.uuid
		LEFT JOIN batch_groupings ON persons.uuid=batch_groupings.person_uuid
		LEFT JOIN batch_groups ON batch_groupings.group_uuid=batch_groups.uuid
		LEFT JOIN users user_face ON batch_groupings.face_assessor_user_uuid=user_face.uuid
		LEFT JOIN users user_case ON batch_groupings.case_assessor_user_uuid=user_case.uuid
		LEFT JOIN users user_disc ON batch_groups.assessor_uuid=user_disc.uuid
		WHERE persons.batch_uuid=?
		`
		return (await this.db.prepare(stm).bind(batchId).all()).results as BatchPersonDetailAggregation[]
	}
}