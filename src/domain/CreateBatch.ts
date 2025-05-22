import { BatchType, BatchTypeMapping } from "@src/domain/Batch";

export class CreateBatch {
	constructor(
		public readonly uuid: string,
		public readonly organization_uuid: string,
		public readonly title: string,
		public readonly type: BatchType,
		public readonly token?: string,
	) {}

	static create(uuid: string, organization_uuid: string, title: string, batch_type: string) {
		return new CreateBatch(uuid, organization_uuid, title, BatchTypeMapping.fromString(batch_type));
	}

	createNextToken(prevToken: number) {
		const nextToken = prevToken + 1;
		return new CreateBatch(
			this.uuid,
			this.organization_uuid,
			this.title,
			this.type,
			`ACS${String(nextToken).padStart(4, '0')}`
		);
	}
}