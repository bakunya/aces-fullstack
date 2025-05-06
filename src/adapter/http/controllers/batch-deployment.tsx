import { Context } from "@src/adapter/http/contracts/binding"
import { BatchDeploymentPage } from "@presenter/pages/aces/batch-deployment"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { DateImpl } from "@src/infra/date"
import { BatchDomain } from "@src/domain/Batch"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"
import { GetFilledSlotInBatch } from "@src/application/usecase/GetFilledSlotInBatch"

export async function batchDeploymentController(c: Context) {
	const batchId = c.req.param("batch_id")

	const [batchRaw] = await Promise.all([
		BatchRepositoryImpl.create(c.env.DB).getBatchById(batchId),
	])
	const batch = BatchDomain.create(batchRaw, DateImpl.create())

	const filledSlot = await GetFilledSlotInBatch.create(
		GroupRepositoryImpl.create(c.env.DB),
	).execute(batchId)

	return c.html(<BatchDeploymentPage batch={ batch } filledSlot={ filledSlot } />)
}
