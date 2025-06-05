import { Date } from "@src/application/date";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { BatchDomain } from "@src/domain/Batch";

export class BatchUsecase implements IUsecase {
	constructor(
		private readonly batchRepository: BatchRepository,
		private readonly date: Date
	) { }

	async getById(batchId: string): Promise<BatchDomain> {
		const batchDTO = await this.batchRepository.getBatchById(batchId);
		return BatchDomain.create(batchDTO, this.date);
	}

	async getByToken(token: string): Promise<BatchDomain> {
		const batchDTO = await this.batchRepository.getBatchByToken(token);
		return BatchDomain.create(batchDTO, this.date);
	}

	async getByOrganizationId(organizationId: string): Promise<BatchDomain[]> {
		const batchDTOs = await this.batchRepository.getBatchesByOrganizationId(organizationId);
		return batchDTOs.map(batchDTO => BatchDomain.create(batchDTO, this.date));
	}

	async execute(): Promise<unknown> {
		throw new Error("Method not implemented.");
	}
}
