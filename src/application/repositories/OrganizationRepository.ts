import { OrganizationEntity } from "@src/domain/Organization";

export interface OrganizationRepository {
	create(data: OrganizationEntity): Promise<undefined>
	all(): Promise<OrganizationEntity[]>
}
