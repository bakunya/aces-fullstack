import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { Context } from "@src/adapter/http/contracts/binding";
import { UnallocateAssessorUsecase } from "@src/application/usecase/UnallocateAssessor";
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl";
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl";

export async function acesBatchAssessorDeleteController(c: Context) {
	const batchId = c.req.param("batch_id")
	const assessorId = c.req.param("assessor_id")
	const moduleType = c.req.param("module_type")

	await UnallocateAssessorUsecase
		.create(
			GroupingRepositoryImpl.create(c.env.DB),
			BatchAssessorRepositoryImpl.create(c.env.DB),
		)
		.execute(batchId, assessorId, moduleType)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	trigger[`${HTMX_EVENTS.ACES_GetBatchAssessorTable}_${moduleType}`] = true
	trigger[`${HTMX_EVENTS.ACES_GetAssessorBucketAllocation}`] = true
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}