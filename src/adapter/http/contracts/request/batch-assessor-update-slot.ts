export enum BatchAssessorUpdateSlotUrlParam {
	batch_id = "batch_id",
	slot_type = "slot_type",
	assessor_id = "assessor_id",
	module_type = "module_type",
}

export type BatchAssessorSlotDataToUpdate = {
	slotType: string
	slotStatus: number
	batchId: string
	assessorId: string
	moduleType: string
}