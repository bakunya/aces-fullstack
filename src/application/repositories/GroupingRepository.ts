import { Repository } from "@src/application/repositories/Repository";
import { ModuleCategory } from "@src/domain/ModuleType";
import { BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";

export interface GroupingRepository extends Repository {
	getUnallocated(batchId: string, type: ModuleCategory, groupPositionIds: string[][]): Promise<{ group_id: string; person_uuid: string }[]>
	allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string }[]): Promise<void>
	unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[]): Promise<void>
	getAllocated(batchId: string, assessorId: string, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
	getAllocatedFromPosition(batchId: string, assessorId: string, slotPosition: number, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
	getDetail(batchId: string): Promise<BatchGroupingDetailAggregation[]>
	manualPair(batchId: string, assessorId: string, type: ModuleCategory, groupingId: number): Promise<void>
}