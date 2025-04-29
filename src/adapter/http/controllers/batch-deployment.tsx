import { Context } from "@src/adapter/http/contracts/binding"
import { BatchDeploymentPage } from "@presenter/pages/aces/batch-deployment"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { BatchDomain } from "@src/domain/Batch"
import { DateImpl } from "@src/infra/date"
 
export async function batchDeploymentController(c: Context) {
	const batchId = c.req.param("batch_id")

	const [batchRaw] = await Promise.all([
		BatchRepositoryImpl.create(c.env.DB).getBatchById(batchId),
	])
	const batch = BatchDomain.create(batchRaw, DateImpl.create())

	return c.html(<BatchDeploymentPage batch={ batch } />)
}
