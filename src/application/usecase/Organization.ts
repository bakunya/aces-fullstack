import { Date } from "@src/application/date";
import { OrganizationRepository } from "@src/application/repositories/OrganizationRepository";
import { IOrganization } from "@src/application/usecase-interface/IOrganization";
import { OrganizationEntity } from "@src/domain/Organization";

export class OrganizationUsecase implements IOrganization {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly date: Date
	) {}


	async all(): Promise<OrganizationEntity[]> {
		return (await this.organizationRepository.all())
			.map(itm => itm.formatDate((date: string) => this.date.to(date, "DD-MM-YYYY HH:mm:ss")))
	}
}