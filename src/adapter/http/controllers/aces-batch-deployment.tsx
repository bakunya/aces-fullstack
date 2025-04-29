import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { Context } from "@src/adapter/http/contracts/binding"; 
import { BatchDeploymentBody, BatchDeploymentUrlParam } from "@src/adapter/http/contracts/request/batch-deployment";
import { BatchDeploymentUsecase } from "@src/application/usecase/BatchDeployment";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { DateImpl } from "@src/infra/date";

export async function acesBatchDeploymentController(c: Context) {
	const batchId = c.req.param(BatchDeploymentUrlParam.batch_id)
	const timeType = c.req.param(BatchDeploymentUrlParam.time_type)
	const body: BatchDeploymentBody = await c.req.parseBody()

	await BatchDeploymentUsecase
		.create(
			BatchRepositoryImpl.create(c.env.DB),
			DateImpl.create()
		)
		.execute(batchId, timeType, body)

	const trigger: Record<string, any> = { onSuccess: "Action completed successfully" } 
	if(timeType === "batch_time") {
		trigger[`${HTMX_EVENTS.ACES_DeploymentBatchTime}`] = true
	} else if (timeType === "time1") {
		trigger[`${HTMX_EVENTS.ACES_DeploymentTime1}`] = true
	} else if (timeType === "time2") {	
		trigger[`${HTMX_EVENTS.ACES_DeploymentTime2}`] = true
	} else if (timeType === "time3") {		
		trigger[`${HTMX_EVENTS.ACES_DeploymentTime3}`] = true
	} else if (timeType === "time4") {		
		trigger[`${HTMX_EVENTS.ACES_DeploymentTime4}`] = true
	}
	c.res.headers.set("HX-Trigger", JSON.stringify(trigger))

	return c.text("", 201)
}