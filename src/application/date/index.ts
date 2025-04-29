export interface Date {
	now(): string
	convert(date: string, fromTimezone: string, toTimezone: string, format?: string | null): string
	to(utcString: string, format?: string | null, timezone?: string): string
}