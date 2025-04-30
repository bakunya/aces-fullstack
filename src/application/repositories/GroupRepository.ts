import { Repository } from "@src/application/repositories/Repository";
import { BatchGroupDetailAggregation, RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface GroupRepository extends Repository {
	manualPair<T extends false>(batchId: string, groupId: string, assessorId: string, inTransaction?: T): Promise<void>
	manualPair<T extends true>(batchId: string, groupId: string, assessorId: string, inTransaction: T): Promise<PreparedTransaction[]>
	manualPair(batchId: string, groupId: string, assessorId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	allocateAssessorInAllSlot<T extends false>(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string }[], inTransaction?: T): Promise<void>
	allocateAssessorInAllSlot<T extends true>(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string }[], inTransaction: T): Promise<PreparedTransaction[]>
	allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string }[], inTransaction: boolean): Promise<void | PreparedTransaction[]>

	unAllocateAssessorInAllSlot<T extends false>(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[], inTransaction?: T): Promise<void>
	unAllocateAssessorInAllSlot<T extends true>(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[], inTransaction: T): Promise<PreparedTransaction[]>
	unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, data: { group_uuid: string; }[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	getDetail(batchId: string): Promise<BatchGroupDetailAggregation[]>
	getSlotAllocationInBatch(batchId: string): Promise<RawGroupAllocation[]>
	getAllocated(batchId: string, assessorId: string): Promise<RawGroupAllocation[]>
	getUnallocated(batchId: string, groupPositionIds: string[][]): Promise<{ group_uuid: string }[]>
}