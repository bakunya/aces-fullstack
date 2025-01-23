import { UnauthorizedPage } from "@presenter/pages/shared/unauthorized";
import { Context } from "@src/adapter/http/contracts/binding";
import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { getDashboardUrlFromUserCookie } from "@src/adapter/utils/get-dashboard-url";
import { AppError } from "@src/application/error/AppError";
import { Asesi } from "@src/domain/Asesi";
import { Crypto } from "@src/infra/crypto";
import { Next } from "hono";
import { getSignedCookie } from "hono/cookie";

export async function shouldAsesi(c: Context, next: Next) {
	const key = c.env.SUBTLE_PRIVATE_KEY
	const cookieKey = c.env.COOKIE_PRIVATE

	const token = await getSignedCookie(c, cookieKey, 'token')
	if (!token) return c.redirect("/")

	const crypt = new Crypto(crypto.subtle, key)
	const user = await crypt.decrypt<UserTypeCookie<Asesi>>(token)

	if (user.type === UserType.ASESI) {
		c.set("decodedToken", user)
		return await next()
	}

	const dashboardUrl = getDashboardUrlFromUserCookie(user)
	if (dashboardUrl instanceof AppError) throw dashboardUrl

	return c.html(<UnauthorizedPage dashboardUrl={ dashboardUrl } />)
}