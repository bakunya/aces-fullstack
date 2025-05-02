import { AssessorBucketAllocation } from "@presenter/pages/aces/components/assessor-bucket-allocation";
import { Context } from "@src/adapter/http/contracts/binding";
import { GetAllocation } from "@src/application/usecase/GetAllocation";
import { GetFreeAssessorUsecase } from "@src/application/usecase/GetFreeAssessor";
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl";

export async function acesGetAssessorBucketAllocationController(c: Context) {
	const body = await c.req.parseBody()
	const type = body.type as string
	const batchId = c.req.param("batch_id")
	const show = type ? body.show === "true" : false

	if (!show) return c.html(<AssessorBucketAllocation batchId={ batchId } assessor={ [] } type={ type } show={ false } />)

	const allocationUsecase = GetAllocation.create(
		GroupRepositoryImpl.create(c.env.DB),
		AssessorRepositoryImpl.create(c.env.DB)
	)
	const allocated = await allocationUsecase.getAssessorAllocated(batchId)
	const requreiments = await allocationUsecase.getAssessorRequirement(batchId)
	if(allocated[`${type}_assessors` as keyof typeof allocated].length >= requreiments[`max${type}` as keyof typeof requreiments]) {
		return c.html(<AssessorBucketAllocation batchId={ batchId } assessor={ [] } type={ type } show={ false } />)
	}

	const freeAssessor = await GetFreeAssessorUsecase
		.create(
			BatchRepositoryImpl.create(c.env.DB),
			AssessorRepositoryImpl.create(c.env.DB)
		)
		.execute(batchId, type as "face" | "case" | "disc")

	return c.html(
		<AssessorBucketAllocation batchId={ batchId } assessor={ freeAssessor } type={ type } show={ show } />
	)
}