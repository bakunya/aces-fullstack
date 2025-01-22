export class Batch {
	constructor(
		public readonly asesorId: string,
		public readonly asesiId: string,
		public readonly name: string,
		public readonly id?: string,
	) {}

	static create(asesorId: string, asesiId: string, name: string, id?: string, ) {
		return new Batch(asesorId, asesiId, name, id);
	}
}