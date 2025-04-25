import { BatchAssessorPage } from "@presenter/pages/aces/batch-assessor"
import { Context } from "@src/adapter/http/contracts/binding"
import { GetAllocation } from "@src/application/usecase/GetAllocation"
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"

export async function batchAssessorsController(c: Context) {
	const batchRepo = BatchRepositoryImpl.create(c.env.DB)
	const [batch] = await Promise.all([
		batchRepo.getBatchById(c.req.param("batch_id")),
	])

	const allocationUsecase = GetAllocation.create(
		GroupRepositoryImpl.create(c.env.DB), 
		AssessorRepositoryImpl.create(c.env.DB)
	)
	const allocation = await allocationUsecase.execute(c.req.param("batch_id"))
	
	return c.html(<BatchAssessorPage allocation={allocation} batch={batch} />)
}
