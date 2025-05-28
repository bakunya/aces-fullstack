import { Date } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";
import { DateTime } from "luxon";

export class LuxonDateImpl implements Date {
	constructor() { }

	static create(): LuxonDateImpl {
		return new LuxonDateImpl();
	}

	private parse(date: string, zone?: string): DateTime {
		const formats = [
			undefined,
			"yyyy-MM-dd HH:mm",
			"yyyy-MM-dd HH:mm:ss",
		]

		for (const format of formats) {
			if (!format) {
				const conv = DateTime.fromISO(date, { zone })
				if (conv.isValid) {
					return conv
				}
			} else {
				const dt = DateTime.fromFormat(date, format, { zone });
				if (dt.isValid) {
					return dt;
				}
			}
		}

		throw AppError.date("Invalid date string");
	}

	now() {
		return DateTime.utc().toISO();
	}

	convert(date: string, fromTimezone: string, toTimezone: string, format?: string | null): string {
		const dt = this.parse(date, fromTimezone);
		if (!dt.isValid) {
			throw AppError.date("Invalid date string");
		}
		const converted = dt.setZone(toTimezone);

		return format ? converted.toFormat(format) : converted.toISO()!;
	}

	to(utcString: string, format: string | null = null, timezone: string = "Asia/Jakarta") {
		let dt = DateTime.fromISO(utcString, { zone: "utc" });
		if (!dt.isValid) {
			throw AppError.date("Invalid UTC string");
		}
		const converted = dt.setZone(timezone);
		return format ? converted.toFormat(format) : converted.toISO()!;
	}

	isBetween(
		date: string,
		start: string,
		end: string,
		inclusivity: "()" | "[)" | "(]" | "[]" = "[]"
	): boolean {
		const dt = this.parse(date);
		const startDt = this.parse(start);
		const endDt = this.parse(end);

		if (!dt.isValid || !startDt.isValid || !endDt.isValid) {
			throw AppError.date("Invalid date string");
		}

		const isAfterStart = inclusivity[0] === "[" ? dt >= startDt : dt > startDt;
		const isBeforeEnd = inclusivity[1] === "]" ? dt <= endDt : dt < endDt;

		return isAfterStart && isBeforeEnd;
	}
}