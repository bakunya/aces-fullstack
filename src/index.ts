import { Context, Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'
import { errorHandlerController } from '@src/adapter/http/controllers/error-handler'
import { landingPageController } from '@src/adapter/http/controllers/landing-page'
import { Crypto } from '@src/infra/crypto'
import { routeAll, RouteCollection } from '@src/infra/singeleton/RouteCollection'
import asesiRoutes from '@src/adapter/http/routes/asesi'
import asesorRoutes from '@src/adapter/http/routes/asesor'
import authRoutes from '@src/adapter/http/routes/auth'
import userRoutes from '@src/adapter/http/routes/user/dashboard'
import appRoutes from '@src/adapter/http/routes/app'
import acesRoutes from '@src/adapter/http/routes/aces'
import batchRoutes from '@src/adapter/http/routes/batch'
import moduleRoutes from '@src/adapter/http/routes/module'

const app = new Hono()

app.get("/dev", async c => {
	const encryptKey = await Crypto.generateEncryptKey()
	const routes = routeAll()
	return c.json({ encryptKey, routes })
})

app.get("/", landingPageController)

app.post("/logout", async (c: Context) => {
	deleteCookie(c, "token")
	deleteCookie(c, "batch")
	
	const referer = c.req.header("Referer")
	
	return c.redirect(referer?.split("?")[0] ?? "/")
})

app.route("/app/", appRoutes)
app.route("/aces/", acesRoutes)
app.route("/batch/", batchRoutes)
app.route("/module/", moduleRoutes)
app.route("/asesor/", asesorRoutes)

app.route("/auth/", authRoutes)
app.route("/user/", userRoutes)
app.route("/", asesiRoutes)

app.onError(errorHandlerController)

RouteCollection.createInstance(app.routes)

export default app

	// o32K33n5WFILdKEJ3iF3XnFhOIdJlFOZpJ/vhesCc3M=