import { LoginRequest } from "@src/adapter/http/contracts/request/login";
import { Hash } from "@src/application/crypto/Hash";
import { UserRepository } from "@src/application/repositories/UserRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { User } from "@src/domain/User";

export class LoginUserUsecase implements IUsecase<[LoginRequest], User | undefined> {
	constructor(
		private readonly devRepo: UserRepository,
		private readonly hash: Hash
	) { }

	async execute(body: LoginRequest): Promise<User | undefined> {
		const res = await this.devRepo.getUser(body.email);
		if (!res) return undefined;
		const compare = await this.hash.compare(body.password, res?.password ?? "");
		if (!compare) return undefined;
		return res
	}
}