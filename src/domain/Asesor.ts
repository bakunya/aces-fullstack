export class Asesor {
	constructor(
		public readonly username: string,
		public readonly id?: string,
		public readonly password?: string
	) {}

	static create(username: string, id?: string, password?: string): Asesor {
		return new Asesor(username, id, password)
	}
}