export class CaseAnalysElement {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly domain: string,
		public readonly description: string,
	) { }

	static create(id: string, name: string, domain: string, description: string): CaseAnalysElement {
		return new CaseAnalysElement(id, name, domain, description);
	}
}