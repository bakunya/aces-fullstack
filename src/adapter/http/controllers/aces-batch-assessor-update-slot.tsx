import { Context } from "@src/adapter/http/contracts/binding";
import { BatchAssessorSlotDataToUpdate, BatchAssessorUpdateSlotUrlParam } from "@src/adapter/http/contracts/request/batch-assessor-update-slot";
import { AllocateAssessorUsecase } from "@src/application/usecase/AllocateAssessor";
import { BatchAssessorUpdateSlotUsecase } from "@src/application/usecase/BatchAssessorUpdateSlot";
import { GetAllocation } from "@src/application/usecase/GetAllocation";
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl";
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl";
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl";

export async function acesBatchAssessorUpdateSlotController(c: Context) {
	const body = Object.entries((await c.req.parseBody()))
		.filter(([k]) => k.startsWith("slot"))
		.map(([, v]) => v)
	const slotType = c.req.param(BatchAssessorUpdateSlotUrlParam.slot_type)

	const slots = ["slot1", "slot2", "slot3", "slot4"]
	if (!slots.includes(slotType)) {
		return c.text("Invalid slot type", 400)
	}

	const data: BatchAssessorSlotDataToUpdate = {
		slotType,
		slotStatus: body.length > 0 ? 1 : 0,
		batchId: c.req.param(BatchAssessorUpdateSlotUrlParam.batch_id),
		assessorId: c.req.param(BatchAssessorUpdateSlotUrlParam.assessor_id),
		moduleType: c.req.param(BatchAssessorUpdateSlotUrlParam.module_type),
	}
	await BatchAssessorUpdateSlotUsecase
		.create(
			BatchAssessorRepositoryImpl.create(c.env.DB),
			GroupRepositoryImpl.create(c.env.DB),
			GroupingRepositoryImpl.create(c.env.DB),
			AllocateAssessorUsecase.create(
				BatchAssessorRepositoryImpl.create(c.env.DB),
				GroupRepositoryImpl.create(c.env.DB),
				GroupingRepositoryImpl.create(c.env.DB),
				BatchRepositoryImpl.create(c.env.DB),
				AssessorRepositoryImpl.create(c.env.DB),
				GetAllocation.create(
					GroupRepositoryImpl.create(c.env.DB),
					AssessorRepositoryImpl.create(c.env.DB),
				)
			)
		)
		.execute(data)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" }
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}