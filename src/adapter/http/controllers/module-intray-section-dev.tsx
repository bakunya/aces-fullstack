import { ModuleIntrayDevPage } from "@presenter/pages/module/intray-dev";
import { Context } from "@src/adapter/http/contracts/binding";
import { IntrayDevUrlParam } from "@src/adapter/http/contracts/request/intray-dev";
import { IntrayDevSectionUrlParam } from "@src/adapter/http/contracts/request/intray-dev-section";
import { IntrayTable, IntrayTableMapping, IntrayTableString } from "@src/application/repositories/IntrayRepository";
import { IntrayRepositoryImpl } from "@src/infra/databases/d1/repositories/IntrayRepositoryImpl";
import { ModuleRepositoryImpl } from "@src/infra/databases/d1/repositories/ModuleRepositoryImpl";

export async function moduleIntraySectionDevController(c: Context) {
	const modId = c.req.param(IntrayDevUrlParam.id)
	
	const repo = ModuleRepositoryImpl.create(c.env.DB)
	const module = await repo.getById(modId)

	const intrayRepo = IntrayRepositoryImpl.create(c.env.DB)
	const sectionType = IntrayTableMapping.getKeyFromString(`mod_${c.req.param(IntrayDevSectionUrlParam.sectionType)}`) as IntrayTableString
	const data = await intrayRepo.getSection(modId, sectionType)

	const allPath = Object.entries(IntrayTable).map(([key, val]) => ({
		path: key.replaceAll("mod_", ""),
		name: val,
	}))

	
	return c.html(<ModuleIntrayDevPage paths={allPath} module={module} sectionType={sectionType} intray={data} />)
}