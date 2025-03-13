import { AcesModulesPageNew } from "@presenter/pages/aces/aces-modules-new"
import { Context } from "@src/adapter/http/contracts/binding"
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl"
import { UserRepositoryImpl } from "@src/infra/databases/d1/repositories/UserRepositoryImpl"

export async function acesNewModulesController(c: Context) {
	const moduleImpl = ModuleRepositoryImpl.create(c.env.DB)
	const userImpl = UserRepositoryImpl.create(c.env.DB)

	const [modules, users] = await Promise.all([moduleImpl.getAllModuleType(), userImpl.getOnlyModules()])
	
	// @ts-ignore
	return c.html(<AcesModulesPageNew users={users} modules={modules} />)
}