import { ulidFactory } from "ulid-workers"
import { Context } from "@src/adapter/http/contracts/binding"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { HashImpl } from "@src/infra/crypto/HashImpl"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { HxPersonMutationRequestUrlParam, PersonMutationRequest } from "@src/adapter/http/contracts/request/hx-batch-person-mutation"
import { PersonMutationUsecase } from "@src/application/usecase/PersonMutation"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"


export async function hxBatchPersonMutationController(c: Context) {
	const batchID = c.req.param(HxPersonMutationRequestUrlParam.batch_id)
	const body = await c.req.parseBody() as PersonMutationRequest

	const usecase = PersonMutationUsecase.create(
		PersonRepositoryImpl.create(c.env.DB),
		BatchRepositoryImpl.create(c.env.DB),
		HashImpl.create(),
		UuidImpl.create(ulidFactory())
	)
	await usecase.execute(batchID, body)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_BatchPersonMutation}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.json({ message: "ok" }, 200)
}