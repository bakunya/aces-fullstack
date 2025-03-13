import { BatchDTO } from "@src/application/dto/batch";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IBatch } from "@src/application/usecase-interface/IBatch";

export class BatchUsecase implements IBatch {
	constructor(private batchRepository: BatchRepository) { }

	async getById(id: string): Promise<BatchDTO> {
		return await this.batchRepository.getBatchById(id);
	}

	async getByToken(token: string): Promise<BatchDTO> {
		return await this.batchRepository.getBatchByToken(token);
	}
}