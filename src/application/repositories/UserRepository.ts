import { User } from "@src/domain/User";

export interface UserRepository {
	getUser(username: string): Promise<User | undefined>
}