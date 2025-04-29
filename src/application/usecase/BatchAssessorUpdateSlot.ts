import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { AppError } from "@src/application/error/AppError";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { IAllocateAssessor } from "@src/application/usecase-interface/IAllocateAssessor";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";

export class BatchAssessorUpdateSlotUsecase implements IUsecase<[BatchAssessorSlotDataToUpdate], any> {
	constructor(
		private readonly batchAssessorRepo: BatchAssessorRepository,
		private readonly groupRepo: GroupRepository,
		private readonly groupingRepo: GroupingRepository,
		private readonly allocateAssessorUsecase: IAllocateAssessor,
	) { }

	static create(
		batchAssessorRepo: BatchAssessorRepository,
		groupRepo: GroupRepository,
		groupingRepo: GroupingRepository,
		allocateAssessorUsecase: IAllocateAssessor,
	): BatchAssessorUpdateSlotUsecase {
		return new BatchAssessorUpdateSlotUsecase(batchAssessorRepo, groupRepo, groupingRepo, allocateAssessorUsecase);
	}

	private getSlotPosition(slotType: string) {
		switch (slotType) {
			case "slot1":
				return 1;
			case "slot2":
				return 2;
			case "slot3":
				return 3;
			case "slot4":
				return 4;
			default:
				throw AppError.conversion("Invalid slot type");
		}
	}

	private async allocate(data: BatchAssessorSlotDataToUpdate, type: ModuleCategory, slotPosition: number) {
		const allocated = await this.groupRepo.getSlotAllocationInBatch(data.batchId)
		const groupPositions = this.allocateAssessorUsecase.getGroupPosition(type, allocated)[slotPosition - 1].pop()
		if (!groupPositions) return
		if (type === ModuleCategory.CASE || type === ModuleCategory.FACE) {
			const unallocated = (await this.groupingRepo.getUnallocated(data.batchId, type, [[groupPositions]])).pop()
			if (!unallocated) return
			await this.groupingRepo.allocateAssessorInAllSlot(data.assessorId, data.batchId, type, [unallocated])
		} else if (type === ModuleCategory.DISC) {
			const unallocated = await this.groupRepo.getUnallocated(data.batchId, [[groupPositions]])
			if (!unallocated) return
			await this.groupRepo.allocateAssessorInAllSlot(data.assessorId, data.batchId, unallocated)
		}
		await this.batchAssessorRepo.updateSlot(data)
	}

	private async unallocate(data: BatchAssessorSlotDataToUpdate, type: ModuleCategory, slotPosition: number) {
		if (type === ModuleCategory.CASE || type === ModuleCategory.FACE) {
			const allocated = await this.groupingRepo.getAllocatedFromPosition(data.batchId, data.assessorId, slotPosition, type)
			if (!allocated) return
			await this.groupingRepo.unAllocateAssessorInAllSlot(data.assessorId, data.batchId, type, allocated)
		} else if (type === ModuleCategory.DISC) {
			const allocated = await this.groupRepo.getAllocated(data.batchId, data.assessorId)
			const groupPositions = this.allocateAssessorUsecase.getGroupPositionAsObject(type, allocated)?.[slotPosition]?.pop?.()
			if (!groupPositions) return
			await this.groupRepo.unAllocateAssessorInAllSlot(data.assessorId, data.batchId, [{ group_uuid: groupPositions }])
		}
		await this.batchAssessorRepo.updateSlot(data)
	}

	async execute(data: BatchAssessorSlotDataToUpdate): Promise<any> {
		try {
			const type = ModuleCategoryMapping.fromString(data.moduleType);
			const slotPosition = this.getSlotPosition(data.slotType);

			await this.groupRepo.begin();

			if (data.slotStatus === 1) await this.allocate(data, type, slotPosition);
			else await this.unallocate(data, type, slotPosition);

			await this.groupRepo.commit();
		} catch (err: any) {
			await this.groupRepo.rollback();
			throw AppError.unknown(err.message, "Internal Server Error")
		}
	}
}