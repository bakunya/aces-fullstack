import { NotFoundPage } from "@presenter/pages/shared/not-found";
import { HxHeaderError } from "@src/adapter/http/contracts/response/hx-header-error";
import { AppError, AppErrorType } from "@src/application/error/AppError";
import { Context } from "hono";
import { HTTPResponseError } from "hono/types";

export async function errorHandlerController(err: AppError | Error | HTTPResponseError, c: Context) {
	console.log(err)
	if (err instanceof AppError) {
		if(err.userMessage) {
			const header: HxHeaderError = { requestError: err.userMessage }
			c.res.headers.set("HX-Trigger", JSON.stringify(header))
		}
		if(c.req.header("hx-request") !== "true") {
			if(c.req.method === "POST") {
				const referer = c.req.header("Referer")
				if(referer) {
					const errMessage = err.userMessage ? `?error=${err.userMessage}` : ""
					return c.redirect(referer?.split("?")[0] + errMessage)
				}
			}
		}
		if(err.type === AppErrorType.NotFoundError) return c.html(<NotFoundPage message={err.message} />, 404)
		return c.text(err.toString(), 500)
	}
	if(c.req.header("hx-request") === "true") {
		const header: HxHeaderError = { requestError: "Internal server error" }
		c.res.headers.set("HX-Trigger", JSON.stringify(header))
		return c.text("", 500)
	}
	return c.text(err.message, 500)
}