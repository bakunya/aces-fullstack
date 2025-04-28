import { Repository } from "@src/application/repositories/Repository";
import { OrganizationEntity } from "@src/domain/Organization";

export interface OrganizationRepository extends Repository {
	create(data: OrganizationEntity): Promise<undefined>
	all(): Promise<OrganizationEntity[]>
}
