import { AppError } from "@src/application/error/AppError";
import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";
import { IElement } from "@src/application/usecase-interface/IElement";
import { CaseAnalysQuestionElement } from "@src/domain/CaseAnalysQuestionElement";
import { CaseAnalysQuestion } from "@src/domain/CaseAnalysQuestion";
import { CaseAnalysElement } from "@src/domain/CaseAnalysElement";

export class GetCaseAnalysDataUseCase {
	constructor(private readonly repository: CaseAnalysRepository, private readonly elementUsecase: IElement) { }

	static create(repository: CaseAnalysRepository, elementUsecase: IElement): GetCaseAnalysDataUseCase {
		return new GetCaseAnalysDataUseCase(repository, elementUsecase);
	}

	async execute(id: string): Promise<{ elements: CaseAnalysElement[], caseAnalys: CaseAnalysQuestion[] }> {
		const [caseAnalys, elements] = await Promise.all([
			this.repository.getCaseAnalysData(id),
			this.elementUsecase.getCaseAnalysElement()
		]);
		
		if (!caseAnalys?.length) {
			throw AppError.notFound("Case Analys not found");
		}

		const questionIds = caseAnalys.map(q => q.questionId).filter(Boolean);
		const usedElements = await this.repository.getUsedElements(questionIds.map(v => v.toString()));
		
		const caseAnalysWithElements = caseAnalys.map(q => {
			const case_analys_element = usedElements
				.filter(e => e.idModCaQuestion == q.questionId)
				.map(x => CaseAnalysQuestionElement.create(x.id, x.idElement, x.idModCaQuestion))
			return q.addCaseAnalysElement(case_analys_element);
		});

		return { 
			elements, 
			caseAnalys: caseAnalysWithElements 
		};
	}
}