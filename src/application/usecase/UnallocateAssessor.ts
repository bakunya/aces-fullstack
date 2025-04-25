import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";

export class UnallocateAssessorUsecase implements IUsecase<[string, string, string], void> {
	constructor(
		private groupingRepo: GroupingRepository,
		private batchAssessorRepo: BatchAssessorRepository,
	) { }

	static create(
		groupingRepo: GroupingRepository,
		batchAssessorRepo: BatchAssessorRepository,
	) {
		return new UnallocateAssessorUsecase(groupingRepo, batchAssessorRepo);
	}

	private async unallocateGroup(batchId: string, assessorId: string) {
		await this.batchAssessorRepo.unallocateGroups(batchId, assessorId);
	}

	private async unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory) {
		const current = await this.groupingRepo.getAllocated(batchId, assessorId, type);
		await this.batchAssessorRepo.unallocateGroupings(batchId, assessorId, type, current);
	}

	async execute(batchId: string, assessorId: string, typeRaw: string): Promise<void> {
		const type = ModuleCategoryMapping.fromString(typeRaw);
		if (type === ModuleCategory.DISC) {
			await this.unallocateGroup(batchId, assessorId);
		} else if (type === ModuleCategory.CASE || type === ModuleCategory.FACE) {
			await this.unallocateGroupings(batchId, assessorId, type);
		}
	}
}