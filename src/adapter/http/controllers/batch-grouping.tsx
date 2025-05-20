import { BatchGroupingsPage } from "@presenter/pages/aces/batch-groupings"
import { Context } from "@src/adapter/http/contracts/binding"
import { ModuleBindingImpl } from "@src/infra/bindings/ModuleBindingImpl"
import { BatchModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchModuleRepositoryImpl"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl"

export async function batchGroupingController(c: Context) {
	const batchId = c.req.param("batch_id")

	const moduleFromTest = await ModuleBindingImpl.create(c.env.WEB_TEST, c.env.WEB_TEST_API_KEY).getAll()
	const [groups, batch, persons, modules] = await Promise.all([
		GroupRepositoryImpl.create(c.env.DB).getDetail(batchId),
		BatchRepositoryImpl.create(c.env.DB).getBatchById(batchId),
		PersonRepositoryImpl.create(c.env.DB).getDetailInBatch(batchId),
		BatchModuleRepositoryImpl.create(c.env.DB).getAllDetailByBatch(batchId, moduleFromTest),
	])

	return c.html(<BatchGroupingsPage batch={batch} groups={ groups } persons={ persons } modules={ modules } />)
}
