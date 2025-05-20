import { Context } from "@src/adapter/http/contracts/binding"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { HxDeleteBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-delete-batch-module"
import { RegroupRepositoryImpl } from "@src/infra/databases/d1/repositories/RegroupRepositoryImpl"
import { DeleteBatchModuleUsecase } from "@src/application/usecase/DeleteBatchModule"
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"


export async function batchHxDeleteBatchModuleController(c: Context) {
	const batchModuleId = c.req.param(HxDeleteBatchModuleUrlParam.module_id)
	const batchId = c.req.param(HxDeleteBatchModuleUrlParam.batch_id)

	await DeleteBatchModuleUsecase
		.create(
			BatchModuleRepositoryImpl.create(c.env.DB),
			RegroupRepositoryImpl.create(c.env.DB),
			BatchAssessorRepositoryImpl.create(c.env.DB),
			ModuleBindingImpl.create(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY)
		)
		.execute(batchId, batchModuleId)

	const trigger: Record<string, any> = { onSuccess: "Success delete module" }
	trigger[`${HTMX_EVENTS.ACES_BatchModuleMutation}`] = true
	trigger[`${HTMX_EVENTS.ACES_Regrouping}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))
	return c.text("", 201)
}