export type HxCaseAnalysQuestionUpdate = {
	['question-content']: string,
	['question-sequence']: string,
	['question-elements']: string | string[],
}

export enum HxCaseAnalysQuestionUrlParam {
	id = "id",
	assignmentId = "assignment_id"
}

export enum HxCaseAnalysQuestionUpdateUrlParam {
	id = "id",
	questionId = "question_id",
	assignmentId = "assignment_id",
}