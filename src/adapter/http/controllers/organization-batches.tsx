import { Context } from "@src/adapter/http/contracts/binding"
import { OrganizationBatchesPage } from "@presenter/pages/aces/organization-batches"
import { BatchUsecase } from "@src/application/usecase/Batch"
import { OrganizationUsecase } from "@src/application/usecase/Organization"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { OrganizationRepositoryImpl } from "@src/infra/databases/d1/repositories/OrganizationRepositoryImpl"
import { DateImpl } from "@src/infra/date"

export async function organizationBatchesController(c: Context) {
	const organizationId = c.req.param("organization_id")

	const batchUsecase = new BatchUsecase(new BatchRepositoryImpl(c.env.DB), new DateImpl())
	const organizationUsecase = new OrganizationUsecase(new OrganizationRepositoryImpl(c.env.DB), new DateImpl())

	// Get organization details
	const organizations = await organizationUsecase.all()
	const organization = organizations.find(org => org.uuid === organizationId)

	if (!organization) {
		return c.notFound()
	}

	// Get batches for this organization
	const batches = await batchUsecase.getByOrganizationId(organizationId)

	return c.html(<OrganizationBatchesPage organization={ organization } batches={ batches } />)
}
