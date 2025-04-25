import { ulidFactory } from "ulid-workers"
import { Context } from "@src/adapter/http/contracts/binding"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { Crypto } from "@src/infra/crypto"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { HxPersonMutationRequestUrlParam, PersonMutationRequest } from "@src/adapter/http/contracts/request/hx-batch-person-mutation"
import { PersonMutationUsecase } from "@src/application/usecase/PersonMutation"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { RegroupRepositoryImpl } from "@src/infra/databases/d1/repositories/RegroupRepositoryImpl"


export async function hxBatchPersonMutationController(c: Context) {
	const batchID = c.req.param(HxPersonMutationRequestUrlParam.batch_id)
	const body = await c.req.parseBody() as PersonMutationRequest

	const usecase = PersonMutationUsecase.create(
		PersonRepositoryImpl.create(c.env.DB),
		BatchRepositoryImpl.create(c.env.DB),
		Crypto.create(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY), 
		UuidImpl.create(ulidFactory()),
		RegroupRepositoryImpl.create(c.env.DB)
	)
	
	await usecase.execute(batchID, body)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_BatchPersonMutation}`] = true
	trigger[`${HTMX_EVENTS.ACES_Regrouping}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.json({ message: "ok" }, 200)
}