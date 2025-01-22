import { LoginRequest } from "@src/adapter/http/contracts/request/login";
import { Hash } from "@src/application/crypto/Hash";
import { AsesorRepository } from "@src/application/repositories/AsesorRepository";
import { Asesor } from "@src/domain/Asesor";

export class LoginAsesorUsecase {
	constructor(
		private readonly asesorRepo: AsesorRepository,
		private readonly hash: Hash
	) {}

	async execute(body: LoginRequest): Promise<Asesor | undefined> {
		const res = await this.asesorRepo.getByUsername(body.username);
		if (!res) return undefined;
		const compare = await this.hash.compare(body.password, res?.password ?? "");
		if (!compare) return undefined;
		return Asesor.create(res.username, res.id)
	}
}