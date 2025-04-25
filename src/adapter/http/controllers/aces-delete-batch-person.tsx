import { Context } from "@src/adapter/http/contracts/binding"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events"
import { HxDeletePersonUrlParam } from "@src/adapter/http/contracts/request/hx-delete-person"
import { RegroupRepositoryImpl } from "@src/infra/databases/d1/repositories/RegroupRepositoryImpl"


export async function acesDeleteBatchPersonController(c: Context) {
	const batchID = c.req.param(HxDeletePersonUrlParam.batch_id)!
	const personID = c.req.param(HxDeletePersonUrlParam.person_id)!

	
	await Promise.allSettled([
		PersonRepositoryImpl.create(c.env.DB).deletePersonInBatch(personID, batchID),
		RegroupRepositoryImpl.create(c.env.DB).setShouldRegroup(batchID),
	])

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_BatchPersonMutation}`] = true
	trigger[`${HTMX_EVENTS.ACES_Regrouping}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.json({ message: "ok" }, 200)
}