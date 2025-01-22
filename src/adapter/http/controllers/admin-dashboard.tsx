import { Context } from "@src/adapter/http/contracts/binding"
import { AdminDashboardPage } from "@presenter/pages/admin/dashboard"
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type"
import { InternalUser } from "@src/domain/InternalUser"

export async function adminDashboardController(c: Context) {
	const x = c.get("decodedToken")! as UserTypeCookie<InternalUser>
	return c.html(<AdminDashboardPage />)
}