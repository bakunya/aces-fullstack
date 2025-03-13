import moment from "moment-timezone";
import { Date } from "@src/application/date";
import { AppError } from "@src/application/error/AppError";

export class DateImpl implements Date {
	constructor() {}

    now() {
        return moment().utc().format();
    }

    from(date: string) {
        return moment.tz(date, moment.tz.guess()).utc().format();
    }

    to(utcString: string,  format: string | null = null, timezone: string = "Asia/Jakarta") {
        if (!moment.utc(utcString, moment.ISO_8601, true).isValid()) {
            throw AppError.date("Invalid UTC string");
        }
        
        let convertedTime = moment.utc(utcString).tz(timezone);
        return format ? convertedTime.format(format) : convertedTime.format();
    }
}