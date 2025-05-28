export type DateFormat = 
"yyyy-MM-dd HH:mm:ss" |
"yyyy-MM-dd HH:mm" |
"yyyy-MM-dd"

export type Timezone = "Asia/Jakarta" | "UTC"

export interface Date {
	now(): string
	to(utcString: string, format?: DateFormat, timezone?: Timezone): string
	convert(date: string, fromTimezone: Timezone, toTimezone: Timezone, format?: "yyyy-MM-dd HH:mm:ss" | null): string
	isBetween(date: string, start: string, end: string, inclusivity?: "()" | "[)" | "(]" | "[]"): boolean
}