import { FormPerson } from "@presenter/pages/aces/components/form-person";
import { Context } from "@src/adapter/http/contracts/binding";
import { BatchUsecase } from "@src/application/usecase/Batch";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetPersonMutationFormController(c: Context) {
	const usecase = new BatchUsecase(new BatchRepositoryImpl(c.env.DB))
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const [batch, personCount] = await Promise.all([
		usecase.getById(c.req.param("batch_id")),
		personRepo.getCountByBatchId(c.req.param("batch_id")),
	])

	return c.html(
		<FormPerson
			batchId={ batch.uuid }
			shouldShow={ Boolean(personCount) }
		/>
	)
}