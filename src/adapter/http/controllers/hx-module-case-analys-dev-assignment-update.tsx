import { Context } from "@src/adapter/http/contracts/binding";
import { CaseAnalysAssignmentUpdateUsecase } from "@src/application/usecase/CaseAnalysUpdateAssignment";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";
import { HxCaseAnalysAssignmentUpdate, HxCaseAnalysAssignmentUpdateUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-assignment";

export async function hxModuleCaseAnalysAssignmentUpdateController(c: Context) {
	const modId = c.req.param(HxCaseAnalysAssignmentUpdateUrlParam.id)
	const assignmentId = c.req.param(HxCaseAnalysAssignmentUpdateUrlParam.assignmentId)
	const body = await c.req.parseBody() as HxCaseAnalysAssignmentUpdate

	const usecase = CaseAnalysAssignmentUpdateUsecase.create(CaseAnalysRepositoryImpl.create(c.env.DB))
	await usecase.execute(modId, assignmentId, body)

	c.res.headers.set("HX-Trigger", JSON.stringify({ 
		"caseAnalysAssignmentListReload": null, 
		"onSuccess": "Success update assignment"
	}))
	return c.text("", 201)
}