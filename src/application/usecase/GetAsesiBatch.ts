import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { Batch } from "@src/domain/Batch";
import { BatchModule } from "@src/domain/BatchModule";

export class GetAsesiUseCase {
	constructor(private batchRepository: BatchRepository) {}

	async execute(asesiId: string): Promise<{ batch: Batch, modules: BatchModule[] }> {
		return await this.batchRepository.getBatchDetailByAsesiId(asesiId);
	}
}