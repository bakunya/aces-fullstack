import { Context } from "@src/adapter/http/contracts/binding"
import { SharedAuthPage } from "@src/adapter/presenter/pages/shared/auth-form"

export async function authController(c: Context) {
	const errorQuery = c.req.query("error")
	return c.html(<SharedAuthPage error={ errorQuery } />)
}