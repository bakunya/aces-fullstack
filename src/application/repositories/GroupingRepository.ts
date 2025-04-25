import { ModuleCategory } from "@src/domain/ModuleType";

export interface GroupingRepository {
	getUnallocated(batchId: string, type: ModuleCategory, groupPositionIds: string[][]): Promise<{ group_id: string; person_uuid: string }[]>
	allocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string }[]): Promise<void>
	unAllocateAssessorInAllSlot(assessor_uuid: string, batch_uuid: string, type: ModuleCategory, data: { group_id: string; person_uuid: string; }[]): Promise<void>
	getAllocated(batchId: string, assessorId: string, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
	getAllocatedFromPosition(batchId: string, assessorId: string, slotPosition: number, type: ModuleCategory): Promise<{ group_id: string; person_uuid: string }[]>
}