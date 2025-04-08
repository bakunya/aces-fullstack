import { Context } from "@src/adapter/http/contracts/binding"
import { HxHeaderError } from "@src/adapter/http/contracts/response/hx-header-error"
import { HxCreateOrganizationRequest } from "@src/adapter/http/contracts/request/hx-create-organization"
import { AppError } from "@src/application/error/AppError"
import { OrganizationRepositoryImpl } from "@src/infra/databases/d1/repositories/OrganizationRepositoryImpl"
import { CreateOrganizationwUsecase } from "@src/application/usecase/CreateOrganization"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { OrganizationUsecase } from "@src/application/usecase/Organization"
import { DateImpl } from "@src/infra/date"
import { OrganizationTable } from "@presenter/pages/batch/components/organization-table"
import { ulidFactory } from "ulid-workers"


export async function batchHxCreateOrganizationController(c: Context) {
	const header: HxHeaderError = { requestError: "" }

	const req = await c.req.parseBody<HxCreateOrganizationRequest>()
	if (!req) {
		header.requestError = "Invalid request"
		c.res.headers.set("HX-Trigger", JSON.stringify(header))
		throw AppError.request("Invalid request")
	}

	const uuid = new UuidImpl(ulidFactory())
	const organizationRepository = new OrganizationRepositoryImpl(c.env.DB)

	const createOrganizationUsecase = new CreateOrganizationwUsecase(organizationRepository, uuid)
	const organizationUsecase = new OrganizationUsecase(organizationRepository, new DateImpl())

	await createOrganizationUsecase.execute(req)
	const organizations = await organizationUsecase.all()
	return c.html(<OrganizationTable organizations={ organizations } />)
}