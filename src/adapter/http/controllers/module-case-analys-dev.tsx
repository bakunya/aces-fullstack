import { ModuleCaseAnalysDevPage } from "@presenter/pages/module/case-analys-dev";
import { Context } from "@src/adapter/http/contracts/binding";
import { ElementUsecase } from "@src/application/usecase/Element";
import { GetCaseAnalysDataUseCase } from "@src/application/usecase/GetCaseAnalysData";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";
import { ElementRepositoryImpl } from "@src/infra/databases/d1/repositories/ElementRepositoryImpl";

export async function moduleCaseAnalysDevController(c: Context) {
	const elementRepo = ElementRepositoryImpl.create(c.env.DB)
	const caseAnalysRepo = CaseAnalysRepositoryImpl.create(c.env.DB)
	const elementUsecase = ElementUsecase.create(elementRepo)
	const getCaseAnalys = GetCaseAnalysDataUseCase.create(caseAnalysRepo, elementUsecase)

	const { elements, caseAnalys } = await getCaseAnalys.execute(c.req.param('id')) 
	const elementsMap = new Map(elements.map(e => [e.id, e]))

	return c.html(<ModuleCaseAnalysDevPage elements={elementsMap} caseAnalys={caseAnalys} />)
}