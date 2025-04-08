import { ElementRepository } from "@src/application/repositories/ElementRepository";
import { CaseAnalysElement } from "@src/domain/CaseAnalysElement";
import { TableCaseAnalysElement } from "@src/infra/databases/d1/dto/tables";

export class ElementRepositoryImpl implements ElementRepository {
	constructor(private readonly DB: D1Database) { }

	static create(DB: D1Database): ElementRepository {
		return new ElementRepositoryImpl(DB);
	}

	async getCaseAnalysElement(): Promise<CaseAnalysElement[]> {
		const data = (await this.DB.prepare("SELECT * FROM mod_ca_elements").all())
			.results as unknown as TableCaseAnalysElement[];
		return data.map(d => CaseAnalysElement.create(d.id, d.name, d.domain, d.description));
	}
}