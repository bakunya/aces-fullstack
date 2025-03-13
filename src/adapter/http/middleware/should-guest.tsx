import { Context } from "@src/adapter/http/contracts/binding";
import { UserType, UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { Asesi } from "@src/domain/Asesi";
import { User } from "@src/domain/User";
import { Crypto } from "@src/infra/crypto";
import { route } from "@src/infra/singeleton/RouteCollection";
import { Next } from "hono";
import { deleteCookie, getSignedCookie } from "hono/cookie";
import { match } from "ts-pattern";

export async function shouldGuest(c: Context, next: Next) {
	const key = c.env.SUBTLE_PRIVATE_KEY
	const cookieKey = c.env.COOKIE_PRIVATE

	const token = await getSignedCookie(c, cookieKey, 'token')
	if (!token) return await next()

	const crypt = new Crypto(crypto.subtle, key)
	const userCookie = await crypt.decrypt<UserTypeCookie<unknown>>(token)
	const user = {
		...User.remapping(userCookie),
		type: userCookie.type
	} as UserTypeCookie<User | Asesi>

	return match(user.type)
		.with(UserType.INTERNAL_USER, () => c.redirect(route("get.user.dashboard")))
		.with(UserType.ASESI, () => c.redirect(route("get.dashboard")))
		.otherwise(() => {
			deleteCookie(c, "token")
			deleteCookie(c, "batch")
			return c.redirect(route("get"))
		})

	// const path = c.req.path.split("/")[1] as "asesor" | "admin" | "login" /*asesi*/ | "developer"

	// return match([path, user.type])
	// 	.with(["asesor", UserType.INTERNAL_USER], () => {
	// 		if ((user as User).role.get(UserRole.ASSESSOR)) return c.redirect(route("get.asesor.dashboard"))
	// 		const dashboardUrl = getDashboardUrlFromUserCookie(user, UserRole.ASSESSOR)
	// 		if (dashboardUrl instanceof AppError) throw dashboardUrl
	// 		return c.html(<HasLoginPage
	// 			dashboardUrl={ dashboardUrl }
	// 			userType={ UserRole.DEVELOPER }
	// 		/>)
	// 	})
	// 	.with(["developer", UserType.INTERNAL_USER], () => {
	// 		if ((user as User).role.get(UserRole.DEVELOPER)) return c.redirect(route("get.developer.dashboard"))
	// 		const dashboardUrl = getDashboardUrlFromUserCookie(user, UserRole.DEVELOPER)
	// 		if (dashboardUrl instanceof AppError) throw dashboardUrl
	// 		return c.html(<HasLoginPage
	// 			dashboardUrl={ dashboardUrl }
	// 			userType={ UserRole.DEVELOPER }
	// 		/>)
	// 	})
	// 	.with(["admin", UserType.INTERNAL_USER], () => {
	// 		if ((user as User).role.get(UserRole.ADMIN)) return c.redirect(route("get.batch.dashboard"))
	// 		const dashboardUrl = getDashboardUrlFromUserCookie(user, UserRole.ADMIN)
	// 		if (dashboardUrl instanceof AppError) throw dashboardUrl
	// 		return c.html(<HasLoginPage
	// 			dashboardUrl={ dashboardUrl }
	// 			userType={ UserRole.ADMIN }
	// 		/>)
	// 	})
	// 	.with(["login", UserType.ASESI], () => {
	// 		return c.redirect(route("get.dashboard"))
	// 	})
	// 	.otherwise(() => {
	// 		if (user.type === UserType.ASESI) return c.html(<UnauthorizedPage dashboardUrl={ route("get.dashboard") } />)
	// 		const role = (user as User).role.entries().find(([_, value]) => Boolean(value))?.[0] as UserRole | undefined
	// 		if (role === undefined) return c.html(<UnauthorizedPage />)
	// 		const dashboardUrl = getDashboardUrlFromUserCookie(user, role)
	// 		if (dashboardUrl instanceof AppError) throw dashboardUrl
	// 		return c.html(<UnauthorizedPage dashboardUrl={ dashboardUrl } />)
		// })
}