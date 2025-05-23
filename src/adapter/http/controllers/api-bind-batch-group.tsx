import { Context } from "@src/adapter/http/contracts/binding"
import { ApiBindBatchGroupRequestUrlParam } from "@src/adapter/http/contracts/request/api-bind-batch-group"
import { ApiBindBatchGroupResponse } from "@src/adapter/http/contracts/response/api-bind-batch-group"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"

export async function apiBindBatchGroupController(c: Context) {
	const batchId = c.req.param(ApiBindBatchGroupRequestUrlParam.batchId)
	const personId = c.req.param(ApiBindBatchGroupRequestUrlParam.personId)

	const data = await GroupRepositoryImpl.create(c.env.DB).getByDetailByPersonId(batchId, personId) as ApiBindBatchGroupResponse

	return c.json(data, 200)
}
