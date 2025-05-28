import { Date } from "@src/application/date";
import { LuxonDateImpl } from "@src/infra/date/luxon";

export class DateImpl extends LuxonDateImpl implements Date {
	constructor() {
		super();
	}

	static create(): DateImpl {
		return new DateImpl();
	}
}