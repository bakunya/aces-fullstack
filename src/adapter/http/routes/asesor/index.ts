import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";

const asesorRoutes = new Hono()

asesorRoutes.use(shouldUser(UserRole.ASSESSOR))
asesorRoutes.get("dashboard", c => c.html("Dashboard Asesor"))
asesorRoutes.route("", asesorRoutes)

export default asesorRoutes