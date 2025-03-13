import { Uuid } from "@src/application/uuid"
import { ULIDFactory } from "ulid-workers"

export class UuidImpl implements Uuid {
	constructor(private readonly ulid: ULIDFactory) {}

	static create(ulid: ULIDFactory): UuidImpl {
		return new UuidImpl(ulid)
	}

	get(): string {
		return this.ulid()
	}
}