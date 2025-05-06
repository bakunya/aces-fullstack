import { Context } from "@src/adapter/http/contracts/binding";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { AutoAllocateAssessorCaseUsecase } from "@src/application/usecase/AutoAllocateAssessorCase";
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl";
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl";

export async function acesCaseAutoAllocateAssessorController(c: Context) {
	const batchId = c.req.param("batch_id")

	await AutoAllocateAssessorCaseUsecase
		.create(
			BatchAssessorRepositoryImpl.create(c.env.DB),
			GroupingRepositoryImpl.create(c.env.DB),
		)
		.execute(batchId)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_GetBatchAssessorTable}_case`] = true
	trigger[`${HTMX_EVENTS.ACES_GetAssessorBucketAllocation}`] = true
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}