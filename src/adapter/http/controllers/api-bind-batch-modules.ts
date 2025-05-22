import { Context } from "@src/adapter/http/contracts/binding"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { ApiBindBatchModulesUrlParam } from "@src/adapter/http/contracts/request/api-bind-batch-modules"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { ApiBindBatchModulesResponse } from "@src/adapter/http/contracts/response/api-bind-batch-modules"

export async function apiBindBatchModules(c: Context) {
	const data = await GetBatchModuleUsecase.create(
		BatchModuleRepositoryImpl.create(c.env.DB),
		ModuleBindingImpl.create(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY),
	).getBatchModulesByToken(c.req.param(ApiBindBatchModulesUrlParam.batchToken)) as ApiBindBatchModulesResponse[]

	return c.json(data, 200)
}