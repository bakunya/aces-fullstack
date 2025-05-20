import { BatchBatchDetailPage } from "@presenter/pages/aces/batch-detail"
import { Context } from "@src/adapter/http/contracts/binding"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"

export async function batchBatchDetailController(c: Context) {
	const batchRepo = BatchRepositoryImpl.create(c.env.DB)
	const batchModuleUsecase = GetBatchModuleUsecase.create(new BatchModuleRepositoryImpl(c.env.DB), new ModuleBindingImpl(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY))

	const [batch, { modules, batchModule }] = await Promise.all([
		batchRepo.getBatchById(c.req.param("batch_id")), 
		batchModuleUsecase.execute(c.req.param("batch_id"))
	])


	return c.html(<BatchBatchDetailPage batch={batch} batchInModules={batchModule} availableModules={modules}  />)
}
