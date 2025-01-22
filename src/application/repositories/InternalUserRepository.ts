import { InternalUser } from "@src/domain/InternalUser";

export interface InternalUserRepository {
	getAdminByUsername(username: string): Promise<InternalUser | undefined>
	getDeveloperByUsername(username: string): Promise<InternalUser | undefined>
}