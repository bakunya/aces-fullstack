import { Repository } from "@src/application/repositories/Repository";
import { BatchGroupDetailAggregation, RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";

export interface GroupRepository extends Repository {
	getSlotAllocationInBatch(batchId: string): Promise<RawGroupAllocation[]>
	getUnallocated(batchId: string, groupPositionIds: string[][]): Promise<{ group_uuid: string }[]>
	allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string }[]): Promise<void>
	unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[]): Promise<void>
	getAllocated(batchId: string, assessorId: string): Promise<RawGroupAllocation[]>
	getDetail(batchId: string): Promise<BatchGroupDetailAggregation[]>
}