import { Context } from "@src/adapter/http/contracts/binding"
import { AppError } from "@src/application/error/AppError"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { ulidFactory } from "ulid-workers"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { HxCreateBatchModule, HxCreateBatchModuleUrlParam } from "@src/adapter/http/contracts/request/hx-create-batch-module"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { CreateBatchModuleUsecase } from "@src/application/usecase/CreateBatchModule"
import { RegroupRepositoryImpl } from "@src/infra/databases/d1/repositories/RegroupRepositoryImpl"


export async function batchHxCreateBatchModuleController(c: Context) {
	const req = await c.req.parseBody<HxCreateBatchModule>()
	const batchID = c.req.param(HxCreateBatchModuleUrlParam.batch_id)
	if(!req) throw AppError.conversion("Invalid request body", "Invalid Request Body")

	const uuid = new UuidImpl(ulidFactory())
	const regroupRepo = RegroupRepositoryImpl.create(c.env.DB)
	const batchModuleRepository = BatchModuleRepositoryImpl.create(c.env.DB)
	const createBatchModuleUsecase = CreateBatchModuleUsecase.create(batchModuleRepository, uuid, regroupRepo)
	
	await createBatchModuleUsecase.execute(batchID, req)

	const trigger: Record<string, any> = { onSuccess: "Success add new module" }
	trigger[`${HTMX_EVENTS.ACES_BatchModuleMutation}`] = true
	trigger[`${HTMX_EVENTS.ACES_Regrouping}`] = true
	
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))
	return c.text("", 201)
}