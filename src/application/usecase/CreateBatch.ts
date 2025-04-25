import { CreateBatchRequest } from "@src/adapter/http/contracts/request/create-batch";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { Uuid } from "@src/application/uuid";
import { CreateBatch } from "@src/domain/CreateBatch";

export class CreateBatchUsecase implements IUsecase<[CreateBatchRequest], string> {
	constructor(private readonly batchRepository: BatchRepository, private readonly uuid: Uuid) { }

	async execute(request: CreateBatchRequest) {
		const prevToken = await this.batchRepository.getLastBatchToken();
		const batch = CreateBatch
			.create(this.uuid.get(), request.organization_uuid, request.title)
			.createNextToken(prevToken);
		await this.batchRepository.createBatch(batch);
		return batch.uuid;
	}
}