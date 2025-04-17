import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { PersonDomain } from "@src/domain/Person";
import { TablePerson } from "@src/infra/databases/d1/dto/tables";

export class PersonRepositoryImpl implements PersonRepository {
	constructor(public readonly db: D1Database) { }

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
}