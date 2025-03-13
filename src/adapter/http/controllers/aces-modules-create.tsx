import { Context } from "@src/adapter/http/contracts/binding"
import { CreateModuleRequest } from "@src/adapter/http/contracts/request/create_module"
import { CreateModuleUsecase } from "@src/application/usecase/CreateModule"
import { ModuleTypeUsecase } from "@src/application/usecase/ModuleType"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"
import { route } from "@src/infra/singeleton/RouteCollection"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { ulidFactory } from "ulid-workers"

export async function acesCreateModulesController(c: Context) {
	const body = await c.req.parseBody() as CreateModuleRequest
	const moduleRepo = ModuleRepositoryImpl.create(c.env.DB)
	const moduleTypeUsecase = ModuleTypeUsecase.create(moduleRepo)
	const uuid = UuidImpl.create(ulidFactory())

	const usecase = CreateModuleUsecase.create(moduleRepo, moduleTypeUsecase, uuid)
	await usecase.execute(body)
	
	return c.redirect(route("get.aces.dashboard.modules"))
}