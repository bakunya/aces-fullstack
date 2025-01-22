import { LoginRequest } from "@src/adapter/http/contracts/request/login";
import { Hash } from "@src/application/crypto/Hash";
import { InternalUserRepository } from "@src/application/repositories/InternalUserRepository";
import { InternalUser } from "@src/domain/InternalUser";

export class LoginDeveloperUsecase {
	constructor(
		private readonly devRepo: InternalUserRepository,
		private readonly hash: Hash
	) { }

	async execute(body: LoginRequest): Promise<InternalUser | undefined> {
		const res = await this.devRepo.getDeveloperByUsername(body.username);
		if (!res) return undefined;
		const compare = await this.hash.compare(body.password, res?.password ?? "");
		if (!compare) return undefined;
		return InternalUser.create(res.username, res.role, res.id)
	}
}