import { Context } from "@src/adapter/http/contracts/binding"
import { PersonLoginRequest } from "@src/adapter/http/contracts/request/api-bind-person-login"
import { PersonLoginResponse } from "@src/adapter/http/contracts/response/api-bind-person-login";
import { LoginPerson } from "@src/application/usecase/LoginPerson";
import { Crypto } from "@src/infra/crypto";
import { PersonRepositoryImpl } from "@src/infra/databases/d1/repositories/PersonRepositoryImpl";

export async function apiBindPersonLoginController(c: Context) {
	const body = await c.req.json() as PersonLoginRequest
	const data = await LoginPerson.create(
		PersonRepositoryImpl.create(c.env.DB),
		Crypto.create(crypto.subtle, c.env.SUBTLE_PRIVATE_KEY),
	).execute(body) as PersonLoginResponse
	return c.json(data)
}