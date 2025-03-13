import { BatchBatchDetailPage } from "@presenter/pages/batch/batch-detail"
import { Context } from "@src/adapter/http/contracts/binding"
import { BatchUsecase } from "@src/application/usecase/Batch"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"

export async function batchBatchDetailController(c: Context) {
	const usecase = new BatchUsecase(new BatchRepositoryImpl(c.env.DB))
	const batch = await usecase.getById(c.req.param("batch_id"))
	return c.html(<BatchBatchDetailPage batch={batch} />)
}
