import { Context } from "@src/adapter/http/contracts/binding"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepository"
import { HxDeleteBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-delete-batch-module"


export async function batchHxDeleteBatchModuleController(c: Context) {
	const BatchModuleId = c.req.param(HxDeleteBatchModuleUrlParam.module_id)

	
	const batchModuleRepository = BatchModuleRepositoryImpl.create(c.env.DB)
	await batchModuleRepository.deleteOne(BatchModuleId)

	const trigger: Record<string, any> = { onSuccess: "Success delete module" }
	trigger[`${HTMX_EVENTS.ACES_BatchModuleMutation}`] = true
	
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))
	return c.text("", 201)
}