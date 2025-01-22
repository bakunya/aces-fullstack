import { Hono } from "hono";
import { developerAuthController} from "@src/adapter/http/controllers/developer-auth";
import { developerLoginController } from "@src/adapter/http/controllers/developer-login";
import { developerDashboardController } from "@src/adapter/http/controllers/developer-dashboard";
import { shouldDeveloper } from "@src/adapter/http/middleware/should-developer";
import { shouldGuest } from "@src/adapter/http/middleware/should-guest";

const developerAuth = new Hono()
const developerRoutes = new Hono()

developerRoutes.get("login", shouldGuest, developerAuthController)
developerRoutes.post("login", developerLoginController)

developerAuth.use(shouldDeveloper)
developerAuth.get("dashboard", developerDashboardController)
developerRoutes.route("", developerAuth)

export default developerRoutes