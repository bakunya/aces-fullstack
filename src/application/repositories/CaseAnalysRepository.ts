import { CaseAnalysQuestionElement } from "@src/domain/CaseAnalysQuestionElement";
import { CaseAnalysQuestion } from "@src/domain/CaseAnalysQuestion";
import { ModuleInitializer } from "@src/application/repositories/ModuleRepository";

export type TCaseAnalysUpdateAssignment = {
	moduleId: string,
	assignmentId: string,
	assignmentTitle: string,
	assignmentContent: string,
	assignmentSequence: number,
}

export type TCaseAnalysUpdateQuestion = {
	questionId: number,
	questionContent: string,
	questionSequence: number,
	questionElements: { value: string, id: string }[],
}

export interface CaseAnalysRepository extends ModuleInitializer {
	getCaseAnalysData(id: string): Promise<CaseAnalysQuestion[]>;
	getUsedElements(questionIds: string[]): Promise<CaseAnalysQuestionElement[]>;
	saveMainContent(moduleId: string, mainContent: string): Promise<void>;
	getMainContent(moduleId: string): Promise<string>;
	newAssignment(moduleId: string): Promise<void>
	newQuestion(moduleId: string, assignmentId: string): Promise<void>
	updateAssignment(data: TCaseAnalysUpdateAssignment): Promise<void>
	updateQuestion(data: TCaseAnalysUpdateQuestion): Promise<void>
}