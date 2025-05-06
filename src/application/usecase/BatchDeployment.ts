import { BatchDeploymentBody } from "@src/adapter/http/contracts/request/batch-deployment";
import { Date as IDate } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { BatchType, BatchTypeMapping } from "@src/domain/Batch";

export class BatchDeploymentUsecase implements IUsecase<[string, string, BatchDeploymentBody], void> {
	private readonly allowedTimeType = [
		"time1",
		"time2",
		"time3",
		"time4",
		"batch_time"
	]
	private readonly ascentTimeRanges = [
		["08:00", "10:00"],
		["10:00", "12:00"],
		["13:00", "15:00"],
		["15:00", "17:00"]
	]

	constructor(
		private readonly batchRepository: BatchRepository,
		private readonly date: IDate
	) { }

	static create(
		batchRepository: BatchRepository,
		date: IDate
	): BatchDeploymentUsecase {
		return new BatchDeploymentUsecase(batchRepository, date);
	}

	private async updateTimeAscent(batchId: string, dateStart: string, dateEnd: string) {
		const toSave: { dateEnd: string, dateStart: string, timeType: string }[] = this.ascentTimeRanges.map((_, index) => {
			return {
				timeType: this.allowedTimeType[index],
				dateEnd: this.date.convert(`${dateStart} ${this.ascentTimeRanges[index][1]}`, "Asia/Jakarta", "UTC"),
				dateStart: this.date.convert(`${dateEnd} ${this.ascentTimeRanges[index][0]}`, "Asia/Jakarta", "UTC"),
			};
		});
		toSave.push({
			timeType: "batch_time",
			dateStart: this.date.convert(`${dateStart} ${this.ascentTimeRanges[0][0]}`, "Asia/Jakarta", "UTC"),
			dateEnd: this.date.convert(`${dateEnd} ${this.ascentTimeRanges[this.ascentTimeRanges.length - 1][1]}`, "Asia/Jakarta", "UTC"),
		})

		const stm = await Promise.all(toSave.map(async item => {
			return await this.batchRepository.updateTime(batchId, item.timeType, item.dateStart, item.dateEnd, true)
		}))
		await this.batchRepository.commit(stm.flat())
	}

	async execute(batchId: string, timeType: string, body: BatchDeploymentBody): Promise<void> {
		const type = BatchTypeMapping.fromString(body.type)

		if (!this.allowedTimeType.includes(timeType)) {
			throw AppError.conversion("Invalid time type", "Invalid time type")
		}
		if (Object.values(body).some((item) => item === undefined) || Object.values(body).some((item) => item === "")) {
			throw AppError.request("Time is Required", "Time is Required")
		}

		if (type === BatchType.ASCENT && (body.time_start_date !== body.time_end_date)) {
			throw AppError.request("Start date and end date must be the same", "Start date and end date must be the same")
		}
		
		if (timeType === "batch_time" && type === BatchType.ASCENT) {
			return (await this.updateTimeAscent(batchId, body.time_start_date, body.time_end_date))
		}

		const dateEnd = this.date.convert(`${body.time_end_date} ${body.time_end_time}`, "Asia/Jakarta", "UTC")
		const dateStart = this.date.convert(`${body.time_start_date} ${body.time_start_time}`, "Asia/Jakarta", "UTC")

		if (new Date(dateEnd).getTime() < new Date(dateStart).getTime()) {
			throw AppError.request("End time must be greater than start time", "End time must be greater than start time")
		}

		await this.batchRepository.updateTime(batchId, timeType, dateStart, dateEnd)
	}
}