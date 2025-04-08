import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";

export class CaseAnalysNewQuestionUsecase {
	constructor(
		private readonly repo: CaseAnalysRepository
	) {}

	static create(repo: CaseAnalysRepository) {
		return new CaseAnalysNewQuestionUsecase(repo)
	}

	async execute(id: string, assignmentId: string) {
		await this.repo.newQuestion(id, assignmentId)
	}
}