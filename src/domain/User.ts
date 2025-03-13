import { AppError } from "@src/application/error/AppError"

export enum UserRole {
	APP = 'APP',
	ACES = 'ACES',
	BATCH = 'BATCH',
	MODULE = 'MODULE',
	ASSESSOR = 'ASSESSOR',
}

export class UserRoleMapping {
	static fromString(role: string): UserRole {
		switch (role) {
			case 'APP':
				return UserRole.APP
			case 'ACES':
				return UserRole.ACES
			case 'MODULE':
				return UserRole.MODULE
			case 'ASSESSOR':
				return UserRole.ASSESSOR
			case 'BATCH':
				return UserRole.BATCH
			default:
				throw AppError.entity('UserRole', 'Invalid role')

		}
	}
}

export class User {
	constructor(
		public readonly fullname: string,
		public readonly username: string,
		public readonly role: Map<UserRole, boolean>,
		public readonly email: string,
		public readonly uuid?: string,
		public readonly password?: string
	) {}

	static create(fullname: string, username: string, role: Map<UserRole, boolean>, email: string, uuid?: string, password?: string): User {
		return new User(fullname, username, role, email, uuid, password)
	} 

	static remapping(user: Record<string, string | Record<string, boolean>>): User {
		const userRole = user.role as Record<string, boolean>;
		
		const role = new Map<UserRole, boolean>();
		role.set(UserRole.APP, userRole?.APP ?? false);
		role.set(UserRole.ACES, userRole?.ACES ?? false);
		role.set(UserRole.BATCH, userRole?.BATCH ?? false);
		role.set(UserRole.MODULE, userRole?.MODULE ?? false);
		role.set(UserRole.ASSESSOR, userRole?.ASSESSOR ?? false);

		return new User(user.fullname as string, user.username as string, role, user.email as string, user.uuid as string, user.password as string)
	}
}