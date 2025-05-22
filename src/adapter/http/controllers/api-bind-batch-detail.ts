import { Context } from "@src/adapter/http/contracts/binding"
import { ApiBindBatchDetailRequestUrlParam } from "@src/adapter/http/contracts/request/api-bind-batch-detail"
import { ApiBindBatchDetailResponse } from "@src/adapter/http/contracts/response/api-bind-batch-detail"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"

export async function apiBindBatchDetail(c: Context) {
	const data: ApiBindBatchDetailResponse = await BatchRepositoryImpl
		.create(c.env.DB)
		.getBatchByToken(c.req.param(ApiBindBatchDetailRequestUrlParam.batchToken))
	return c.json(data, 200)
}