import { HxCreateOrganizationRequest } from "@src/adapter/http/contracts/request/hx-create-organization";
import { OrganizationRepository } from "@src/application/repositories/OrganizationRepository";
import { Uuid } from "@src/application/uuid";
import { OrganizationEntity } from "@src/domain/Organization";

export class CreateOrganizationwUsecase {
	constructor(private organizationRepository: OrganizationRepository, private uuid: Uuid) { }

	async execute(data: HxCreateOrganizationRequest): Promise<undefined> {
		const organization = OrganizationEntity.create(data.name, data.code, this.uuid.get())
		await this.organizationRepository.create(organization)
	}
}