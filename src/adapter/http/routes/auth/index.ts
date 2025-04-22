import { Hono } from "hono";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";
import { authController } from "@src/adapter/http/controllers/auth";
import { loginController } from "@src/adapter/http/controllers/login";
import { shouldUser } from "@src/adapter/http/middleware/should-user";

const protectedRoutes = new Hono()
protectedRoutes.use(shouldUser())
protectedRoutes.get("dashboard", c => c.html("Dashboard User"))

const authRoutes = new Hono()
authRoutes.get("login", shouldGuest, authController)
authRoutes.post("login", loginController)
authRoutes.route("", protectedRoutes)



export default authRoutes