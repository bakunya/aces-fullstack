import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";

const appRoutes = new Hono()

appRoutes.use(shouldUser(UserRole.APP))
appRoutes.get("dashboard", c => c.html("Dashboard App"))

export default appRoutes