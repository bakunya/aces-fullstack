import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { Context } from "@src/adapter/http/contracts/binding";
import { BatchAllocateAssessorQueryString, BatchAllocateAssessorUrlParam } from "@src/adapter/http/contracts/request/batch-allocate-assessor";
import { AllocateAssessorUsecase } from "@src/application/usecase/AllocateAssessor";
import { GetAllocation } from "@src/application/usecase/GetAllocation";
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl";
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl";
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl";

export async function acesAllocateAssessorController(c: Context) {
	const batchId = c.req.param(BatchAllocateAssessorUrlParam.batch_id)
	const assessorId = c.req.param(BatchAllocateAssessorUrlParam.assessor_id)
	const type = c.req.query(BatchAllocateAssessorQueryString.type)!

	await AllocateAssessorUsecase
		.create(
			BatchAssessorRepositoryImpl.create(c.env.DB),
			GroupRepositoryImpl.create(c.env.DB),
			GroupingRepositoryImpl.create(c.env.DB),
			BatchRepositoryImpl.create(c.env.DB),
			AssessorRepositoryImpl.create(c.env.DB),
			GetAllocation.create(
				GroupRepositoryImpl.create(c.env.DB),
				AssessorRepositoryImpl.create(c.env.DB)
			)
		)
		.execute(batchId, assessorId, type)

	
	const trigger: Record<string, any> = { onSuccess: "Assessor Allocated successfully" }
	trigger[`${HTMX_EVENTS.ACES_GetBatchAssessorTable}_${type}`] = true
	trigger[`${HTMX_EVENTS.ACES_GetAssessorBucketAllocation}`] = true
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))


	return c.text("", 201)
}