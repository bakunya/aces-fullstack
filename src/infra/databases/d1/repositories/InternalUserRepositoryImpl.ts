import { InternalUserRepository } from "@src/application/repositories/InternalUserRepository";
import { InternalUser, InternalUserRole } from "@src/domain/InternalUser";


const seeds = [
	{
		id: "1",
		username: 'user 1',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	},
	{
		id: "2",
		username: 'user 2',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	}
]

const seedRole = [
	{
		id: "1",
		userId: '1',
		role: InternalUserRole.ADMIN,
	},
	{
		id: "2",
		userId: '2',
		role: InternalUserRole.DEVELOPER,
	}
]

export class InternalUserRepositoryImpl implements InternalUserRepository {
	constructor(DB: D1Database) {}

	async getAdminByUsername(username: string): Promise<InternalUser | undefined> {
		const user = seeds.find((x) => x.username === username);
		if (!user) return undefined
		const role = seedRole.find((x) => x.userId === user.id);
		if (!role) return undefined;
		if (role.role !== InternalUserRole.ADMIN) return undefined;
		return new InternalUser(user.username, InternalUserRole.ADMIN, user.id, user.password);
	}

	async getDeveloperByUsername(username: string): Promise<InternalUser | undefined> {
		const user = seeds.find((x) => x.username === username);
		if (!user) return undefined
		const role = seedRole.find((x) => x.userId === user.id);
		if (!role) return undefined;
		if (role.role !== InternalUserRole.DEVELOPER) return undefined;
		return new InternalUser(user.username, InternalUserRole.DEVELOPER, user.id, user.password);
	}
}