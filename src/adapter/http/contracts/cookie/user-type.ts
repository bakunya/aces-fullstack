export enum UserType {
	ASESI = 'ASESI',
	INTERNAL_USER = 'INTERNAL_USER',
}

export type UserTypeCookie<T> = T & { type: UserType }