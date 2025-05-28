import moment from "moment-timezone";
import { Date } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";

export class MomentTimezoneDateImpl implements Date {
	private readonly compatibleFormats: Map<string, string> = new Map([
		["yyyy-MM-dd HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
		["yyyy-MM-dd HH:mm", "YYYY-MM-DD HH:mm"],
		["yyyy-MM-dd", "YYYY-MM-DD"],
	])

	constructor() { }

	static create(): MomentTimezoneDateImpl {
		return new MomentTimezoneDateImpl();
	}

	now() {
		return moment().utc().format();
	}

	convert(date: string, fromTimezone: string, toTimezone: string, format?: string | null): string {
		if (!moment(date, moment.ISO_8601, true).isValid()) {
			throw AppError.date("Invalid date string");
		}

		let convertedTime = moment.tz(date, fromTimezone).tz(toTimezone);
		const compatibleFormat = this.compatibleFormats.get(format!);
		return compatibleFormat ? convertedTime.format(compatibleFormat) : convertedTime.format();
	}

	to(utcString: string, format: string | null = null, timezone: string = "Asia/Jakarta") {
		if (!moment.utc(utcString, moment.ISO_8601, true).isValid()) {
			throw AppError.date("Invalid UTC string");
		}

		let convertedTime = moment.utc(utcString).tz(timezone);
		const compatibleFormat = this.compatibleFormats.get(format!);		
		return compatibleFormat ? convertedTime.format(compatibleFormat) : convertedTime.format();
	}

	isBetween(date: string, start: string, end: string, inclusivity: "()" | "[)" | "(]" | "[]" = "[]"): boolean {
		if (!moment(date, moment.ISO_8601, true).isValid() || !moment(start, moment.ISO_8601, true).isValid() || !moment(end, moment.ISO_8601, true).isValid()) {
			throw AppError.date("Invalid date string");
		}

		return moment(date).isBetween(moment(start), moment(end), undefined, inclusivity);
	}
}