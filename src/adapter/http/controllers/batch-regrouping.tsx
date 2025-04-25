import { Context } from "@src/adapter/http/contracts/binding"
import { BatchRegrouping } from "@src/application/usecase/BatchRegrouping"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { RegroupRepositoryImpl } from "@src/infra/databases/d1/repositories/RegroupRepositoryImpl"
import { GetBatchModuleUsecase } from "@src/application/usecase/GetBatchModule"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { ulidFactory } from "ulid-workers"

export async function batchRegroupingController(c: Context) {
	const usecase = BatchRegrouping.create(
		PersonRepositoryImpl.create(c.env.DB), 
		RegroupRepositoryImpl.create(c.env.DB),
		GetBatchModuleUsecase.create(
			BatchModuleRepositoryImpl.create(c.env.DB),
			ModuleRepositoryImpl.create(c.env.DB),
		), 
		UuidImpl.create(ulidFactory())
	)
	await usecase.execute(c.req.param("batch_id"))

	return c.redirect(c.req.header("Referer") ?? "/")
}