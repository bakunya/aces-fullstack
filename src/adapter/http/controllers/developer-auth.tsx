import { Context } from "@src/adapter/http/contracts/binding"
import { DeveloperAuthPage } from "@src/adapter/presenter/pages/developer/developer-auth"

export async function developerAuthController(c: Context) {
	const errorQuery = c.req.query("error")
	return c.html(<DeveloperAuthPage error={ errorQuery } />)
}