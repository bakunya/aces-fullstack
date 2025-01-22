import { Context } from "@src/adapter/http/contracts/binding"
import { AsesiAuthPage } from "@src/adapter/presenter/pages/asesi/asesi-auth"

export async function asesiAuthController(c: Context) {
	const errorQuery = c.req.query("error")
	return c.html(<AsesiAuthPage error={ errorQuery } />)
}