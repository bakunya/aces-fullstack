import { Context } from "@src/adapter/http/contracts/binding";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";
import { HxCaseAnalysQuestionUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-question";
import { CaseAnalysNewQuestionUsecase } from "@src/application/usecase/CaseAnalysNewQuestion";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";

export async function hxModuleCaseAnalysNewQuestionController(c: Context) {
	const modId = c.req.param(HxCaseAnalysQuestionUrlParam.id)
	const assignmentId = c.req.param(HxCaseAnalysQuestionUrlParam.assignmentId)

	const usecase = CaseAnalysNewQuestionUsecase.create(CaseAnalysRepositoryImpl.create(c.env.DB))
	await usecase.execute(modId, assignmentId)

	const trigger: Record<string, any> = { onSuccess: "Success create question" }
	trigger[`${HTMX_EVENTS.MODULE_GetCaseAnalysAssignmentList}`] = true

	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))
	return c.text("", 201)
}