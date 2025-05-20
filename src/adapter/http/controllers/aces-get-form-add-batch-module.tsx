import { Context } from "@src/adapter/http/contracts/binding"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { HxGetFormAddBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-get-form-add-batch-module"
import { FormAddBatchModule } from "@presenter/pages/aces/components/form-add-batch-module"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"


export async function acesGetFormAddBatchModuleController(c: Context) {
	const batchID = c.req.param(HxGetFormAddBatchModuleUrlParam.batch_id)

	const batchModuleUsecase = GetBatchModuleUsecase.create(new BatchModuleRepositoryImpl(c.env.DB), new ModuleBindingImpl(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY))
	const { modules, batchModule } = await batchModuleUsecase.execute(batchID)

	const availableModulesObject = Object.fromEntries(modules.entries())
	const batchInModulesObject = Object.fromEntries(batchModule.entries())
	const shouldShow = Object.values(batchInModulesObject).flat(2).length < 4

	return c.html(<FormAddBatchModule 
		batchId={ batchID } 
		shouldShow={shouldShow} 
		availableModulesObject={ availableModulesObject } 
		batchInModulesObject={ batchInModulesObject }  
	/>, 201)
}