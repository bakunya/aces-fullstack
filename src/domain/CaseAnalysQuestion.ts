import { CaseAnalysQuestionElement } from "@src/domain/CaseAnalysQuestionElement";

export class CaseAnalysQuestion {
	constructor(
		public readonly modUuid: string,
		public readonly modTitle: string,
		public readonly mainContent: string,
		public readonly assignmentId: string,
		public readonly assignmentTitle: string,
		public readonly assignmentContent: string,
		public readonly questionId: string,
		public readonly questionContent: string,
		public readonly questionSequence: number,
		public readonly assignmentSequence: number,
		public readonly caseAnalysElement?: CaseAnalysQuestionElement[]
	) { }

	static create(
		modUuid: string,
		modTitle: string,
		mainContent: string,
		assignmentId: string,
		assignmentTitle: string,
		assignmentContent: string,
		questionId: string,
		questionContent: string,
		questionSequence: number,
		assignmentSequence: number,

	): CaseAnalysQuestion {
		return new CaseAnalysQuestion(
			modUuid,
			modTitle,
			mainContent,
			assignmentId,
			assignmentTitle,
			assignmentContent,
			questionId,
			questionContent,
			questionSequence,
			assignmentSequence,
		);
	}

	addCaseAnalysElement(caseAnalysElement: CaseAnalysQuestionElement[]): CaseAnalysQuestion {
		return new CaseAnalysQuestion(
			this.modUuid,
			this.modTitle,
			this.mainContent,
			this.assignmentId,
			this.assignmentTitle,
			this.assignmentContent,
			this.questionId,
			this.questionContent,
			this.questionSequence,
			this.assignmentSequence,
			caseAnalysElement,
		);
	}
}