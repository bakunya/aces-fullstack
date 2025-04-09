import { Context } from "@src/adapter/http/contracts/binding"
import { BatchOrganizationPage } from "@presenter/pages/aces/organization"
import { OrganizationUsecase } from "@src/application/usecase/Organization"
import { OrganizationRepositoryImpl } from "@src/infra/databases/d1/repositories/OrganizationRepositoryImpl"
import { DateImpl } from "@src/infra/date"

export async function batchOrganizationController(c: Context) {
	const organizationUsecase = new OrganizationUsecase(new OrganizationRepositoryImpl(c.env.DB), new DateImpl())
	const res = await organizationUsecase.all()

	return c.html(<BatchOrganizationPage organizations={ res } />)
}