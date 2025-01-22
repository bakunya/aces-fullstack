import { Context } from "@src/adapter/http/contracts/binding"
import { AsesorAuthPage } from "@src/adapter/presenter/pages/asesor/asesor-auth"

export async function asesorAuthController(c: Context) {
	const errorQuery = c.req.query("error")
	return c.html(<AsesorAuthPage error={ errorQuery } />)
}