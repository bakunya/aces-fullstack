import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { Batch } from "@src/domain/Batch";

export class GetAsesorUseCase {
	constructor(private batchRepository: BatchRepository) {}

	async execute(asesorId: string): Promise<Batch[]> {
		return await this.batchRepository.getBatchByAsesorId(asesorId);
	}
}