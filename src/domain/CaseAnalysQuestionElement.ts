export class CaseAnalysQuestionElement {
	constructor(
		public readonly id: string,
		public readonly idElement: string,
		public readonly idModCaQuestion: string,
	) { }

	static create(id: string, idElement: string, idModCaQuestion: string): CaseAnalysQuestionElement {
		return new CaseAnalysQuestionElement(id, idElement, idModCaQuestion);
	}
}