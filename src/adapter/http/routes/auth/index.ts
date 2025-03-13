import { Hono } from "hono";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";
import { authController } from "@src/adapter/http/controllers/auth";
import { loginController } from "@src/adapter/http/controllers/login";

const authRoutes = new Hono()

authRoutes.get("login", shouldGuest, authController)
authRoutes.post("login", loginController)

export default authRoutes