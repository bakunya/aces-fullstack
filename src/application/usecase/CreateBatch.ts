import { CreateBatchRequest } from "@src/adapter/http/contracts/request/create-batch";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { Uuid } from "@src/application/uuid";
import { CreateBatch } from "@src/domain/CreateBatch";

export class CreateBatchUsecase {
	constructor(private readonly batchRepository: BatchRepository, private readonly uuid: Uuid) { }

	async execute(request: CreateBatchRequest): Promise<string> {
		const prevToken = await this.batchRepository.getLastBatchToken();
		const batch = CreateBatch
			.create(this.uuid.get(), request.organization_uuid, request.title)
			.createNextToken(prevToken);
		await this.batchRepository.createBatch(batch);
		return batch.uuid;
	}
}