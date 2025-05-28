import { Date } from "@src/application/date";
import { OrganizationRepository } from "@src/application/repositories/OrganizationRepository";
import { IOrganization } from "@src/application/usecase-interface/IOrganization";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { OrganizationEntity } from "@src/domain/Organization";

export class OrganizationUsecase implements IUsecase, IOrganization {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly date: Date
	) { }


	async all(): Promise<OrganizationEntity[]> {
		return (await this.organizationRepository.all())
			.map(itm => itm.formatDate((date: string) => this.date.to(date, "yyyy-MM-dd HH:mm", "Asia/Jakarta")));
	}

	async execute(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}
}