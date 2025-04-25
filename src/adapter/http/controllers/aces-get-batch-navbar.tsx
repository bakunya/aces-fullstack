import { Context } from "@src/adapter/http/contracts/binding"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { BatchNav } from "@presenter/pages/aces/components/batch-nav"


export async function acesGetBatchNavbarController(c: Context) {
	const batchID = c.req.param("batch_id")
	const batch = await BatchRepositoryImpl.create(c.env.DB).getBatchById(batchID)

	return c.html(<BatchNav batch={ batch } />, 201)
}