import { ModuleBinding } from "@src/application/bindings/ModuleBinding";
import { AppError } from "@src/application/error/AppError";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { match } from "ts-pattern";

export class DeleteBatchModuleUsecase implements IUsecase<[string, string], void> {
	constructor(
		private readonly batchModuleRepo: BatchModuleRepository,
		private readonly regroupRepo: RegroupRepository,
		private readonly batchAssessorRepo: BatchAssessorRepository,
		private readonly moduleBind: ModuleBinding
	) { }

	static create(
		batchModuleRepo: BatchModuleRepository,
		regroupRepo: RegroupRepository,
		batchAssessorRepo: BatchAssessorRepository,
		moduleBind: ModuleBinding
	): DeleteBatchModuleUsecase {
		return new DeleteBatchModuleUsecase(batchModuleRepo, regroupRepo, batchAssessorRepo, moduleBind);
	}

	async execute(batchId: string, batchModuleId: string): Promise<void> {
		const modules = await this.moduleBind.getAll()
		const module = await this.batchModuleRepo.getOne(batchId, batchModuleId, modules)
		console.log("module", module)
		if (!module) throw AppError.notFound("Batch module not found", "Batch module not found")
		const type = ModuleCategoryMapping.fromString(module.module_category)

		const prepared = await match(type)
			.with(ModuleCategory.DISC, () => this.batchAssessorRepo.unallocateGroupAll(batchId, true))
			.with(ModuleCategory.CASE, () => this.batchAssessorRepo.unallocateGroupingAll(batchId, type as ModuleCategory.CASE, true))
			.with(ModuleCategory.FACE, () => this.batchAssessorRepo.unallocateGroupingAll(batchId, type as ModuleCategory.FACE, true))
			.otherwise(() => Promise.resolve([]))

		const prepareDelete = await this.batchModuleRepo.deleteOne(batchModuleId, true)
		const prepareShouldRegroup = await this.regroupRepo.setShouldRegroup(batchId, true)

		await this.batchModuleRepo.commit([
			...prepared,
			...prepareDelete,
			...prepareShouldRegroup,
		])
	}
}