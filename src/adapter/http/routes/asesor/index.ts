import { Hono } from "hono";
import { asesorAuthController } from "@src/adapter/http/controllers/asesor-auth";
import { asesorLoginController } from "@src/adapter/http/controllers/asesor-login";
import { asesorDashboardController } from "@src/adapter/http/controllers/asesor-dashboard";
import { shouldAsesor } from "@src/adapter/http/middleware/should-asesor";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";

const asesorAuth = new Hono()
const asesorRoutes = new Hono()

asesorRoutes.get("login", shouldGuest, asesorAuthController)
asesorRoutes.post("login", asesorLoginController)

asesorAuth.use(shouldAsesor)
asesorAuth.get("dashboard", asesorDashboardController)
asesorRoutes.route("", asesorAuth)

export default asesorRoutes