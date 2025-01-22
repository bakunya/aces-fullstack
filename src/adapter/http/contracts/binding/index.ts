import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { Context as HonoContext } from "hono";

export type Bindings = {
	DB: D1Database,
	COOKIE_PRIVATE: string
	SUBTLE_PRIVATE_KEY: string
	SUBTLE_HASH_PRIVATE_KEY: string
}
export type Context = HonoContext<{
	Bindings: Bindings
	Variables: {
		decodedToken?: UserTypeCookie<unknown>;
	}
}>