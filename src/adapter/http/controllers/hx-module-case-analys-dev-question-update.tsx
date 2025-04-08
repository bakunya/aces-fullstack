import { Context } from "@src/adapter/http/contracts/binding";
import { CaseAnalysQuestionUpdateUsecase } from "@src/application/usecase/CaseAnalysUpdateQuestion";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";
import { HxCaseAnalysQuestionUpdate, HxCaseAnalysQuestionUpdateUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-question";
import { UuidImpl } from "@src/infra/utils/Uuid";
import { ulidFactory } from "ulid-workers";

export async function hxModuleCaseAnalysQuestionUpdateController(c: Context) {
	const questionId = c.req.param(HxCaseAnalysQuestionUpdateUrlParam.questionId)

	const body = await c.req.parseBody() as HxCaseAnalysQuestionUpdate
	body["question-elements"] = JSON.parse(body["question-elements"] as string)

	const usecase = CaseAnalysQuestionUpdateUsecase.create(CaseAnalysRepositoryImpl.create(c.env.DB), UuidImpl.create(ulidFactory()))
	await usecase.execute(Number(questionId), body)

	
	c.res.headers.set("HX-Trigger", JSON.stringify({ 
		"caseAnalysMainContentReload": null, 
		"onSuccess": "Success update main content"
	}))
	return c.text("", 201)
}