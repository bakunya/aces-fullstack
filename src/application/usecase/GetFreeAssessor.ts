import { AssessorRepository } from "@src/application/repositories/AssessorRepository";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategoryMapping } from "@src/domain/ModuleType";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export class GetFreeAssessorUsecase implements IUsecase<[string, string], (TableAssessorBatch & { email: string, username: string, fullname: string })[]> {
	constructor(
		private readonly batchRepo: BatchRepository,
		private readonly assessorRepo: AssessorRepository,
	) { }

	static create(
		batchRepo: BatchRepository,
		assessorRepo: AssessorRepository,
	) {
		return new GetFreeAssessorUsecase(batchRepo, assessorRepo);
	}

	async execute(batchId: string, type: "face" | "case" | "disc") {
		const batchIds = (await this.batchRepo.getBatchIdInSameTimestamp(batchId)).map(v => v.uuid)
		const assessors = await this.assessorRepo.getFree([...batchIds, batchId], ModuleCategoryMapping.fromString(type));
		return assessors
	}
}