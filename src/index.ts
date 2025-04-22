import { Context, Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'
import { errorHandlerController } from '@src/adapter/http/controllers/error-handler'
import { landingPageController } from '@src/adapter/http/controllers/landing-page'
import { Crypto } from '@src/infra/crypto'
import { routeAll, RouteCollection } from '@src/infra/singeleton/RouteCollection'
import asesorRoutes from '@src/adapter/http/routes/asesor'
import authRoutes from '@src/adapter/http/routes/auth'
import appRoutes from '@src/adapter/http/routes/app'
import acesRoutes from '@src/adapter/http/routes/aces'

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
app.route("/asesor/", asesorRoutes)

app.route("/auth/", authRoutes)

app.onError(errorHandlerController)

RouteCollection.createInstance(app.routes)

export default app

	// o32K33n5WFILdKEJ3iF3XnFhOIdJlFOZpJ/vhesCc3M=