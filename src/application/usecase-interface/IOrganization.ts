import { OrganizationEntity } from "@src/domain/Organization";

export interface IOrganization {
	all(): Promise<OrganizationEntity[]>
}