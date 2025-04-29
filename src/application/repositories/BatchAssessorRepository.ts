import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { Repository } from "@src/application/repositories/Repository";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchAssessorDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";

export interface BatchAssessorRepository extends Repository {
	allocate(data: BatchAssessorDomain): Promise<void>;
	updateSlot(data: BatchAssessorSlotDataToUpdate): Promise<void>;
	delete(batchId: string, assessorId: string): Promise<void>;
	unallocateGroups(batchId: string, assessorId: string): Promise<void>;
	unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[]): Promise<void>;
	unallocateGroupAll(batchId: string): Promise<void>;
	unallocateGroupingAll(batchId: string, type: ModuleCategory.FACE | ModuleCategory.CASE): Promise<void>;
	getDetail(batchId: string): Promise<BatchAssessorDetailAggregation[]>;
}