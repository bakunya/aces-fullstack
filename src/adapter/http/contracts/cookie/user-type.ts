export enum UserType {
	ASESI = 'ASESI',
	ASESOR = 'ASESOR',
	INTERNAL_USER = 'INTERNAL_USER',
}

export type UserTypeCookie<T> = T & { type: UserType }