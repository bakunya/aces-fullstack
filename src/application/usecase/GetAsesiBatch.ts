import { TBatchAsesi } from "@src/application/dto/TBatchAsesi";
import { TBatchModule } from "@src/application/dto/TBatchModule";
import { BatchRepository } from "@src/application/repositories/BatchRepository";

export class GetAsesiUseCase {
	constructor(private batchRepository: BatchRepository) { }

	async execute(asesiId: string): Promise<{ batch: TBatchAsesi, modules: TBatchModule[] }> {
		return await this.batchRepository.getBatchDetailByAsesiId(asesiId);
	}
}