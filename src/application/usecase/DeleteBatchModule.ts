import { AppError } from "@src/application/error/AppError";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";

export class DeleteBatchModuleUsecase implements IUsecase<[string, string], void> {
	constructor(
		private readonly batchModuleRepo: BatchModuleRepository,
		private readonly regroupRepo: RegroupRepository,
		private readonly batchAssessorRepo: BatchAssessorRepository,
	) { }

	static create(
		batchModuleRepo: BatchModuleRepository,
		regroupRepo: RegroupRepository,
		batchAssessorRepo: BatchAssessorRepository,
	): DeleteBatchModuleUsecase {
		return new DeleteBatchModuleUsecase(batchModuleRepo, regroupRepo, batchAssessorRepo);
	}

	async execute(batchId: string, batchModuleId: string): Promise<void> {
		const module = await this.batchModuleRepo.getOne(batchId, batchModuleId)
		if (!module) throw AppError.notFound("Batch module not found", "Batch module not found")
		const type = ModuleCategoryMapping.fromString(module.module_category)

		try {
			await this.batchAssessorRepo.begin()

			if (type === ModuleCategory.DISC) {
				await this.batchAssessorRepo.unallocateGroupAll(batchId)
			} else if (type === ModuleCategory.CASE || type === ModuleCategory.FACE) {
				await this.batchAssessorRepo.unallocateGroupingAll(batchId, type)
			}
			await Promise.all([
				this.batchModuleRepo.deleteOne(batchModuleId),
				this.regroupRepo.setShouldRegroup(batchId),
			])

			await this.batchAssessorRepo.commit()
		} catch (err: any) {
			await this.batchAssessorRepo.rollback()
			throw AppError.unknown(err.message, "Internal Server Error")
		}
	}
}