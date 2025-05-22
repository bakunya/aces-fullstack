import { Context } from "@src/adapter/http/contracts/binding";
import { Next } from "hono";

export async function validApiBindKey(c: Context, next: Next) {
	if (c.req.header("x-api-key") !== c.env.SELF_KEY) {
		return c.json({ error: "Unauthorized" }, 401);
	}
	await next();
}