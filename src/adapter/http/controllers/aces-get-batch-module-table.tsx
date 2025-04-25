import { Context } from "@src/adapter/http/contracts/binding"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { BatchModuleTable } from "@presenter/pages/aces/components/batch-module-table"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { HxGetFormAddBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-get-form-add-batch-module"


export async function acesGetBatchModuleTableController(c: Context) {
	const batchID = c.req.param(HxGetFormAddBatchModuleUrlParam.batch_id)

	const batchModuleUsecase = GetBatchModuleUsecase.create(new BatchModuleRepositoryImpl(c.env.DB), new ModuleRepositoryImpl(c.env.DB))
	const { batchModule } = await batchModuleUsecase.execute(batchID)
	const modules = Object.fromEntries(batchModule.entries())

	return c.html(<BatchModuleTable modules={ Object.values(modules).flat(2) } />, 201)
}