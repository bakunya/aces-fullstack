import { AssessorBucketAllocation } from "@presenter/pages/aces/components/assessor-bucket-allocation";
import { Context } from "@src/adapter/http/contracts/binding";
import { GetFreeAssessorUsecase } from "@src/application/usecase/GetFreeAssessor";
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";

export async function acesGetAssessorBucketAllocationController(c: Context) {
	const body = await c.req.parseBody()
	const type = body.type as string
	const batchId = c.req.param("batch_id")
	const show = type ? body.show === "true" : false

	if (!show) return c.html(<AssessorBucketAllocation batchId={batchId} assessor={ [] } type={type} show={ false } />)

	const freeAssessor = await GetFreeAssessorUsecase
		.create(
			BatchRepositoryImpl.create(c.env.DB),
			AssessorRepositoryImpl.create(c.env.DB)
		)
		.execute(batchId, type as "face" | "case" | "disc")

	return c.html(
		<AssessorBucketAllocation batchId={batchId} assessor={ freeAssessor } type={type} show={ show } />
	)
}