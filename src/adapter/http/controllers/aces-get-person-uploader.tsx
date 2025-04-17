import { PersonUploader } from "@presenter/pages/aces/components/person-uploader";
import { Context } from "@src/adapter/http/contracts/binding";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetUploaderTableController(c: Context) {
	const batchId = c.req.param("batch_id")
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const persons = await personRepo.getCountByBatchId(batchId)
	
	return c.html(
		<PersonUploader
			batchId={ batchId }
			shouldShow={ !Boolean(persons) }
		/>
	)
}