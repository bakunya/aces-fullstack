import { Context } from "@src/adapter/http/contracts/binding"
import { AdminAuthPage } from "@src/adapter/presenter/pages/admin/admin-auth"

export async function adminAuthController(c: Context) {
	const errorQuery = c.req.query("error")
	return c.html(<AdminAuthPage error={ errorQuery } />)
}