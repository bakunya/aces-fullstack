import { HxCaseAnalysAssignmentUpdate } from "@src/adapter/http/contracts/request/hx-case-analys-assignment";
import { AppError } from "@src/application/error/AppError";
import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";

export class CaseAnalysAssignmentUpdateUsecase {
	constructor(
		private readonly repo: CaseAnalysRepository
	) {}

	static create(repo: CaseAnalysRepository) {
		return new CaseAnalysAssignmentUpdateUsecase(repo)
	}

	async execute(moduleId: string, assignmentId: string, data: HxCaseAnalysAssignmentUpdate) {
		if (isNaN(Number(data["assignment-sequence"]))) {
			throw AppError.conversion("Assignment Sequence is NaN", "Assignment sequence must be a number")
		}
		await this.repo.updateAssignment({
			moduleId,
			assignmentId,
			assignmentTitle: data["assignment-title"],
			assignmentContent: data["assignment-content"],
			assignmentSequence: Number(data["assignment-sequence"]),
		})
	}
}