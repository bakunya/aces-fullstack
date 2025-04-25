import { BatchAssessorSlotDataToUpdate } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { BatchAssessorDomain } from "@src/domain/BatchAssessor";
import { ModuleCategory } from "@src/domain/ModuleType";

export interface BatchAssessorRepository {
	allocate(data: BatchAssessorDomain): Promise<void>;
	updateSlot(data: BatchAssessorSlotDataToUpdate): Promise<void>;
	delete(batchId: string, assessorId: string): Promise<void>;
	unallocateGroups(batchId: string, assessorId: string): Promise<void>;
	unallocateGroupings(batchId: string, assessorId: string, type: ModuleCategory, allocated: { group_id: string; person_uuid: string; }[]): Promise<void>;
}