import { LoginRequest } from "@src/adapter/http/contracts/request/login";
import { Hash } from "@src/application/crypto/Hash";
import { AsesiRepository } from "@src/application/repositories/AsesiRepository";
import { Asesi } from "@src/domain/Asesi";

export class LoginAsesiUsecase {
	constructor(
		private readonly asesiRepo: AsesiRepository,
		private readonly hash: Hash
	) {}

	async execute(body: LoginRequest): Promise<Asesi | undefined> {
		const res = await this.asesiRepo.getByUsername(body.username);
		if (!res) return undefined;
		const compare = await this.hash.compare(body.password, res?.password ?? "");
		if (!compare) return undefined;
		return Asesi.create(res.username, res.id)
	}
}