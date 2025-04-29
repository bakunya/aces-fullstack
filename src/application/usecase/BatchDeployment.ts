import { BatchDeploymentBody } from "@src/adapter/http/contracts/request/batch-deployment";
import { Date as IDate } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";

export class BatchDeploymentUsecase implements IUsecase<[string, string, BatchDeploymentBody], void> {
	constructor(
		private readonly batchRepository: BatchRepository,
		private readonly date: IDate
	) {}

	static create(		
		batchRepository: BatchRepository,
		date: IDate
	): BatchDeploymentUsecase {
		return new BatchDeploymentUsecase(batchRepository, date);
	}

	async execute(batchId: string, timeType: string, body: BatchDeploymentBody): Promise<void> {
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
		if (Object.values(body).some((item) => item === undefined) || Object.values(body).some((item) => item === "")) {
			throw AppError.request("Time is Required", "Time is Required")
		}

		const dateEnd = this.date.convert(`${body.time_end_date} ${body.time_end_time}`, "Asia/Jakarta", "UTC")
		const dateStart = this.date.convert(`${body.time_start_date} ${body.time_start_time}`, "Asia/Jakarta", "UTC")


		console.log(new Date(dateEnd).getTime(), new Date(dateStart).getTime(), new Date(dateEnd).getTime() > new Date(dateStart).getTime())
		if (new Date(dateEnd).getTime() < new Date(dateStart).getTime()) {
			throw AppError.request("End time must be greater than start time", "End time must be greater than start time")
		}

		await this.batchRepository.updateTime(batchId, timeType, dateStart, dateEnd)
	}
}