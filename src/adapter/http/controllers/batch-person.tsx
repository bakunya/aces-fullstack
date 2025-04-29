import { BatchBatchPersonPage } from "@presenter/pages/aces/batch-person"
import { Context } from "@src/adapter/http/contracts/binding"
import { Crypto } from "@src/infra/crypto"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"

export async function batchBatchPersonController(c: Context) {
	const batchRepo = BatchRepositoryImpl.create(c.env.DB)
	const personRepo = PersonRepositoryImpl.create(c.env.DB)
	const [batch, personRaw] = await Promise.all([
		batchRepo.getBatchById(c.req.param("batch_id")),
		personRepo.getByBatchId(c.req.param("batch_id")),
	])
	const persons = await Promise.all(personRaw.map(async (person) => {
		await person.decrypt(Crypto.create(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY))
		return person
	}))

	return c.html(<BatchBatchPersonPage batch={batch} persons={persons} />)
}
