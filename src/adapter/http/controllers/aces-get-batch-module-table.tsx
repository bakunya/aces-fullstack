import { Context } from "@src/adapter/http/contracts/binding"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { BatchModuleTable } from "@presenter/pages/aces/components/batch-module-table"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { HxGetFormAddBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-get-form-add-batch-module"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"


export async function acesGetBatchModuleTableController(c: Context) {
	const batchID = c.req.param(HxGetFormAddBatchModuleUrlParam.batch_id)

	const batchModuleUsecase = GetBatchModuleUsecase.create(new BatchModuleRepositoryImpl(c.env.DB), new ModuleBindingImpl(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY))
	const { batchModule } = await batchModuleUsecase.execute(batchID)
	const modules = Object.fromEntries(batchModule.entries())

	return c.html(<BatchModuleTable modules={ Object.values(modules).flat(2) } />, 201)
}