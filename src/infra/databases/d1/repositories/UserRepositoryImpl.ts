import { User, UserRole } from "@src/domain/User";
import { UserRepository } from "@src/application/repositories/UserRepository";
import { TableUser, TableUserHash } from "@src/infra/databases/d1/dto/tables";

export class UserRepositoryImpl implements UserRepository {
	constructor(private readonly DB: D1Database) { }

	static create(DB: D1Database): UserRepository {
		return new UserRepositoryImpl(DB)
	}

	async getUser(username: string): Promise<User | undefined> {
		const data = await this.DB.prepare(`SELECT users.*, user_hashes.hash FROM users JOIN user_hashes ON user_hashes.uuid = users.uuid WHERE email = ?`)
			.bind(username)
			.first() as unknown as TableUser & TableUserHash;

		if (!data) return undefined

		const role = new Map<UserRole, boolean>();
		role.set(UserRole.APP, data.role_app === 1);
		role.set(UserRole.ACES, data.role_aces === 1);
		role.set(UserRole.BATCH, data.role_batch === 1);
		role.set(UserRole.MODULE, data.role_module === 1);
		role.set(UserRole.ASSESSOR, data.role_assessor === 1);

		return User.create(data.fullname, data.username, role, data.email, data.uuid, data.hash);
	}

	async getOnlyModules(): Promise<User[]> {
		const data = (await this.DB.prepare(`SELECT * FROM users WHERE role_module = 1`)
			.all())
			.results as unknown as TableUser[]

		return data.map((user) => {
			const role = new Map<UserRole, boolean>();
			role.set(UserRole.ASSESSOR, user.role_module === 1);
			return User.create(user.fullname, user.username, role, user.email, user.uuid, '')
		})
	}
}