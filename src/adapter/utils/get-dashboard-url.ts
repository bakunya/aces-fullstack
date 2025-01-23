import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { AppError } from "@src/application/error/AppError";
import { InternalUser } from "@src/domain/InternalUser";
import { match } from "ts-pattern";

export function getDashboardUrlFromUserCookie(user: UserTypeCookie<unknown>): string | AppError {
	return match(user.type)
		.with(UserType.ASESI, () => "/asesi/dashboard")
		.with(UserType.ASESOR, () => "/asesor/dashboard")
		.with(UserType.INTERNAL_USER, () => {
			const u = user as UserTypeCookie<InternalUser>
			return `/${u.role.toLocaleLowerCase()}/dashboard`
		})
		.otherwise(() => AppError.unknown("User type not found"))
}