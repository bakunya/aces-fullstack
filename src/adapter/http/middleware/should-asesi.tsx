import { HasLoginPage } from "@presenter/pages/shared/has-login";
import { Context } from "@src/adapter/http/contracts/binding";
import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
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

	if(user.type === UserType.ASESI) {
		c.set("decodedToken", user)
		return await next()
	}
	return c.redirect("/asesi/login")
}