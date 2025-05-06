import { BatchTimeDeployment } from "@presenter/pages/aces/components/batch-time-deployment";
import { Context } from "@src/adapter/http/contracts/binding";
import { AppError } from "@src/application/error/AppError";
import { BatchDomain } from "@src/domain/Batch";
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl";
import { DateImpl } from "@src/infra/date";

export async function acesGetBatchDeploymentController(c: Context) {
	const batchId = c.req.param("batch_id")
	const timeType = c.req.param("time_type") as "time1" | "time2" | "time3" | "time4" | "batch_time"
	const allowedTimeType = [
		"time1",
		"time2",
		"time3",
		"time4",
		"batch_time"
	]
	if (!allowedTimeType.includes(timeType)) {
		throw AppError.conversion("Invalid time type", "Invalid time type")
	}

	const [batchRaw] = await Promise.all([
		BatchRepositoryImpl.create(c.env.DB).getBatchById(batchId),
	])
	const batch = BatchDomain.create(batchRaw, DateImpl.create())

	return c.html(<BatchTimeDeployment
		type={ batchRaw.type }
		batchId={ batch.uuid }
		timeType={ timeType }
		// @ts-ignore
		time_end_date={ batch[`${timeType}_end_date`] }
		// @ts-ignore
		time_end_time={ batch[`${timeType}_end_time`] }
		// @ts-ignore
		time_start_date={ batch[`${timeType}_start_date`] }
		// @ts-ignore
		time_start_time={ batch[`${timeType}_start_time`] }
	/>)
}