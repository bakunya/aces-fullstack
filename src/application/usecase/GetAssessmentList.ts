import { Date } from "@src/application/date"
import { BatchRepository } from "@src/application/repositories/BatchRepository"
import { BatchAssessment } from "@src/domain/BatchAssessment"

export class GetAssessmentListUsecase {
	constructor(private readonly batchRepository: BatchRepository, private readonly date: Date) {}

	async execute(): Promise<BatchAssessment[]> {
		const data = await this.batchRepository.getAssessmentList()
		return data.map(itm => itm.formatDate((str: string) => this.date.to(str)))
	}
}
