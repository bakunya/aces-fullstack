import { Context } from "@src/adapter/http/contracts/binding"
import { ApiBindBatchDetailRequestUrlParam } from "@src/adapter/http/contracts/request/api-bind-batch-detail"
import { ApiBindBatchDetailResponse } from "@src/adapter/http/contracts/response/api-bind-batch-detail"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { DateImpl } from "@src/infra/date"

export async function apiBindBatchDetail(c: Context) {
	const data = await BatchRepositoryImpl
		.create(c.env.DB)
		.getBatchByToken(c.req.param(ApiBindBatchDetailRequestUrlParam.batchToken))
	const now = DateImpl.create().now()
	const result: ApiBindBatchDetailResponse = {
		...data,
		isStarted: data.batch_time_start ? new Date(now) > new Date(data.batch_time_start) : false,
		isExpired: data.batch_time_end ? new Date(now) > new Date(data.batch_time_end) : false,
	}

	return c.json(result, 200)
}