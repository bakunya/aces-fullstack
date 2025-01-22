import { Asesi } from "@src/domain/Asesi";

export interface AsesiRepository {
	getByUsername(username: string): Promise<Asesi | undefined>
}