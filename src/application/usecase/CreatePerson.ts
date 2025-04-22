import { PersonRequest } from "@src/adapter/http/contracts/request/hx-create-person"
import { ICrypt } from "@src/application/crypto/Crypt"
import { AppError } from "@src/application/error/AppError"
import { BatchRepository } from "@src/application/repositories/BatchRepository"
import { PersonRepository } from "@src/application/repositories/PersonRepository"
import { Uuid } from "@src/application/uuid"
import { PersonDomain } from "@src/domain/Person"

export class CreatePersonUsecase {
	constructor(
		private readonly personRepository: PersonRepository,
		private readonly batchRepo: BatchRepository,
		private readonly crypt: ICrypt,
		private readonly uuid: Uuid,
	) {}

	static create(
		personRepository: PersonRepository,
		batchRepo: BatchRepository,
		crypt: ICrypt,
		uuid: Uuid,
	): CreatePersonUsecase {
		return new CreatePersonUsecase(personRepository, batchRepo, crypt, uuid)
	}

	async execute(batchId: string, persons: PersonRequest[]): Promise<void> {
		const batchDetail = await this.batchRepo.getBatchById(batchId)
		if (!batchDetail) throw AppError.notFound("Batch not found")

		const personDomains: PersonDomain[] = []
		for (const person of persons) {
			const domain = PersonDomain.create({
				nip: person.nip,
				hash: person.name,
				name: person.name,
				batchId: batchId,
				email: person.email,
				username: person.username,
				gender: person.jenis_kelamin,
				organizationId: batchDetail.organization_uuid,
			})
			domain.isValidEmail()
			domain.setNewId(this.uuid)
			domain.serializeGender()
			await domain.hashing(this.crypt)
			personDomains.push(domain)
		}
		await this.personRepository.insertMany(personDomains)
	}
}