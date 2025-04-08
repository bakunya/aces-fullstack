import { ElementRepository } from "@src/application/repositories/ElementRepository";
import { IElement } from "@src/application/usecase-interface/IElement";
import { CaseAnalysElement } from "@src/domain/CaseAnalysElement";

export class ElementUsecase implements IElement {
	constructor(private repository: ElementRepository) { }

	static create(repository: ElementRepository): ElementUsecase {
		return new ElementUsecase(repository);
	}

	async getCaseAnalysElement(): Promise<CaseAnalysElement[]> {
		return this.repository.getCaseAnalysElement();
	}
}