import { HxCaseAnalysQuestionUpdate } from "@src/adapter/http/contracts/request/hx-case-analys-question";
import { AppError } from "@src/application/error/AppError";
import { CaseAnalysRepository } from "@src/application/repositories/CaseAnalysRepository";
import { Uuid } from "@src/application/uuid";

export class CaseAnalysQuestionUpdateUsecase {
	constructor(
		private readonly repo: CaseAnalysRepository,
		private readonly uuid: Uuid
	) { }

	static create(repo: CaseAnalysRepository, uuid: Uuid): CaseAnalysQuestionUpdateUsecase {
		return new CaseAnalysQuestionUpdateUsecase(repo, uuid)
	}

	async execute(questionId: number, data: HxCaseAnalysQuestionUpdate) {
		if(!Array.isArray(data["question-elements"])) {
			throw AppError.conversion("question-elements required", "Question elements must be an array")
		}
		if(data["question-elements"].length === 0) {
			throw AppError.request("question-elements required", "Question elements must not be empty")
		}
		if(isNaN(Number(data["question-sequence"]))) {
			throw AppError.conversion("question-sequence required", "Question sequence must be a number")
		}
		await this.repo.updateQuestion({
			questionId,
			questionContent: data["question-content"],
			questionElements: data["question-elements"].map(v => ({
				value: v,
				id: this.uuid.get()
			})),
			questionSequence: Number(data["question-sequence"])
		})
	}
}