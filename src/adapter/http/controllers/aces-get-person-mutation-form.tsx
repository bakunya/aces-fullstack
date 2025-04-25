import { FormPerson } from "@presenter/pages/aces/components/form-person";
import { Context } from "@src/adapter/http/contracts/binding";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetPersonMutationFormController(c: Context) {
	const batchRepo = BatchRepositoryImpl.create(c.env.DB)
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const [batch, personCount] = await Promise.all([
		batchRepo.getBatchById(c.req.param("batch_id")),
		personRepo.getCountByBatchId(c.req.param("batch_id")),
	])

	return c.html(
		<FormPerson
			batchId={ batch.uuid }
			shouldShow={ Boolean(personCount) }
		/>
	)
}