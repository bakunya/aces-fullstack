import { AppError } from "@src/application/error/AppError";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { IAllocateAssessor } from "@src/application/usecase-interface/IAllocateAssessor";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { getSlotPosition } from "@src/application/utils/get-slot-position";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";

export class AllocateAssessorUsecase implements IAllocateAssessor, IUsecase<[string, string, string], void> {
	constructor(
		private readonly batchAssessorRepo: BatchAssessorRepository,
		private readonly groupRepo: GroupRepository,
		private readonly groupingRepo: GroupingRepository,
	) { }

	static create(
		batchAssessorRepo: BatchAssessorRepository,
		groupRepo: GroupRepository,
		groupingRepo: GroupingRepository,
	) {
		return new AllocateAssessorUsecase(batchAssessorRepo, groupRepo, groupingRepo);
	}

	private async allocateGroupAssessor(assessorId: string, batchId: string, type: ModuleCategory) {
		const allocation = await this.groupRepo.getSlotAllocationInBatch(batchId);
		const groupPositions = this.getGroupPosition(type, allocation);
		const unallocated = await this.groupRepo.getUnallocated(batchId, groupPositions);
		await this.groupRepo.allocateAssessorInAllSlot(assessorId, batchId, unallocated)
	}

	private async allocateGroupingAssessor(assessorId: string, batchId: string, type: ModuleCategory) {
		const allocation = await this.groupRepo.getSlotAllocationInBatch(batchId);
		const groupPositions = this.getGroupPosition(type, allocation);
		const unallocated = await this.groupingRepo.getUnallocated(batchId, type, groupPositions);
		await this.groupingRepo.allocateAssessorInAllSlot(assessorId, batchId, type, unallocated)
	}

	getGroupPosition(type: ModuleCategory, groups: RawGroupAllocation[]) {
		return Object
			.values(getSlotPosition<string>(groups, type, "group_id"))
			.filter(v => v.length)
	}

	getGroupPositionAsObject(type: ModuleCategory, groups: RawGroupAllocation[]) {
		return getSlotPosition<string>(groups, type, "group_id")
	}

	async execute(batchId: string, userId: string, type: string) {
		const category = ModuleCategoryMapping.fromString(type);

		try {
			await this.groupRepo.begin();

			const batchAssessor = BatchAssessorDomain.create(batchId, userId, type);
			await this.batchAssessorRepo.allocate(batchAssessor);

			if (category === ModuleCategory.DISC) {
				await this.allocateGroupAssessor(userId, batchId, category);
			} else if (category === ModuleCategory.FACE || category === ModuleCategory.CASE) {
				await this.allocateGroupingAssessor(userId, batchId, category);
			}

			await this.groupRepo.commit();
		} catch (err: any) {
			await this.groupRepo.rollback();
			throw AppError.unknown(err.message, "Internal Server Error")
		}
	}
}