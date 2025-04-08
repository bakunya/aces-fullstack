import { LoginPersonRequest } from "@src/adapter/http/contracts/request/login-person";
import { ICrypt } from "@src/application/crypto/Crypt";
import { Hash } from "@src/application/crypto/Hash";
import { BatchDTO } from "@src/application/dto/batch";
import { AppError } from "@src/application/error/AppError";
import { AsesiRepository } from "@src/application/repositories/AsesiRepository";
import { Asesi } from "@src/domain/Asesi";

export class LoginAsesiUsecase {
	constructor(
		private readonly asesiRepo: AsesiRepository,
		private readonly hash: Hash,
		private readonly crypt: ICrypt,
	) { }

	async execute(body: LoginPersonRequest, cookieToken: string): Promise<Asesi> {
		const decrypt = await this.crypt.decrypt<BatchDTO>(cookieToken);
		const res = await this.asesiRepo.getUniqueInBatch(decrypt.uuid, body.username, body.email);
		if (!res) throw AppError.notFound("Invalid username, password, or batch");
		const compare = await this.hash.compare(body.password, res?.hash ?? "");
		if (!compare) throw AppError.crypto("Invalid username or password");
		return res;
	}
}