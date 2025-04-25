import { BatchBatchPersonPage } from "@presenter/pages/aces/batch-person"
import { Context } from "@src/adapter/http/contracts/binding"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"

export async function batchBatchPersonController(c: Context) {
	const batchRepo = BatchRepositoryImpl.create(c.env.DB)
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const [batch, persons] = await Promise.all([
		batchRepo.getBatchById(c.req.param("batch_id")),
		personRepo.getByBatchId(c.req.param("batch_id")),
	])

	return c.html(<BatchBatchPersonPage batch={batch} persons={persons} />)
}
