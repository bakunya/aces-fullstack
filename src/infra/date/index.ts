import moment from "moment-timezone";
import { Date } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";

export class DateImpl implements Date {
	constructor() {}

	static create(): DateImpl {
		return new DateImpl();
	}

    now() {
        return moment().utc().format();
    }

	convert(date: string, fromTimezone: string, toTimezone: string, format?: string | null): string {
		if (!moment(date, moment.ISO_8601, true).isValid()) {
			throw AppError.date("Invalid date string");
		}
		
		let convertedTime = moment.tz(date, fromTimezone).tz(toTimezone);
		return format ? convertedTime.format(format) : convertedTime.format();
	}

    to(utcString: string, format: string | null = null, timezone: string = "Asia/Jakarta") {
        if (!moment.utc(utcString, moment.ISO_8601, true).isValid()) {
            throw AppError.date("Invalid UTC string");
        }
        
        let convertedTime = moment.utc(utcString).tz(timezone);
        return format ? convertedTime.format(format) : convertedTime.format();
    }
}