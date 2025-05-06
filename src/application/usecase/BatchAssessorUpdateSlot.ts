import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { AppError } from "@src/application/error/AppError";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { IAllocateAssessor } from "@src/application/usecase-interface/IAllocateAssessor";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

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

		let prepared: PreparedTransaction[] = []
		const prepared2 = await this.batchAssessorRepo.updateSlot(data, true)

		if (type === ModuleCategory.FACE) {
			const hasAllocated = (await this.groupingRepo.getAllocatedFromPosition(data.batchId, data.assessorId, slotPosition, type)).push()
			if (hasAllocated) throw AppError.database("Assessor already allocated", "Assessor already allocated in this slot")

			const unallocated = (await this.groupingRepo.getUnallocated(data.batchId, type, [[groupPositions]])).pop()
			if (!unallocated) return
			prepared = await this.groupingRepo.allocateAssessorInAllSlot(data.assessorId, data.batchId, type, [unallocated] , true)
		} else if (type === ModuleCategory.DISC) {
			const unallocated = await this.groupRepo.getUnallocated(data.batchId, [[groupPositions]])
			if (!unallocated) return
			prepared = await this.groupRepo.allocateAssessorInAllSlot(data.assessorId, data.batchId, unallocated, true)
		}

		await this.batchAssessorRepo.commit([
			...prepared,
			...prepared2
		])
	}

	private async unallocate(data: BatchAssessorSlotDataToUpdate, type: ModuleCategory, slotPosition: number) {
		let prepared: PreparedTransaction[] = []
		const prepared2 = await this.batchAssessorRepo.updateSlot(data, true)
		
		if (type === ModuleCategory.FACE) {
			const allocated = await this.groupingRepo.getAllocatedFromPosition(data.batchId, data.assessorId, slotPosition, type)
			if (!allocated) return
			prepared = await this.groupingRepo.unAllocateAssessorInAllSlot(data.assessorId, data.batchId, type, allocated, true)
		} else if (type === ModuleCategory.DISC) {
			const allocated = await this.groupRepo.getAllocated(data.batchId, data.assessorId)
			const groupPositions = this.allocateAssessorUsecase.getGroupPositionAsObject(type, allocated)?.[slotPosition]?.pop?.()
			if (!groupPositions) return
			prepared = await this.groupRepo.unAllocateAssessorInAllSlot(data.assessorId, data.batchId, [{ group_uuid: groupPositions }], true)
		}

		await this.batchAssessorRepo.commit([
			...prepared,
			...prepared2
		])
	}

	async execute(data: BatchAssessorSlotDataToUpdate): Promise<any> {
		const type = ModuleCategoryMapping.fromString(data.moduleType);
		const slotPosition = this.getSlotPosition(data.slotType);
		if (data.slotStatus === 1) await this.allocate(data, type, slotPosition);
		else await this.unallocate(data, type, slotPosition);
	}
}