import { Crypto } from "@src/infra/crypto"
import { Context } from "@src/adapter/http/contracts/binding"
import { route } from "@src/infra/singeleton/RouteCollection"
import { BatchUsecase } from "@src/application/usecase/Batch"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { setCookie } from "hono/cookie"

export async function asesiOnboardController(c: Context) {
	const body = await c.req.parseBody() as { code: string }
	if (!body?.code) return c.redirect(route("get.login"))
	const batch = new BatchUsecase(new BatchRepositoryImpl(c.env.DB))

	try {
		const res = await batch.getByToken(body.code)
		const instance = new Crypto(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY)
		const encrypt = await instance.encrypt(res)
		setCookie(c, 'batch', encrypt, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: 60 * 60 * 24, // 1 day in seconds
			sameSite: 'Strict',
		})
		return c.redirect(route("get.login"))
	} catch(e) {
		return c.redirect(route("get.login", undefined, { error: "Batch not found" }))
	}
}