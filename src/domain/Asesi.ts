export class Asesi {
	constructor(
		public readonly username: string,
		public readonly id?: string,
		public readonly password?: string
	) {}

	static create(username: string, id?: string, password?: string): Asesi {
		return new Asesi(username, id, password)
	}
}