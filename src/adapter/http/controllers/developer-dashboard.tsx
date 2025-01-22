import { Context } from "@src/adapter/http/contracts/binding"
import { DeveloperDashboardPage } from "@presenter/pages/developer/dashboard"

export async function developerDashboardController(c: Context) {
	return c.html(<DeveloperDashboardPage />)
}