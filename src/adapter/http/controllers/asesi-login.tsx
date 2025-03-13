import { Context } from "@src/adapter/http/contracts/binding"
import { UserType } from "@src/adapter/http/contracts/cookie/user-type"
import { AppError } from "@src/application/error/AppError"
import { LoginAsesiUsecase } from "@src/application/usecase/LoginAsesi"
import { Crypto } from "@src/infra/crypto"
import { HashImpl } from "@src/infra/crypto/HashImpl"
import { route } from "@src/infra/singeleton/RouteCollection"
import { AsesiRepositoryImpl } from "@src/infra/databases/d1/repositories/AsesiRepositoryImpl"
import { getCookie, setSignedCookie } from "hono/cookie"
import { LoginPersonRequest } from "@src/adapter/http/contracts/request/login-person"

export async function asesiLoginController(c: Context) {
	const param = await c.req.parseBody() as LoginPersonRequest

	const key = c.env.SUBTLE_PRIVATE_KEY
	const crypt = new Crypto(crypto.subtle, key)
	
	const cookieToken = getCookie(c, 'batch')
	if(!cookieToken) return c.redirect("/asesi/login?error=Batch not found")
		
	const adminRepo = new AsesiRepositoryImpl(c.env.DB)
	const usecase = new LoginAsesiUsecase(adminRepo, new HashImpl(), crypt)

	try {
		const user = await usecase.execute(param, cookieToken)
		const userCookie = {
			...user,
			type: UserType.ASESI,
		}
		const encrypt = await crypt.encrypt(userCookie)
		await setSignedCookie(c, 'token', encrypt, c.env.COOKIE_PRIVATE, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: 60 * 60 * 24, // 1 day in seconds
			sameSite: 'Strict',
		})
		return c.redirect("/dashboard")
	} catch(e: any) {
		if(e instanceof AppError) {
			return c.redirect(route("get.login", undefined, { error: e.message }))
		}
		return c.redirect(route("get.login", undefined, { error: "Server Error" }))
	}

}