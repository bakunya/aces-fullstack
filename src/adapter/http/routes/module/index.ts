import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";

const moduleRoutes = new Hono()

moduleRoutes.use(shouldUser(UserRole.MODULE))
moduleRoutes.get("dashboard", c => c.html("Dashboard Module"))
moduleRoutes.route("", moduleRoutes)

export default moduleRoutes