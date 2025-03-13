export class OrganizationEntity {
	constructor(
		public readonly name: string,
		public readonly code: string,
		public readonly uuid: string,
		public readonly created?: string,
		public readonly updated?: string
	) { }

	static create(name: string, code: string, uuid: string, created?: string, updated?: string): OrganizationEntity {
		return new OrganizationEntity(name, code, uuid, created, updated)
	}

	formatDate(callback: (date: string) => string): OrganizationEntity {
		return new OrganizationEntity(
			this.name,
			this.code,
			this.uuid,
			this.created ? callback(this.created) : undefined,
			this.updated ? callback(this.updated) : undefined
		)
	}
}