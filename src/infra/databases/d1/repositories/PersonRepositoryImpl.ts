import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { PersonDomain } from "@src/domain/Person";
import { BatchPersonDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { TablePerson } from "@src/infra/databases/d1/dto/tables";
import { RepositoryImpl } from "@src/infra/databases/d1/repositories/RepositoryImpl";

export class PersonRepositoryImpl extends RepositoryImpl implements PersonRepository {
	constructor(db: D1Database) {
		super(db)
	}

	static create(db: D1Database): PersonRepositoryImpl {
		return new PersonRepositoryImpl(db)
	}

	async getCountByBatchId(batchId: string): Promise<number> {
		const sql = `SELECT COUNT(*) as count FROM persons WHERE batch_uuid = ?`
		const result = await this.db.prepare(sql).bind(batchId).first()
		if (!result) return 0
		return result.count as number
	}

	async insertMany(persons: PersonDomain[]): Promise<void> {
		const template = `INSERT INTO persons (uuid, batch_uuid, organization_uuid, name, email, username, hash, gender, nip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
		await this.db.batch(persons.map((person) => this.db.prepare(template).bind(
			person.id,
			person.batchId,
			person.organizationId,
			person.name,
			person.email,
			person.username,
			person.hash,
			person.gender,
			person.nip,
		)))
	}

	async getByBatchId(batchId: string): Promise<PersonDomain[]> {
		const sql = `SELECT * FROM persons WHERE batch_uuid = ? ORDER BY created DESC`
		const results = (await this.db.prepare(sql).bind(batchId).all()).results as unknown as TablePerson[]
		if (results.length === 0) return []
		return results.map((row) => PersonDomain.fromRow(row))
	}

	async updateOne(person: PersonDomain): Promise<void> {
		let sql = `
			UPDATE 
				persons 
			SET 
				nip=?,
				name=?,
				email=?,
				gender=?,
				username=?
				,hash=?
			WHERE
				uuid=?
		`
		const bind = [
			person.nip,
			person.name,
			person.email,
			person.gender,
			person.username,
			person.id,
			// dont rearrange the order of bind, it will be binded to the sql statement in order
			person.hash,
		]

		if (!Boolean(person.hash.trim())) {
			sql = sql.replaceAll(",hash=?", "")
			bind.splice(6, 1)
		}

		await this.db.prepare(sql).bind(...bind).run()
	}

	async createOne(person: PersonDomain): Promise<void> {
		const template = `INSERT INTO persons (uuid, batch_uuid, organization_uuid, name, email, username, hash, gender, nip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
		await this.db
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
			).run()
	}

	async getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<PersonDomain | undefined> {
		const data = await this.db.prepare(`SELECT * FROM persons WHERE batch_uuid = ? AND username = ? AND email = ?`)
			.bind(batch_uuid, username, email)
			.first() as unknown as TablePerson;
		if (!data) return undefined;
		return PersonDomain.fromRow(data)
	}

	async deletePersonInBatch(personId: string, batchId: string): Promise<void> {
		await this.db.prepare(`DELETE FROM persons WHERE uuid = ? AND batch_uuid = ?`)
			.bind(personId, batchId).run()
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