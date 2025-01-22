import { Context } from "@src/adapter/http/contracts/binding"
import { UserType } from "@src/adapter/http/contracts/cookie/user-type"
import { LoginRequest } from "@src/adapter/http/contracts/request/login"
import { LoginAdminUsecase } from "@src/application/usecase/LoginAdmin"
import { Crypto } from "@src/infra/crypto"
import { HashImpl } from "@src/infra/crypto/HashImpl"
import { InternalUserRepositoryImpl } from "@src/infra/databases/d1/repositories/InternalUserRepositoryImpl"
import { setSignedCookie } from "hono/cookie"

export async function adminLoginController(c: Context) {
	const param = await c.req.parseBody() as LoginRequest
	
	const adminRepo = new InternalUserRepositoryImpl(c.env.DB)
	const usecase = new LoginAdminUsecase(adminRepo, new HashImpl())
	const user = await usecase.execute(param)
	if(!user) return c.redirect("/admin/login?error=1")
	
	const userCookie = {
		...user,
		type: UserType.INTERNAL_USER,
	}

	const key = c.env.SUBTLE_PRIVATE_KEY
	const crypt = new Crypto(crypto.subtle, key)
	const encrypt = await crypt.encrypt(userCookie)

	await setSignedCookie(c, 'token', encrypt, c.env.COOKIE_PRIVATE, {
		path: '/',
		secure: true,
		httpOnly: true,
		maxAge: 60 * 60 * 24, // 1 day in seconds
		sameSite: 'Strict',
	})

	return c.redirect("/admin/dashboard")
}