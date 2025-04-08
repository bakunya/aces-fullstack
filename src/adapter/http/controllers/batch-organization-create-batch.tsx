import { Context } from "@src/adapter/http/contracts/binding"
import { CreateBatchRequest } from "@src/adapter/http/contracts/request/create-batch"
import { CreateBatchUsecase } from "@src/application/usecase/CreateBatch"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { route } from "@src/infra/singeleton/RouteCollection"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { ulidFactory } from "ulid-workers"

export async function batchOrganizationCreateBatchController(c: Context) {
	const { organization_id } = c.req.param()
	const { title } = await c.req.parseBody()
	const data = {
		organization_uuid: organization_id,
		title
	} as CreateBatchRequest

	const batchRepository = new BatchRepositoryImpl(c.env.DB)
	const usecase = new CreateBatchUsecase(batchRepository, new UuidImpl(ulidFactory()))
	const uuid = await usecase.execute(data)

	return c.redirect(route("get.batch.batch.batch_id", [uuid]))
}
