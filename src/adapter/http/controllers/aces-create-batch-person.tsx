import { Context } from "@src/adapter/http/contracts/binding"
import { BodyRequest, HxCreatePersonUrlParam, PersonRequest } from "@src/adapter/http/contracts/request/hx-create-person"
import { CreatePersonUsecase } from "@src/application/usecase/CreatePerson"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { Crypto } from "@src/infra/crypto"
import { UuidImpl } from "@src/infra/utils/Uuid"
import { ulidFactory } from "ulid-workers"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"


export async function acesCreateBatchPersonController(c: Context) {
	const batchID = c.req.param(HxCreatePersonUrlParam.batch_id)
	const body = await c.req.parseBody() as BodyRequest<string>
	const persons = JSON.parse(body.persons) as PersonRequest[]

	const usecase = CreatePersonUsecase.create(
		PersonRepositoryImpl.create(c.env.DB), 
		BatchRepositoryImpl.create(c.env.DB),
		Crypto.create(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY), 
		UuidImpl.create(ulidFactory())
	)
	await usecase.execute(batchID, persons)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_BatchPersonMutation}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.json({ message: "ok" }, 200)
}