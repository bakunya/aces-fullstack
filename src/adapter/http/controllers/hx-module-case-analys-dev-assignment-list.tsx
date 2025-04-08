import { CaseAnalysAssignmentList } from "@presenter/components/case-analys-assignment-list";
import { Context } from "@src/adapter/http/contracts/binding";
import { HxCaseAnalysAssignmentUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-assignment";
import { ElementUsecase } from "@src/application/usecase/Element";
import { GetCaseAnalysDataUseCase } from "@src/application/usecase/GetCaseAnalysData";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";
import { ElementRepositoryImpl } from "@src/infra/databases/d1/repositories/ElementRepositoryImpl";

export async function hxModuleCaseAnalysAssignmentListController(c: Context) {
	const modId = c.req.param(HxCaseAnalysAssignmentUrlParam.id)
	
	const elementRepo = ElementRepositoryImpl.create(c.env.DB)
	const caseAnalysRepo = CaseAnalysRepositoryImpl.create(c.env.DB)
	const elementUsecase = ElementUsecase.create(elementRepo)
	const getCaseAnalys = GetCaseAnalysDataUseCase.create(caseAnalysRepo, elementUsecase)

	const { elements, caseAnalys } = await getCaseAnalys.execute(modId) 
	const elementsMap = new Map(elements.map(e => [e.id, e]))

	return c.html(<CaseAnalysAssignmentList caseAnalys={caseAnalys} elements={elementsMap} />)
}