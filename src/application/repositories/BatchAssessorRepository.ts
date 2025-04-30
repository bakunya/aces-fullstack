import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { Repository } from "@src/application/repositories/Repository";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchAssessorDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface BatchAssessorRepository extends Repository {
	allocate<T extends true>(data: BatchAssessorDomain, inTransaction: T): Promise<PreparedTransaction[]>;
	allocate<T extends false>(data: BatchAssessorDomain, inTransaction?: T): Promise<void>;
	allocate(data: BatchAssessorDomain, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	updateSlot<T extends true>(data: BatchAssessorSlotDataToUpdate, inTransaction: T): Promise<PreparedTransaction[]>;
	updateSlot<T extends false>(data: BatchAssessorSlotDataToUpdate, inTransaction?: T): Promise<void>;
	updateSlot(data: BatchAssessorSlotDataToUpdate, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	delete<T extends true>(batchId: string, assessorId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	delete<T extends false>(batchId: string, assessorId: string, inTransaction?: T): Promise<void>;
	delete(batchId: string, assessorId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	unallocateGroups<T extends true>(batchId: string, assessorId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	unallocateGroups<T extends false>(batchId: string, assessorId: string, inTransaction?: T): Promise<void>;
	unallocateGroups(batchId: string, assessorId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	unallocateGroupings<T extends true>(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction: T): Promise<PreparedTransaction[]>;
	unallocateGroupings<T extends false>(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction?: T): Promise<void>;
	unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[], inTransaction?: boolean): Promise<void>;

	unallocateGroupAll<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	unallocateGroupAll<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	unallocateGroupAll(batchId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	unallocateGroupingAll<T extends true>(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction: T): Promise<PreparedTransaction[]>;
	unallocateGroupingAll<T extends false>(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction?: T): Promise<void>;
	unallocateGroupingAll(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	getDetail(batchId: string): Promise<BatchAssessorDetailAggregation[]>;
}