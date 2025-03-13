export interface Date {
	now(): string
	from(date: string): string
	to(utcString: string, format?: string | null, timezone?: string): string
}