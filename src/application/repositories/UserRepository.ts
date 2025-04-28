import { Repository } from "@src/application/repositories/Repository";
import { User } from "@src/domain/User";

export interface UserRepository extends Repository {
	getUser(username: string): Promise<User | undefined>
}