import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";
import { acesModulesController } from "@src/adapter/http/controllers/aces-modules";
import { acesNewModulesController } from "@src/adapter/http/controllers/aces-modules-new";
import { acesCreateModulesController } from "@src/adapter/http/controllers/aces-modules-create";

const acesRoutes = new Hono()

acesRoutes.use(shouldUser(UserRole.ACES))
acesRoutes.get("dashboard", c => c.html("Dashboard Aces"))
acesRoutes.get("dashboard/modules", acesModulesController)
acesRoutes.get("dashboard/modules/new", acesNewModulesController)
acesRoutes.post("dashboard/modules/new", acesCreateModulesController)
acesRoutes.route("", acesRoutes)

export default acesRoutes