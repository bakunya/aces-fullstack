import { BatchRepository } from "@src/application/repositories/BatchRepository";

export class UpdateBatchTitleUsecase {
	constructor(private readonly batchRepository: BatchRepository) {}

	async execute(batchId: string, title: string) {
		await this.batchRepository.updateTitle(batchId, title)
	}
}
