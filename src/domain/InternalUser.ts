export enum InternalUserRole {
	ADMIN = 'ADMIN',
	DEVELOPER = 'DEVELOPER',
}

export class InternalUser {
	constructor(
		public readonly username: string,
		public readonly role: InternalUserRole,
		public readonly id?: string,
		public readonly password?: string
	) {}

	static create(username: string, role: InternalUserRole, id?: string, password?: string): InternalUser {
		return new InternalUser(username, role, id, password)
	}
}