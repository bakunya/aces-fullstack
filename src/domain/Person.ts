import { Uuid } from "@src/application/uuid"
import { ICrypt } from "@src/application/crypto/Crypt"
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
	organizationId?: string,
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
		public organizationId?: string,
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
			data.organizationId,
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
			row.organization_uuid,
		)
	}

	async hashing(instance: ICrypt) {
		this.hash = await instance.encrypt(this.hash)
	}

	async compare(instance: ICrypt, plain: string) {
		return (await instance.decrypt(plain)) === this.hash
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