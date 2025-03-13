import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";

const userRoutes = new Hono()

userRoutes.use(shouldUser())
userRoutes.get("dashboard", c => c.html("Dashboard User"))

export default userRoutes