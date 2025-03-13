export class Asesi {
	constructor(
		public readonly batch_uuid: string,
		public readonly organization_uuid: string,
		public readonly name: string,
		public readonly email: string,
		public readonly username: string,
		public readonly hash: string,
		public readonly uuid?: string,
		public readonly gender?: string,
		public readonly nip?: string,
		public readonly ca_assessor_uuid?: string,
		public readonly intray_assessor_uuid?: string,
		public readonly interview_assessor_uuid?: string,

	) { }

	static create(batch_uuid: string,
		organization_uuid: string,
		name: string,
		email: string,
		username: string,
		hash: string,
		uuid?: string,
		gender?: string,
		nip?: string,
		ca_assessor_uuid?: string,
		intray_assessor_uuid?: string,
		interview_assessor_uuid?: string): Asesi {
		return new Asesi(batch_uuid,
			organization_uuid,
			name,
			email,
			username,
			hash,
			uuid,
			gender,
			nip,
			ca_assessor_uuid,
			intray_assessor_uuid,
			interview_assessor_uuid
		)
	}

}


