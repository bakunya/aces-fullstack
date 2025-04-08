import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";

export class CaseAnalysNewAssignmentUsecase {
	constructor(
		private readonly repo: CaseAnalysRepository
	) {}

	static create(repo: CaseAnalysRepository) {
		return new CaseAnalysNewAssignmentUsecase(repo)
	}

	async execute(id: string) {
		await this.repo.newAssignment(id)
	}
}