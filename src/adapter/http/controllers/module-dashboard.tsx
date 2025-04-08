import { ModuleDashboardPage } from "@presenter/pages/module/module-dashboard";
import { Context } from "@src/adapter/http/contracts/binding";
import { User } from "@src/domain/User";
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl";

export async function moduleDashboardController(c: Context) {
	const uuid = (c.var.decodedToken as unknown as User)?.uuid!
	const repo = ModuleRepositoryImpl.create(c.env.DB)
	const data = await repo.getModuleByDeveloper(uuid)
	
	return c.html(<ModuleDashboardPage modules={data} />)
}