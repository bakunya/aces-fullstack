import { UnauthorizedPage } from "@presenter/pages/shared/unauthorized";
import { Context } from "@src/adapter/http/contracts/binding";
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { User, UserRole } from "@src/domain/User";
import { Crypto } from "@src/infra/crypto";
import { Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { match, P } from "ts-pattern";

export function shouldUser(expectedRole?: UserRole) {
	return async (c: Context, next: Next) => {
		const key = c.env.SUBTLE_PRIVATE_KEY
		const cookieKey = c.env.COOKIE_PRIVATE

		const token = await getSignedCookie(c, cookieKey, 'token')
		if (!token) return c.redirect("/")

		const crypt = new Crypto(crypto.subtle, key)
		const userCookie = await crypt.decrypt<UserTypeCookie<unknown>>(token) as Record<string, string | Record<string, boolean>>
		const user = {
			...User.remapping(userCookie),
			type: userCookie.type
		} as UserTypeCookie<User>

		return match([Boolean(expectedRole), user.role.get(expectedRole!)])
			.with([false, P.any], () => {
				c.set("decodedToken", user)
				return next()
			})
			.with([true, true], () => {
				c.set("decodedToken", user)
				return next()
			})
			.otherwise(() => c.html(<UnauthorizedPage />, 401))
	}
} 