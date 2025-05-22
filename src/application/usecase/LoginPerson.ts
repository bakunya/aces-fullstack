import { PersonLoginRequest } from "@src/adapter/http/contracts/request/api-bind-person-login";
import { ICrypt } from "@src/application/crypto/Crypt";
import { AppError } from "@src/application/error/AppError";
import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { PersonDomain } from "@src/domain/Person";

export class LoginPerson implements IUsecase<[PersonLoginRequest], PersonDomain> {
	constructor(
		private readonly personRepository: PersonRepository,
		private readonly crypt: ICrypt,
	) { }

	static create(
		personRepository: PersonRepository,
		crypt: ICrypt,
	): LoginPerson {
		return new LoginPerson(personRepository, crypt);
	}

	async execute(requestData: PersonLoginRequest): Promise<PersonDomain> {
		const dbData = await this.personRepository.getUniqueInBatchByUsername(requestData.batchToken, requestData.username)
		if (!dbData) throw AppError.notFound("User not found", "User not found")
		const idValidPass = await dbData.compare(this.crypt, requestData.password)
		if (!idValidPass) throw AppError.notFound("Username or password is invalid", "Username or password is invalid")
		return dbData
	}
}