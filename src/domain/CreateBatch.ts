export class CreateBatch {
	constructor(
		public readonly uuid: string,
		public readonly organization_uuid: string,
		public readonly title: string,
		public readonly token?: string,
	) {}

	static create(uuid: string, organization_uuid: string, title: string) {
		return new CreateBatch(uuid, organization_uuid, title);
	}

	createNextToken(prevToken: number) {
		const nextToken = prevToken + 1;
		return new CreateBatch(this.uuid, this.organization_uuid, this.title, String(nextToken).padStart(4, '0'));
	}
}