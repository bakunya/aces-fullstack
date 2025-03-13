import { AcesModulesPage } from "@presenter/pages/aces/aces-modules"
import { Context } from "@src/adapter/http/contracts/binding"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"

export async function acesModulesController(c: Context) {
	const moduleImpl = ModuleRepositoryImpl.create(c.env.DB)
	const modules = await moduleImpl.getAll()
	return c.html(<AcesModulesPage modules={modules} />)
}