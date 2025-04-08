import { CaseAnalysElement } from "@src/domain/CaseAnalysElement";

export interface ElementRepository {
	getCaseAnalysElement(): Promise<CaseAnalysElement[]>;
}