import { NotFoundPage } from "@presenter/pages/shared/not-found";
import { AppError, AppErrorType } from "@src/application/error/AppError";
import { Context } from "hono";
import { HTTPResponseError } from "hono/types";

export async function errorHandlerController(err: AppError | Error | HTTPResponseError, c: Context) {
	if (err instanceof AppError) {
		if(err.type === AppErrorType.NotFoundError) return c.html(<NotFoundPage message={err.message} />, 404)
		return c.text(err.toString(), 500)
	}
	return c.text(err.message, 500)
}