import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { AppError } from "@src/application/error/AppError";
import { User, UserRole } from "@src/domain/User";
import { match } from "ts-pattern";

export function getDashboardUrlFromUserCookie(user: UserTypeCookie<unknown>, expectedRole?: UserRole): string | AppError {
	return match([user.type, Boolean(expectedRole)])
		.with([UserType.ASESI, false], () => "/dashboard")
		.with([UserType.INTERNAL_USER, true], () => {
			const u = User.remapping(user)
			return `/${u.role.get(expectedRole!) ? expectedRole!.toLocaleLowerCase() : "developer"}/dashboard`
		})
		.otherwise(() => AppError.unknown("User type not found"))
}