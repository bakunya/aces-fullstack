import { HasLoginPage } from "@presenter/pages/shared/has-login";
import { Context } from "@src/adapter/http/contracts/binding";
import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
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

	return match(user.type)
		.with(UserType.ASESI, () => c.html(<HasLoginPage dashboardUrl="/asesi/dashboard" userType={ user.type.toLocaleLowerCase() } />))
		.with(UserType.ASESOR, () => c.html(<HasLoginPage dashboardUrl="/asesor/dashboard" userType={ user.type.toLocaleLowerCase() } />))
		.with(UserType.INTERNAL_USER, () => {
			const u = user as UserTypeCookie<InternalUser>
			return c.html(<HasLoginPage dashboardUrl={`/${u.role.toLocaleLowerCase()}/dashboard`} userType={ u.role.toLocaleLowerCase() } />)
		})
		.otherwise(() => AppError.unknown("User type not found"))
}