import { Context } from "@src/adapter/http/contracts/binding";
import { HxCaseAnalysMainContent, HxCaseAnalysMainContentUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-main-content";
import { CaseAnalysMainContentUsecase } from "@src/application/usecase/SaveCaseAnalysMainContent";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";

export async function hxModuleCaseAnalysDevMainContentController(c: Context) {
	const body = await c.req.parseBody() as HxCaseAnalysMainContent
	if(!body["main-content"]) return c.text("main-content is required", 400)
	
	const usecase = CaseAnalysMainContentUsecase.create(CaseAnalysRepositoryImpl.create(c.env.DB))
	await usecase.execute(c.req.param(HxCaseAnalysMainContentUrlParam.id), body["main-content"])

	c.res.headers.set("HX-Trigger", JSON.stringify({ 
		"caseAnalysMainContentReload": null, 
		"onSuccess": "Success update main content"
	}))
	return c.text("", 201)
}