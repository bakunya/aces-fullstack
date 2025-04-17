import { Uuid } from "@src/application/uuid"
import { Hash } from "@src/application/crypto/Hash"
import { AppError } from "@src/application/error/AppError"
import { TablePerson } from "@src/infra/databases/d1/dto/tables"

export type PersonDomainValues = {
	batchId: string,
	name: string,
	nip: string,
	hash: string,
	email: string,
	gender: string,
	username: string,
	id?: string,
	batchGroupId?: number,
	organizationId?: string,
	intrayAssessorId?: string,
	interviewAssessorId?: string,
	caseAnalysisAssessorId?: string,
}

export class PersonDomain {
	constructor(
		public batchId: string,
		public name: string,
		public nip: string,
		public hash: string,
		public email: string,
		public gender: string,
		public username: string,
		public id?: string,
		public batchGroupId?: number,
		public organizationId?: string,
		public intrayAssessorId?: string,
		public interviewAssessorId?: string,
		public caseAnalysisAssessorId?: string,
	) {}

	static create(data: PersonDomainValues) {
		return new PersonDomain(
			data.batchId,
			data.name,
			data.nip,
			data.hash,
			data.email,
			data.gender.toLocaleLowerCase(),
			data.username,
			data.id,
			data.batchGroupId,
			data.organizationId,
			data.intrayAssessorId,
			data.interviewAssessorId,
			data.caseAnalysisAssessorId,
		)
	}

	
	static fromRow(row: TablePerson) {
		return new PersonDomain(
			row.batch_uuid,
			row.name,
			row.nip,
			row.hash,
			row.email,	
			row.gender,
			row.username,
			row.uuid,
			row.batch_group_id,
			row.organization_uuid,
			row.intray_assessor_uuid,
			row.interview_assessor_uuid,
			row.case_analysis_assessor_uuid,
		)
	}

	async hashing(instance: Hash) {
		this.hash = await instance.hash(this.hash)
	}

	async compare(instance: Hash, plain: string) {
		return await instance.compare(plain, this.hash)
	}

	setNewId(instance: Uuid) {
		this.id = instance.get()
	}

	setUsernameFromName() {
		const uname = this.name
			.toLowerCase()
			.replace(/ /g, "")
			.replace(/[^a-zA-Z0-9_]/g, "")
			.replace(/_+/g, "")
		this.username = `${uname}_${this.nip}`
	}

	isValidEmail() {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (regex.test(this.email)) {
			return this
		}
		throw AppError.conversion("PersonDomain", "Invalid email format for " + this.email)
	}

	serializeGender() {
		if(this.gender === "perempuan") return
		if(this.gender === "laki-laki") return
		if(this.gender === "pr") {
			this.gender = "perempuan"
			return
		}
		if(this.gender === "lk") {
			this.gender = "laki-laki"
			return
		}
		throw AppError.conversion("PersonDomain", "Invalid Gender for " + this.name)
	}
}