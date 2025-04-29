import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { Context } from "@src/adapter/http/contracts/binding";
import { BatchGroupManualPair, BatchGroupManualPairBody } from "@src/adapter/http/contracts/request/batch-group-manual-pair";
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl";

export async function acesBatchGroupManualPairController(c: Context) {
	const batchId = c.req.param(BatchGroupManualPair.batch_id)
	const groupId = c.req.param(BatchGroupManualPair.group_id)
	const rawBody = (await c.req.parseBody())
	const body: BatchGroupManualPairBody = {
		assessor_id: (rawBody?.assessor_id ?? '') as string
	}


	await GroupRepositoryImpl.create(c.env.DB).manualPair(batchId, groupId, body.assessor_id)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_DiscManualPair}`] = true
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}