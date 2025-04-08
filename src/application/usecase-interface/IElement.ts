import { CaseAnalysElement } from "@src/domain/CaseAnalysElement";

export interface IElement {
	getCaseAnalysElement(): Promise<CaseAnalysElement[]>
}