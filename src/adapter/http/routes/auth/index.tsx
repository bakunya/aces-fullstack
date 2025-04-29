import { Hono } from "hono";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";
import { authController } from "@src/adapter/http/controllers/auth";
import { loginController } from "@src/adapter/http/controllers/login";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { OnBoardUserPage } from "@presenter/pages/shared/on-board-user";
import { Context } from "@src/adapter/http/contracts/binding"
import { User } from "@src/domain/User";
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { setSignedCookie } from "hono/cookie";

const protectedRoutes = new Hono()
protectedRoutes.use(shouldUser())
protectedRoutes.get("logout", async (c: Context) => {
	await setSignedCookie(c, 'token', "", c.env.COOKIE_PRIVATE, {
		path: '/',
		maxAge: 0,
		secure: true,
		httpOnly: true,
		sameSite: 'Strict',
	})
	return c.redirect("/")
})
protectedRoutes.get("dashboard", (c: Context) => {
	return c.html(<OnBoardUserPage user={ c.var.decodedToken! as UserTypeCookie<User> } />)
})

const authRoutes = new Hono()
authRoutes.get("login", shouldGuest, authController)
authRoutes.post("login", loginController)
authRoutes.route("", protectedRoutes)



export default authRoutes