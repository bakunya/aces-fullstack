import { PersonManagement } from "@presenter/pages/aces/components/person-management";
import { Context } from "@src/adapter/http/contracts/binding";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetUploaderManagementController(c: Context) {
	const batchId = c.req.param("batch_id")
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const persons = await personRepo.getByBatchId(batchId)

	return c.html(
		<PersonManagement
			batchId={ batchId }
			persons={ persons }
		/>
	)
}