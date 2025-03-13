import { Asesi } from "@src/domain/Asesi";

export interface AsesiRepository {
	getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<Asesi | undefined>
}