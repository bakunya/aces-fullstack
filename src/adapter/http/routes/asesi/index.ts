import { Hono } from "hono";
import { asesiAuthController } from "@src/adapter/http/controllers/asesi-auth";
import { asesiLoginController } from "@src/adapter/http/controllers/asesi-login";
import { asesiDashboardController } from "@src/adapter/http/controllers/asesi-dashboard";
import { shouldAsesi } from "@src/adapter/http/middleware/should-asesi";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";

const asesiAuth = new Hono()
const asesiRoutes = new Hono()

asesiRoutes.get("login", shouldGuest, asesiAuthController)
asesiRoutes.post("login", asesiLoginController)

asesiAuth.use(shouldAsesi)
asesiAuth.get("dashboard", asesiDashboardController)
asesiRoutes.route("", asesiAuth)

export default asesiRoutes