import { HxCreateBatchModule } from "@src/adapter/http/contracts/request/hx-create-batch-module";
import { AppError } from "@src/application/error/AppError";
import { BatchModuleDetail, BatchModuleRepository, InsertOneData } from "@src/application/repositories/BatchModuleRepository";
import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { Uuid } from "@src/application/uuid";

export class CreateBatchModuleUsecase implements IUsecase<[string, HxCreateBatchModule], void> {
	constructor(
		private readonly batchModuleRepository: BatchModuleRepository, // Replace with actual type
		private readonly uuid: Uuid, // Replace with actual type
		private readonly regroupRepo: RegroupRepository
	) {}

	static create(
		batchModuleRepository: BatchModuleRepository,
		uuid: Uuid,
		regroupRepo: RegroupRepository,
	): CreateBatchModuleUsecase {
		return new CreateBatchModuleUsecase(batchModuleRepository, uuid, regroupRepo);
	}

	async execute(batchId: string, body: HxCreateBatchModule) {
		const usedModule = await this.batchModuleRepository.getAllDetailByBatch(batchId);
		if (!this.shouldMaxModule(usedModule)) {
			throw AppError.usecase("max limit module", "Maximum module limit reached");
		}
		if (!this.faceModuleShouldSingle(usedModule) && body.module_category === "FACE") {
			throw AppError.usecase("only one face module allowed", "Only one face module is allowed");
		}
		if (!this.discModuleShouldSingle(usedModule) && body.module_category === "DISC") {
			throw AppError.usecase("only one disc module allowed", "Only one disc module is allowed");
		}

		const insertOneData: InsertOneData = {
			priority: null,
			uuid: this.uuid.get(),
			batch_uuid: batchId,
			module_uuid: body.module,
		}

		await Promise.allSettled([
			this.batchModuleRepository.insertOne(insertOneData),
			this.regroupRepo.setShouldRegroup(batchId),
		])
		
	}

	private shouldMaxModule(data: BatchModuleDetail[], max = 4) {
		const totalModule = data.length
		if (totalModule >= max) {
			return false
		}
		return true
	}

	private faceModuleShouldSingle(data: BatchModuleDetail[]) {
		const faceModule = data.filter((item) => item.module_category === "FACE")
		if (!faceModule.length) return true
		if (faceModule.length >= 1) return false
	}

	private discModuleShouldSingle(data: BatchModuleDetail[]) {
		const discModule = data.filter((item) => item.module_category === "DISC")
		if (!discModule.length) return true
		if (discModule.length >= 1) return false
	}
}