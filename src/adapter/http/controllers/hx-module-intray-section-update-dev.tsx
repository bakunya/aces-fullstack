import { Context } from "@src/adapter/http/contracts/binding";
import { HxIntrayDevSectionUpdateUrlParam } from "@src/adapter/http/contracts/request/hx-intray-dev-section-update";
import { IntrayTableMapping, IntrayTableString } from "@src/application/repositories/IntrayRepository";
import { IntraySectionUpdateUsecase } from "@src/application/usecase/IntraySectionUpdate";
import { IntrayRepositoryImpl } from "@src/infra/databases/d1/repositories/IntrayRepositoryImpl";

export async function hxModuleIntraySectionUpdateDevController(c: Context) {
	const body = await c.req.parseBody()
	const sectionType = IntrayTableMapping.getKeyFromString(`mod_${c.req.param(HxIntrayDevSectionUpdateUrlParam.sectionType)}`) as IntrayTableString
	
	const usecase = IntraySectionUpdateUsecase.create(IntrayRepositoryImpl.create(c.env.DB))
	await usecase.execute(body, IntrayTableMapping.getFromKeyString(sectionType))

	c.res.headers.set("HX-Trigger", JSON.stringify({ 
		"intraySectionDevReload": null, 
		"onSuccess": "Success update intray section"
	}))
	return c.text("", 201)
}