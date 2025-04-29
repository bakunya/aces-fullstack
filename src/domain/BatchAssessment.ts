export class BatchAssessment {
	constructor(
		public readonly uuid: string,
		public readonly token: string,
		public readonly title: string,
		public readonly organization_name: string,
		public readonly batch_time_start?: string,
	) {}

	static create(uuid: string, token: string, title: string, organization_name: string, batch_time_start?: string) {
		return new BatchAssessment(uuid, token, title, organization_name, batch_time_start)
	}

	formatDate(callback: (date: string) => string) {
		if (!this.batch_time_start) return this
		return BatchAssessment.create(
			this.uuid,
			this.token,
			this.title,
			this.organization_name,
			callback(this.batch_time_start)
		)
	}
}

