import { Context } from "@src/adapter/http/contracts/binding";
import { HxHeaderUpdateBatchTitle } from "@src/adapter/http/contracts/response/hx-header-update-batch-title";
import { UpdateBatchTitleUsecase } from "@src/application/usecase/UpdateBatchTitle";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";

export async function batchHxUpdateBatchController(c: Context) {
	const batchId = c.req.param("batch_id")
	const body = await c.req.parseBody() as { title: string }
	
	const updateBatchTitle = new UpdateBatchTitleUsecase(new BatchRepositoryImpl(c.env.DB))
	await updateBatchTitle.execute(batchId, body.title)

	const header: HxHeaderUpdateBatchTitle = {
		onUpdateBatchTitleSuccess: body.title
	}
	c.res.headers.set("HX-Trigger", JSON.stringify(header))
	return c.html(`<h1 class="text-2xl font-bold" id="batch-title">Batch ${body.title}</h1>`)
}
