import { Context } from "@src/adapter/http/contracts/binding";
import { HxCaseAnalysAssignmentUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-assignment";
import { CaseAnalysNewAssignmentUsecase } from "@src/application/usecase/CaseAnalysNewAssignment";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";

export async function hxModuleCaseAnalysAssignmentController(c: Context) {
	const modId = c.req.param(HxCaseAnalysAssignmentUrlParam.id)

	const usecase = CaseAnalysNewAssignmentUsecase.create(CaseAnalysRepositoryImpl.create(c.env.DB))
	await usecase.execute(modId)
	
	c.res.headers.set("HX-Trigger", JSON.stringify({ 
		"caseAnalysAssignmentListReload": null, 
		"onSuccess": "Success create new assignment"
	}))
	return c.text("", 201)
}