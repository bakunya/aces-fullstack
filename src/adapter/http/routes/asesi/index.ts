import { Hono } from "hono";
import { asesiAuthController } from "@src/adapter/http/controllers/asesi-auth";
import { asesiLoginController } from "@src/adapter/http/controllers/asesi-login";
import { asesiDashboardController } from "@src/adapter/http/controllers/asesi-dashboard";
import { shouldAsesi } from "@src/adapter/http/middleware/should-asesi";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";
import { asesiOnboardController } from "@src/adapter/http/controllers/asesi-onboard";

const asesiAuth = new Hono()
const asesiRoutes = new Hono()

asesiRoutes.get("login", shouldGuest, asesiAuthController)
asesiRoutes.post("login", asesiLoginController)
asesiRoutes.post("onboard", asesiOnboardController)

asesiAuth.use(shouldAsesi)
asesiAuth.get("dashboard", asesiDashboardController)
asesiRoutes.route("", asesiAuth)

export default asesiRoutes