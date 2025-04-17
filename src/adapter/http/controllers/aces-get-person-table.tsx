import { PersonTable } from "@presenter/pages/aces/components/person-table";
import { Context } from "@src/adapter/http/contracts/binding";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetPersonTableController(c: Context) {
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const persons = await personRepo.getByBatchId(c.req.param("batch_id"))

	return c.html(
		<PersonTable
			persons={ persons }
			shouldShow={ Boolean(persons?.length) }
		/>
	)
}