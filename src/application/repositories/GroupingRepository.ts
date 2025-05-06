import { Repository } from "@src/application/repositories/Repository";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { TableBatchGrouping } from "@src/infra/databases/d1/dto/tables";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface GroupingRepository extends Repository {
	manualPair<T extends false>(batchId: string, assessorId: string, type: ModuleCategory, groupingId: number, inTransaction?: T): Promise<void>
	manualPair<T extends true>(batchId: string, assessorId: string, type: ModuleCategory, groupingId: number, inTransaction: T): Promise<PreparedTransaction[]>
	manualPair(batchId: string, assessorId: string, type: ModuleCategory, groupingId: number, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	allocateAssessorInAllSlot<T extends false>(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string }[], inTransaction?: T): Promise<void>
	allocateAssessorInAllSlot<T extends true>(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string }[], inTransaction: T): Promise<PreparedTransaction[]>
	allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string }[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>
	
	unAllocateAssessorInAllSlot<T extends false>(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[], inTransaction?: T): Promise<void>
	unAllocateAssessorInAllSlot<T extends true>(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[], inTransaction: T): Promise<PreparedTransaction[]>
	unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	autoAllocateCaseAssessor<T extends false>(batchId: string, groupingData: { case_assessor_user_uuid: string, id: number }[], inTransaction?: T): Promise<void>
	autoAllocateCaseAssessor<T extends true>(batchId: string, groupingData: { case_assessor_user_uuid: string, id: number }[], inTransaction: T): Promise<PreparedTransaction[]>
	autoAllocateCaseAssessor(batchId: string, groupingData: { case_assessor_user_uuid: string, id: number }[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	getDetail(batchId: string): Promise<BatchGroupingDetailAggregation[]>
	getAllocated(batchId: string, assessorId: string, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
	getUnallocated(batchId: string, type: ModuleCategory, groupPositionIds: string[][]): Promise<{ group_id: string; person_uuid: string }[]>
	getAllocatedFromPosition(batchId: string, assessorId: string, slotPosition: number, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
	getAllInBatch(batchId: string): Promise<TableBatchGrouping[]>
}