import { Date } from "@src/application/date";
import { BatchDTO } from "@src/application/dto/batch";
import { AppError } from "@src/application/error/AppError";

export enum BatchType {
	ASCENT = "ascent",
	CUSTOM = "custom",
}

export class BatchTypeMapping {
	static fromString(type: string): BatchType {
		try {
			type = type.toLowerCase()
			const x = Object.entries(BatchType).find(([_, v]) => v === type)
			if (!x) throw new Error()
			return BatchType[x[0] as keyof typeof BatchType]
		} catch (_) {
			throw AppError.entity("ModuleType", "Invalid module type")
		}
	}
}

export class BatchDomain {
	public readonly uuid: string;
	public readonly token: string;
	public readonly title: string;
	public readonly organization_uuid: string;
	public readonly organization_name: string;
	public readonly split: number;
	public readonly status: number;
	public readonly regrouping: number;
	public readonly type: BatchType;
	public readonly time1_start_date?: string;
	public readonly time1_start_time?: string;
	public readonly time2_start_date?: string;
	public readonly time2_start_time?: string;
	public readonly time3_start_date?: string;
	public readonly time3_start_time?: string;
	public readonly time4_start_date?: string;
	public readonly time4_start_time?: string;
	public readonly time1_end_date?: string;
	public readonly time1_end_time?: string;
	public readonly time2_end_date?: string;
	public readonly time2_end_time?: string;
	public readonly time3_end_date?: string;
	public readonly time3_end_time?: string;
	public readonly time4_end_date?: string;
	public readonly time4_end_time?: string;
	public readonly batch_time_end_date?: string;
	public readonly batch_time_end_time?: string;
	public readonly batch_time_start_date?: string;
	public readonly batch_time_start_time?: string;

	private readonly dateInstance: Date;


	constructor(data: BatchDTO, dateInstance: Date) {
		this.dateInstance = dateInstance;

		this.type = BatchTypeMapping.fromString(data.type);
		this.uuid = data.uuid;
		this.token = data.token;
		this.title = data.title;
		this.organization_uuid = data.organization_uuid;
		this.organization_name = data.organization_name;
		this.split = data.split;
		this.status = data.status;
		this.regrouping = data.regrouping;
		this.setDateTime("time1_start", data.time1_start);
		this.setDateTime("time2_start", data.time2_start);
		this.setDateTime("time3_start", data.time3_start);
		this.setDateTime("time4_start", data.time4_start);
		this.setDateTime("time1_end", data.time1_end);
		this.setDateTime("time2_end", data.time2_end);
		this.setDateTime("time3_end", data.time3_end);
		this.setDateTime("time4_end", data.time4_end);
		this.setDateTime("batch_time_end", data.batch_time_end);
		this.setDateTime("batch_time_start", data.batch_time_start);
	}

	static create(data: BatchDTO, dateInstance: Date): BatchDomain {
		return new BatchDomain(data, dateInstance);
	}

	private setDateTime(name: string, datetime?: string) {
		if (!datetime) return;
		const date = this.dateInstance.convert(datetime, "UTC", "Asia/Jakarta", "YYYY-MM-DD HH:mm:ss");
		const [datePart, timePart] = date.split(" ");
		// @ts-ignore
		this[`${name}_date`] = datePart;
		// @ts-ignore
		this[`${name}_time`] = timePart;
	}
}