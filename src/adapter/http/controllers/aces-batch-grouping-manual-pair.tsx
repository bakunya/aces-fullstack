import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { Context } from "@src/adapter/http/contracts/binding";BatchGroupingManualPair
import { BatchGroupingManualPair, BatchGroupingManualPairBody } from "@src/adapter/http/contracts/request/batch-grouping-manual-pair";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl";

export async function acesBatchGroupingManualPairController(c: Context) {
	const batchId = c.req.param(BatchGroupingManualPair.batch_id)
	const groupingId = Number(c.req.param(BatchGroupingManualPair.grouping_id))
	const type = ModuleCategoryMapping.fromString(c.req.param(BatchGroupingManualPair.type))
	const rawBody = (await c.req.parseBody())
	const body: BatchGroupingManualPairBody = {
		assessor_id: (rawBody?.assessor_id ?? '') as string
	}

	await GroupingRepositoryImpl
		.create(c.env.DB)
		.manualPair(batchId, body.assessor_id, type, groupingId)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" } 
	if(type === ModuleCategory.FACE) {
		trigger[`${HTMX_EVENTS.ACES_FaceManualPair}`] = true
	} else if(type === ModuleCategory.CASE) {
		trigger[`${HTMX_EVENTS.ACES_CaseManualPair}`] = true
	}	
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}