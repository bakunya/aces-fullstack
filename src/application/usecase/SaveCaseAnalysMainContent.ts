import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";

export class CaseAnalysMainContentUsecase {
	constructor(
		private readonly caseAnalysRepository: CaseAnalysRepository
	) {}

	static create(caseAnalysRepository: CaseAnalysRepository): CaseAnalysMainContentUsecase {
		return new CaseAnalysMainContentUsecase(caseAnalysRepository);
	}
	
	async execute(moduleId: string, mainContent: string): Promise<void> {
		await this.caseAnalysRepository.saveMainContent(moduleId, mainContent)
	}
}