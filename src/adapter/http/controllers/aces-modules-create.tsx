import { Context } from "@src/adapter/http/contracts/binding"
import { CreateModuleRequest } from "@src/adapter/http/contracts/request/create_module"
import { AppError } from "@src/application/error/AppError"
import { ModuleInitializer } from "@src/application/repositories/ModuleRepository"
import { CreateModuleUsecase } from "@src/application/usecase/CreateModule"
import { ModuleTypeUsecase } from "@src/application/usecase/ModuleType"
import { ModuleType, ModuleTypeMapping } from "@src/domain/ModuleType"
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl"
import { IntrayRepositoryImpl } from "@src/infra/databases/d1/repositories/IntrayRepositoryImpl"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"
import { route } from "@src/infra/singeleton/RouteCollection"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { match } from "ts-pattern"
import { ulidFactory } from "ulid-workers"

export async function acesCreateModulesController(c: Context) {
	const req = await c.req.parseBody() as Record<string, string>
	if(isNaN(Number(req.module_maxtime))) throw AppError.conversion("maxtime error", "maxtime must be a number")
	const body: CreateModuleRequest = {
		module_type: req.module_type,
		module_title: req.module_title,
		module_developer: req.module_developer,
		module_description: req.module_description,
		module_maxtime: Number(req.module_maxtime),
	}
	const moduleRepo = ModuleRepositoryImpl.create(c.env.DB)
	const moduleTypeUsecase = ModuleTypeUsecase.create(moduleRepo)
	const uuid = UuidImpl.create(ulidFactory())
	const initializer: ModuleInitializer = match(ModuleTypeMapping.fromString(req.module_type))
		.with(ModuleType.CaseAnalysis, () => CaseAnalysRepositoryImpl.create(c.env.DB))
		.with(ModuleType.Intray, () => IntrayRepositoryImpl.create(c.env.DB))
		.otherwise(() => { throw AppError.unknown("module type not found", "Internal server error") })

	const usecase = CreateModuleUsecase.create(moduleRepo, moduleTypeUsecase, uuid, initializer)
	await usecase.execute(body)
	
	return c.redirect(route("get.aces.dashboard.modules"))
}