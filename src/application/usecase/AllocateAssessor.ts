import { AppError } from "@src/application/error/AppError";
import { AssessorRepository } from "@src/application/repositories/AssessorRepository";
import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { IAllocateAssessor } from "@src/application/usecase-interface/IAllocateAssessor";
import { IGetAllocation } from "@src/application/usecase-interface/IGetAllocation";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { getSlotPosition } from "@src/application/utils/get-slot-position";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";
import { RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";
import { match } from "ts-pattern";

export class AllocateAssessorUsecase implements IAllocateAssessor, IUsecase<[string, string, string], void> {
	constructor(
		private readonly batchAssessorRepo: BatchAssessorRepository,
		private readonly groupRepo: GroupRepository,
		private readonly groupingRepo: GroupingRepository,
		private readonly batchRepo: BatchRepository,
		private readonly assessorRepo: AssessorRepository,
		private readonly assessorAllocationUsecase: IGetAllocation,
	) { }

	static create(
		batchAssessorRepo: BatchAssessorRepository,
		groupRepo: GroupRepository,
		groupingRepo: GroupingRepository,
		batchRepo: BatchRepository,
		assessorRepo: AssessorRepository,
		assessorAllocationUsecase: IGetAllocation,
	) {
		return new AllocateAssessorUsecase(batchAssessorRepo, groupRepo, groupingRepo, batchRepo, assessorRepo, assessorAllocationUsecase);
	}

	private async allocateGroupAssessor(assessorId: string, batchId: string, type: ModuleCategory): Promise<PreparedTransaction[]> {
		const allocation = await this.groupRepo.getSlotAllocationInBatch(batchId);
		const groupPositions = this.getGroupPosition(type, allocation);
		const unallocated = await this.groupRepo.getUnallocated(batchId, groupPositions);
		return await this.groupRepo.allocateAssessorInAllSlot(assessorId, batchId, unallocated, true)
	}

	private async allocateGroupingAssessor(assessorId: string, batchId: string, type: ModuleCategory): Promise<PreparedTransaction[]> {
		const allocation = await this.groupRepo.getSlotAllocationInBatch(batchId);
		const groupPositions = this.getGroupPosition(type, allocation);
		const unallocated = await this.groupingRepo.getUnallocated(batchId, type, groupPositions);
		return await this.groupingRepo.allocateAssessorInAllSlot(assessorId, batchId, type, unallocated, true)
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
		
		const batchIds = (await this.batchRepo.getBatchIdInSameTimestamp(batchId)).map(v => v.uuid)
		const isFree = await this.assessorRepo.isAssessorFree([...batchIds, batchId], userId, category);

		if(!isFree) throw AppError.database("Assessor is already allocated", "Assessor is already allocated in other batch");
		
		const allocated = await this.assessorAllocationUsecase.getAssessorAllocated(batchId)
		const requreiments = await this.assessorAllocationUsecase.getAssessorRequirement(batchId)
		if(allocated[`${type}_assessors` as keyof typeof allocated].length >= requreiments[`max${type}` as keyof typeof requreiments]) {
			throw AppError.database("Assessor is already allocated", "Assessor is already allocated in this batch");
		}

		const batchAssessor = BatchAssessorDomain.create(batchId, userId, type);

		const preparedAllocation = await this.batchAssessorRepo.allocate(batchAssessor, true);
		const preparedAll = await match(category)
			.with(ModuleCategory.DISC, () => this.allocateGroupAssessor(userId, batchId, category))
			.with(ModuleCategory.FACE, () => this.allocateGroupingAssessor(userId, batchId, category))
			.with(ModuleCategory.CASE, () => this.allocateGroupingAssessor(userId, batchId, category))
			.otherwise(() => Promise.resolve([]))

		await this.batchRepo.commit([
			...preparedAllocation,
			...preparedAll
		])
	}
}