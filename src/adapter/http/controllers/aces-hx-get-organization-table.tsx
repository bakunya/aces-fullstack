import { DateImpl } from "@src/infra/date"
import { Context } from "@src/adapter/http/contracts/binding"
import { OrganizationUsecase } from "@src/application/usecase/Organization"
import { OrganizationRepositoryImpl } from "@src/infra/databases/d1/repositories/OrganizationRepositoryImpl"
import { OrganizationTable } from "@presenter/pages/aces/components/organization-table"


export async function acesHxGetOrganizationTableController(c: Context) {
	const organizationRepository = new OrganizationRepositoryImpl(c.env.DB)
	const organizationUsecase = new OrganizationUsecase(organizationRepository, new DateImpl())
	const organizations = await organizationUsecase.all()
	
	return c.html(<OrganizationTable organizations={ organizations } />)
}