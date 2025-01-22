import { Hono } from "hono";
import { adminAuthController } from "@src/adapter/http/controllers/admin-auth";
import { adminLoginController } from "@src/adapter/http/controllers/admin-login";
import { adminDashboardController } from "@src/adapter/http/controllers/admin-dashboard";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";
import { shouldAdmin } from "@src/adapter/http/middleware/should-admin";

const adminAuth = new Hono()
const adminRoutes = new Hono()

adminRoutes.get("login", shouldGuest, adminAuthController)
adminRoutes.post("login", adminLoginController)

adminAuth.use(shouldAdmin)
adminAuth.get("dashboard", adminDashboardController)
adminRoutes.route("", adminAuth)

export default adminRoutes