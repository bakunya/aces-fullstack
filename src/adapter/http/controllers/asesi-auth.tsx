import { Context } from "@src/adapter/http/contracts/binding"
import { AsesiOnboardingPage } from "@presenter/pages/asesi/asesi-onboarding"
import { AsesiAuthPage } from "@src/adapter/presenter/pages/asesi/asesi-auth"
import { getCookie } from "hono/cookie"
import { BatchDTO } from "@src/application/dto/batch"
import { Crypto } from "@src/infra/crypto"

export async function asesiAuthController(c: Context) {
	const errorQuery = c.req.query("error")
	const encrypt = getCookie(c, "batch") as string
	
	if(encrypt) {
		const decrypt = new Crypto(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY)
		const batch = await decrypt.decrypt<BatchDTO>(encrypt)
		return c.html(<AsesiAuthPage error={ errorQuery } batchName={ batch.title } organizationName={ batch.organization_name } />)
	} else {
		return c.html(<AsesiOnboardingPage error={ errorQuery } />)
	}
}