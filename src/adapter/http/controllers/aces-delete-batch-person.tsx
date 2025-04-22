import { Context } from "@src/adapter/http/contracts/binding"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { HxDeletePersonUrlParam } from "@src/adapter/http/contracts/request/hx-delete-person"


export async function acesDeleteBatchPersonController(c: Context) {
	const batchID = c.req.param(HxDeletePersonUrlParam.batch_id)!
	const personID = c.req.param(HxDeletePersonUrlParam.person_id)!

	
	await PersonRepositoryImpl.create(c.env.DB).deletePersonInBatch(personID, batchID)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_BatchPersonMutation}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.json({ message: "ok" }, 200)
}