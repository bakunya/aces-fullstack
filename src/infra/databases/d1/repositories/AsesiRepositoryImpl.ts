import { AsesiRepository } from "@src/application/repositories/AsesiRepository";
import { Asesi } from "@src/domain/Asesi";
import { TablePerson } from "@src/infra/databases/d1/dto/tables";

export class AsesiRepositoryImpl implements AsesiRepository {
	constructor(private readonly DB: D1Database) { }

	async getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<Asesi | undefined> {
		const data = await this.DB.prepare(`SELECT * FROM persons WHERE batch_uuid = ? AND username = ? AND email = ?`)
			.bind(batch_uuid, username, email)
			.first() as unknown as TablePerson;
		if (!data) return undefined;
		return Asesi.create(
			data.batch_uuid,
			data.organization_uuid,
			data.name,
			data.email,
			data.username,
			data.hash,
			data.uuid,
			data.gender,
			data.nip,
			data.ca_assessor_uuid,
			data.intray_assessor_uuid,
			data.interview_assessor_uuid
		)
	}
}