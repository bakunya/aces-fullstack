import { HasLoginPage } from "@presenter/pages/shared/has-login";
import { UnauthorizedPage } from "@presenter/pages/shared/unauthorized";
import { Context } from "@src/adapter/http/contracts/binding";
import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { getDashboardUrlFromUserCookie } from "@src/adapter/utils/get-dashboard-url";
import { AppError } from "@src/application/error/AppError";
import { InternalUser } from "@src/domain/InternalUser";
import { Crypto } from "@src/infra/crypto";
import { Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { match } from "ts-pattern";

export async function shouldGuest(c: Context, next: Next) {
	const key = c.env.SUBTLE_PRIVATE_KEY
	const cookieKey = c.env.COOKIE_PRIVATE

	const token = await getSignedCookie(c, cookieKey, 'token')
	if (!token) return await next()

	const crypt = new Crypto(crypto.subtle, key)
	const user = await crypt.decrypt<UserTypeCookie<unknown>>(token)

	const dashboardUrl = getDashboardUrlFromUserCookie(user)
	if (dashboardUrl instanceof AppError) throw dashboardUrl

	const path = c.req.path.split("/")[1] as "asesor" | "admin" | "asesi" | "developer"

	return match([path, user.type])
		.with(["asesor", UserType.ASESOR], () => {
			return c.html(<HasLoginPage
				dashboardUrl={ dashboardUrl }
				userType={ (user as UserTypeCookie<InternalUser>)?.role?.toLocaleLowerCase?.() ?? user.type.toLocaleLowerCase() }
			/>)
		})
		.with(["asesi", UserType.ASESI], () => {
			return c.html(<HasLoginPage
				dashboardUrl={ dashboardUrl }
				userType={ (user as UserTypeCookie<InternalUser>)?.role?.toLocaleLowerCase?.() ?? user.type.toLocaleLowerCase() }
			/>)
		})
		.with(["developer", UserType.INTERNAL_USER], () => {
			return c.html(<HasLoginPage
				dashboardUrl={ dashboardUrl }
				userType={ (user as UserTypeCookie<InternalUser>)?.role?.toLocaleLowerCase?.() ?? user.type.toLocaleLowerCase() }
			/>)
		})
		.otherwise(() => {
			return c.html(<UnauthorizedPage dashboardUrl={ dashboardUrl } />)
		})
}