import { Context } from "@src/adapter/http/contracts/binding"

export async function asesiDashboardController(c: Context) {
	return c.html("asesi dashboard")
}