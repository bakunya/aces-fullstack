import { PersonManagement } from "@presenter/pages/aces/components/person-management";
import { Context } from "@src/adapter/http/contracts/binding";
import { Crypto } from "@src/infra/crypto";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function acesGetUploaderManagementController(c: Context) {
	const batchId = c.req.param("batch_id")
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const personsRaw = await personRepo.getByBatchId(batchId)
	const persons = await Promise.all(personsRaw.map(async (person) => {
		await person.decrypt(Crypto.create(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY))
		return person
	}))

	return c.html(
		<PersonManagement
			batchId={ batchId }
			persons={ persons }
		/>
	)
}