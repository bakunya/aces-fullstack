import { PersonMutationRequest } from "@src/adapter/http/contracts/request/hx-batch-person-mutation";
import { ICrypt } from "@src/application/crypto/Crypt";
import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { Uuid } from "@src/application/uuid";
import { PersonDomain } from "@src/domain/Person";

export class PersonMutationUsecase {
	constructor(
		private readonly personRepo: PersonRepository,
		private readonly batchRepo: BatchRepository,
		private readonly crypt: ICrypt,
		private readonly uuid: Uuid
	) { }

	static create(
		personRepo: PersonRepository,
		batchRepo: BatchRepository,
		crypt: ICrypt,
		uuid: Uuid
	) { return new PersonMutationUsecase(personRepo, batchRepo, crypt, uuid) }

	async execute(batchId: string, personData: PersonMutationRequest) {
		if (Boolean(personData.person_id.trim())) {
			const personDomain = PersonDomain.create({
				batchId: batchId,
				id: personData.person_id,
				nip: personData.person_nip,
				name: personData.person_name,
				email: personData.person_email,
				gender: personData.person_gender,
				username: personData.person_username,
				hash: personData.person_password.trim(),
			})
			if (Boolean(personData.person_password.trim())) {
				const hashedPassword = await this.crypt.encrypt(personData.person_password)
				personDomain.hash = hashedPassword
			}
			await this.personRepo.updateOne(personDomain)
		} else {
			// create person
			const batchDetail = await this.batchRepo.getBatchById(batchId)
			if (!batchDetail) throw AppError.notFound("Batch not found")
			const domain = PersonDomain.create({
				batchId: batchId,
				nip: personData.person_nip,
				hash: personData.person_name,
				name: personData.person_name,
				email: personData.person_email,
				gender: personData.person_gender,
				username: personData.person_username,
				organizationId: batchDetail.organization_uuid,
			})
			domain.isValidEmail()
			domain.setNewId(this.uuid)
			domain.serializeGender()
			await domain.hashing(this.crypt)
			await this.personRepo.createOne(domain)
		}
	}
}